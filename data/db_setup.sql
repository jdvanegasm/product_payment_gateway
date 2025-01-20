-- Drop the database if it already exists
drop database if exists payment_gateway;
create database payment_gateway;

-- Connect to the newly created database
-- \connect payment_gateway

-- Drop the schema if it exists
drop schema if exists public cascade;
create schema public;

-- Define ENUM types for the application
create type transaction_status as enum ('PENDING', 'APPROVED', 'FAILED');
create type card_type as enum ('Visa', 'MasterCard', 'Amex', 'Discover');
create type payment_status as enum ('APPROVED', 'REJECTED');

-- Create the Products table
create table products (
    product_id uuid primary key default gen_random_uuid(),
    name varchar(255) not null,
    description text not null,
    price float not null,
    stock int not null,
    image_url text not null
);

-- Create the Transactions table
create table transactions (
    transaction_id uuid primary key default gen_random_uuid(),
    product_id uuid not null,
    customer_name varchar(255) not null,
    customer_email varchar(255) not null,
    delivery_address varchar(255) not null,
    quantity int not null,
    total float not null,
    taxes float not null,
    shipping_cost float not null,
    status transaction_status not null,
    wompi_transaction_id varchar(255) unique not null,
    card_type card_type not null,
    last_four_digits varchar(4) not null,
    payment_status payment_status not null,
    constraint fk_transaction_product foreign key (product_id) references products (product_id)
        on delete cascade
        on update cascade
);