### **Entities and Relationships**

1. **Products**
    - **Reason for inclusion:** Essential for displaying products in the store and managing inventory after sales.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each product.
        - `Name` (String): Name of the product.
        - `Description` (Text): Description of the product.
        - `Price` (Decimal): Price of the product.
        - `Stock` (Integer): Available quantity of the product.
2. **Customers**
    - **Reason for inclusion:** Necessary to identify customers and associate them with orders and transactions.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each customer.
        - `Name` (String): Name of the customer.
        - `Email` (String, Unique): Unique email address for the customer.
3. **Orders**
    - **Reason for inclusion:** Links customers to the purchased products and is key to the business flow.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each order.
        - `Customer_ID` (UUID, Foreign Key -> Customers.ID): Reference to the customer who placed the order.
        - `Created_At` (Timestamp): The date and time the order was created.
4. **OrderDetails**
    - **Reason for inclusion:** Provides details on what products and quantities are included in an order.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each order detail.
        - `Order_ID` (UUID, Foreign Key -> Orders.ID): Reference to the associated order.
        - `Product_ID` (UUID, Foreign Key -> Products.ID): Reference to the product in the order.
        - `Quantity` (Integer): Number of units of the product in the order.
        - `Subtotal` (Decimal): Total cost for the product in the order.
5. **Transactions**
    - **Reason for inclusion:** Represents payments made through Wompi, including their status.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each transaction.
        - `Order_ID` (UUID, Foreign Key -> Orders.ID): Reference to the associated order.
        - `Total` (Decimal): Total transaction amount.
        - `Taxes` (Decimal): Taxes applied to the transaction.
        - `Shipping_Cost` (Decimal): Shipping cost for the transaction.
        - `Status` (Enum: PENDING, APPROVED, etc.): Current status of the transaction.
        - `Wompi_Transaction_ID` (String, Unique): Unique transaction identifier from Wompi.
6. **Payments**
    - **Reason for inclusion:** Stores relevant information about the payment method.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each payment.
        - `Transaction_ID` (UUID, Foreign Key -> Transactions.ID): Reference to the associated transaction.
        - `Card_Type` (Enum: Visa, MasterCard, etc.): Type of card used for the payment.
        - `Last_Four_Digits` (String): Last four digits of the card used.
        - `Payment_Status` (Enum: APPROVED, REJECTED): Status of the payment.
---
### **Relationships**
- **Products ↔ OrderDetails:** One-to-Many. A product can appear in multiple order details.
- **Customers ↔ Orders:** One-to-Many. A customer can place multiple orders.
- **Orders ↔ OrderDetails:** One-to-Many. An order can include multiple order details.
- **Orders ↔ Transactions:** One-to-One. Each order is associated with a single transaction.
- **Transactions ↔ Payments:** One-to-One. Each transaction corresponds to one payment.
---