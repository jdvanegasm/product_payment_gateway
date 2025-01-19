### **Updated User Stories**
#### **1. Customers view products**
- **Story:** As a customer, I want to see a list of products with their description, price, and stock availability so that I can choose what to buy.
- **Fulfillment:**
    - The `Products` entity stores all necessary details about the products (`Name`, `Description`, `Price`, `Stock`, `Image_URL`).
    - The `GET /products` endpoint retrieves this information, allowing customers to view product details and availability.
---
#### **2. Select and pay for products**
- **Story:** As a customer, I want to select a product and pay with my credit card to complete my purchase quickly and securely.
- **Fulfillment:**
    - The `Transactions` entity directly associates a product with a payment, removing the need for intermediary entities like `Orders` or `OrderDetails`.
    - The `POST /payments` endpoint handles credit card payments, validating the product stock and creating a pending transaction in the database.
---
#### **3. View order summary**
- **Story:** As a customer, I want to view a summary of my order, including taxes and additional costs, before paying to confirm the charges.
- **Fulfillment:**
    - The `Transactions` entity includes `Total`, `Taxes`, and `Shipping_Cost` attributes, allowing the frontend to present an accurate summary.
    - The response from the `POST /payments` endpoint includes these details, ensuring the customer can review the charges before completing the payment.
---
#### **4. Process transactions with Wompi**
- **Story:** As a system, I want to create and process transactions using the Wompi API to handle payments securely.
- **Fulfillment:**
    - The `Transactions` entity includes the `Wompi_Transaction_ID` attribute, linking the transaction to Wompi’s API.
    - The `POST /payments` endpoint creates a transaction in Wompi, and the `POST /webhooks/wompi` endpoint listens for updates to process transaction statuses.
---
#### **5. Update stock and notify transaction status**
- **Story:** As a system, I want to automatically update product stock and display the final status of transactions to keep the store up-to-date.
- **Fulfillment:**
    - The `Products` entity tracks product stock, which is adjusted only when a transaction is approved (`Status = APPROVED`).
    - The `POST /webhooks/wompi` endpoint updates the transaction status and adjusts the stock accordingly.
    - The `GET /transactions/:id` endpoint allows customers to view the final status of their transaction.
---