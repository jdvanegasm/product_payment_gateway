#### **Entities**
1. **Products**
    - **Reason for inclusion:** Displays products in the store and tracks inventory after a sale.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each product.
        - `Name` (String): Name of the product.
        - `Description` (Text): Description of the product.
        - `Price` (Decimal): Price of the product.
        - `Stock` (Integer): Available quantity of the product.
        - `Image_URL` (Text): URL for the product image.
2. **Transaction**
    - **Reason for inclusion:** Represents a customer's purchase of a product and integrates with Wompi for payment processing.
    - **Attributes:**
        - `ID` (UUID, Primary Key): Unique identifier for each transaction.
        - `Product_ID` (UUID, Foreign Key -> Products.ID): Reference to the purchased product.
        - `Customer_Name` (String): Full name of the customer making the transaction.
        - `Customer_Email` (String): Email address of the customer making the transaction.
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
#### **Relationships**
1. **Products ↔ Transactions**
    - **Type:** One-to-Many.
    - **Description:** A product can be involved in multiple transactions (e.g., multiple purchases by different customers), but each transaction is tied to a single product.
    - **Implementation:** This simplifies the relationship, as each transaction involves one product directly, without requiring a Many-to-Many intermediary.
---
#### **Rationale for the Simplified Design**
1. **Focused Flow:**
    - Each transaction corresponds to a single product purchase, aligning directly with the flow where the customer selects a product, proceeds to payment, and completes the purchase.
2. **Removed Redundancies:**
    - `Orders` and `OrderDetails` were removed because transactions inherently encapsulate the concept of orders. For the current use case, orders are not necessary.
3. **Integrated Customer Information:**
    - Storing `Customer_Name` and `Customer_Email` directly in `Transactions` eliminates the need for a `Customers` table while still capturing essential information.
4. **Simplified Relationship:**
    - The One-to-Many relationship between `Products` and `Transactions` directly supports the current business requirement and avoids the complexity of managing multiple products within a single transaction.