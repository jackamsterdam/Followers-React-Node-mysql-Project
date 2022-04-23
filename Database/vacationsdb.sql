-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2022 at 06:45 PM
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
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 1),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 2),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 3),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 4),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 5),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 6),
('28cf8ef5-4341-4f9f-be93-f974f4a5a5e3', 7),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 1),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 2),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 3),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 5),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 11),
('2d90f1bc-7c36-411c-96ad-f3a2c9102ca0', 16),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 5),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 18),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 29),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 30),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 32),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 36),
('4218db19-3ecf-41fc-82c3-41fedf250a49', 38),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 1),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 2),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 3),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 5),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 6),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 7),
('e799b9e9-d330-4973-835d-e7b0f0b204aa', 8);

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
  `star` int(11) NOT NULL,
  `rating` decimal(10,1) NOT NULL,
  `review` int(11) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `fromDate`, `toDate`, `price`, `star`, `rating`, `review`, `imageName`) VALUES
(1, 'Paris', 'Enjoy a romantic stay in the capital of France', '2022-04-01', '2022-04-15', '789.99', 4, '8.6', 1002, 'a056bad5-9f3f-45ea-86f0-7bf4ac437ff2.jpg'),
(2, 'Rome', 'Enjoy exquisite Italian cuisine', '2022-04-01', '2022-04-05', '423.23', 3, '7.8', 1350, '65159be4-d772-4c6b-9947-32e9ce222f60.jpg'),
(3, 'Barcelona', 'Do not follow where the path may lead. Go instead where there is no path and leave a trail', '2022-04-02', '2022-04-07', '658.69', 4, '7.6', 1658, 'c7e8dc7d-aeba-48bc-8eab-881c56f6e000.jpg'),
(4, 'Berlin', 'A journey of a thousand miles begins with a single step in Berlin', '2022-04-06', '2022-04-15', '368.00', 4, '6.8', 1358, 'c6907aae-70f5-4630-a986-39e9adc6e069.jpg'),
(5, 'Sweden', 'Do not follow where the path may lead. Go instead where there is no path and leave a trail in Stockholm', '2022-04-08', '2022-04-14', '698.00', 5, '9.1', 2005, 'ee4cc26a-8a4c-442a-a7e6-650e53bcf08b.jpg'),
(6, 'Amsterdam', 'The best place on earth!', '2022-04-01', '2022-04-21', '989.99', 5, '9.8', 3325, '34336385-ec28-450f-b8df-c9d57bd964e4.jpg'),
(7, 'Bucharest', 'Ce Face- Great food and people', '2022-04-08', '2022-04-17', '689.00', 5, '9.2', 3005, '5be34d75-9e72-4ecf-ae22-92da152b791a.jpg'),
(8, 'Andorra La Vella', 'Great place to invest your money', '2022-04-01', '2022-04-08', '369.00', 5, '8.9', 2001, '89f3683d-f4b6-4b12-b10e-bcd40cccec2d.jpg'),
(9, 'Prague', 'Beautiful scenery. A must!', '2022-04-04', '2022-04-09', '659.99', 4, '7.9', 895, '72f3eabd-8577-4bfc-8b15-83f2ad0a8278.jpg'),
(10, 'Havana', 'Man cannot discover new oceans unless he has the courage to lose sight of the shore in Cuba', '2022-04-12', '2022-04-23', '1089.99', 3, '6.5', 336, '2ba0d94e-270b-4145-9553-125c290a4c8a.jpg'),
(11, 'Helsinki', 'Enjoy a quick walking tour around this small city', '2022-04-08', '2022-04-21', '936.00', 3, '6.6', 465, 'bafaa0a6-fce7-475e-8906-1a2cc0348878.jpg'),
(12, 'Mexico City', 'Traveling – it leaves you speechless, then turns you into a storyteller. Enjoy Mexico!', '2022-04-20', '2022-05-18', '1699.00', 2, '5.6', 235, 'a295d8d5-02f4-4811-ad1e-1798e48b7f09.jpg'),
(13, 'Seoul', 'Wherever you go becomes a part of you somehow, and this is a place you will never forget', '2022-04-07', '2022-04-21', '1688.00', 3, '6.8', 658, '6eee7e88-cb4a-49e7-bb61-df058adfd35e.jpg'),
(14, 'Honiara', 'There’s a sunrise and a sunset every single day, and they’re absolutely free. Don’t miss so many of them', '2022-04-17', '2022-04-28', '2039.00', 4, '7.8', 269, 'cda42bde-763b-45d8-89e8-689472465f0d.jpg'),
(15, 'Tokyo', 'Travel makes one modest. You see what a tiny place you occupy in the world', '2022-04-25', '2022-05-18', '1659.00', 4, '8.2', 1658, '1e710025-0682-471f-9847-7929ea310e07.jpg'),
(16, 'Tashkent', 'Take only memories, leave only footprints ', '2022-04-13', '2022-04-29', '1589.00', 5, '9.6', 180, 'e6a9e7dc-9071-4bf0-9e59-f4e2749ab538.jpg'),
(17, 'Oslo', 'Fear is only temporary. Regrets last forever. Go to Oslo!', '2022-04-20', '2022-04-29', '587.00', 4, '8.6', 678, '08a13a43-4502-4d87-ab0d-a17b33f3ba1a.jpg'),
(18, 'Luxembourg', 'Stop being afraid of what could go wrong, and start being excited of what could go right. Luxembourg is the place for you.', '2022-04-14', '2022-04-27', '1478.00', 3, '7.4', 589, '31f6558a-492f-4efb-8539-a9e9f9ab49d6.jpg'),
(19, 'Ottawa', 'If you’re twenty-two, physically fit, hungry to learn and be better, I urge you to travel – as far and as widely as possible. Sleep on floors if you have to. Find out how other people live and eat and cook. Learn from them – wherever you go', '2022-04-17', '2022-04-29', '1899.00', 2, '6.1', 679, 'a2a4d014-2628-4d78-8bd6-e4ac9cf2e2ad.jpg'),
(20, 'Vilnius', 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes', '2022-04-13', '2022-04-27', '1698.99', 3, '6.2', 236, '98575b54-6d15-4ef6-9920-0b5590b0c3ec.jpg'),
(21, 'Sofia', 'Traveling allows you to become so many different versions of yourself and Sofia is the place to explore!', '2022-04-18', '2022-04-29', '587.00', 5, '8.9', 1236, 'a7376fec-0c9d-448f-89f9-fc9f25481a60.jpg'),
(22, 'Zagreb', 'We travel, initially, to lose ourselves; and we travel, next to find ourselves', '2022-04-13', '2022-04-28', '1369.00', 4, '7.8', 589, 'f09a0503-467d-4508-88e1-6fb4f418ed5a.jpg'),
(23, 'Reykjavik', 'Wandering re-establishes the original harmony which once existed between man and the universe. See the amazing nature and take a swim in freezing waters', '2022-04-21', '2022-04-29', '1368.00', 5, '9.1', 1489, '6b586ec1-dd33-4533-922e-b3ad10580040.jpg'),
(24, 'Ouagadougou', 'Yes! We are a real city in Africa! Come visit the capital of Burkina Faso!', '2022-04-29', '2022-05-13', '2699.00', 2, '5.4', 98, '08f43250-6b6e-44c2-9635-cb8d6ca52cee.jpg'),
(25, 'Riga', 'The life you have led doesn’t need to be the only life you have', '2022-04-11', '2022-04-22', '459.98', 2, '4.8', 659, 'ed177845-d77a-41f5-800d-83ce3b93393e.jpg'),
(26, 'Santiago', 'All we have to decide is what to do with the time that is given us', '2022-04-18', '2022-04-28', '2588.00', 3, '6.8', 785, '04e45a0c-6818-4889-9f89-102a567f04ae.jpg'),
(27, 'Yaren', 'Don’t quit your day dream and go to Yaren!', '2022-04-10', '2022-04-29', '796.00', 2, '4.9', 359, '5d6684b4-f738-4d58-bcf6-2a8329b04114.jpg'),
(28, 'USA', 'America! That is all That is need to be said', '2022-05-01', '2022-06-01', '1899.99', 5, '9.2', 4569, '15585aed-8c9c-43b3-aa8a-075027736404.jpg'),
(29, 'Dubai', 'You are missing out! See the tallest building in the world', '2022-04-16', '2022-04-23', '899.00', 5, '9.7', 4300, '528738fc-74f4-4028-9231-bf6a92d9a41c.jpg'),
(30, 'Bangkok', 'Enjoy  delicious Thai cuisine, and get a massage', '2022-06-01', '2022-06-22', '1458.00', 4, '9.1', 3056, '068e6c4e-2987-4eae-9f8a-e75d670e85a5.jpg'),
(31, 'Baku', 'It feels good to be lost in the right direction. Go to Baku', '2022-04-07', '2022-04-28', '578.00', 2, '6.5', 489, 'c9dc2e45-2fbc-4a46-8999-11d63e264893.jpg'),
(32, 'Doha', 'Don’t listen to what they say, go see', '2022-04-11', '2022-04-28', '1489.00', 3, '5.8', 578, '5d85857a-6591-427d-812a-d34ad94f637a.jpg'),
(33, 'Accra', 'People don’t take trips — trips take people', '2022-04-04', '2022-04-28', '1899.00', 1, '4.3', 64, 'c76d6a21-0aac-4c60-b10b-b63c0b6f0ae1.jpg'),
(34, 'Tegucigalpa', 'Travel to Tegucigalpa – the best way to be lost and found at the same time', '2022-04-12', '2022-04-28', '2369.00', 1, '4.1', 26, '1f662067-f074-4dd4-bc18-a00f0b177682.jpg'),
(35, 'Budapest', 'A journey is best measured in friends, not in miles. Take a friend and travel to Budapest.', '2022-04-13', '2022-04-28', '539.00', 4, '8.8', 1698, 'ca3ce714-de16-4a97-9d9f-fe0679e2c81a.jpg'),
(36, 'Castries', 'Not all those who wander are lost- Try this place!', '2022-04-08', '2022-04-27', '3788.00', 4, '9.1', 256, '2b5a893e-8d35-432e-9715-c3982931a8d0.jpg'),
(37, 'Liechtenstein', 'All journeys have secret destinations of which the traveler is unaware', '2022-04-20', '2022-04-29', '1078.00', 4, '7.9', 964, '647eb23c-6052-4e80-af2d-bc02f708e37a.jpg'),
(38, 'London', 'See the Big Ben!', '2022-04-19', '2022-04-29', '897.00', 5, '9.4', 2345, '72203bc7-6b7d-4f8b-a5b8-a996686e0d2d.jpg'),
(39, 'Jerusalem', 'The holy land', '2022-04-24', '2022-05-11', '350.00', 5, '9.7', 4689, '4c9d3c68-745f-4940-ba6e-14c00f804a02.jpg');

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
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
