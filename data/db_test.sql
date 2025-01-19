-- Test valid data insertion
insert into products (name, description, price, stock, image_url) 
values ('Laptop', 'High-end gaming laptop', 1500.00, 10, 'https://example.com/laptop.jpg');

-- Test valid transaction insertion
insert into transactions (customer_name, customer_email, total, taxes, shipping_cost, status, wompi_transaction_id, card_type, last_four_digits, payment_status) 
values (
    'John Doe', 
    'john.doe@example.com', 
    2000.00, 
    200.00, 
    50.00, 
    'PENDING', 
    'wompi_tx_123456', 
    'Visa', 
    '1234', 
    'APPROVED'
);

-- Test uniqueness constraint for wompi_transaction_id (should fail)
begin;
insert into transactions (customer_name, customer_email, total, taxes, shipping_cost, status, wompi_transaction_id, card_type, last_four_digits, payment_status) 
values (
    'Jane Doe', 
    'jane.doe@example.com', 
    3000.00, 
    300.00, 
    75.00, 
    'PENDING', 
    'wompi_tx_123456', -- Duplicate Wompi transaction ID
    'MasterCard', 
    '5678', 
    'REJECTED'
);
rollback;

-- Test ENUM type constraint (should fail)
begin;
insert into transactions (customer_name, customer_email, total, taxes, shipping_cost, status, wompi_transaction_id, card_type, last_four_digits, payment_status) 
values (
    'John Smith', 
    'john.smith@example.com', 
    1500.00, 
    150.00, 
    40.00, 
    'INVALID_STATUS', -- Invalid ENUM value
    'wompi_tx_invalid_enum', 
    'Amex', 
    '9012', 
    'APPROVED'
);
rollback;

-- Test cascading delete (simulate customer deletion)
delete from transactions where customer_email = 'john.doe@example.com';

-- Test upper limit for product values
insert into products (name, description, price, stock, image_url) 
values ('Ultra HD TV', 'Large 4K TV', 99999999.99, 2147483647, 'https://example.com/ultra_hd_tv.jpg');

-- Test negative values for product attributes (should fail)
begin;
insert into products (name, description, price, stock, image_url) 
values ('Broken Item', 'Should fail', -1.00, -1, 'https://example.com/broken_item.jpg'); -- Negative values
rollback;

-- Test multiple transactions for the same product
insert into transactions (customer_name, customer_email, total, taxes, shipping_cost, status, wompi_transaction_id, card_type, last_four_digits, payment_status) 
values (
    'Alice Doe', 
    'alice.doe@example.com', 
    2500.00, 
    250.00, 
    60.00, 
    'APPROVED', 
    'wompi_tx_123457', 
    'Discover', 
    '3456', 
    'APPROVED'
);