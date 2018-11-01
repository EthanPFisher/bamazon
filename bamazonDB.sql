DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(60) NULL,
  department_name VARCHAR(60) NULL,
  price decimal(10, 2) NULL,
  stock_quantity int null,
  PRIMARY KEY (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("A single shoe", "Clothing", 5.50, 200), ("OLED TV", "Electronics", 499.99, 60), ("Someone's wallet", "Accessories", 10.00, 3), ("Empty box", "Furniture", 5.00, 20), ("The literal moon", "Food", 0.00, 1), ("Item 6", "Clothing", 55.25, 67), ("Item 7", "Electronics", 1459.59, 10), ("Item 8", "Accessories", 80.00, 20), ("Item 9", "Furniture", 74.95, 14), ("Item 10", "Food", 14.66, 40);

--SELECT * FROM bamazon;
