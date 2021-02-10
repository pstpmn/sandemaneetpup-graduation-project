-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2021 at 05:00 PM
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
(1, 'เรือนอนสุราษฎร์ธานี'),
(111, 'เรือนอนสุราษฎร์ธานี	- เกาะเต่า');

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
(5, 1, 111, '19:11:27', '20:11:27', 1),
(6, 2, 111, '19:11:27', '20:11:27', 2);

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
(2, 2, 'R', '1', 1),
(3, 3, 'L', '1', 1),
(4, 4, 'R', '1', 1),
(5, 5, 'L', '1', 1),
(6, 6, 'R', '1', 1),
(7, 7, 'L', '1', 1),
(8, 8, 'R', '1', 1),
(9, 9, 'L', '1', 1),
(10, 10, 'R', '1', 1),
(11, 11, 'L', '1', 1),
(12, 12, 'R', '1', 1),
(13, 13, 'L', '1', 1),
(14, 14, 'R', '1', 1),
(15, 15, 'L', '1', 1),
(16, 16, 'R', '1', 1),
(17, 17, 'L', '1', 1),
(18, 18, 'R', '1', 1),
(19, 19, 'L', '1', 1),
(20, 20, 'R', '1', 1),
(21, 21, 'L', '1', 1),
(22, 22, 'R', '1', 1),
(23, 23, 'L', '1', 1),
(24, 24, 'R', '1', 1),
(25, 25, 'L', '1', 1),
(26, 26, 'R', '1', 1),
(27, 27, 'L', '1', 1),
(28, 28, 'R', '1', 1),
(29, 29, 'L', '1', 1),
(30, 30, 'R', '1', 1),
(31, 31, 'L', '1', 1),
(32, 32, 'R', '1', 1),
(33, 33, 'L', '1', 1),
(34, 34, 'R', '1', 1),
(35, 35, 'L', '1', 1),
(36, 36, 'R', '1', 1),
(37, 37, 'L', '1', 1),
(38, 38, 'R', '1', 1),
(39, 39, 'L', '1', 1),
(40, 40, 'R', '1', 1),
(41, 41, 'L', '1', 1),
(42, 42, 'R', '1', 1),
(43, 43, 'L', '1', 1),
(44, 44, 'R', '1', 1),
(45, 45, 'L', '1', 1),
(46, 46, 'R', '1', 1),
(47, 47, 'L', '1', 1),
(48, 48, 'R', '1', 1),
(49, 49, 'L', '1', 1),
(50, 50, 'R', '1', 1),
(51, 51, 'L', '2', 1),
(52, 52, 'R', '2', 1),
(53, 53, 'L', '2', 1),
(54, 54, 'R', '2', 1),
(55, 55, 'L', '2', 1),
(56, 56, 'R', '2', 1),
(57, 57, 'L', '2', 1),
(58, 58, 'R', '2', 1),
(59, 59, 'L', '2', 1),
(60, 60, 'R', '2', 1),
(61, 61, 'L', '2', 1),
(62, 62, 'R', '2', 1),
(63, 63, 'L', '2', 1),
(64, 64, 'R', '2', 1),
(65, 65, 'L', '2', 1),
(66, 66, 'R', '2', 1),
(67, 67, 'L', '2', 1),
(68, 68, 'R', '2', 1),
(69, 69, 'L', '2', 1),
(70, 70, 'R', '2', 1),
(71, 71, 'L', '2', 1),
(72, 72, 'R', '2', 1),
(73, 73, 'L', '2', 1),
(74, 74, 'R', '2', 1),
(75, 75, 'L', '2', 1),
(76, 76, 'R', '2', 1),
(77, 77, 'L', '2', 1),
(78, 78, 'R', '2', 1),
(79, 79, 'L', '2', 1),
(80, 80, 'R', '2', 1),
(81, 81, 'L', '2', 1),
(82, 82, 'R', '2', 1),
(83, 83, 'L', '2', 1),
(84, 84, 'R', '2', 1),
(85, 85, 'L', '2', 1),
(86, 86, 'R', '2', 1),
(87, 87, 'L', '2', 1),
(88, 88, 'R', '2', 1),
(89, 89, 'L', '2', 1),
(90, 90, 'R', '2', 1),
(91, 91, 'L', '2', 1),
(92, 92, 'R', '2', 1),
(93, 93, 'L', '2', 1),
(94, 94, 'R', '2', 1),
(95, 95, 'L', '2', 1),
(96, 96, 'R', '2', 1),
(97, 97, 'L', '2', 1),
(98, 98, 'R', '2', 1),
(99, 99, 'L', '2', 1),
(100, 100, 'R', '2', 1),
(101, 101, 'L', '2', 1),
(102, 102, 'R', '2', 1),
(103, 103, 'L', '2', 1),
(104, 104, 'R', '2', 1),
(105, 105, 'L', '2', 1),
(106, 106, 'R', '2', 1),
(107, 107, 'L', '2', 1),
(108, 108, 'R', '2', 1),
(109, 109, 'L', '2', 1),
(110, 110, 'R', '2', 1),
(111, 111, 'L', '2', 1),
(112, 112, 'R', '2', 1),
(113, 113, 'L', '2', 1),
(114, 114, 'R', '2', 1),
(115, 115, 'L', '2', 1),
(116, 116, 'R', '2', 1),
(117, 117, 'L', '2', 1),
(118, 118, 'R', '2', 1),
(119, 119, 'L', '2', 1),
(120, 120, 'R', '2', 1),
(121, 121, 'L', '2', 1),
(122, 122, 'R', '2', 1),
(123, 123, 'L', '2', 1),
(124, 124, 'R', '2', 1),
(125, 125, 'L', '2', 1),
(133, 1, 'R', '1', 1),
(138, 1, 'R', '3', 1),
(139, 1, 'R', '4', 1),
(140, 10, 'L', '3', 1),
(141, 11, 'L', '3', 1),
(142, 12, 'L', '3', 1),
(143, 13, 'L', '3', 1),
(144, 14, 'L', '3', 1),
(145, 15, 'L', '3', 1),
(146, 16, 'L', '3', 1),
(147, 17, 'L', '3', 1),
(148, 18, 'L', '3', 1),
(149, 19, 'L', '3', 1),
(150, 1, 'R', '3', 1),
(151, 2, 'R', '3', 1),
(152, 3, 'R', '3', 1),
(153, 4, 'R', '3', 1),
(154, 5, 'R', '3', 1),
(155, 6, 'R', '3', 1),
(156, 7, 'R', '3', 1),
(157, 8, 'R', '3', 1),
(158, 9, 'R', '3', 1),
(161, 3, 'L', '4', 1),
(162, 4, 'L', '4', 1),
(163, 5, 'L', '4', 1),
(164, 6, 'L', '4', 1),
(165, 7, 'L', '4', 1),
(166, 8, 'L', '4', 1),
(167, 9, 'R', '4', 1),
(168, 22, 'L', '3', 1),
(172, 3, 'L', '2', 111),
(173, 4, 'L', '2', 111),
(175, 6, 'L', '2', 111),
(176, 7, 'L', '2', 111),
(177, 8, 'L', '2', 111),
(178, 9, 'L', '2', 111),
(179, 10, 'L', '2', 111),
(180, 11, 'L', '2', 111),
(181, 12, 'L', '2', 111),
(182, 13, 'L', '2', 111),
(183, 14, 'L', '2', 111),
(184, 15, 'L', '2', 111),
(185, 16, 'L', '2', 111),
(186, 17, 'L', '2', 111),
(187, 18, 'L', '2', 111),
(188, 19, 'L', '2', 111),
(189, 20, 'L', '2', 111),
(190, 21, 'L', '2', 111),
(191, 22, 'L', '2', 111),
(192, 23, 'L', '2', 111),
(193, 24, 'L', '2', 111),
(194, 25, 'L', '2', 111),
(195, 26, 'L', '2', 111),
(196, 27, 'L', '2', 111),
(197, 28, 'L', '2', 111),
(198, 29, 'L', '2', 111),
(199, 30, 'L', '2', 111),
(200, 31, 'L', '2', 111),
(201, 32, 'L', '2', 111),
(202, 33, 'L', '2', 111),
(203, 34, 'L', '2', 111),
(204, 35, 'L', '2', 111),
(205, 36, 'L', '2', 111),
(206, 37, 'L', '2', 111),
(207, 38, 'L', '2', 111),
(208, 39, 'L', '2', 111),
(209, 40, 'L', '2', 111),
(210, 41, 'L', '2', 111),
(211, 42, 'L', '2', 111),
(212, 43, 'L', '2', 111),
(213, 44, 'L', '2', 111),
(214, 45, 'L', '2', 111),
(215, 46, 'L', '2', 111),
(216, 47, 'L', '2', 111),
(217, 48, 'L', '2', 111),
(218, 49, 'L', '2', 111),
(222, 4, 'R', '2', 111),
(224, 6, 'R', '2', 111),
(225, 7, 'R', '2', 111),
(226, 8, 'R', '2', 111),
(227, 9, 'R', '2', 111),
(229, 11, 'R', '2', 111),
(230, 12, 'R', '2', 111),
(231, 13, 'R', '2', 111),
(232, 14, 'R', '2', 111),
(233, 15, 'R', '2', 111),
(234, 16, 'R', '2', 111),
(235, 17, 'R', '2', 111),
(236, 18, 'R', '2', 111),
(237, 19, 'R', '2', 111),
(238, 20, 'R', '2', 111),
(239, 21, 'R', '2', 111),
(240, 22, 'R', '2', 111),
(241, 23, 'R', '2', 111),
(242, 24, 'R', '2', 111),
(243, 25, 'R', '2', 111),
(244, 26, 'R', '2', 111),
(245, 27, 'R', '2', 111),
(246, 28, 'R', '2', 111),
(247, 29, 'R', '2', 111),
(248, 30, 'R', '2', 111),
(249, 31, 'R', '2', 111),
(250, 32, 'R', '2', 111),
(251, 33, 'R', '2', 111),
(252, 34, 'R', '2', 111),
(253, 35, 'R', '2', 111),
(254, 36, 'R', '2', 111),
(255, 37, 'R', '2', 111),
(256, 38, 'R', '2', 111),
(257, 39, 'R', '2', 111),
(258, 40, 'R', '2', 111),
(259, 41, 'R', '2', 111),
(260, 42, 'R', '2', 111),
(261, 43, 'R', '2', 111),
(262, 44, 'R', '2', 111),
(263, 45, 'R', '2', 111),
(264, 46, 'R', '2', 111),
(265, 47, 'R', '2', 111),
(266, 48, 'R', '2', 111),
(267, 49, 'R', '2', 111);

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
(1, '1', '10', '5');

