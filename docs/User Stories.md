### **User Stories Evaluation**
1. **Customers view products**
    - **Story:** As a customer, I want to see a list of products with their description, price, and stock availability so that I can choose what to buy.
    - **Fulfillment:**
        - The `Products` entity stores all necessary details about the products (`Name`, `Description`, `Price`, `Stock`).
        - These attributes provide the information required to display products and their availability.
2. **Select and pay for products**
    - **Story:** As a customer, I want to select a product and pay with my credit card to complete my purchase quickly and securely.
    - **Fulfillment:**
        - The relationship between `OrderDetails` and `Products` ensures that customers can select products and specify quantities.
        - The `Transactions` and `Payments` entities handle credit card payments, with attributes such as `Card_Type` and `Last_Four_Digits` ensuring secure processing.
3. **Order summary**
    - **Story:** As a customer, I want to view a summary of my order, including taxes and additional costs, before paying to confirm the charges.
    - **Fulfillment:**
        - The `Transactions` entity includes `Taxes` and `Shipping_Cost` attributes, which, combined with the `OrderDetails` subtotals, enable a clear order summary before payment.
4. **Process transactions with Wompi**
    - **Story:** As a system, I want to create and process transactions using the Wompi API to handle payments securely.
    - **Fulfillment:**
        - The `Transactions` entity includes the `Wompi_Transaction_ID` attribute, which links to Wompi’s API for secure transaction processing.
        - The `Payments` entity tracks payment status (`Payment_Status`) and relevant card details.
5. **Update stock and notify the status**
    - **Story:** As a system, I want to automatically update product stock and display the final status of transactions to keep the store up-to-date.
    - **Fulfillment:**
        - The `OrderDetails` and `Products` relationship allows stock deduction for purchased products.
        - The `Status` attribute in `Transactions` ensures the final transaction state is recorded and displayed.
---