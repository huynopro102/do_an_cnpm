Create Database ql_ban_hang
use ql_ban_hang

Create table category
(
    id int primary key AUTO_INCREMENT,
    name varchar(100) NOT NULL UNIQUE,
    status tinyint default '1'
);

Create table product
(
    id int primary key AUTO_INCREMENT ,
    name varchar(150) NOT NULL UNIQUE ,
    price float NOT NULL ,
    sale_price float default '0',
    image varchar(200) null ,
    category_id int NOT NULL ,
    status tinyint default '1' ,
    FOREIGN KEY (category_id) REFERENCES category(id)
);
-- Tạo bảng user
CREATE TABLE users
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('admin', 'user') DEFAULT 'user',
    status TINYINT DEFAULT 1
);

-- Tạo bảng order
CREATE TABLE orders
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    total_amount FLOAT NOT NULL,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- Tạo bảng order_item
CREATE TABLE order_item
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_per_unit FLOAT NOT NULL,
    total_amount FLOAT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES order(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
insert into category(name,status) values
("Túi xách",1),
("Áo nam",1),
("Áo bà ba",0),
("Quần bò",0),
("Mũ beret",1),
("Mũ lông cừu",0);

INSERT INTO user (username, password, email, role, status)
VALUES
  ('user1', 'password1', 'user1@example.com', 'user', 1),
  ('user2', 'password2', 'user2@example.com', 'user', 1),
  ('user3', 'password3', 'user3@example.com', 'user', 1),
  ('user4', 'password4', 'user4@example.com', 'user', 1),
  ('user5', 'password5', 'user5@example.com', 'user', 1),
  ('user6', 'password6', 'user6@example.com', 'user', 1),
  ('user7', 'password7', 'user7@example.com', 'user', 1),
  ('user8', 'password8', 'user8@example.com', 'user', 1),
  ('user9', 'password9', 'user9@example.com', 'user', 1),
  ('user10', 'password10', 'user10@example.com', 'user', 1),
  ('user11', 'password11', 'user11@example.com', 'user', 1),
  ('user12', 'password12', 'user12@example.com', 'user', 1),
  ('user13', 'password13', 'user13@example.com', 'user', 1),
  ('user14', 'password14', 'user14@example.com', 'user', 1),
  ('user15', 'password15', 'user15@example.com', 'user', 0),
  ('user16', 'password16', 'user16@example.com', 'user', 1),
  ('user17', 'password17', 'user17@example.com', 'user', 1),
  ('user18', 'password18', 'user18@example.com', 'user', 0),
  ('user19', 'password19', 'user19@example.com', 'user', 1),
  ('user20', 'password20', 'user20@example.com', 'user', 1),
  ('user21', 'password21', 'user21@example.com', 'user', 1),
  ('user22', 'password22', 'user22@example.com', 'user', 0),
  ('user23', 'password23', 'user23@example.com', 'user', 1),
  ('user24', 'password24', 'user24@example.com', 'user', 1),
  ('user25', 'password25', 'user25@example.com', 'user', 1),
  ('user26', 'password26', 'user26@example.com', 'user', 1),
  ('user27', 'password27', 'user27@example.com', 'user', 1),
  ('user28', 'password28', 'user28@example.com', 'user', 1),
  ('user29', 'password29', 'user29@example.com', 'user', 1),
  ('user30', 'password30', 'user30@example.com', 'user', 1);
  -- Túi xách
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Túi xách thời trang A', 50.0, 0, 'bag1.jpg', 1, 1),
  ('Túi xách thời trang B', 45.0, 0, 'bag2.jpg', 1, 1),
  ('Túi xách thời trang C', 55.0, 0, 'bag3.jpg', 1, 1);

-- Áo nam
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Áo polo nam X', 30.0, 0, 'shirt1.jpg', 2, 1),
  ('Áo sơ mi nam Y', 35.0, 0, 'shirt2.jpg', 2, 1),
  ('Áo thun nam Z', 25.0, 0, 'shirt3.jpg', 2, 1);

-- Áo bà ba
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Áo bà ba mùa xuân', 40.0, 0, 'aba1.jpg', 3, 0),
  ('Áo bà ba hè', 38.0, 0, 'aba2.jpg', 3, 0);

-- Quần bò
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Quần bò dài nam', 55.0, 0, 'jeans1.jpg', 4, 0),
  ('Quần bò ngắn nam', 45.0, 0, 'jeans2.jpg', 4, 0);

-- Mũ beret
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Mũ beret thời trang A', 20.0, 0, 'beret1.jpg', 5, 1),
  ('Mũ beret thời trang B', 18.0, 0, 'beret2.jpg', 5, 1),
  ('Mũ beret thời trang C', 22.0, 0, 'beret3.jpg', 5, 1);

-- Mũ lông cừu
INSERT INTO product (name, price, sale_price, image, category_id, status)
VALUES
  ('Mũ lông cừu đỏ', 25.0, 0, 'sheep_hat1.jpg', 6, 0),
  ('Mũ lông cừu trắng', 28.0, 0, 'sheep_hat2.jpg', 6, 0),
  ('Mũ lông cừu hồng', 23.0, 0, 'sheep_hat3.jpg', 6, 0);
  
  
-- Order cho user 1
INSERT INTO `order` (user_id, order_date, total_amount, status)
VALUES (1, '2023-12-01 10:00:00', 120.0, 'completed');

-- Order cho user 2
INSERT INTO `order` (user_id, order_date, total_amount, status)
VALUES (2, '2023-12-02 12:30:00', 85.0, 'completed');

-- Order cho user 3
INSERT INTO `order` (user_id, order_date, total_amount, status)
VALUES (3, '2023-12-03 15:45:00', 200.0, 'pending');


-- Order item cho order 1
INSERT INTO `order_item` (order_id, product_id, quantity, price_per_unit, total_amount)
VALUES (1, 1, 2, 50.0, 100.0),
       (1, 3, 1, 55.0, 55.0);

-- Order item cho order 2
INSERT INTO `order_item` (order_id, product_id, quantity, price_per_unit, total_amount)
VALUES (2, 2, 1, 35.0, 35.0),
       (2, 4, 3, 45.0, 135.0);

-- Order item cho order 3
INSERT INTO `order_item` (order_id, product_id, quantity, price_per_unit, total_amount)
VALUES (3, 5, 2, 20.0, 40.0),
       (3, 6, 1, 28.0, 28.0);

