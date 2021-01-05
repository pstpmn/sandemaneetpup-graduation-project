-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2021 at 04:49 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

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
-- Table structure for table `boat`
--

CREATE TABLE `boat` (
  `boat_number` int(6) NOT NULL,
  `boat_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boat`
--

INSERT INTO `boat` (`boat_number`, `boat_name`) VALUES
(1, 'เรือนอนสุราษฎร์ธานี '),
(111, 'สุราษฎร์ธานี-เกาะเต่า');

-- --------------------------------------------------------

--
-- Table structure for table `boat_schedule`
--

CREATE TABLE `boat_schedule` (
  `boat_schedule_id` int(6) NOT NULL,
  `location_id` int(3) NOT NULL,
  `boat_number` int(6) NOT NULL,
  `start_time` time DEFAULT NULL,
  `return_time` time DEFAULT NULL,
  `order_location` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boat_schedule`
--

INSERT INTO `boat_schedule` (`boat_schedule_id`, `location_id`, `boat_number`, `start_time`, `return_time`, `order_location`) VALUES
(1, 1, 1, '08:30:00', '20:00:00', 1),
(2, 2, 1, '14:00:00', '13:00:00', 2),
(3, 1, 111, '12:30:00', '08:00:00', 1),
(4, 2, 111, '20:00:00', '19:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `boat_seat`
--

CREATE TABLE `boat_seat` (
  `boat_seat_id` int(10) NOT NULL,
  `boat_seat_number` int(10) DEFAULT NULL,
  `boat_seat_type` varchar(10) DEFAULT NULL,
  `floor` varchar(10) DEFAULT NULL,
  `boat_number` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `boat_seat`
--

INSERT INTO `boat_seat` (`boat_seat_id`, `boat_seat_number`, `boat_seat_type`, `floor`, `boat_number`) VALUES
(1, 1, 'L', 'B', 1),
(2, 2, 'R', 'B', 1),
(3, 3, 'L', 'B', 1),
(4, 4, 'R', 'B', 1),
(5, 5, 'L', 'B', 1),
(6, 6, 'R', 'B', 1),
(7, 7, 'L', 'B', 1),
(8, 8, 'R', 'B', 1),
(9, 9, 'L', 'B', 1),
(10, 10, 'R', 'B', 1),
(11, 11, 'L', 'B', 1),
(12, 12, 'R', 'B', 1),
(13, 13, 'L', 'B', 1),
(14, 14, 'R', 'B', 1),
(15, 15, 'L', 'B', 1),
(16, 16, 'R', 'B', 1),
(17, 17, 'L', 'B', 1),
(18, 18, 'R', 'B', 1),
(19, 19, 'L', 'B', 1),
(20, 20, 'R', 'B', 1),
(21, 21, 'L', 'B', 1),
(22, 22, 'R', 'B', 1),
(23, 23, 'L', 'B', 1),
(24, 24, 'R', 'B', 1),
(25, 25, 'L', 'B', 1),
(26, 26, 'R', 'B', 1),
(27, 27, 'L', 'B', 1),
(28, 28, 'R', 'B', 1),
(29, 29, 'L', 'B', 1),
(30, 30, 'R', 'B', 1),
(31, 31, 'L', 'B', 1),
(32, 32, 'R', 'B', 1),
(33, 33, 'L', 'B', 1),
(34, 34, 'R', 'B', 1),
(35, 35, 'L', 'B', 1),
(36, 36, 'R', 'B', 1),
(37, 37, 'L', 'B', 1),
(38, 38, 'R', 'B', 1),
(39, 39, 'L', 'B', 1),
(40, 40, 'R', 'B', 1),
(41, 41, 'L', 'B', 1),
(42, 42, 'R', 'B', 1),
(43, 43, 'L', 'B', 1),
(44, 44, 'R', 'B', 1),
(45, 45, 'L', 'B', 1),
(46, 46, 'R', 'B', 1),
(47, 47, 'L', 'B', 1),
(48, 48, 'R', 'B', 1),
(49, 49, 'L', 'B', 1),
(50, 50, 'R', 'B', 1),
(51, 51, 'L', 'T', 1),
(52, 52, 'R', 'T', 1),
(53, 53, 'L', 'T', 1),
(54, 54, 'R', 'T', 1),
(55, 55, 'L', 'T', 1),
(56, 56, 'R', 'T', 1),
(57, 57, 'L', 'T', 1),
(58, 58, 'R', 'T', 1),
(59, 59, 'L', 'T', 1),
(60, 60, 'R', 'T', 1),
(61, 61, 'L', 'T', 1),
(62, 62, 'R', 'T', 1),
(63, 63, 'L', 'T', 1),
(64, 64, 'R', 'T', 1),
(65, 65, 'L', 'T', 1),
(66, 66, 'R', 'T', 1),
(67, 67, 'L', 'T', 1),
(68, 68, 'R', 'T', 1),
(69, 69, 'L', 'T', 1),
(70, 70, 'R', 'T', 1),
(71, 71, 'L', 'T', 1),
(72, 72, 'R', 'T', 1),
(73, 73, 'L', 'T', 1),
(74, 74, 'R', 'T', 1),
(75, 75, 'L', 'T', 1),
(76, 76, 'R', 'T', 1),
(77, 77, 'L', 'T', 1),
(78, 78, 'R', 'T', 1),
(79, 79, 'L', 'T', 1),
(80, 80, 'R', 'T', 1),
(81, 81, 'L', 'T', 1),
(82, 82, 'R', 'T', 1),
(83, 83, 'L', 'T', 1),
(84, 84, 'R', 'T', 1),
(85, 85, 'L', 'T', 1),
(86, 86, 'R', 'T', 1),
(87, 87, 'L', 'T', 1),
(88, 88, 'R', 'T', 1),
(89, 89, 'L', 'T', 1),
(90, 90, 'R', 'T', 1),
(91, 91, 'L', 'T', 1),
(92, 92, 'R', 'T', 1),
(93, 93, 'L', 'T', 1),
(94, 94, 'R', 'T', 1),
(95, 95, 'L', 'T', 1),
(96, 96, 'R', 'T', 1),
(97, 97, 'L', 'T', 1),
(98, 98, 'R', 'T', 1),
(99, 99, 'L', 'T', 1),
(100, 100, 'R', 'T', 1),
(101, 101, 'L', 'T', 1),
(102, 102, 'R', 'T', 1),
(103, 103, 'L', 'T', 1),
(104, 104, 'R', 'T', 1),
(105, 105, 'L', 'T', 1),
(106, 106, 'R', 'T', 1),
(107, 107, 'L', 'T', 1),
(108, 108, 'R', 'T', 1),
(109, 109, 'L', 'T', 1),
(110, 110, 'R', 'T', 1),
(111, 111, 'L', 'T', 1),
(112, 112, 'R', 'T', 1),
(113, 113, 'L', 'T', 1),
(114, 114, 'R', 'T', 1),
(115, 115, 'L', 'T', 1),
(116, 116, 'R', 'T', 1),
(117, 117, 'L', 'T', 1),
(118, 118, 'R', 'T', 1),
(119, 119, 'L', 'T', 1),
(120, 120, 'R', 'T', 1),
(121, 121, 'L', 'T', 1),
(122, 122, 'R', 'T', 1),
(123, 123, 'L', 'T', 1),
(124, 124, 'R', 'T', 1),
(125, 125, 'L', 'T', 1),
(133, 1, 'R', 'B', 111),
(134, 2, 'L', 'B', 111);

-- --------------------------------------------------------

--
-- Table structure for table `book_time`
--

CREATE TABLE `book_time` (
  `book_time_id` int(2) NOT NULL,
  `book_day` varchar(3) NOT NULL,
  `book_hour` varchar(2) NOT NULL,
  `book_minute` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book_time`
--

INSERT INTO `book_time` (`book_time_id`, `book_day`, `book_hour`, `book_minute`) VALUES
(1, '0', '3', '0');

-- --------------------------------------------------------

--
-- Table structure for table `buy_ticket`
--

CREATE TABLE `buy_ticket` (
  `buy_ticket_id` int(10) NOT NULL,
  `ticket_category_id` int(2) DEFAULT NULL,
  `employee_id` int(10) DEFAULT NULL,
  `customer_id` int(10) DEFAULT NULL,
  `time_buy_ticket` timestamp NULL DEFAULT current_timestamp(),
  `time_up_slip` timestamp NULL DEFAULT NULL,
  `boat_seat_id` int(10) DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `ticket_code` varchar(10) DEFAULT NULL,
  `travel_date` date DEFAULT NULL,
  `ticket_status_id` int(2) NOT NULL,
  `deadline_book` datetime DEFAULT NULL,
  `payment_time` datetime DEFAULT NULL,
  `slip_img` varchar(50) DEFAULT NULL,
  `payment_bank` varchar(50) DEFAULT NULL,
  `payment_amount` float DEFAULT NULL,
  `orgin` int(2) DEFAULT NULL,
  `destination` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy_ticket`
--

INSERT INTO `buy_ticket` (`buy_ticket_id`, `ticket_category_id`, `employee_id`, `customer_id`, `time_buy_ticket`, `time_up_slip`, `boat_seat_id`, `check_in`, `check_out`, `ticket_code`, `travel_date`, `ticket_status_id`, `deadline_book`, `payment_time`, `slip_img`, `payment_bank`, `payment_amount`, `orgin`, `destination`) VALUES
(167, 2, 2, 22, '2020-12-26 12:48:55', NULL, 2, '2020-12-28 23:33:27', '2020-12-28 23:34:50', '918267584', '2020-12-26', 3, '2020-12-26 22:48:55', NULL, NULL, NULL, NULL, NULL, NULL),
(168, 1, 2, 23, '2020-12-26 12:48:56', NULL, 6, '2020-12-28 23:26:23', '2020-12-28 23:26:40', '918267584', '2020-12-26', 3, '2020-12-26 22:48:56', NULL, NULL, NULL, NULL, NULL, NULL),
(169, 1, 2, 24, '2020-12-26 12:48:57', NULL, 125, '2020-12-28 23:33:27', '2020-12-28 23:34:26', '918267584', '2020-12-26', 3, '2020-12-26 22:48:57', NULL, NULL, NULL, NULL, NULL, NULL),
(170, 2, 2, 23, '2020-12-26 12:49:33', NULL, 3, NULL, NULL, '147028649', '2020-12-26', 2, '2020-12-26 22:49:33', NULL, NULL, NULL, NULL, NULL, NULL),
(171, 1, 2, 25, '2020-12-26 16:19:49', NULL, 1, NULL, NULL, '542224609', '2020-12-30', 1, '2020-12-27 02:19:49', NULL, NULL, NULL, NULL, NULL, NULL),
(172, 1, 2, 15, '2020-12-26 16:21:28', NULL, 1, NULL, NULL, '546606847', '2020-12-26', 2, '2020-12-26 23:23:28', NULL, NULL, NULL, NULL, NULL, NULL),
(173, 1, 2, 26, '2020-12-26 16:29:51', NULL, 1, '2020-12-28 23:36:53', NULL, '624948197', '2020-12-26', 1, '2020-12-27 02:29:51', NULL, NULL, NULL, NULL, NULL, NULL),
(174, 1, 2, 27, '2020-12-26 16:29:54', NULL, 2, '2020-12-28 23:37:00', '2020-12-28 23:40:24', '624948197', '2020-12-26', 1, '2020-12-27 02:29:54', NULL, NULL, NULL, NULL, NULL, NULL),
(175, 2, 2, 15, '2020-12-26 16:31:44', NULL, 3, '2020-12-29 00:01:57', '2020-12-29 00:02:04', '179119453', '2020-12-26', 1, '2020-12-27 02:31:44', NULL, NULL, NULL, NULL, NULL, NULL),
(176, 1, 2, 15, '2020-12-26 16:40:42', NULL, 7, '2020-12-28 23:57:54', '2020-12-28 23:57:56', '913282970', '2020-12-26', 1, '2020-12-27 02:40:42', NULL, NULL, NULL, NULL, NULL, NULL),
(177, 1, 2, 28, '2020-12-26 16:41:00', NULL, 13, NULL, NULL, '317647032', '2020-12-26', 1, '2020-12-27 02:41:00', NULL, NULL, NULL, NULL, NULL, NULL),
(178, 1, 2, 15, '2020-12-26 16:41:48', NULL, 16, '2020-12-28 23:57:46', '2020-12-28 23:57:13', '959938844', '2020-12-26', 3, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL),
(179, 1, 2, 29, '2020-12-26 16:42:22', NULL, 19, NULL, NULL, '462831457', '2020-12-26', 1, '2020-12-27 02:42:22', NULL, NULL, NULL, NULL, NULL, NULL),
(180, 1, 2, 15, '2020-12-26 16:43:18', NULL, 11, NULL, NULL, '545636434', '2020-12-26', 1, '2020-12-27 02:43:18', NULL, NULL, NULL, NULL, NULL, NULL),
(181, 1, 2, 15, '2020-12-26 16:43:59', NULL, 23, NULL, NULL, '676342929', '2020-12-26', 1, '2020-12-27 02:43:59', NULL, NULL, NULL, NULL, NULL, NULL),
(182, 2, 2, 15, '2020-12-26 16:44:54', NULL, 17, NULL, NULL, '190741262', '2020-12-26', 1, '2020-12-27 02:44:54', NULL, NULL, NULL, NULL, NULL, NULL),
(183, 1, 2, 30, '2020-12-26 16:46:01', NULL, 24, '2020-12-28 23:54:39', NULL, '339802701', '2020-12-26', 1, '2020-12-27 02:46:01', NULL, NULL, NULL, NULL, NULL, NULL),
(184, 2, 8, 31, '2021-01-06 14:38:00', NULL, 10, NULL, NULL, '741715799', '2020-12-26', 1, '2020-12-27 03:00:56', NULL, NULL, NULL, NULL, NULL, NULL),
(185, 2, 8, 32, '2021-01-06 14:38:00', NULL, 12, NULL, NULL, '741715799', '2020-12-26', 1, '2020-12-27 03:00:58', NULL, NULL, NULL, NULL, NULL, NULL),
(186, 1, 2, 33, '2020-12-26 17:07:09', NULL, 3, '2020-12-30 15:14:23', NULL, '524041894', '2020-12-27', 1, '2020-12-27 03:07:09', NULL, NULL, NULL, NULL, NULL, NULL),
(187, 1, 2, 34, '2020-12-26 17:07:09', NULL, 7, NULL, NULL, '524041894', '2020-12-27', 1, '2020-12-27 03:07:09', NULL, NULL, NULL, NULL, NULL, NULL),
(188, 1, 2, 35, '2020-12-27 13:22:36', '2021-01-02 15:26:45', 12, '2020-12-28 23:40:54', '2020-12-28 23:40:43', '717233423', '2020-12-27', 1, '2020-12-27 23:22:36', NULL, NULL, NULL, NULL, NULL, NULL),
(189, 1, 2, 36, '2020-12-27 13:22:36', '2021-01-02 15:26:39', 16, '2020-12-28 23:40:54', '2020-12-28 23:40:48', '717233423', '2020-12-27', 1, '2020-12-27 23:22:36', NULL, NULL, NULL, NULL, NULL, NULL),
(190, 1, 2, 37, '2020-12-27 18:26:24', '2021-01-02 15:25:39', 4, '2020-12-30 14:44:25', '2021-01-03 00:02:18', '423492079', '2020-12-28', 1, '2020-12-28 04:26:24', NULL, NULL, NULL, NULL, NULL, NULL),
(191, 1, 2, 38, '2020-12-27 18:26:24', '2021-01-02 15:25:25', 6, '2020-12-30 14:43:43', NULL, '423492079', '2020-12-28', 2, '2020-12-28 04:26:24', NULL, NULL, NULL, NULL, NULL, NULL),
(192, 1, 2, 39, '2020-12-30 06:41:05', '2020-12-30 17:25:41', 3, '2020-12-30 14:17:45', '2020-12-30 14:42:10', '250509144', '2020-12-30', 2, '2020-12-30 16:41:05', NULL, 'test.jpg', NULL, NULL, NULL, NULL),
(193, 1, 2, 40, '2020-12-30 07:44:53', '2021-01-02 12:20:34', 4, '2020-12-30 14:48:43', '2020-12-30 14:48:48', '406576623', '2020-12-30', 2, '2020-12-30 17:44:53', NULL, NULL, NULL, NULL, NULL, NULL),
(194, 1, 2, 41, '2021-01-01 14:50:21', '2021-01-01 14:52:14', 9, '2020-12-30 15:43:23', NULL, '325492112', '2020-12-30', 1, '2020-12-30 18:35:15', NULL, 'test1.jpg', NULL, NULL, NULL, NULL),
(195, 1, 2, 42, '2021-01-01 14:50:25', '2021-01-01 14:52:16', 10, '2020-12-30 15:35:36', NULL, '325492112', '2020-12-30', 2, '2020-12-30 18:35:15', NULL, 'test.jpg', NULL, NULL, NULL, NULL),
(196, 1, 2, 43, '2021-01-01 14:50:27', '2021-01-03 13:26:25', 6, '2021-01-02 22:25:00', NULL, '429787433', '2020-12-30', 3, '2020-12-31 02:23:13', NULL, NULL, NULL, NULL, NULL, NULL),
(197, 1, 2, 44, '2021-01-03 17:04:32', NULL, 1, NULL, NULL, '302276214', '2021-01-04', 1, '2021-01-04 03:04:32', NULL, NULL, NULL, NULL, NULL, NULL),
(198, 1, 8, 59, '2021-01-05 15:38:00', '2021-01-05 15:48:00', 10, NULL, NULL, '135877315', '2021-01-05', 2, '0000-00-00 00:00:00', NULL, NULL, NULL, NULL, NULL, NULL),
(199, 1, 2, 60, '2021-01-04 12:00:35', NULL, 21, '2021-01-04 19:01:49', '2021-01-04 19:02:04', '816455731', '2021-01-04', 1, '2021-01-04 22:00:35', NULL, NULL, NULL, NULL, NULL, NULL),
(200, 1, 8, 61, '2021-01-04 17:47:05', NULL, 1, '2021-01-05 00:48:10', NULL, '269844297', '2021-01-05', 1, '2021-01-05 03:47:05', NULL, NULL, NULL, NULL, NULL, NULL),
(201, 1, 8, 62, '2021-01-04 17:47:05', NULL, 2, '2021-01-05 00:51:42', '2021-01-05 00:52:09', '269844297', '2021-01-05', 1, '2021-01-05 03:47:05', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL,
  `cust_first_name` varchar(50) DEFAULT NULL,
  `cust_last_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` varchar(10) DEFAULT NULL,
  `count` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `cust_first_name`, `cust_last_name`, `phone_number`, `register_time`, `gender`, `count`) VALUES
(14, 'asd', '222', '1111', '2020-12-25 10:00:54', 'Male', 1),
(15, '', '', '', '2020-12-25 10:01:31', 'Male', 15),
(16, 'asd', 'asd', '0980173318', '2020-12-25 10:03:57', 'Male', 1),
(17, 'qweqwe', 'asdsad', '0980173318', '2020-12-25 10:04:01', 'Male', 1),
(18, 'พงศธร', 'พัสมุณี', '0980173318', '2020-12-25 10:50:10', 'Male', 2),
(19, 'โดม', 'ณเดช', '0980173318', '2020-12-25 10:50:13', 'Male', 1),
(20, 'asdsa', 'qwewqe', '', '2020-12-25 17:57:17', 'Male', 1),
(21, 'asd', 'qweqweqw', '', '2020-12-25 17:57:21', 'Male', 1),
(22, 'เฟรม', 'เฟรม', '1', '2020-12-26 12:48:55', 'Male', 1),
(23, 'กั้ง', 'กั้ง', '2', '2020-12-26 12:48:56', 'Male', 2),
(24, 'นิว', 'นิว', '1', '2020-12-26 12:48:57', 'Male', 1),
(25, 'ฟิวเป็นตุ๊ด', 'เฟรมเป็นตุ๊ด', '', '2020-12-26 16:19:49', 'Male', 1),
(26, 'asdsad', 'asdasd', '0980173318', '2020-12-26 16:29:51', 'Male', 1),
(27, 'qwewq', 'easdsad', '0980173318', '2020-12-26 16:29:54', 'Female', 1),
(28, 'ฟหกหฟกหฟก', '', '', '2020-12-26 16:41:00', '', 1),
(29, 'q', 'qp', '', '2020-12-26 16:42:22', 'Male', 1),
(30, 'd', 'q', '111', '2020-12-26 16:46:01', '', 1),
(31, 'eqwe', 'qwe', '23232', '2020-12-26 17:00:56', 'Female', 1),
(32, 'qweqw', 'asdasd', '565656', '2020-12-26 17:00:58', 'Male', 1),
(33, 'ww', 'ww', '3333', '2020-12-26 17:07:09', 'Male', 1),
(34, 'eee', 'eee', '666', '2020-12-26 17:07:09', 'Male', 2),
(35, 'as', 'asd', '5555', '2020-12-27 13:22:36', 'Male', 1),
(36, 'asd', 'sad ', '222', '2020-12-27 13:22:36', 'Male', 1),
(37, 'asdsad', 'sads', '212', '2020-12-27 18:26:24', 'Male', 1),
(38, '12121', '2121', '212121', '2020-12-27 18:26:24', 'Male', 1),
(39, 'asd', 'qweqwe', '', '2020-12-30 06:41:05', 'Male', 1),
(40, 'qweqw', 'wqeqwe', '', '2020-12-30 07:44:53', 'Male', 1),
(41, 'ๆไำๆไ', 'ำๆไำๆไ', '', '2020-12-30 08:35:15', 'Male', 1),
(42, 'ๆไำๆไำ', 'ฟหกหฟกหฟ', '', '2020-12-30 08:35:15', 'Male', 1),
(43, 'ฟฟฟ', 'ฟฟฟ', '', '2020-12-30 16:23:13', 'Male', 1),
(44, 'asd', 'asdas', '', '2021-01-03 17:04:32', 'Male', 1),
(45, 'frame', 'bo', '0222222', '2021-01-04 11:49:04', 'Male', 2),
(46, 'qwewqe', 'asdsad', '', '2021-01-04 11:50:22', 'Male', 1),
(47, 'qqq', 'qqq', '2222', '2021-01-04 11:51:05', 'Male', 1),
(48, '666', '666', '666', '2021-01-04 11:52:51', 'Male', 1),
(49, 'aa', 'aa', '', '2021-01-04 11:53:26', 'Male', 1),
(50, 'wweq', 'qwqe', '6666', '2021-01-04 11:54:01', 'Male', 1),
(51, '6565', '656565', '6565', '2021-01-04 11:54:01', 'Male', 1),
(52, 'asdsa', 'dasdsad', '', '2021-01-04 11:54:54', 'Male', 1),
(53, 'qq', 'qqq', '', '2021-01-04 11:55:07', 'Male', 1),
(54, 'qwewq', 'eqweq', '', '2021-01-04 11:55:08', 'Male', 1),
(55, 'qw', 'qwe', '', '2021-01-04 11:55:41', 'Male', 1),
(56, 'qwe', 'qwe', '222', '2021-01-04 11:56:27', 'Male', 1),
(57, 'qweqw', 'eqweq', '', '2021-01-04 11:57:23', 'Male', 1),
(58, 'q', 'q', '', '2021-01-04 11:58:16', 'Male', 1),
(59, 'a', 'a', '', '2021-01-04 11:59:17', 'Male', 1),
(60, 'frame', 'joy', '', '2021-01-04 12:00:35', 'Male', 1),
(61, 'aaa', 'aaa', '0', '2021-01-04 17:47:04', 'Male', 1),
(62, '000', '000', '000', '2021-01-04 17:47:05', 'Male', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(10) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `emp_first_name` varchar(25) DEFAULT NULL,
  `emp_last_name` varchar(25) DEFAULT NULL,
  `register_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `gender` varchar(3) DEFAULT NULL,
  `employee_category_id` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `username`, `password`, `emp_first_name`, `emp_last_name`, `register_time`, `gender`, `employee_category_id`) VALUES
(2, 'kang', 'kang', 'kang', 'kang', '2020-12-04 08:19:56', 'M', 2),
(8, 'online', 'online', 'online', 'online', '2020-12-21 07:04:35', 'm', 1);

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
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(3) NOT NULL,
  `location_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_name`) VALUES
(1, 'สุราษฎร์ธานี'),
(2, 'เกาะเต่า');

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

-- --------------------------------------------------------

--
-- Table structure for table `ticket_status`
--

CREATE TABLE `ticket_status` (
  `ticket_status_id` int(2) NOT NULL,
  `ticket_status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket_status`
--

INSERT INTO `ticket_status` (`ticket_status_id`, `ticket_status_name`) VALUES
(1, 'success'),
(2, 'book'),
(3, 'cancel'),
(4, 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boat`
--
ALTER TABLE `boat`
  ADD PRIMARY KEY (`boat_number`);

--
-- Indexes for table `boat_schedule`
--
ALTER TABLE `boat_schedule`
  ADD PRIMARY KEY (`boat_schedule_id`),
  ADD KEY `location_id` (`location_id`,`boat_number`),
  ADD KEY `boat_number` (`boat_number`);

--
-- Indexes for table `boat_seat`
--
ALTER TABLE `boat_seat`
  ADD PRIMARY KEY (`boat_seat_id`),
  ADD KEY `boat_number` (`boat_number`);

--
-- Indexes for table `book_time`
--
ALTER TABLE `book_time`
  ADD PRIMARY KEY (`book_time_id`);

--
-- Indexes for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD PRIMARY KEY (`buy_ticket_id`),
  ADD KEY `ticket_category_id` (`ticket_category_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `boat_seat_id` (`boat_seat_id`),
  ADD KEY `ticket_status_id` (`ticket_status_id`),
  ADD KEY `orgin` (`orgin`),
  ADD KEY `destination` (`destination`);

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
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `ticket_category`
--
ALTER TABLE `ticket_category`
  ADD PRIMARY KEY (`ticket_category_id`);

--
-- Indexes for table `ticket_status`
--
ALTER TABLE `ticket_status`
  ADD PRIMARY KEY (`ticket_status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boat_schedule`
--
ALTER TABLE `boat_schedule`
  MODIFY `boat_schedule_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `boat_seat`
--
ALTER TABLE `boat_seat`
  MODIFY `boat_seat_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `book_time`
--
ALTER TABLE `book_time`
  MODIFY `book_time_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  MODIFY `buy_ticket_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `employee_category`
--
ALTER TABLE `employee_category`
  MODIFY `employee_category_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ticket_category`
--
ALTER TABLE `ticket_category`
  MODIFY `ticket_category_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ticket_status`
--
ALTER TABLE `ticket_status`
  MODIFY `ticket_status_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `boat_schedule`
--
ALTER TABLE `boat_schedule`
  ADD CONSTRAINT `boat_schedule_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `boat_schedule_ibfk_2` FOREIGN KEY (`boat_number`) REFERENCES `boat` (`boat_number`);

--
-- Constraints for table `boat_seat`
--
ALTER TABLE `boat_seat`
  ADD CONSTRAINT `boat_seat_ibfk_1` FOREIGN KEY (`boat_number`) REFERENCES `boat` (`boat_number`);

--
-- Constraints for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  ADD CONSTRAINT `buy_ticket_ibfk_1` FOREIGN KEY (`ticket_category_id`) REFERENCES `ticket_category` (`ticket_category_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_4` FOREIGN KEY (`boat_seat_id`) REFERENCES `boat_seat` (`boat_seat_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_5` FOREIGN KEY (`ticket_status_id`) REFERENCES `ticket_status` (`ticket_status_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_6` FOREIGN KEY (`orgin`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_7` FOREIGN KEY (`destination`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_category_id`) REFERENCES `employee_category` (`employee_category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
