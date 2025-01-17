-- Test valid data insertion
insert into customers (name, email) values ('John Doe', 'john.doe@example.com');
insert into products (name, description, price, stock, image_url) 
values ('Laptop', 'High-end gaming laptop', 1500.00, 10, 'https://example.com/laptop.jpg');

-- Test uniqueness constraint (should fail)
begin;
insert into customers (name, email) values ('Jane Doe', 'john.doe@example.com'); -- Duplicate email
rollback;

-- Test foreign key relationships (should pass)
insert into orders (customer_id) 
values ((select customer_id from customers where email = 'john.doe@example.com'));

-- Test foreign key violation (should fail)
begin;
insert into order_details (order_id, product_id, quantity, subtotal) 
values ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 1, 1500.00); -- Invalid foreign keys
rollback;

-- Test ENUM type constraint (should fail)
begin;
insert into transactions (order_id, total, taxes, shipping_cost, status, wompi_transaction_id) 
values (
	(select order_id from orders limit 1), 
	2000.00, 
	200.00, 
	50.00, 
	'INVALID_STATUS', -- Invalid ENUM value
	'1234567890');
rollback;

-- Test cascading delete (should pass)
delete from customers where email = 'john.doe@example.com';

-- Test upper limit for values
insert into products (name, description, price, stock, image_url) 
values ('Ultra HD TV', 'Large 4K TV', 99999999.99, 2147483647, 'https://example.com/ultra_hd_tv.jpg');

-- Test negative values (should fail)
begin;
insert into products (name, description, price, stock, image_url) 
values ('Broken Item', 'Should fail', -1, -1, 'https://example.com/broken_item.jpg'); -- Negative values
rollback;

-- Test uniqueness for wompi_transaction_id (should fail)
begin;
insert into transactions (order_id, total, taxes, shipping_cost, status, wompi_transaction_id) 
values (
	(select order_id from orders limit 1), 
	2000.00, 
	200.00, 
	50.00, 
	'PENDING', 
	'1234567890'); -- Duplicate Wompi transaction ID
rollback;