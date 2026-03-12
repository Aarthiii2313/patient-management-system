# PATIENT MANAGEMENT SYSTEM
**A Salesforce-Based Healthcare Management Application**

## ABSTRACT
Healthcare institutions manage a large volume of patient information including appointments, prescriptions, and billing records. Traditional manual management of such data often leads to inefficiencies, data redundancy, and increased administrative workload.

The Patient Management System developed in this project provides a cloud-based solution for efficiently managing hospital operations using the Salesforce platform. The system integrates appointment scheduling, prescription management, and billing functionalities into a centralized platform.

The application is implemented using Lightning Web Components (LWC) for the user interface and Apex for backend logic, enabling efficient interaction with Salesforce objects through SOQL queries. By digitizing hospital workflows and maintaining centralized patient data, the proposed system improves operational efficiency, reduces manual errors, and enhances patient record management.

## 1. INTRODUCTION
The healthcare sector requires efficient management of patient information, medical records, and hospital operations. In traditional hospital environments, patient records and appointment scheduling are often managed manually, which can result in inefficiencies, delays, and data inconsistencies.

This project presents the development of a Patient Management System using the Salesforce platform. Salesforce provides a powerful cloud-based environment for building scalable applications with integrated database management and automation capabilities. The proposed system allows hospital staff to manage patient records, book appointments, generate prescriptions, and maintain billing information through an intuitive user interface.

## 2. PROBLEM STATEMENT
Many healthcare institutions still rely on manual or partially digitized systems to manage patient records and hospital operations. These traditional systems present several challenges:
- Difficulty in managing large volumes of patient data.
- Inefficient appointment scheduling processes.
- Risk of data duplication and human errors.
- Lack of centralized patient information management.
- Increased administrative workload for hospital staff.

## 3. OBJECTIVES
- To develop a cloud-based system for managing patient information efficiently.
- To automate the process of appointment booking and management.
- To maintain accurate records of prescriptions and treatments.
- To generate billing records for hospital services.
- To provide a user-friendly interface for hospital staff.
- To improve operational efficiency through automation and centralized data storage.

## 4. SYSTEM ARCHITECTURE
The system follows a multi-layer architecture consisting of three main components:

### 4.1 Presentation Layer
Developed using Lightning Web Components (LWC), providing a dynamic and responsive web interface:
- `home`: Professional landing page for ABC Multispeciality Hospital.
- `test`: Interactive appointment booking module.
- `presbill`: Comprehensive billing and prescription management interface.

### 4.2 Business Logic Layer
Implemented using Apex Controllers to handle data processing and SOQL queries:
- `AppointmentController`: Manages appointment lifecycle.
- `DoctorController`: Handles doctor profiles and availability.
- `BillingController`: Processes financial calculations.

### 4.3 Data Layer
Consists of Salesforce custom objects for structured data storage:
- `patient__c`: Patient identity and contact records.
- `Doctor__c`: Specialized healthcare provider profiles.
- `Appointment__c`: Junction object linking patients and doctors.
- `Billing__c`: Financial records and payment statuses.

### 4.4 Architecture Diagram
![System Architecture](documentation/system-architecture.png)

## 5. MODULES OF THE SYSTEM

### 5.1 Appointment Management Module (LWC: `test`)
Enables staff to book new appointments, view schedules, and select specialized doctors based on experience and shift availability. Feature-rich interface with real-time feedback.

### 5.2 Prescription & Billing Module (LWC: `presbill`)
Allows doctors to record medications, dosages, and costs. Automatically calculates consultation fees, medicine costs, taxes, and discounts to generate the total bill.

### 5.3 Dashboard & Home Module (LWC: `home`)
Provides a visual summary of hospital services and stats (Cardiology, Neurology, etc.). Features a premium design with medical-themed animations like floating molecules and bubbles.

## 6. TECHNOLOGIES USED
- **Salesforce Platform**: Cloud-based foundation.
- **Apex**: Backend logic and SOQL operations.
- **Lightning Web Components (LWC)**: Modern frontend framework.
- **CSS3/Glassmorphism**: Advanced UI/UX styling for a premium feel.

## 7. PROJECT ANALYSIS

### 7.1 Advantages
- Centralized management of medical records.
- Automated financial calculations reducing human error.
- Premium, modern, and responsive UI design.

### 7.2 Difficulties & Complexity
- Managing complex junction objects (Appointments) between Doctors and Patients.
- Implementing custom CSS animations while maintaining SLDS compatibility.

### 7.3 Limitations
- Requires Salesforce environment and active internet connectivity.

## 8. FUTURE ENHANCEMENTS
- Integration with mobile healthcare applications.
- Automated appointment reminders through SMS or email.
- AI-based medical recommendation systems using Einstein AI.
- Patient self-service portal.

## 9. CONCLUSION
The Patient Management System provides an efficient digital solution for managing hospital operations. By utilizing Salesforce, LWC, and Apex, the system automates day-to-day tasks, improves data integrity, and enhances the overall administrative efficiency of healthcare institutions.
