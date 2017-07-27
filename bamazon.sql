CREATE DATABASE bamazon_db;

Use bamazon_db;

CREATE TABLE product (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2),
	stock_Quantity INTEGER(10),
	PRIMARY KEY (item_id)
);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Romeo & Juliette", "Book", 12.99, 10);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Mathematic1", "Book", 29.99, 4);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Sneakers NIKE", "Shoes", 70.99, 2);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Sneakers ADIDAS", "Shoes", 79.99, 2);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Fake Louboutin", "Shoes", 99.99, 3);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Mini BMW", "Car", 499.99, 6);

INSERT INTO product ( product_name,department_name,price,stock_quantity)
VALUES ("Mini Porsche", "Car", 699.99, 3);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Mini Ferrari", "Car", 999.99, 3);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("iPhone7", "Telephone", 699.99, 3);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Samsung4", "Telephone", 499.99, 5);

INSERT INTO product (product_name,department_name,price,stock_quantity)
VALUES ("Nokia3210", "Telephone", 99.99, 9)

SELECT * FROM product