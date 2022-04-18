-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2022 at 03:20 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agrochain`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins_details`
--

CREATE TABLE `admins_details` (
  `ADMIN_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_ID` varchar(38) NOT NULL,
  `ADMIN_POSSITION` char(15) NOT NULL,
  `ADMIN_SALLERY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cart_details`
--

CREATE TABLE `cart_details` (
  `CART_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL,
  `CART_QUANTITY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart_details`
--

INSERT INTO `cart_details` (`CART_ID`, `USER_ID`, `PRODUCT_ID`, `CART_QUANTITY`) VALUES
('fcaa93cd-84e3-11ec-9c28-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', '12c374ee-2f73-11ec-84a8-38d5470f2067', 2),
('fdd990d0-84e3-11ec-9c28-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', '37ca67bd-6e4c-11ec-bee0-38d5470f2067', 1);

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `CHARACTER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `CHARACTER_NAME` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `characters_map`
--

CREATE TABLE `characters_map` (
  `CHARACTER_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `HISTORY_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `RESTAURENT_ID` varchar(38) NOT NULL,
  `HISTORY_ORDER_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ORDER_CONFRIMED_BY` varchar(38) NOT NULL,
  `ORDER_DELIVERY_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `history_map`
--

CREATE TABLE `history_map` (
  `HISTORY_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL,
  `HISTORY_ORDER_QUANTITY` int(11) NOT NULL,
  `HISTORY_ORDER_DISCOUNT` double(3,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ORDER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `RESRESTAURENT_ID` varchar(38) NOT NULL,
  `ORDER_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ORDER_ID`, `RESRESTAURENT_ID`, `ORDER_DATE`) VALUES
('04d15d5c-6e57-11ec-bee0-38d5470f2067', 'cb49909d-3f20-11ec-b729-38d5470f2067', '2022-01-05 18:40:56'),
('0fbb5a6c-6e59-11ec-bee0-38d5470f2067', 'cb49909d-3f20-11ec-b729-38d5470f2067', '2022-01-05 18:55:33'),
('4a310b7b-6e57-11ec-bee0-38d5470f2067', 'cb49909d-3f20-11ec-b729-38d5470f2067', '2022-01-05 18:42:52'),
('ace58009-716f-11ec-9d3f-38d5470f2067', 'cb49909d-3f20-11ec-b729-38d5470f2067', '2022-01-09 17:14:59');

-- --------------------------------------------------------

--
-- Table structure for table `orders_map`
--

CREATE TABLE `orders_map` (
  `ORDER_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL,
  `ORDER_QUANTITY` int(11) NOT NULL,
  `ORDER_DISCOUNT` double(3,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders_map`
--

INSERT INTO `orders_map` (`ORDER_ID`, `PRODUCT_ID`, `ORDER_QUANTITY`, `ORDER_DISCOUNT`) VALUES
('04d15d5c-6e57-11ec-bee0-38d5470f2067', '4d73bd72-2f7a-11ec-84a8-38d5470f2067', 50, 0.00),
('04d15d5c-6e57-11ec-bee0-38d5470f2067', 'fcd60b88-2f57-11ec-84a8-38d5470f2067', 10, 1.00),
('04d15d5c-6e57-11ec-bee0-38d5470f2067', '37ca67bd-6e4c-11ec-bee0-38d5470f2067', 2, 0.00),
('4a310b7b-6e57-11ec-bee0-38d5470f2067', '12c374ee-2f73-11ec-84a8-38d5470f2067', 5, 1.00),
('4a310b7b-6e57-11ec-bee0-38d5470f2067', '37ca67bd-6e4c-11ec-bee0-38d5470f2067', 6, 0.00),
('4a310b7b-6e57-11ec-bee0-38d5470f2067', '4d73bd72-2f7a-11ec-84a8-38d5470f2067', 7, 0.00),
('0fbb5a6c-6e59-11ec-bee0-38d5470f2067', '12c374ee-2f73-11ec-84a8-38d5470f2067', 4, 1.00),
('ace58009-716f-11ec-9d3f-38d5470f2067', '37ca67bd-6e4c-11ec-bee0-38d5470f2067', 5, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `products_details`
--

CREATE TABLE `products_details` (
  `PRODUCT_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `ADMIN_ID` varchar(38) NOT NULL,
  `PRODUCT_NAME_EN` varchar(20) NOT NULL,
  `PRODUCT_NAME_BN` varchar(20) DEFAULT NULL,
  `PRODUCT_IN_STOCK_QUANTITY` int(11) DEFAULT 0,
  `PRODUCT_MEASUREMENT_UNIT` char(10) DEFAULT NULL,
  `PRODUCT_AGRO_PRICE` double(10,4) DEFAULT 0.0000,
  `PRODUCT_DISCOUNT` double(3,2) DEFAULT 0.00,
  `PRODUCT_IMG` varchar(50) NOT NULL,
  `IS_AVAILABLE` tinyint(1) DEFAULT 1,
  `PRODUCT_DETAILS` text DEFAULT NULL,
  `ADDED_AT` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products_details`
--

INSERT INTO `products_details` (`PRODUCT_ID`, `ADMIN_ID`, `PRODUCT_NAME_EN`, `PRODUCT_NAME_BN`, `PRODUCT_IN_STOCK_QUANTITY`, `PRODUCT_MEASUREMENT_UNIT`, `PRODUCT_AGRO_PRICE`, `PRODUCT_DISCOUNT`, `PRODUCT_IMG`, `IS_AVAILABLE`, `PRODUCT_DETAILS`, `ADDED_AT`) VALUES
('12c374ee-2f73-11ec-84a8-38d5470f2067', '', 'Peanut', 'চিনাবাদাম', 500, 'KG', 200.0000, 1.00, 'image_1634493182413.jpg', 1, 'The peanut, also known as the groundnut, goober, pindar or monkey nut, and taxonomically classified as Arachis hypogaea, is a legume crop grown mainly for its edible seeds. It is widely grown in the tropics and subtropics, being important to both small and large commercial producers.', '2022-02-08 14:42:04'),
('37ca67bd-6e4c-11ec-bee0-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'Cheese', 'পনির', 200, 'kg', 200.0000, 0.00, 'image_1641403417416.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('4d73bd72-2f7a-11ec-84a8-38d5470f2067', '', 'Mango', 'আম', 500, 'KG', 150.0000, 0.00, 'image_1634496287348.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('53bf147f-8f4a-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 't', 't', 4, 't', 0.0000, 4.00, 'image_1645030993696.png', 1, '44', '2022-02-16 17:03:13'),
('5f94c9ea-7c73-11ec-9de4-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'shorma', 'shorma', 11111, 'mosha', 11.0000, 0.00, 'image_1642959550759.PNG', 1, '1vrvrrvvrr', '2022-02-08 14:42:04'),
('7736c80c-8f4a-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'y', 'y', 5, 'y', 5.0000, 0.00, 'image_1645031053200.png', 1, 'y5', '2022-02-16 17:04:13'),
('a3cb60a5-2f55-11ec-84a8-38d5470f2067', '', 'Chicken', 'মুরগি', 60, 'KG', 275.0000, 0.00, 'image_1634480540830.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('a4be1b6a-8f4a-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'R', 'R', 3, 'R', 3.0000, 3.00, 'image_1645031129585.PNG', 1, 'R', '2022-02-16 17:05:29'),
('b1201c76-2f7a-11ec-84a8-38d5470f2067', '', 'Lengra Mango', 'লেংরা আম', 69, 'KG', 175.0000, 1.00, 'image_1634496454578.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('bb7f937d-6e49-11ec-bee0-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'Shawarma', 'শর্মা ', 2000, 'Piece', 60.0000, 0.00, 'image_1641402349893.png', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('c928384a-8f4a-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'ER', 'ER', 33, '33', 33.0000, 0.00, 'image_1645031190679.png', 1, '33R', '2022-02-16 17:06:30'),
('ca5e9d87-8f47-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', '323', '3', 323, '3', 33.0000, 0.00, 'image_1645029904223.png', 1, '233', '2022-02-16 16:45:04'),
('cf300f0e-6e4b-11ec-bee0-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'potato', 'আলু', 500, 'kg', 35.0000, 0.00, 'image_1641403241919.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('d8496008-8fe6-11ec-aac3-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'test', 'test', 33, '3', 45.0000, 0.00, 'image_1645098216339.png', 1, 'test', '2022-02-17 11:43:36'),
('ed10e30a-8f49-11ec-9107-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'r', 'r', 2, 'r', 2.0000, 0.00, 'image_1645030821424.PNG', 0, 'r', '2022-02-16 17:00:21'),
('ef769b1a-2f5a-11ec-84a8-38d5470f2067', '', 'Cabbage', 'বাঁধাকপি', 0, 'Unit', 255.0000, 0.00, 'image_1634482815268.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('f6471b10-2f56-11ec-84a8-38d5470f2067', '', 'Banana', 'কলা', 400, 'Dozon', 8.0000, 0.00, 'image_1634481108714.png', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04'),
('fcd60b88-2f57-11ec-84a8-38d5470f2067', '', 'Egg', 'ডিম', 200, 'Dozon', 120.0000, 1.00, 'image_1634481549210.jpg', 1, 'Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep.', '2022-02-08 14:42:04');

-- --------------------------------------------------------

--
-- Table structure for table `restaurents_details`
--

CREATE TABLE `restaurents_details` (
  `RESTAURENT_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_ID` varchar(38) NOT NULL,
  `RESTAURENTS_NAME` varchar(38) NOT NULL,
  `RESTAURENTS_ADDRESS` text NOT NULL,
  `RESTAURENTS_ABOUT` text NOT NULL,
  `RESTAURENTS_WEBSITE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurents_details`
--

INSERT INTO `restaurents_details` (`RESTAURENT_ID`, `USER_ID`, `RESTAURENTS_NAME`, `RESTAURENTS_ADDRESS`, `RESTAURENTS_ABOUT`, `RESTAURENTS_WEBSITE`) VALUES
('cb49909d-3f20-11ec-b729-38d5470f2067', 'f0efa07c-3425-11ec-971f-38d5470f2067', 'Banana heaven', 'Chicken mountain', 'If you can imagine an banana and chicken dish, this restaurent have it', 'www.chickenlovesbanana.com');

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--

CREATE TABLE `seasons` (
  `SEASON_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `SEASON_NAME` varchar(15) DEFAULT NULL,
  `SEASON_DESCRIPTION` text DEFAULT NULL,
  `SEASON_START_DATE` text DEFAULT NULL,
  `SEASON_END_DATE` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seasons`
--

INSERT INTO `seasons` (`SEASON_ID`, `SEASON_NAME`, `SEASON_DESCRIPTION`, `SEASON_START_DATE`, `SEASON_END_DATE`) VALUES
('45bd0120-97eb-11ec-a8ce-38d5470f2067', 'Winter', 'Winter is the coldest season of the year in polar and temperate zones. It occurs between autumn and spring. winter occurs when a hemisphere is oriented away from the Sun. ', 'Thu Dec 15 2022 22:34:32 GMT+0600 (Bangladesh Standard Time)', 'Tue Feb 15 2022 22:34:32 GMT+0600 (Bangladesh Standard Time)'),
('81008b7f-97ec-11ec-a8ce-38d5470f2067', 'Spring', 'Spring, also known as springtime, is one of the four temperate seasons, succeeding winter and preceding summer. There are various technical definitions of spring, but local usage of the term varies according to local climate, cultures and customs. ', 'Wed Feb 16 2022 22:42:50 GMT+0600 (Bangladesh Standard Time)', 'Wed Apr 13 2022 22:42:50 GMT+0600 (Bangladesh Standard Time)'),
('9a12e04a-97ec-11ec-a8ce-38d5470f2067', 'Summer', 'Summer is the hottest of the four temperate seasons, occurring after spring and before autumn. At or centred on the summer solstice, the earliest sunrise and latest sunset occurs, daylight hours are longest and dark hours are shortest, with day lengt', 'Fri Apr 15 2022 22:44:15 GMT+0600 (Bangladesh Standard Time)', 'Tue Jun 14 2022 22:44:15 GMT+0600 (Bangladesh Standard Time)');

-- --------------------------------------------------------

--
-- Table structure for table `seasons_map`
--

CREATE TABLE `seasons_map` (
  `SEASON_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `TAG_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `TAG_NAME` varchar(15) NOT NULL,
  `TAG_DESCRIPTION` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`TAG_ID`, `TAG_NAME`, `TAG_DESCRIPTION`) VALUES
('04b5fbee-8fd9-11ec-aac3-38d5470f2067', 'Organic', 'Organic food is food and drinks produced by methods complying with the standards of organic farming. Standards vary worldwide, but organic farming features practices that cycle resources, promote ecological balance, and conserve biodiversity.'),
('82cc7353-8fd8-11ec-aac3-38d5470f2067', 'Fresh', 'The product is fresh and only a few years old. Do not get deceived by the odor, it is for keeping other people away from your food.');

-- --------------------------------------------------------

--
-- Table structure for table `tags_map`
--

CREATE TABLE `tags_map` (
  `TAG_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tags_map`
--

INSERT INTO `tags_map` (`TAG_ID`, `PRODUCT_ID`) VALUES
('04b5fbee-8fd9-11ec-aac3-38d5470f2067', 'd8496008-8fe6-11ec-aac3-38d5470f2067'),
('82cc7353-8fd8-11ec-aac3-38d5470f2067', 'd8496008-8fe6-11ec-aac3-38d5470f2067');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `USER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_NAME` varchar(30) NOT NULL,
  `USER_PASSWORD` text NOT NULL,
  `USER_TYPE` char(15) DEFAULT 'CAT',
  `USER_PHONE` text NOT NULL,
  `USER_EMAIL` text NOT NULL,
  `USER_JOIN_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`USER_ID`, `USER_NAME`, `USER_PASSWORD`, `USER_TYPE`, `USER_PHONE`, `USER_EMAIL`, `USER_JOIN_DATE`) VALUES
('f0efa07c-3425-11ec-971f-38d5470f2067', 'Mosha', '$2b$10$PiCAKk1iQLhozQovq9qVo.R5OMwMInvwzAzG5FjnWSo4oxq9WfODa', 'AVATER', '12345', '12345', '2021-10-23 17:23:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`CHARACTER_ID`);

--
-- Indexes for table `characters_map`
--
ALTER TABLE `characters_map`
  ADD KEY `CHARACTER_ID` (`CHARACTER_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`HISTORY_ID`),
  ADD KEY `ORDER_CONFRIMED_BY` (`ORDER_CONFRIMED_BY`);

--
-- Indexes for table `history_map`
--
ALTER TABLE `history_map`
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`),
  ADD KEY `HISTORY_ID` (`HISTORY_ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ORDER_ID`);

--
-- Indexes for table `orders_map`
--
ALTER TABLE `orders_map`
  ADD KEY `ORDER_ID` (`ORDER_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `products_details`
--
ALTER TABLE `products_details`
  ADD PRIMARY KEY (`PRODUCT_ID`),
  ADD KEY `ADMIN_ID` (`ADMIN_ID`);

--
-- Indexes for table `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`SEASON_ID`);

--
-- Indexes for table `seasons_map`
--
ALTER TABLE `seasons_map`
  ADD KEY `SEASON_ID` (`SEASON_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`TAG_ID`);

--
-- Indexes for table `tags_map`
--
ALTER TABLE `tags_map`
  ADD PRIMARY KEY (`TAG_ID`,`PRODUCT_ID`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD UNIQUE KEY `USER_PHONE` (`USER_PHONE`) USING HASH,
  ADD UNIQUE KEY `USER_EMAIL` (`USER_EMAIL`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
