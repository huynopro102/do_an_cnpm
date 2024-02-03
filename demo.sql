-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 03, 2024 lúc 09:05 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nodejsbasic`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`, `status`) VALUES
(2, 'Túi xách', 1),
(3, 'Áo nam', 1),
(4, 'Áo bà ba', 0),
(6, 'Mũ beret', 1),
(7, 'mũ len', 1),
(8, 'xe tăng', 1),
(9, 'máy bay giấy', 0),
(16, 'giày nam', 1),
(17, 'mũ nam', 1),
(18, 'giày đá banh adidas', 1),
(19, 'áo dài ', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `datausers`
--

CREATE TABLE `datausers` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `datausers`
--

INSERT INTO `datausers` (`id`, `username`, `password`, `email`, `admin`) VALUES
(69, 'tran van d', '$2b$10$KnEj5bIHuGIAngLI1m9vmOyuFcnSX/jZBhnh2hGV1aidZReAhl30S', 'tranvand@gmail.com', 0),
(70, 'admin', '$2b$10$tiYWl2Dcunlybz2S5UW0JuQZiB95Lq.bPGxVQGljs6khF16zcfUxq', 'sodienthoai1230123@gmail.com', 1),
(71, 'nguyen thi a', '$2a$12$fcVdESr21zRSU4QkgYVQ1uTYwHGdOn9Q86kjEJu0zD63H6XANMZ9C', 'nguyenthia@gmail.com', 0),
(72, 'nguyen van d', '$2b$10$drO/YthodvCzo/vvXsHaSeVE9s1V/T7i4LgpDBQqZXiFTkizP3nXa', 'nguyenvand@gmail.com', 0),
(73, 'nguyen thi m', '$2b$10$A51DY/IwjWlMCWsc2Hck/eucyZU/Zgf09XYkpzdV62AcEC7Zh4kK.', 'nguyenthim@gmail.com', 0),
(78, 'nguyenvanl', '$2b$10$kG7sxKsY3H3lQdd027smV.bVpbVhgCMAANizmaH/sQhfdq/F9St9W', 'nguyenvanl@gmail.com', 0),
(79, 'minh ', '$2b$10$mJOeNRsAnPh7IzpQxHDVbew6X3yxK5f2U7MpZgBdBx/c4LFOk6HXq', 'paimon2210@gmail.com', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderinginformation`
--

CREATE TABLE `orderinginformation` (
  `OrderingInfoID` int(11) NOT NULL,
  `OrderID` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `CustomerEmail` varchar(255) NOT NULL,
  `CustomerAddress` varchar(255) NOT NULL,
  `CustomerPhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orderinginformation`
--

INSERT INTO `orderinginformation` (`OrderingInfoID`, `OrderID`, `CustomerName`, `CustomerEmail`, `CustomerAddress`, `CustomerPhone`) VALUES
(4, 73, 'tran van d', 'tranvand@gmail.com', '123 Lê Lợi, Quận 1, TP.Hồ Chí Minh e\n', '1956610064'),
(5, 74, 'tran van d', 'tranvand@gmail.com', '567 Lê Đức Thọ, Quận Gò Vấp, TP.Hồ Chí Minh', '1482144220'),
(6, 75, 'vo tran van ', 'tranvand@gmail.com', '112 Lý Thường Kiệt, Quận 10, TP.Hồ Chí Minh', '5847587769'),
(7, 76, 'nguyen thi ', 'nguyenthia@gmail.com', '616 Trần Hưng Đạo, Quận 10, TP.Hồ Chí Minh', '1532549040'),
(8, 77, 'nguyen van d', 'nguyenvand@gmail.com', '717 Nguyễn Thị Thập, Quận 7, TP.Hồ Chí Minh\n', '2367799715'),
(23, 97, 'nguyen thi ', 'nguyenthia@gmail.com', '456 Đống Đa, Hà Nội', '5324091963'),
(24, 98, 'nguyen thi m1 ', 'nguyenthim@gmail.com', '789 Cầu Giấy, Hà Nội\n', '0615519662'),
(25, 99, 'nguyen van l', 'nguyenvanl@gmail.com', '101 Trần Hưng Đạo, Quận 5, TP.Hồ Chí Minh', '0615519662');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderitem`
--

CREATE TABLE `orderitem` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ProductID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `PricePerUnit` float DEFAULT NULL,
  `TotalPrice` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orderitem`
--

INSERT INTO `orderitem` (`OrderItemID`, `OrderID`, `ProductID`, `Quantity`, `PricePerUnit`, `TotalPrice`) VALUES
(139, 73, 36, 1, 39.03, 39.03),
(140, 73, 37, 1, 5.34, 5.34),
(141, 74, 35, 1, 6.57, 6.57),
(142, 74, 37, 1, 5.34, 5.34),
(143, 74, 38, 1, 22.55, 22.55),
(144, 75, 45, 2, 63.68, 127.36),
(145, 76, 45, 3, 63.68, 191.04),
(146, 77, 40, 2, 1, 2),
(147, 77, 43, 2, 147.89, 295.78),
(148, 77, 44, 1, 80.11, 80.11),
(149, 97, 44, 1, 80.11, 80.11),
(150, 97, 46, 1, 106.81, 106.81),
(151, 97, 47, 1, 115.03, 115.03),
(152, 98, 33, 1, 16.42, 16.42),
(153, 98, 34, 1, 5.26, 5.26),
(154, 98, 35, 1, 6.57, 6.57),
(155, 99, 44, 5, 80.11, 400.55);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `Order_ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `TotalAmount` float DEFAULT NULL,
  `OrderDate` text DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`Order_ID`, `UserID`, `TotalAmount`, `OrderDate`, `Status`) VALUES
(73, 69, 44, ' 21 giờ 38 phút / ngày 27 tháng 12 năm 2023 ', 'chưa xác nhận'),
(74, 69, 33, ' 21 giờ 43 phút / ngày 27 tháng 12 năm 2023 ', 'xác nhận'),
(75, 69, 126, ' 22 giờ 5 phút / ngày 27 tháng 12 năm 2023 ', 'chưa xác nhận'),
(76, 71, 189, ' 22 giờ 11 phút / ngày 27 tháng 12 năm 2023 ', 'xác nhận'),
(77, 72, 376, ' 22 giờ 43 phút / ngày 27 tháng 12 năm 2023 ', 'xác nhận'),
(97, 71, 301, ' 22 giờ 49 phút / ngày 28 tháng 12 năm 2023 ', 'chưa xác nhận'),
(98, 73, 27, ' 14 giờ 19 phút / ngày 31 tháng 12 năm 2023 ', 'chưa xác nhận'),
(99, 78, 400, ' 16 giờ 5 phút / ngày 2 tháng 1 năm 2024 ', 'chưa xác nhận');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` float NOT NULL,
  `sale_price` float DEFAULT 0,
  `image` varchar(200) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `status` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `sale_price`, `image`, `category_id`, `status`) VALUES
(29, 'áo bà ba', 3.25, 0, 'aobaba1.jpg', 4, NULL),
(33, 'áo dài', 16.42, 321, '1702134099453-323829208-aobaba2.png', 19, 1),
(34, 'áo sơ mi nam', 5.26, 0, '1702650377424-874718477-1702233228303-217457278-ao so mi nam.jpg', 3, 1),
(35, 'Mũ lưỡi trai MG STUDIO ', 6.57, 0, '1703063958038-608206566-MÅ© MG STUDIO.jpg', 17, 1),
(36, 'Túi Duffel 4ATHLTS', 39.03, 4000, '1703064596326-795684910-TÃºi Duffel 4ATHLTS.jpg', 2, 1),
(37, 'Landlord Mũ beret Không Vành', 5.34, 4000, '1703065024318-71617753-Landlord MÅ© beret KhÃ´ng VÃ nh.jpg', 6, 1),
(38, 'mũ beret nữ', 22.55, 5000, '1703065525940-813254480-mu-beret-nu-dep.jpg', 6, 1),
(39, 'xe tăng merkava', 400000000, 0, '1702194391247-331677408-xe tang merkava.jpg', 8, 1),
(40, 'máy bay ', 1, 0, '1702195251898-468460426-may bay giay.jpg', 9, 1),
(43, 'Genuine Recycled Woolly Ski Hat ', 147.89, 21, '1703066318598-123135193-mu long cuu.jpg', 7, 1),
(44, 'Giày Vans Old Skool', 80.11, 12, '1702450766291-526626297-giay vans.jpg', 16, 1),
(45, 'adidas X Speedportal .1 FG', 63.68, 0, '1702474647741-198297940-giay adidas.jpg', 18, 1),
(46, 'Giày cầu lông YONEX POWER CUSHION 65 Z2 MOMOTA', 106.81, 0, '1703066829449-234317655-giay cau long.png', 16, 1),
(47, 'Giày Yonex Comfort Z3 Men 2022 ', 115.03, 0, '1703067160451-227768435-GiÃ y Yonex Comfort Z3 Men 2022.jpg', 16, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `datausers`
--
ALTER TABLE `datausers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orderinginformation`
--
ALTER TABLE `orderinginformation`
  ADD PRIMARY KEY (`OrderingInfoID`),
  ADD KEY `OrderID` (`OrderID`);

--
-- Chỉ mục cho bảng `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_ID`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `datausers`
--
ALTER TABLE `datausers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT cho bảng `orderinginformation`
--
ALTER TABLE `orderinginformation`
  MODIFY `OrderingInfoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `orderitem`
--
ALTER TABLE `orderitem`
  MODIFY `OrderItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `orderinginformation`
--
ALTER TABLE `orderinginformation`
  ADD CONSTRAINT `orderinginformation_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`Order_ID`);

--
-- Các ràng buộc cho bảng `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`Order_ID`),
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
