### **Order and Payment Management**

#### **1. Scope of the Endpoints**

- There is no need to list all orders or create a dedicated endpoint to fetch order details.
- Order management will be handled exclusively during the payment process, leveraging the Wompi API to manage transaction states.

#### **2. Implemented Endpoints**

1. **Create Order (`POST /orders`)**:
    - Creates an order record with the selected products.
    - Validates that the products have sufficient stock.
    - Adjusts the stock in the database.
2. **Process Payment (`POST /payments`)**:
    - Receives order information and card details.
    - Creates a pending transaction in Wompi.
    - Updates the order status based on the response from the Wompi API.
3. **Wompi Webhook (`POST /webhooks/wompi`)**:
    - Receives updates from the Wompi API regarding transaction states (e.g., pending, approved, failed).
    - Updates the order status in the database.
    - Restores product stock if the transaction fails.
4. **Transaction Status (`GET /transactions/:id`)**:
    - Returns the status of a specific transaction to allow clients to manually verify the status of their orders.

---