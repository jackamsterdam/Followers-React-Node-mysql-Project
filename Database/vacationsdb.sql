-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2022 at 01:50 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` char(36) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('013e34b0-355c-45ec-a69d-5290397f13bd', 1),
('013e34b0-355c-45ec-a69d-5290397f13bd', 2),
('013e34b0-355c-45ec-a69d-5290397f13bd', 3),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 3),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 1),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 2),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 3);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` tinyint(4) NOT NULL,
  `roleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'User'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` char(36) NOT NULL,
  `roleId` tinyint(4) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` char(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `roleId`, `firstName`, `lastName`, `username`, `password`) VALUES
('013e34b0-355c-45ec-a69d-5290397f13bd', 2, 'Jack', 'Amsterdam', 'jackamsterdam', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b'),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 1, 'Kermit', 'The-Frog', 'Kermit', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b'),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 1, 'David', 'Harley', 'davidharley', '9f1efb272bcb787c48418ec66d5703fb1323d0b977ce0d7b5368dd972e98b3a315c5027c0a9bc2e28b3548ce755c839cc5bfb47bb1634cbc64c537040bd02c3a'),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 1, 'George', 'Kerry', 'georgekerry', '1611ee302fa9a366b6cddafd095bfd705b487e839e9278e76bbae34d49274fa2a9d15645b05f42814003dfed7d0dc715a1e5799007ffaca55e86cc39f6ce94b4'),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 1, 'Bart', 'Simpson', 'Bart', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `fromDate`, `toDate`, `price`, `imageName`) VALUES
(1, 'Paris demo', 'Great escape to here demo', '2022-03-28', '2022-03-31', '553.23', '123456156dsfss3f15sf15s1fdsf5'),
(2, 'Italy demo', 'amazing place demo', '2022-03-30', '2022-03-31', '337.58', '564fsd6546sdf456s46d'),
(3, 'Spain demo', 'Delightful place to stay demo', '2022-03-28', '2022-03-31', '655.98', '6s5d4fs65d4fs46df5f6sf5d4'),
(4, 'Germany', 'Nobody wants to go here', '2022-06-20', '2022-07-30', '700.98', '444444444444');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
