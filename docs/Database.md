### **Entities**
1. **Products**
    - **Reason for inclusion:** Displays products in the store and tracks inventory after a sale.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each product.
        - `Name` (String): Name of the product.
        - `Description` (Text): Description of the product.
        - `Price` (Decimal): Price of the product.
        - `Stock` (Integer): Available quantity of the product.
        - `Image_URL` (Text): URL for the product image.
2. **Transactions**
    - **Reason for inclusion:** Represents a customer's purchase of a product and integrates with Wompi for payment processing.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each transaction.
        - `Product_ID` (UUID, Foreign Key -> Products.ID): Reference to the purchased product.
        - `Customer_Name` (String): Full name of the customer making the transaction.
        - `Customer_Email` (String): Email address of the customer making the transaction.
        - `Delivery_Address` (String): Address where the product will be delivered.
        - `Quantity` (Integer): Number of units of the product being purchased.
        - `Total` (Decimal): Total transaction amount.
        - `Taxes` (Decimal): Taxes applied to the transaction.
        - `Shipping_Cost` (Decimal): Shipping cost for the transaction.
        - `Status` (Enum: PENDING, APPROVED, FAILED): Current status of the transaction.
        - `Wompi_Transaction_ID` (String, Unique): Unique transaction identifier from Wompi.
        - `Card_Type` (Enum: Visa, MasterCard, Amex, Discover): Type of card used for the payment.
        - `Last_Four_Digits` (String): Last four digits of the card used.
        - `Payment_Status` (Enum: APPROVED, REJECTED): Status of the payment.
---
### **Relationships**
1. **Products ↔ Transactions**
    - **Type:** One-to-Many.
    - **Description:** A product can be involved in multiple transactions (e.g., multiple purchases by different customers), but each transaction is tied to a single product.
    - **Implementation:** Each transaction includes a reference to a single product, without requiring a Many-to-Many relationship.
---
### **Rationale for the Updated Design**
1. **Focused Flow:**
    - Each transaction represents a single product purchase and includes the delivery details, ensuring the entire flow is encapsulated in one table.
2. **Integrated Delivery Information:**
    - The `Delivery_Address` field allows capturing and managing delivery-specific details directly within the transaction, aligning with the project requirements.
3. **Removed Redundancies:**
    - No additional tables for orders or customers, as all relevant data is stored in `Transactions`.
4. **Simplified Relationships:**
    - The One-to-Many relationship between `Products` and `Transactions` remains straightforward and supports the business flow directly.
---