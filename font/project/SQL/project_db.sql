-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2020 at 06:52 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `boat_seat`
--

CREATE TABLE `boat_seat` (
  `boat_seat_id` int(10) NOT NULL,
  `boat_seat_number` int(10) DEFAULT NULL,
  `boat_seat_type` varchar(10) DEFAULT NULL,
  `floor` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `boat_seat`
--

INSERT INTO `boat_seat` (`boat_seat_id`, `boat_seat_number`, `boat_seat_type`, `floor`) VALUES
(1, 1, 'L', 'Bottom'),
(2, 2, 'R', 'Bottom'),
(3, 3, 'L', 'Bottom'),
(4, 4, 'R', 'Bottom'),
(5, 5, 'L', 'Bottom'),
(6, 6, 'R', 'Bottom'),
(7, 7, 'L', 'Bottom'),
(8, 8, 'R', 'Bottom'),
(9, 9, 'L', 'Bottom'),
(10, 10, 'R', 'Bottom'),
(11, 11, 'L', 'Bottom'),
(12, 12, 'R', 'Bottom'),
(13, 13, 'L', 'Bottom'),
(14, 14, 'R', 'Bottom'),
(15, 15, 'L', 'Bottom'),
(16, 16, 'R', 'Bottom'),
(17, 17, 'L', 'Bottom'),
(18, 18, 'R', 'Bottom'),
(19, 19, 'L', 'Bottom'),
(20, 20, 'R', 'Bottom'),
(21, 21, 'L', 'Bottom'),
(22, 22, 'R', 'Bottom'),
(23, 23, 'L', 'Bottom'),
(24, 24, 'R', 'Bottom'),
(25, 25, 'L', 'Bottom'),
(26, 26, 'R', 'Bottom'),
(27, 27, 'L', 'Bottom'),
(28, 28, 'R', 'Bottom'),
(29, 29, 'L', 'Bottom'),
(30, 30, 'R', 'Bottom'),
(31, 31, 'L', 'Bottom'),
(32, 32, 'R', 'Bottom'),
(33, 33, 'L', 'Bottom'),
(34, 34, 'R', 'Bottom'),
(35, 35, 'L', 'Bottom'),
(36, 36, 'R', 'Bottom'),
(37, 37, 'L', 'Bottom'),
(38, 38, 'R', 'Bottom'),
(39, 39, 'L', 'Bottom'),
(40, 40, 'R', 'Bottom'),
(41, 41, 'L', 'Bottom'),
(42, 42, 'R', 'Bottom'),
(43, 43, 'L', 'Bottom'),
(44, 44, 'R', 'Bottom'),
(45, 45, 'L', 'Bottom'),
(46, 46, 'R', 'Bottom'),
(47, 47, 'L', 'Bottom'),
(48, 48, 'R', 'Bottom'),
(49, 49, 'L', 'Bottom'),
(50, 50, 'R', 'Bottom'),
(51, 51, 'L', 'Top'),
(52, 52, 'R', 'Top'),
(53, 53, 'L', 'Top'),
(54, 54, 'R', 'Top'),
(55, 55, 'L', 'Top'),
(56, 56, 'R', 'Top'),
(57, 57, 'L', 'Top'),
(58, 58, 'R', 'Top'),
(59, 59, 'L', 'Top'),
(60, 60, 'R', 'Top'),
(61, 61, 'L', 'Top'),
(62, 62, 'R', 'Top'),
(63, 63, 'L', 'Top'),
(64, 64, 'R', 'Top'),
(65, 65, 'L', 'Top'),
(66, 66, 'R', 'Top'),
(67, 67, 'L', 'Top'),
(68, 68, 'R', 'Top'),
(69, 69, 'L', 'Top'),
(70, 70, 'R', 'Top'),
(71, 71, 'L', 'Top'),
(72, 72, 'R', 'Top'),
(73, 73, 'L', 'Top'),
(74, 74, 'R', 'Top'),
(75, 75, 'L', 'Top'),
(76, 76, 'R', 'Top'),
(77, 77, 'L', 'Top'),
(78, 78, 'R', 'Top'),
(79, 79, 'L', 'Top'),
(80, 80, 'R', 'Top'),
(81, 81, 'L', 'Top'),
(82, 82, 'R', 'Top'),
(83, 83, 'L', 'Top'),
(84, 84, 'R', 'Top'),
(85, 85, 'L', 'Top'),
(86, 86, 'R', 'Top'),
(87, 87, 'L', 'Top'),
(88, 88, 'R', 'Top'),
(89, 89, 'L', 'Top'),
(90, 90, 'R', 'Top'),
(91, 91, 'L', 'Top'),
(92, 92, 'R', 'Top'),
(93, 93, 'L', 'Top'),
(94, 94, 'R', 'Top'),
(95, 95, 'L', 'Top'),
(96, 96, 'R', 'Top'),
(97, 97, 'L', 'Top'),
(98, 98, 'R', 'Top'),
(99, 99, 'L', 'Top'),
(100, 100, 'R', 'Top'),
(101, 101, 'L', 'Top'),
(102, 102, 'R', 'Top'),
(103, 103, 'L', 'Top'),
(104, 104, 'R', 'Top'),
(105, 105, 'L', 'Top'),
(106, 106, 'R', 'Top'),
(107, 107, 'L', 'Top'),
(108, 108, 'R', 'Top'),
(109, 109, 'L', 'Top'),
(110, 110, 'R', 'Top'),
(111, 111, 'L', 'Top'),
(112, 112, 'R', 'Top'),
(113, 113, 'L', 'Top'),
(114, 114, 'R', 'Top'),
(115, 115, 'L', 'Top'),
(116, 116, 'R', 'Top'),
(117, 117, 'L', 'Top'),
(118, 118, 'R', 'Top'),
(119, 119, 'L', 'Top'),
(120, 120, 'R', 'Top'),
(121, 121, 'L', 'Top'),
(122, 122, 'R', 'Top'),
(123, 123, 'L', 'Top'),
(124, 124, 'R', 'Top'),
(125, 125, 'L', 'Top');

-- --------------------------------------------------------

--
-- Table structure for table `buy_ticket`
--

CREATE TABLE `buy_ticket` (
  `buy_ticket_id` int(10) NOT NULL,
  `ticket_category_id` int(2) DEFAULT NULL,
  `employee_id` int(10) DEFAULT NULL,
  `customer_id` int(10) DEFAULT NULL,
  `time_buy_ticket` timestamp NOT NULL DEFAULT current_timestamp(),
  `slip_img` varchar(25) DEFAULT NULL,
  `time_up_slip` timestamp NULL DEFAULT NULL,
  `boat_seat_id` int(10) DEFAULT NULL,
  `barcode` varchar(10) DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `status_ticket` varchar(10) DEFAULT NULL,
  `ticket_code` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy_ticket`
--

INSERT INTO `buy_ticket` (`buy_ticket_id`, `ticket_category_id`, `employee_id`, `customer_id`, `time_buy_ticket`, `slip_img`, `time_up_slip`, `boat_seat_id`, `barcode`, `check_in`, `check_out`, `status_ticket`, `ticket_code`) VALUES
(2, 1, 2, 1, '2020-12-04 08:21:39', NULL, '2020-12-04 08:21:39', 1, '1111', NULL, NULL, 'Pass', 'TR001'),
(3, 2, 2, 1, '2020-12-04 15:06:36', NULL, '2020-12-04 15:06:36', 12, '2222', NULL, NULL, NULL, 'TL002'),
(4, 2, 2, 2, '2020-12-04 15:08:45', NULL, '2020-12-04 15:08:45', 66, '3333', NULL, NULL, NULL, 'BR055'),
(5, 2, 2, 2, '2020-12-08 13:16:59', NULL, NULL, 125, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `frist_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` varchar(3) DEFAULT NULL,
  `count` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `frist_name`, `last_name`, `phone_number`, `register_time`, `gender`, `count`) VALUES
(1, 'พงศธร', 'พัสมุณี', 'kang', '2020-11-17 16:07:33', 'm', 1),
(2, 'เฟรม', 'กินเป็ด', '081093555', '2020-12-04 15:08:16', 'F', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(10) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `fist_name` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` varchar(3) DEFAULT NULL,
  `employee_category_id` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `username`, `password`, `fist_name`, `last_name`, `register_time`, `gender`, `employee_category_id`) VALUES
(2, 'kang', 'kang', 'kang', 'kang', '2020-12-04 08:19:56', 'M', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee_category`
--

CREATE TABLE `employee_category` (
  `employee_category_id` int(2) NOT NULL,
  `employee_category_name` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_category`
--

INSERT INTO `employee_category` (`employee_category_id`, `employee_category_name`) VALUES
(1, 'Employee'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_category`
--

CREATE TABLE `ticket_category` (
  `ticket_category_id` int(2) NOT NULL,
  `ticket_category_name` varchar(20) DEFAULT NULL,
  `ticket_category_price` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket_category`
--

INSERT INTO `ticket_category` (`ticket_category_id`, `ticket_category_name`, `ticket_category_price`) VALUES
(1, 'ปกติ', 100),
(2, 'ออนไลน์', 100);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boat_seat`
--
ALTER TABLE `boat_seat`
  ADD PRIMARY KEY (`boat_seat_id`);

--
-- Indexes for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD PRIMARY KEY (`buy_ticket_id`),
  ADD UNIQUE KEY `slip_img` (`slip_img`),
  ADD KEY `ticket_category_id` (`ticket_category_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `boat_seat_id` (`boat_seat_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `employee_category_id` (`employee_category_id`);

--
-- Indexes for table `employee_category`
--
ALTER TABLE `employee_category`
  ADD PRIMARY KEY (`employee_category_id`);

--
-- Indexes for table `ticket_category`
--
ALTER TABLE `ticket_category`
  ADD PRIMARY KEY (`ticket_category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boat_seat`
--
ALTER TABLE `boat_seat`
  MODIFY `boat_seat_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  MODIFY `buy_ticket_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee_category`
--
ALTER TABLE `employee_category`
  MODIFY `employee_category_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ticket_category`
--
ALTER TABLE `ticket_category`
  MODIFY `ticket_category_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD CONSTRAINT `buy_ticket_ibfk_1` FOREIGN KEY (`ticket_category_id`) REFERENCES `ticket_category` (`ticket_category_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_category_id`) REFERENCES `employee_category` (`employee_category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
