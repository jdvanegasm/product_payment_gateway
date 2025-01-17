drop database if exists payment_gateway;
create database payment_gateway;

-- \connect payment_gateway

drop schema if exists public cascade;
create schema public;

create type transaction_status as enum ('PENDING', 'APPROVED', 'FAILED');
create type card_type as enum ('Visa', 'MasterCard', 'Amex', 'Discover');
create type payment_status as enum ('APPROVED', 'REJECTED');

create table customers (
	customer_id uuid primary key default gen_random_uuid(),
	name varchar (255) not null,
	email varchar (255) unique not null
);

create table products (
	product_id uuid primary key default gen_random_uuid(),
	name varchar (255) not null,
	description text not null,
	price float not null,
	stock int not null,
    image_url text not null
);

create table orders (
	order_id uuid primary key default gen_random_uuid(),
	customer_id uuid not null,
	created_at timestamp default now(),
	-- foreign key definition
	constraint fk_orders_customer_id foreign key (customer_id)
		references customers (customer_id)
			on delete cascade
			on update cascade
);

create table order_details (
	details_id uuid primary key default gen_random_uuid(),
	order_id uuid not null,
	product_id uuid not null,
	quantity int not null,
	subtotal float not null,
	-- foreign keys definition
	constraint fk_details_order_id foreign key (order_id)
		references orders (order_id)
		on delete cascade
		on update cascade,
	constraint fk_details_product_id foreign key (product_id)
		references products (product_id)
		on delete cascade
		on update cascade
);

create table transactions (
	transaction_id uuid primary key default gen_random_uuid(),
	order_id uuid not null,
	total float not null,
	taxes float not null,
	shipping_cost float not null,
	status transaction_status not null,
	wompi_transaction_id varchar (255) unique not null,
	-- foreign keys definition
	constraint fk_transactions_order_id foreign key (order_id)
		references orders (order_id)
		on delete cascade
		on update cascade
);

create table payments (
	payment_id uuid primary key default gen_random_uuid(),
	transaction_id uuid not null,
	card_type card_type not null,
	last_four_digits varchar (4) not null,
	payment_status payment_status null,
	-- foreign keys definition
	constraint fk_payments_transaction_id foreign key (transaction_id)
		references transactions (transaction_id)
		on delete cascade
		on update cascade
);