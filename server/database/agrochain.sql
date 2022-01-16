-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 21, 2021 at 04:17 PM
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

-- @block
CREATE TABLE `admins_details` (
  `ADMIN_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_ID` varchar(38) NOT NULL,
  `ADMIN_POSSITION` char(15) NOT NULL,
  `ADMIN_SALLERY` int(11) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--
-- @block
CREATE TABLE `characters` (
  `CHARACTER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `CHARACTER_NAME` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `characters_map`
--
-- @block
CREATE TABLE `characters_map` (
  `CHARACTER_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--@block
SELECT * FROM `products_details`;

-- --------------------------------------------------------

--
-- Table structure for table `history`
--
-- @block
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
-- @block
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
-- @block
CREATE TABLE `orders` (
  `ORDER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `RESRESTAURENT_ID` varchar(38) NOT NULL,
  `ORDER_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- @block
CREATE TABLE cart_details (
	CART_ID varchar(38) NOT NULL DEFAULT uuid(),
  USER_ID varchar(38) NOT NULL,
  PRODUCT_ID varchar(38) NOT NULL,
  CART_QUANTITY INT(11) NOT NULL
)
-- --------------------------------------------------------

--
-- Table structure for table `orders_map`
--
-- @block
CREATE TABLE `orders_map` (
  `ORDER_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL,
  `ORDER_QUANTITY` int(11) NOT NULL,
  `ORDER_DISCOUNT` double(3,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products_details`
--
-- @block
CREATE TABLE `products_details` (
  `PRODUCT_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `ADMIN_ID` varchar(38) NOT NULL,
  `PRODUCT_NAME_EN` varchar(20) NOT NULL,
  `PRODUCT_NAME_BN` varchar(20) DEFAULT NULL,
  `PRODUCT_IN_STOCK_QUANTITY` int(11) DEFAULT 0,
  `PRODUCT_MEASUREMENT_UNIT` char(10) DEFAULT NULL,
  `PRODUCT_AGRO_PRICE` double(10,4) DEFAULT 0.0000,
  `PRODUCT_DISCOUNT` double(3,2) DEFAULT 0.00,
  'PRODUCT_IMG' varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `restaurents_details`
--
-- @block
CREATE TABLE `restaurents_details` (
  `RESTAURENT_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_ID` varchar(38) NOT NULL,
  `RESTAURENTS_NAME` varchar(38) NOT NULL,
  `RESTAURENTS_ADDRESS` text NOT NULL,
  `RESTAURENTS_ABOUT` text NOT NULL,
  `RESTAURENTS_WEBSITE` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seasons`
--
-- @block
CREATE TABLE `seasons` (
  `SEASON_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `SEASON_NAME` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `seasons_map`
--
-- @block
CREATE TABLE `seasons_map` (
  `SEASON_ID` varchar(38) NOT NULL,
  `PRODUCT_ID` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--
-- @block
CREATE TABLE `user_details` (
  `USER_ID` varchar(38) NOT NULL DEFAULT uuid(),
  `USER_NAME` varchar(30) NOT NULL,
  `USER_PASSWORD` text NOT NULL,
  `USER_TYPE` char(15) DEFAULT 'USER',
  `USER_PHONE` text NOT NULL UNIQUE,
  `USER_EMAIL` text NOT NULL UNIQUE,
  `USER_JOIN_DATE` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins_details`
--
-- @block
ALTER TABLE `admins_details`
  ADD PRIMARY KEY (`ADMIN_ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `characters`
--
-- @block
ALTER TABLE `characters`
  ADD PRIMARY KEY (`CHARACTER_ID`);

--
-- Indexes for table `characters_map`
--
-- @block
ALTER TABLE `characters_map`
  ADD KEY `CHARACTER_ID` (`CHARACTER_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `history`
--
-- @block
ALTER TABLE `history`
  ADD PRIMARY KEY (`HISTORY_ID`),
  ADD KEY `ORDER_CONFRIMED_BY` (`ORDER_CONFRIMED_BY`);

--
-- Indexes for table `history_map`
--
-- @block
ALTER TABLE `history_map`
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`),
  ADD KEY `HISTORY_ID` (`HISTORY_ID`);

--
-- Indexes for table `orders`
--
-- @block
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ORDER_ID`);

--
-- Indexes for table `orders_map`
--
-- @block
ALTER TABLE `orders_map`
  ADD KEY `ORDER_ID` (`ORDER_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `products_details`
--
-- @block
ALTER TABLE `products_details`
  ADD PRIMARY KEY (`PRODUCT_ID`),
  ADD KEY `ADMIN_ID` (`ADMIN_ID`);

--
-- Indexes for table `restaurents_details`
--
-- @block
ALTER TABLE `restaurents_details`
  ADD PRIMARY KEY (`RESTAURENT_ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `seasons`
--
-- @block
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`SEASON_ID`);

--
-- Indexes for table `seasons_map`
--
-- @block
ALTER TABLE `seasons_map`
  ADD KEY `SEASON_ID` (`SEASON_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Indexes for table `user_details`
--
-- @block
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`USER_ID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins_details`
--
-- @block
ALTER TABLE `admins_details`
  ADD CONSTRAINT `admins_details_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user_details` (`USER_ID`);

--
-- Constraints for table `characters_map`
--
-- @block
ALTER TABLE `characters_map`
  ADD CONSTRAINT `characters_map_ibfk_1` FOREIGN KEY (`CHARACTER_ID`) REFERENCES `characters` (`CHARACTER_ID`),
  ADD CONSTRAINT `characters_map_ibfk_2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products_details` (`PRODUCT_ID`);

--
-- Constraints for table `history`
--
-- @block
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`ORDER_CONFRIMED_BY`) REFERENCES `admins_details` (`ADMIN_ID`);

--
-- Constraints for table `history_map`
--
-- @block
ALTER TABLE `history_map`
  ADD CONSTRAINT `history_map_ibfk_1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products_details` (`PRODUCT_ID`),
  ADD CONSTRAINT `history_map_ibfk_2` FOREIGN KEY (`HISTORY_ID`) REFERENCES `history` (`HISTORY_ID`);

--
-- Constraints for table `orders_map`
--
-- @block
ALTER TABLE `orders_map`
  ADD CONSTRAINT `orders_map_ibfk_1` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ORDER_ID`),
  ADD CONSTRAINT `orders_map_ibfk_2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products_details` (`PRODUCT_ID`);

--
-- Constraints for table `products_details`
--
-- @block
ALTER TABLE `products_details`
  ADD CONSTRAINT `products_details_ibfk_1` FOREIGN KEY (`ADMIN_ID`) REFERENCES `admins_details` (`ADMIN_ID`);

--
-- Constraints for table `restaurents_details`
--
-- @block
ALTER TABLE `restaurents_details`
  ADD CONSTRAINT `restaurents_details_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user_details` (`USER_ID`);

--
-- Constraints for table `seasons_map`
--
-- @block
ALTER TABLE `seasons_map`
  ADD CONSTRAINT `seasons_map_ibfk_1` FOREIGN KEY (`SEASON_ID`) REFERENCES `seasons` (`SEASON_ID`),
  ADD CONSTRAINT `seasons_map_ibfk_2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products_details` (`PRODUCT_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
