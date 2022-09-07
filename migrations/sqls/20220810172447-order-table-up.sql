CREATE TABLE orders(
id Serial Primary key,
users_id int REFERENCES users(id),
FOREIGN KEY (users_id) REFERENCES users(id)

);
CREATE TABLE orders_products(
id int REFERENCES orders(id),
PRIMARY KEY (id),
status Boolean,
product_id int REFERENCES product(id),
FOREIGN KEY (product_id) REFERENCES product(id),
quantity int
);