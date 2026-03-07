import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class Home extends NavigationMixin(LightningElement) {

 navigateToAppointment() {
    this[NavigationMixin.Navigate]({
        type: 'standard__component',
        attributes: {
            componentName: 'c__test'
        }
    });
  }
}