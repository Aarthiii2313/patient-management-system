import { LightningElement, wire, track } from 'lwc';
import getAppointments from '@salesforce/apex/BillingController.getAppointments';
import saveBilling from '@salesforce/apex/BillingController.saveBilling';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BillingPage extends LightningElement {

    @track appointmentOptions = [];
    @track appointmentDetails = { patient: '', doctor: '', date: '' };

    appointments = [];

    selectedAppointment;

    consultationFee = 500;
    medicineCost = 0;
    discount = 0;
    tax = 0;
    totalAmount = 500;

    paymentMode;
    paymentStatus;

    prescriptions = [{ id: 1, medicine: '', dosage: '', amount: 0 }];
    prescriptionCounter = 1;

    paymentModeOptions = [
        { label: 'Cash', value: 'Cash' },
        { label: 'UPI', value: 'UPI' },
        { label: 'Card', value: 'Card' },
        { label: 'Net Banking', value: 'Net Banking' }
    ];

paymentStatusOptions = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Paid', value: 'Paid' },
    { label: 'Partially Paid', value: 'Partially Paid' },
    { label: 'Refunded', value: 'Refunded' }
];

    // LOAD APPOINTMENTS
    @wire(getAppointments)
    wiredAppointments({ error, data }) {

        if (data) {

            this.appointments = data;

            this.appointmentOptions = data.map(app => ({
                label: `${app.Name} - ${app.patient__r?.Name || 'No Patient Assigned'}`,
                value: app.Id
            }));

        } else if (error) {

            console.error(error);
        }
    }

    // SELECT APPOINTMENT
    handleAppointmentChange(event) {

        this.selectedAppointment = event.detail.value;

        const selected = this.appointments.find(a => a.Id === this.selectedAppointment);

        if (!selected) return;

 this.appointmentDetails = {
    patient: selected.patient__r ? selected.patient__r.Name : 'No Patient',
    doctor: selected.Doctor__r ? selected.Doctor__r.Name : 'No Doctor',
    date: selected.Appointment_Date__c ? selected.Appointment_Date__c : ''
};
    }

    // ADD MEDICINE
    addPrescription() {

        this.prescriptionCounter++;

        this.prescriptions = [
            ...this.prescriptions,
            { id: this.prescriptionCounter, medicine: '', dosage: '', amount: 0 }
        ];
    }

    // UPDATE MEDICINE
    handlePrescriptionChange(event) {

        const index = event.target.dataset.index;
        const field = event.target.dataset.field;
        const value = event.target.value;

        this.prescriptions[index][field] = field === 'amount'
            ? Number(value)
            : value;

        this.prescriptions = [...this.prescriptions];

        this.calculatePrescriptionTotal();
    }

    // REMOVE MEDICINE
    removePrescription(event) {

        const index = event.target.dataset.index;

        this.prescriptions.splice(index, 1);

        this.prescriptions = [...this.prescriptions];

        this.calculatePrescriptionTotal();
    }

    // MEDICINE TOTAL
    calculatePrescriptionTotal() {

        let total = this.prescriptions.reduce(
            (sum, item) => sum + Number(item.amount || 0),
            0
        );

        this.medicineCost = total;

        this.calculateTotal();
    }

    // INPUT CHANGES
    handleChange(event) {

        const field = event.target.dataset.field;

        if (field === 'paymentMode' || field === 'paymentStatus') {

            this[field] = event.detail.value;

        } else {

            this[field] = Number(event.detail.value);

            this.calculateTotal();
        }
    }

    // CALCULATE BILL
    calculateTotal() {

        const baseAmount = this.consultationFee + this.medicineCost;

        const discountAmount = baseAmount * (this.discount / 100);

        const subtotalAfterDiscount = baseAmount - discountAmount;

        const taxAmount = subtotalAfterDiscount * (this.tax / 100);

        this.totalAmount = subtotalAfterDiscount + taxAmount;
    }

    // SAVE BILLING
    handleSave() {

    if (!this.selectedAppointment) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Please select an appointment',
                variant: 'error'
            })
        );
        return;
    }

    if (!this.prescriptions || this.prescriptions.length === 0 || !this.prescriptions[0].medicine) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Please add at least one medicine',
                variant: 'error'
            })
        );
        return;
    }

    if (!this.paymentMode) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Please select payment mode',
                variant: 'error'
            })
        );
        return;
    }

    if (!this.paymentStatus) {

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Please select payment status',
                variant: 'error'
            })
        );
        return;
    }

        const selected = this.appointments.find(
            a => a.Id === this.selectedAppointment
        );

        if (!selected?.patient__c) {

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Appointment has no patient',
                    variant: 'error'
                })
            );

            return;
        }

        const billingRecord = {

            Appointment__c: this.selectedAppointment,
            patient__c: selected.patient__c,

            Consultation_Fee__c: this.consultationFee,
            Medicine_Cost__c: this.medicineCost,
            Discount__c: this.discount,
            Tax__c: this.tax,

            Payment_Mode__c: this.paymentMode,
            Payment_Status__c: this.paymentStatus,

            Billing_Date__c: new Date().toISOString().split('T')[0]

        };

        const prescriptionRecords = this.prescriptions.map(item => ({

            Medicine__c: item.medicine,
            Dosage__c: item.dosage,
            Amount__c: item.amount

        }));

       saveBilling({
         bill: billingRecord,
         prescriptions: prescriptionRecords
})

        .then(() => {

            this.dispatchEvent(

                new ShowToastEvent({
                    title: 'Success',
                    message: 'Billing Saved Successfully',
                    variant: 'success'
                })

            );
        })

        .catch(error => {

            this.dispatchEvent(

                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })

            );
        });
    }
}