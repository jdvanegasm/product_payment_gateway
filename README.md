# Payment Integration - Technical Test

## Description

This project aims to integrate the **Wompi Payment API** into a web application that enables users to purchase products using credit cards. The workflow includes displaying products, tokenizing credit card data, creating a transaction, processing the transaction, and updating the transaction status based on the response from Wompi.

## Architecture Overview

The project follows a **Hexagonal Architecture** (also known as Ports and Adapters), which allows for a clean separation between the core business logic and external systems, such as the Wompi API. This design ensures that the core logic remains independent of the frameworks and tools used for external interactions.

Additionally, we applied **Railway Oriented Programming (ROP)** principles to handle errors in a clean and functional way, improving the resilience of the application. We also incorporated **Vuex** for state management on the frontend, utilizing **Flux** architecture to ensure the consistency of the application's state across components.

### **Key Components:**

- **Frontend**: Developed using **Vue.js** for the user interface. **Vuex** is used for centralized state management, ensuring a responsive and efficient user experience.
  
- **Backend**: The backend is developed using **NestJS**, a Node.js framework that provides a highly modular structure for scalable applications. The backend integrates with the **Wompi API** to handle payment processing, tokenization, and transaction management.

- **Database**: **PostgreSQL** is used to store transaction and product data. The data is managed through **Prisma**, an ORM that provides a clean and efficient way to interact with the database.

---

## Installation Instructions

### Requirements

- **Node.js**: Version 18.x or higher.
- **PostgreSQL**: Database used to store transaction and product information.
- **NestJS**: Backend framework used to build the application API.
- **Vue.js**: Frontend framework for the user interface (UI).
- **Wompi API**: Wompi Sandbox environment for processing payments.

### Steps for Installation

1. **Clone the repository**

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file at the root of the project and add the following variables (replace the example keys with the actual ones):

   ```env
   DATABASE_URL="postgresql://postgres:admin@localhost:5432/payment_gateway"
   WOMPI_API_KEY="pub_stagtest_..."
   WOMPI_API_SECRET="prv_stagtest_..."
   WOMPI_SIGNATURE_KEY="stagtest_integrity_..."
   WOMPI_EVENT_KEY="stagtest_events_..."
   ```

4. **Run the project**

   To start the application in development mode:

   ```bash
   npm run start:dev
   ```

   The server will be running at `http://localhost:3000`.

    ```bash
   npm run serve
   ```

   The frontend server will be running at `http://localhost:8080`

5. **Access the application in the browser**

   The application will be available from any browser.

---

## Implemented Features

### Frontend

- **Product Page**: Displays available products with descriptions, prices, and stock quantities.
- **Credit Card Form**: Allows users to input card details (card number, CVC, expiration month/year, and cardholder name). This data is sent to the API for tokenization.
- **Transaction Summary**: Shows a summary of the transaction with selected products, taxes, shipping cost, and total price.
- **Transaction Status**: After processing the payment, the status of the transaction is shown (approved, failed, pending).

### Backend

- **API Integration**: Endpoints were implemented to interact with the Wompi API. Credit cards are tokenized, transactions are created, and transaction statuses are fetched.
- **Webhook Controller**: A controller is set up to receive and process Wompi events, updating the transaction status in the database accordingly.
- **Database Schema**: PostgreSQL database was set up to store transactions and products.

### Technical Highlights

- **Hexagonal Architecture**: Clean separation of concerns between the application core, external services (Wompi), and persistence (PostgreSQL).
- **Railway Oriented Programming (ROP)**: Error handling is done using the Railway Oriented Programming approach, making error states explicit and improving the resilience of the application.
- **State Management with Vuex**: On the frontend, Vuex is used for centralized state management, following the Flux architecture to ensure consistency across components.
- **Prisma ORM**: Prisma is used to interact with the PostgreSQL database efficiently, abstracting away complex SQL queries while ensuring type safety.

---

## Project Status

### Completed Tasks

1. **Frontend**: 
   - Product page with basic functionality.
   - Credit card form implemented (card tokenization).
   - Transaction summary with the correct data.

2. **Backend**:
   - API adapter configured with functions `createTransaction`, `getTransactionStatus`, and `tokenizeCard`.
   - Webhook controller implemented to process Wompi notifications.
   - Logic for transaction creation and status updates.

### Pending Tasks

1. **Full Transaction Integration**:
   - Integration with Wompi API could not be completed due to an issue with the provided sandbox credentials. The public and private keys provided did not allow transactions to be made, leading to failures in integrating the payment process.

2. **Unit Tests**: Unit tests were implemented until the API integration was done, due to the inability to fully integrate the Wompi API.

3. **Deployment**: Final deployment to a live environment was not completed due to the issue with the API integration.

---

## Reason for Incomplete Project

During the process of integrating with the Wompi API, it was identified that the provided sandbox credentials did not permit transaction creation. Despite using the correct keys, the API responded with errors indicating authorization failure or stating that the merchant was unavailable for processing transactions.

This issue prevented the completion of the integration with the Wompi API and halted progress in implementing the full payment workflow, thereby impacting the ability to complete the technical test.

---

## Error Documentation

### Error Description

- **Authorization Error (Forbidden)**: When attempting to create a transaction or tokenize a card, the Wompi API responded with a **Forbidden** error, indicating that the provided credentials did not correspond to the correct environment.
  
- **Merchant Not Found Error**: When using the sandbox public key, the API response stated that the merchant was not found.

- **Incorrect Access Token Environment**: When using the public key for the production environment, the API responded with an **Unauthorized** error indicating that the key was invalid for the test environment.

### Possible Causes

1. The **merchant** configuration in the sandbox environment was not set up correctly, which prevented any transactions from being processed.
2. The **sandbox mode** was not activated in the Wompi platform, leading to conflicts between the credentials and the test environment.

---

## Project Images

The following images will be attached to demonstrate the project’s UI, code structure, and the current state of the application.

---

This README provides a detailed overview of the project, including the implemented features, tasks that were completed, and the reasons for the project's incomplete status. The error documentation explains the technical issue that prevented the full completion of the payment integration and the technical test.

---