-- --------------------------------------------------------

--
-- Table structure for table `buy_ticket`
--

CREATE TABLE `buy_ticket` (
  `buy_ticket_id` int(10) NOT NULL,
  `customer_id` int(10) DEFAULT NULL,
  `boat_seat_id` int(10) DEFAULT NULL,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `ticket_code` varchar(20) DEFAULT NULL,
  `ticket_book_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buy_ticket`
--

INSERT INTO `buy_ticket` (`buy_ticket_id`, `customer_id`, `boat_seat_id`, `check_in`, `check_out`, `ticket_code`, `ticket_book_id`) VALUES
(557, 150, 10, '2021-02-10 22:58:37', NULL, '109336006317', 67),
(560, 162, 14, NULL, NULL, '058689532835', 69),
(561, 162, 16, NULL, NULL, '763811443767', 69),
(562, 162, 21, NULL, NULL, '075499834988', 68),
(566, 147, 20, NULL, NULL, '171005673481', 68),
(567, 147, 23, '2021-02-10 22:55:48', NULL, '410209833068', 68),
(568, 150, 33, NULL, NULL, '383466120599', 68),
(569, 147, 27, NULL, NULL, '658173781910', 68),
(570, 147, 31, NULL, NULL, '541065040195', 68),
(571, 147, 35, NULL, NULL, '883726648852', 68),
(572, 147, 26, NULL, NULL, '131051688591', 68),
(573, 147, 10, NULL, NULL, '176011203475', 68),
(574, 147, 15, NULL, NULL, '002003904607', 68),
(575, 147, 39, NULL, NULL, '568723781670', 68),
(576, 147, 22, NULL, NULL, '917638297209', 68),
(577, 147, 29, NULL, NULL, '701623577405', 68),
(578, 147, 13, NULL, NULL, '588894257219', 68);

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
(147, 'qwe', 'asd', '0980173318', '2021-02-07 18:03:41', 'Male', 72),
(148, 'eqw', 'asdsa', '', '2021-02-07 18:03:41', 'Male', 1),
(149, 'eqw', 'qwe', '', '2021-02-07 18:04:10', 'Male', 2),
(150, 'asd', 'qwe', '', '2021-02-07 18:13:27', 'Male', 11),
(151, 'a', 'qqwe', '', '2021-02-07 18:41:47', 'Male', 1),
(152, 'qwe', 'qwe', '', '2021-02-07 18:42:02', 'Male', 5),
(153, 'a', 'a', '', '2021-02-07 18:42:50', 'Male', 5),
(154, 'q', 'q', '', '2021-02-07 18:51:22', 'Male', 3),
(155, 'asd', 'asd', '2', '2021-02-08 14:46:45', 'Male', 2),
(156, 'qw', 'asd', '', '2021-02-08 14:48:08', 'Male', 1),
(157, 'qweaaa', 'asd', '', '2021-02-08 14:49:08', 'Male', 1),
(158, 'พงศธร', 'พัสมุณี', '0980173318', '2021-02-08 14:50:32', 'Male', 1),
(159, 'เฟรมเฟรมเฟรม', 'ฟิวฟิวฟิว', '098073318', '2021-02-08 14:50:32', 'Male', 1),
(160, 'qwe', 'asdsaw', '', '2021-02-08 15:08:25', 'Male', 1),
(161, 'qew', 'asd', '', '2021-02-08 17:33:31', 'Male', 1),
(162, 'ๆไำ', 'ฟหก', '', '2021-02-10 13:18:23', 'Male', 4);

-- --------------------------------------------------------

--
-- Table structure for table `dayoff`
--

CREATE TABLE `dayoff` (
  `dayOff_id` int(4) NOT NULL,
  `dayOff` varchar(50) DEFAULT NULL,
  `dayOff_cause` varchar(100) DEFAULT NULL,
  `dayOff_status_id` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dayoff`
--

INSERT INTO `dayoff` (`dayOff_id`, `dayOff`, `dayOff_cause`, `dayOff_status_id`) VALUES
(15, 'Saturday', 'หยุดทุกวันเสาร์ ขออภัยในความไม่สะดวก', 1),
(16, '2021-02-12', 'กหกหก', 2);

-- --------------------------------------------------------

--
-- Table structure for table `dayoff_status`
--

CREATE TABLE `dayoff_status` (
  `dayOff_status_id` int(2) NOT NULL,
  `dayOff_status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dayoff_status`
--

INSERT INTO `dayoff_status` (`dayOff_status_id`, `dayOff_status_name`) VALUES
(1, 'วันหยุดประจำ'),
(2, 'วันหยุดพิเศษ');

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
  `gender` varchar(10) DEFAULT NULL,
  `employee_category_id` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `username`, `password`, `emp_first_name`, `emp_last_name`, `register_time`, `gender`, `employee_category_id`) VALUES
(2, 'kang', 'kang', 'พงศธร', 'พัสมุณี', '2020-12-04 08:19:56', 'Male', 1),
(8, 'online', 'online', 'online', 'online', '2020-12-21 07:04:35', 'Female', 2),
(19, 'admin', 'admin', 'สำหรับทดสอบ', 'ระบบเท่านั้น', '2021-01-25 12:07:18', 'Male', 2);

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
-- Table structure for table `ticket_book`
--

CREATE TABLE `ticket_book` (
  `ticket_book_id` int(20) NOT NULL,
  `ticket_book_code` varchar(20) NOT NULL,
  `employee_id` int(2) NOT NULL,
  `time_buy_ticket` datetime NOT NULL DEFAULT current_timestamp(),
  `time_up_slip` datetime DEFAULT NULL,
  `travel_date` date NOT NULL,
  `ticket_status_id` int(2) NOT NULL,
  `deadline_book` datetime NOT NULL,
  `payment_time` datetime DEFAULT NULL,
  `slip_img` varchar(100) DEFAULT NULL,
  `payment_bank` varchar(50) DEFAULT NULL,
  `payment_amount` int(10) DEFAULT NULL,
  `orgin` int(2) NOT NULL,
  `destination` int(2) NOT NULL,
  `ticket_category_id` int(2) NOT NULL,
  `total_price` float DEFAULT NULL,
  `reason_cancel` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket_book`
--

INSERT INTO `ticket_book` (`ticket_book_id`, `ticket_book_code`, `employee_id`, `time_buy_ticket`, `time_up_slip`, `travel_date`, `ticket_status_id`, `deadline_book`, `payment_time`, `slip_img`, `payment_bank`, `payment_amount`, `orgin`, `destination`, `ticket_category_id`, `total_price`, `reason_cancel`) VALUES
(67, 'B295215410601', 19, '2021-02-10 17:42:24', '2021-02-11 17:52:00', '2021-02-10', 1, '2021-02-12 03:47:24', NULL, NULL, NULL, NULL, 1, 2, 1, 100, NULL),
(68, 'B174987434955', 19, '2021-02-10 17:42:32', '2021-02-20 17:42:00', '2021-02-10', 1, '2021-02-12 03:47:32', NULL, NULL, NULL, NULL, 1, 2, 1, 1400, NULL),
(69, 'B561851828192', 19, '2021-02-10 20:20:47', NULL, '2021-02-10', 1, '2021-02-12 06:25:47', NULL, NULL, NULL, NULL, 1, 2, 1, 200, NULL);

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
(2, 'ออนไลน์', 10000);

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
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `boat_seat_id` (`boat_seat_id`),
  ADD KEY `ticket_book_id` (`ticket_book_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `dayoff`
--
ALTER TABLE `dayoff`
  ADD PRIMARY KEY (`dayOff_id`),
  ADD KEY `dayOff_status_id` (`dayOff_status_id`);

--
-- Indexes for table `dayoff_status`
--
ALTER TABLE `dayoff_status`
  ADD PRIMARY KEY (`dayOff_status_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD KEY `employee_category_id` (`employee_category_id`);

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
-- Indexes for table `ticket_book`
--
ALTER TABLE `ticket_book`
  ADD PRIMARY KEY (`ticket_book_id`),
  ADD UNIQUE KEY `ticket_book_code` (`ticket_book_code`),
  ADD KEY `employee_id` (`employee_id`,`ticket_status_id`,`orgin`,`destination`,`ticket_category_id`),
  ADD KEY `ticket_category_id` (`ticket_category_id`),
  ADD KEY `orgin` (`orgin`),
  ADD KEY `destination` (`destination`),
  ADD KEY `ticket_status_id` (`ticket_status_id`);

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
  MODIFY `boat_schedule_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `boat_seat`
--
ALTER TABLE `boat_seat`
  MODIFY `boat_seat_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=732;

--
-- AUTO_INCREMENT for table `book_time`
--
ALTER TABLE `book_time`
  MODIFY `book_time_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `buy_ticket`
--
ALTER TABLE `buy_ticket`
  MODIFY `buy_ticket_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=579;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `dayoff`
--
ALTER TABLE `dayoff`
  MODIFY `dayOff_id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `dayoff_status`
--
ALTER TABLE `dayoff_status`
  MODIFY `dayOff_status_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `employee_category`
--
ALTER TABLE `employee_category`
  MODIFY `employee_category_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ticket_book`
--
ALTER TABLE `ticket_book`
  MODIFY `ticket_book_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  ADD CONSTRAINT `buy_ticket_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_4` FOREIGN KEY (`boat_seat_id`) REFERENCES `boat_seat` (`boat_seat_id`),
  ADD CONSTRAINT `buy_ticket_ibfk_5` FOREIGN KEY (`ticket_book_id`) REFERENCES `ticket_book` (`ticket_book_id`);

--
-- Constraints for table `dayoff`
--
ALTER TABLE `dayoff`
  ADD CONSTRAINT `dayoff_ibfk_1` FOREIGN KEY (`dayOff_status_id`) REFERENCES `dayoff_status` (`dayOff_status_id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_category_id`) REFERENCES `employee_category` (`employee_category_id`);

--
-- Constraints for table `ticket_book`
--
ALTER TABLE `ticket_book`
  ADD CONSTRAINT `ticket_book_ibfk_1` FOREIGN KEY (`ticket_category_id`) REFERENCES `ticket_category` (`ticket_category_id`),
  ADD CONSTRAINT `ticket_book_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  ADD CONSTRAINT `ticket_book_ibfk_3` FOREIGN KEY (`orgin`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `ticket_book_ibfk_4` FOREIGN KEY (`destination`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `ticket_book_ibfk_5` FOREIGN KEY (`ticket_status_id`) REFERENCES `ticket_status` (`ticket_status_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
