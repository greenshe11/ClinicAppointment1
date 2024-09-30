-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dbchatbotclinicsys
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tblappointment`
--

DROP TABLE IF EXISTS `tblappointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblappointment` (
  `Appointment_ID` int NOT NULL AUTO_INCREMENT,
  `Patient_ID` int NOT NULL,
  `Smsnotif_ID` int NOT NULL,
  `Appointment_Day` int NOT NULL,
  `Appointment_Month` int NOT NULL,
  `Appointment_Time` int NOT NULL,
  `Appointment_Year` int NOT NULL,
  `Appointment_Confirmed` int NOT NULL DEFAULT '0',
  `Symptoms_ID` int DEFAULT NULL,
  `Appointment_DiagnosisCode` int DEFAULT NULL,
  PRIMARY KEY (`Appointment_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblappointment`
--

LOCK TABLES `tblappointment` WRITE;
/*!40000 ALTER TABLE `tblappointment` DISABLE KEYS */;
INSERT INTO `tblappointment` VALUES (2,1,1,12,100,11,2024,0,0,0),(3,2,2,2,10,8,2024,0,0,0),(4,3,3,2,10,9,2024,0,0,0),(5,41,4,2,10,10,2024,0,0,0),(6,41,5,2,10,11,2024,0,0,0),(7,41,6,2,10,1,2024,0,0,0),(8,41,7,2,10,2,2024,2,0,0),(9,41,8,2,10,3,2024,1,0,0),(10,9,9,2,10,4,2024,1,0,0),(11,41,0,1,10,1,2024,0,0,0),(12,41,0,1,10,8,2024,0,0,0),(13,41,0,30,9,8,2024,0,0,0),(14,41,0,30,9,9,2024,0,0,0),(15,41,0,3,10,8,2024,0,0,0),(16,41,0,30,9,10,2024,0,0,0),(17,41,0,30,9,11,2024,0,0,0),(18,41,0,30,9,11,2024,0,0,0),(19,41,0,30,9,11,2024,0,0,0),(20,41,0,30,9,1,2024,0,0,0),(21,41,0,30,9,1,2024,0,0,0),(22,41,0,1,10,9,2024,0,0,0),(23,41,0,1,10,10,2024,0,0,0);
/*!40000 ALTER TABLE `tblappointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblpatient`
--

DROP TABLE IF EXISTS `tblpatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblpatient` (
  `Patient_ID` int NOT NULL AUTO_INCREMENT,
  `PatientCode` varchar(100) DEFAULT NULL,
  `PatientName` varchar(100) NOT NULL,
  `PatientLastName` varchar(100) NOT NULL,
  `PatientPassword` varchar(100) NOT NULL,
  `PatientEmail` varchar(100) NOT NULL,
  `PatientContactNo` varchar(100) NOT NULL,
  PRIMARY KEY (`Patient_ID`),
  UNIQUE KEY `PatientContactNo_UNIQUE` (`PatientContactNo`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblpatient`
--

LOCK TABLES `tblpatient` WRITE;
/*!40000 ALTER TABLE `tblpatient` DISABLE KEYS */;
INSERT INTO `tblpatient` VALUES (41,NULL,'Luffy D.','Monkey','$2b$12$ZdKBlcy66yyKYuLjzOcxpud6fwc6x7A3yUCtcZ87Arqnz0sz.FYAW','email02@email','09313123');
/*!40000 ALTER TABLE `tblpatient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsmsnotif`
--

DROP TABLE IF EXISTS `tblsmsnotif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblsmsnotif` (
  `Smsnotif_ID` int NOT NULL AUTO_INCREMENT,
  `Patient_ID` int NOT NULL,
  `PatientContactNo` varchar(100) NOT NULL,
  `Smsnotif_Message` text,
  `Smsnotif_Date` datetime NOT NULL,
  PRIMARY KEY (`Smsnotif_ID`),
  UNIQUE KEY `PatientCode` (`Patient_ID`),
  UNIQUE KEY `PatientNo` (`PatientContactNo`),
  CONSTRAINT `tblsmsnotif_Patient_ID_fk_1` FOREIGN KEY (`Patient_ID`) REFERENCES `tblpatient` (`Patient_ID`) ON UPDATE CASCADE,
  CONSTRAINT `tblsmsnotif_PatientNo_fk_2` FOREIGN KEY (`PatientContactNo`) REFERENCES `tblpatient` (`PatientContactNo`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsmsnotif`
--

LOCK TABLES `tblsmsnotif` WRITE;
/*!40000 ALTER TABLE `tblsmsnotif` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblsmsnotif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblstaff`
--

DROP TABLE IF EXISTS `tblstaff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblstaff` (
  `staff_ID` int NOT NULL,
  `staffEmail` varchar(45) NOT NULL,
  `staffPassword` varchar(45) NOT NULL,
  UNIQUE KEY `staffEmail_UNIQUE` (`staffEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblstaff`
--

LOCK TABLES `tblstaff` WRITE;
/*!40000 ALTER TABLE `tblstaff` DISABLE KEYS */;
INSERT INTO `tblstaff` VALUES (1,'staff@staff','password');
/*!40000 ALTER TABLE `tblstaff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblsymptoms`
--

DROP TABLE IF EXISTS `tblsymptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblsymptoms` (
  `Symptoms_ID` int NOT NULL,
  `Patient_ID` int NOT NULL,
  `Symptoms_Name` varchar(45) NOT NULL,
  PRIMARY KEY (`Symptoms_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblsymptoms`
--

LOCK TABLES `tblsymptoms` WRITE;
/*!40000 ALTER TABLE `tblsymptoms` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblsymptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'dbchatbotclinicsys'
--

--
-- Dumping routines for database 'dbchatbotclinicsys'
--
/*!50003 DROP PROCEDURE IF EXISTS `insert_patient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_patient`(
    IN p_patientName VARCHAR(100),
    IN p_patientLastName VARCHAR(100),
    IN p_patientUserName VARCHAR(100),
    IN p_patientPassword VARCHAR(100),
    IN p_PatientEmail VARCHAR(100),
    IN p_PatientContactNo VARCHAR(100)


)
BEGIN
    DECLARE last_id INT;

    -- Insert the new product and get the last insert ID
    INSERT INTO tblpatient (PatientName, PatientLastName, PatientUserName, PatientPassword, PatientEmail, PatientContactNo)
    VALUES (p_patientName, p_patientLastName, p_patientUserName, p_patientPassword, p_PatientEmail, p_PatientContactNo);
    SET last_id = LAST_INSERT_ID();

    -- Update the product_code with the product_id
    UPDATE tblpatient
    SET PatientCode = CONCAT('P-', last_id)
    WHERE Patient_ID = last_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-30 10:18:14
