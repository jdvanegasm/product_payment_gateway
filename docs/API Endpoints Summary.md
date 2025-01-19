#### **Scope of the Endpoints**
- The system will now handle transactions directly, with no intermediate "order" entity in the API flow.
- Product stock adjustments and Wompi transaction handling will be centralized in the payment processing endpoints.
- Wompi API integration will manage transaction statuses via webhooks and manual queries.
---
#### **Implemented Endpoints**
1. **List Products (`GET /products`)**
    - **Description:** Fetches all available products for the store.
    - **Response:**
        
        ```json
        [
          {
            "product_id": "uuid",
            "name": "string",
            "description": "string",
            "price": "float",
            "stock": "int",
            "image_url": "string"
          }
        ]
        ```
        
    - **Notes:**
        - Ensures that only products with stock > 0 are displayed.
2. **Get Product Details (`GET /products/:id`)**
    - **Description:** Fetches details of a specific product by its ID.
    - **Response:**
        
        ```json
        {
          "product_id": "uuid",
          "name": "string",
          "description": "string",
          "price": "float",
          "stock": "int",
          "image_url": "string"
        }
        ```
        
    - **Notes:**
        - Validates that the product exists.
3. **Process Payment (`POST /payments`)**
    - **Description:** Handles the payment process, including creating a transaction and initiating the payment with Wompi.
    - **Request Body:**
        
        ```json
        {
          "product_id": "uuid",
          "customer_name": "string",
          "customer_email": "string",
          "card_number": "string",
          "expiry_date": "string (MM/YY)",
          "cvv": "string",
          "shipping_cost": "float"
        }
        ```
        
    - **Response:**
        
        ```json
        {
          "transaction_id": "uuid",
          "status": "string (PENDING, APPROVED, FAILED)",
          "wompi_transaction_id": "string"
        }
        ```
        
    - **Notes:**
        - Validates the stock of the product before proceeding.
        - Adjusts product stock only after Wompi approves the transaction.
        - Returns a `PENDING` status until Wompi confirms the transaction.
4. **Wompi Webhook (`POST /webhooks/wompi`)**
    - **Description:** Handles transaction updates from Wompi.
    - **Request Body:**
        
        ```json
        {
          "transaction_id": "string",
          "status": "string (PENDING, APPROVED, FAILED)"
        }
        ```
        
    - **Notes:**
        - Updates the status of the transaction in the database.
        - Restores stock if the transaction fails.
        - No response required as this endpoint is triggered by Wompi.
5. **Transaction Status (`GET /transactions/:id`)**
    - **Description:** Fetches the current status of a specific transaction.
    - **Response:**
        
        ```json
        {
          "transaction_id": "uuid",
          "status": "string (PENDING, APPROVED, FAILED)",
          "total": "float",
          "taxes": "float",
          "shipping_cost": "float",
          "customer_name": "string",
          "customer_email": "string",
          "card_type": "string (Visa, MasterCard, etc.)",
          "last_four_digits": "string"
        }
        ```
        
    - **Notes:**
        - Allows customers to manually verify the status of their transaction.
        - Useful for debugging or in case of webhook failures.
---
### **Updated Flow**
1. **Product Page:**
    - Fetches all products from the `GET /products` endpoint.
    - Displays product details using `GET /products/:id`.
2. **Checkout:**
    - Submits payment details via `POST /payments`.
    - Receives transaction status and Wompi transaction ID.
3. **Transaction Status:**
    - If required, clients can poll `GET /transactions/:id` to check the status.
4. **Webhook:**
    - Wompi sends transaction status updates to `POST /webhooks/wompi`.
    - Updates stock if the transaction fails.
---