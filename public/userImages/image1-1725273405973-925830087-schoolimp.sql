-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `selectedOption` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,19,16,14,'color_red'),(2,45,9,15,'79'),(2,58,7,17,'89'),(6,45,1,18,'79'),(6,45,1,19,'79'),(6,45,1,20,'79'),(6,45,1,21,'79'),(6,45,1,22,'79');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (28,'General Items','hhghvb nbjhghj','general-items'),(27,'Spices','hghgnb jhghfvbv ','spices'),(26,'pulses','bfhghv','pulses'),(24,'Flour and Rice','This is a good Category7','flour-and-rice'),(22,'All kinds of pulses items.','gfhfhjghg','all-kinds-of-pulses-items.'),(19,'Electronics15','All kinds of electronic i.','electronics15'),(25,'pluses2',' nzbajkshajxbznh','pluses2'),(32,'pulses','This catgroy is very use full of the syararetails','pulses'),(33,'djfkdghf','dghjdfg','djfkdghf'),(34,'Khudhbooanu','I love my this product','khudhbooanu');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_info_home`
--

DROP TABLE IF EXISTS `contact_info_home`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_info_home` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info_home`
--

LOCK TABLES `contact_info_home` WRITE;
/*!40000 ALTER TABLE `contact_info_home` DISABLE KEYS */;
INSERT INTO `contact_info_home` VALUES (7,'8707087926','syarainfo@gmail.com','2024-08-14 05:10:27','2024-08-14 05:10:27'),(8,'8707087926','syarainfo@gmail.com','2024-08-14 05:10:27','2024-08-14 05:10:27');
/*!40000 ALTER TABLE `contact_info_home` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_options`
--

DROP TABLE IF EXISTS `delivery_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pincode` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `condition` varchar(255) NOT NULL,
  `rate` float NOT NULL,
  `unit` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `distance` varchar(255) DEFAULT NULL,
  `minOrder` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pincode` (`pincode`),
  UNIQUE KEY `delivery_options_pincode_type` (`pincode`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_options`
--

LOCK TABLES `delivery_options` WRITE;
/*!40000 ALTER TABLE `delivery_options` DISABLE KEYS */;
INSERT INTO `delivery_options` VALUES (1,'123456','Standard','Normal',50,'Kg','3-5 days','100 km','1'),(4,'123457','free','Normal',50,'Kg','3-5 days','100 km','1'),(6,'123458','NCR-PORTER','Normal',50,'Kg','3-5 days','100 km','1'),(8,'123459','NCR-CORRIER','Normal',50,'Kg','3-5 days','100 km','1'),(9,'123460','OUT STATION LAND','Normal',50,'Kg','3-5 days','100 km','1'),(10,'123461','OUT STATION LAND','Normal',50,'Kg','3-5 days','100 km','1'),(11,'123462','OUT STATION Air','Normal',50,'Kg','3-5 days','100 km','1'),(12,'123463','OUT STATION Air','Normal',50,'Kg','3-5 days','100 km','1');
/*!40000 ALTER TABLE `delivery_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hall_of_frame`
--

DROP TABLE IF EXISTS `hall_of_frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hall_of_frame` (
  `image` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2147483647 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hall_of_frame`
--

LOCK TABLES `hall_of_frame` WRITE;
/*!40000 ALTER TABLE `hall_of_frame` DISABLE KEYS */;
INSERT INTO `hall_of_frame` VALUES ('image-1722849972105-876061786-44392346-39ad-4570-9339-9f3a4cdb1345.jpg',73),('image-1724220657697-162397414-18.jpg',458),('image-1722849963321-542225802-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg',2147483647);
/*!40000 ALTER TABLE `hall_of_frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('05bd7033-2735-41bd-8f1b-4cd29cea8df7','Khushboo8','$2b$10$aJilwOUOzcFdP8ifldcv8.qXtAhIoKwgEfDy3331VswHOCXl0ddcC','anukhush'),('0a0b2cba-4658-40b4-a14e-a889924f388d','testuser','$2b$10$tPEdiMtlB/bI9jsCSW8ZrO4HvrYYU5BizqkOKac9noVC9p6B3poEK','Test User'),('5251aad2-bee5-4e78-9ecd-3cc9aa7a8167','Khushboo2','$2b$10$uuR.cKJRUhiLrB6Uua155eptBjohO9xpc053VrD7/paPOvS.tPIhq','Khushboo'),('63a8e174-a061-4b36-8b42-9152cef26beb','Khushboo4','$2b$10$BdJOQEkvQFNCZ5M4fPoWp.y1MFSV5gS1FiPkEIUrH/2iS8gn7WFZi','Khushboo'),('dfd515b8-22b2-49d5-b245-7702b110da49','Khushboo','$2b$10$DGkfyZUp54KRk4ZOkkNnquZ1fEKPhze.wKRo.38KzkVzSNWClFzI6','khushboo');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_launches`
--

DROP TABLE IF EXISTS `new_launches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_launches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_launches`
--

LOCK TABLES `new_launches` WRITE;
/*!40000 ALTER TABLE `new_launches` DISABLE KEYS */;
INSERT INTO `new_launches` VALUES (2147483647,'image-1722840590237-250351891-barnyard-millet-noodle.jpg','Barnyard Millet Noodle'),(55,'image-1722840602874-205058395-barnyard-millet-pasta.jpg','Barnyard Millet Pasta'),(2873,'image-1723542755152-710250367-barnyard-millet-noodle.jpg','hghkj'),(6,'image-1723543472601-915947461-762a914f-2eba-4709-9525-7bd44f0744d3.jpg','hjjkbjk'),(7,'image-1724229606046-117314184-93bc7e50-c7ab-477d-8cb7-8b0ada119cea.jpeg','FJHJ');
/*!40000 ALTER TABLE `new_launches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `our_combo_offers`
--

DROP TABLE IF EXISTS `our_combo_offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `our_combo_offers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(255) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `our_combo_offers`
--

LOCK TABLES `our_combo_offers` WRITE;
/*!40000 ALTER TABLE `our_combo_offers` DISABLE KEYS */;
INSERT INTO `our_combo_offers` VALUES ('29d5aa98-491f-42b4-9f04-57e7f5482f5c','image-1722848182018-148355090-utrakhandi-kaleu-box-5.jpg','utrakhandi kaleu box-5'),('44e376be-92dd-4593-8483-8b478800a2b3','image-1722848215444-639119865-utrakhandi-kaleu-box-2.jpg','utrakhandi-kaleu box-2'),('75cbe49c-eebf-481d-8a69-d6aa056a1a38','image-1722848246172-552432975-utrakhandi-kaleu-box-10.jpg','utrakhandi kaleu box-10'),('9a0e9c03-f9e9-49c2-8a59-9f0116af16a2','image-1722848147378-65755910-utrakhandi-kaleu-box-4.jpg','utrakhandi kaleu box-4'),('d36d2d03-23d8-43b5-827e-b04ce3f072c9','image-1722848264476-1561425-utrakhandi-kaleu-box-9.jpg','utrakhandi kaleu box-9'),('eaf809a9-4fba-45e5-ad9f-c3f2eacf16b3','image-1722848284044-887519530-utrakhandi-kalue-box-1.jpg','utrakhandi kalue box-1'),('efa0d82f-e44f-49aa-a7f3-6c4e1f4c99bb','image-1722848200483-520350354-utrakhandi-kalue-box-8.jpg','utrakhandi kalue box-8'),('f61939a3-da2d-4338-9422-92484fc9afdd','image-1722848165885-518770559-utrakhandi-kalau-box-6.jpg','utrakhandi kalau box-6');
/*!40000 ALTER TABLE `our_combo_offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `our_testimonial`
--

DROP TABLE IF EXISTS `our_testimonial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `our_testimonial` (
  `id` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `testimonialdetails` text NOT NULL,
  `testimonialname` text NOT NULL,
  `testimonialposition` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `our_testimonial`
--

LOCK TABLES `our_testimonial` WRITE;
/*!40000 ALTER TABLE `our_testimonial` DISABLE KEYS */;
INSERT INTO `our_testimonial` VALUES ('0dfa06e2-9695-434f-b4b4-7c9e403141b1','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Anu',''),('2a0bbde0-053d-4ce3-ab17-f023a4a2a884','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Krishna',''),('3eb5f34b-52f1-403a-babf-2759c54a0a56','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Shivani',''),('56ba44da-b6fc-4cec-af81-0e7b52d633d0','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Anukhush',''),('777c4439-e088-4c4f-85dd-47a3aecb0129','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Krishna',''),('e6fbaabd-d742-44f3-82b4-9ff6ac941cfa','','This is an amazing product. Highly recommended!','John Doe',''),('f0f4758b-7577-4e56-96f8-648feda8aebb','',' Amet consectetur Sequi assumenda libero eos tempora corrupti, neque a deserunt minus provident cupiditate!','Gopal','');
/*!40000 ALTER TABLE `our_testimonial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `categoryId` int NOT NULL,
  `price` decimal(50,0) NOT NULL,
  `description` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Smartphone',1,300,'A high-end smartphone with excellent features.',''),(2,'Mobile',1,300,'A high-end smartphone with excellent features.',''),(3,'Pasta',1,300,'A high-end smartphone with excellent features.',''),(4,'Banyard Millet Pasta',1,300,'A high-end smartphone with excellent features.',''),(5,'Pasta',2,300,'A high-end smartphone with excellent features.',''),(6,'ghar',2,300,'A high-end smartphone with excellent features.',''),(7,'ghar2',2,300,'A high-end smartphone with excellent features.','ghar2'),(8,'Pasta',5,300,'A high-end smartphone with excellent features.','pasta'),(9,'Pasta5',5,300,'A high-end smartphone with excellent features.','pasta5');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productName` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `categoryId` int NOT NULL,
  `price` decimal(50,0) DEFAULT NULL,
  `description` text NOT NULL,
  `nickname1` varchar(500) NOT NULL,
  `nickname2` varchar(500) NOT NULL,
  `packeoption1kg` varchar(255) NOT NULL,
  `packeoption500gm` varchar(255) NOT NULL,
  `packeoption1kgrate` decimal(50,0) NOT NULL,
  `packeoption500gmrate` decimal(50,0) NOT NULL,
  `video` varchar(255) NOT NULL,
  `recipe` varchar(255) NOT NULL,
  `productNamealsoyoumaylike` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `restriction` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `image1` varchar(255) NOT NULL,
  `image2` varchar(255) NOT NULL,
  `image3` varchar(255) NOT NULL,
  `image4` varchar(255) NOT NULL,
  `image5` varchar(255) NOT NULL,
  `nickname3` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('khushbooanu','khushbooanu',6,69,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722407041091-565071999-barnyard-millet-pasta.jpg','image2-1722407041099-216076298-achaar.jpg','image3-1722407041100-160682506-barnyard-millet-pasta.jpg','image4-1722407041104-825981593-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image5-1722407041108-916473635-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','bvbdshdsbx',19),('khushboo10','khushboo10',6,69,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722404611380-961086265-barnyard-millet-noodle.jpg','image2-1722404611383-245139042-barnyard-millet-pasta.jpg','image3-1722404611386-436164576-badiya.jpeg','image4-1722404611386-480489393-achaar.jpg','image5-1722404611388-715488272-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',17),('white toor','white-toor',6,70,'Updated description','Updated nickname','cdxfvcv','vcbfg','dfdgfh',46,68,'Updated video link','Updated recipe link','Updated similar product','Updated product link','Updated restriction','Updated type','image1-1722404616017-484966122-barnyard-millet-noodle.jpg','image2-1722404616020-127326479-barnyard-millet-pasta.jpg','image3-1722404616024-298297652-badiya.jpeg','image4-1722404616024-820052235-achaar.jpg','image5-1722404616025-539102804-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',18),('Updated Product Name10','updated-product-name10',6,25,'Updated description','Updated nickname','cdxfvcv','vcbfg','dfdgfh',46,68,'Updated video link','Updated recipe link','Updated similar product','Updated product link','Updated restriction','Updated type','image1-1722404606514-527331834-barnyard-millet-noodle.jpg','image2-1722404606518-469733547-barnyard-millet-pasta.jpg','image3-1722404606520-186000445-badiya.jpeg','image4-1722404606520-514174680-achaar.jpg','image5-1722404606522-609250095-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',16),('khushboo4','khushboo4',6,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722404566884-665348957-barnyard-millet-noodle.jpg','image2-1722404566887-942650060-barnyard-millet-pasta.jpg','image3-1722404566889-791834541-badiya.jpeg','image4-1722404566889-326160599-achaar.jpg','image5-1722404566890-561720858-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',14),('khushboo6','khushboo6',6,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722404601525-133865475-barnyard-millet-noodle.jpg','image2-1722404601530-634579189-barnyard-millet-pasta.jpg','image3-1722404601531-926886967-badiya.jpeg','image4-1722404601531-894956549-achaar.jpg','image5-1722404601532-413536594-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',15),('Pasta5','pasta5',7,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722407248351-846996695-barnyard-millet-pasta.jpg','image2-1722407248356-127043351-achaar.jpg','image3-1722407248356-234701606-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722407248362-979841340-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image5-1722407248367-665041616-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',22),('Pasta6','pasta6',7,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722407253815-955495195-barnyard-millet-pasta.jpg','image2-1722407253817-655303237-achaar.jpg','image3-1722407253818-655874962-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722407253823-386821435-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image5-1722407253828-215956921-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',23),('Pasta7','pasta7',7,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722407284881-695455420-barnyard-millet-pasta.jpg','image2-1722407284882-799885784-achaar.jpg','image3-1722407284883-369855419-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722407284903-879847580-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image5-1722407284909-262600897-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',24),('dfhjdfhvjc','dfhjdfhvjc',0,0,'xcvcbv','dsfdgf','bnvn ','fgdgfb','fgdgf',89,68,'fgfhghg','gfhgftgh','vghh','hgjhj','','','image1-1722417268305-741478433-d328c244-8aa5-459d-9d93-3e3d1452923e.jpg','image2-1722417268308-153445522-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722417268310-746863979-deppak-dhyani.jpeg','image4-1722417268311-680799271-deppak-dhyani.jpeg','image5-1722417268311-775036078-amu7.jpg','cbhfg',28),('dfhjdfhvjc','dfhjdfhvjc',0,0,'xcvcbv','dsfdgf','bnvn ','fgdgfb','fgdgf',89,68,'fgfhghg','gfhgftgh','vghh','hgjhj','','','image1-1722417293097-106402928-d328c244-8aa5-459d-9d93-3e3d1452923e.jpg','image2-1722417293100-184577339-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722417293102-617750605-deppak-dhyani.jpeg','image4-1722417293102-288819310-deppak-dhyani.jpeg','image5-1722417293102-911123305-amu7.jpg','cbhfg',29),('khushboo10','khushboo10',24,69,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722417373297-63903891-barnyard-millet-noodle.jpg','image2-1722417373300-870924610-barnyard-millet-pasta.jpg','image3-1722417373301-350907039-badiya.jpeg','image4-1722417373302-917164496-achaar.jpg','image5-1722417373303-512581728-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','bvbdshdsbx',30),('dfhjdfhvjc','dfhjdfhvjc',0,0,'xcvcbv','dsfdgf','bnvn ','fgdgfb','fgdgf',89,68,'fgfhghg','gfhgftgh','vghh','hgjhj','','','image1-1722417456954-895531124-d328c244-8aa5-459d-9d93-3e3d1452923e.jpg','image2-1722417456957-95782578-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722417456965-829991479-deppak-dhyani.jpeg','image4-1722417456966-944837718-deppak-dhyani.jpeg','image5-1722417456966-522345856-amu7.jpg','cbhfg',31),('xfbgf','xfbgf',0,89,'ghbvgnb','dcfbv','cbv bv','vbhgn b','bvbn ',67,78,'gnbn bb','fghfbv','fbv   bvnb','vcdvc','','','image1-1722417605064-815019327-amu7.jpg','image2-1722417605065-179327663-360_f_317759691_togvuriztxp5pyhfy33i5cqazw8fxk0g.jpg','image3-1722417605065-480512562-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722417605071-124147330-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image5-1722417605077-965013454-37f1b8cf-f24b-4f4f-8a2f-f1a7652e1e8c.jpeg','vngnhnb',32),('gfbvb','gfbvb',0,90,'afdv','sdfvdcv','dvcv ','nhjhj','nhj',89,68,'fdvcv ','vfdd','dfdgh','gfhbg','','','image1-1722417980092-711174055-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image2-1722417980099-683805219-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg','image3-1722417980105-953083982-0a374456-f48c-4a08-a307-2a245f356ccf.jpg','image4-1722417980113-333942179-0c4fe9eb-95f0-44c6-9eea-5e584483daa0.jpg','image5-1722417980123-481567248-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','v cbvbb',33),('gfbvb','gfbvb',0,90,'afdv','sdfvdcv','dvcv ','nhjhj','nhj',89,68,'fdvcv ','vfdd','dfdgh','gfhbg','','','image1-1722418307011-495828189-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image2-1722418307016-826550703-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg','image3-1722418307022-160718741-0a374456-f48c-4a08-a307-2a245f356ccf.jpg','image4-1722418307025-714031891-0c4fe9eb-95f0-44c6-9eea-5e584483daa0.jpg','image5-1722418307030-598900990-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','v cbvbb',34),('xfb v ','xfb-v',0,78,'ghnhbnb','fhbgvn','vbcvb ','tyhgn','hfhgf',67,89,'vbnbvn','nbnbm','b vb','vbcbvv','','','image1-1722418450270-328709779-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','image2-1722418450273-955820111-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722418450276-710606585-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg','image4-1722418450286-846650672-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722418450291-6113461-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','vbvcn',35),('xfb v ','xfb-v',0,78,'ghnhbnb','fhbgvn','vbcvb ','tyhgn','hfhgf',67,89,'vbnbvn','nbnbm','b vb','vbcbvv','','','image1-1722418522402-971264378-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','image2-1722418522407-517921864-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722418522409-655991537-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg','image4-1722418522417-456762593-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722418522421-867544896-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','vbvcn',36),('xfb v ','xfb-v',0,78,'ghnhbnb','fhbgvn','vbcvb ','tyhgn','hfhgf',67,89,'vbnbvn','nbnbm','b vb','vbcbvv','','','image1-1722418739385-487007920-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','image2-1722418739389-348283039-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722418739390-234540355-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg','image4-1722418739392-462239990-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722418739398-321063768-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','vbvcn',37),('nbghg','nbghg',0,79,'bnvbn b','cxbvvc','vbvn b','vnnvbn','vnv',78,89,'vnvbmnb','vnvbnb','vnvbnbm','vnvbn','','','image1-1722419001844-760534394-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419001848-709888118-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image3-1722419001851-99551252-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image4-1722419001861-186200680-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image5-1722419001865-172089708-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','vnbv ',38),('nbghg','nbghg',0,79,'bnvbn b','cxbvvc','vbvn b','vnnvbn','vnv',78,89,'vnvbmnb','vnvbnb','vnvbnbm','vnvbn','','','image1-1722419250981-660874804-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419250985-799216186-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image3-1722419250986-672441100-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image4-1722419250987-88119681-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image5-1722419250988-913077989-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','vnbv ',39),('vcx c','vcx-c',0,90,'gfhgb','ghgnb','ghgn b','hvgjgyjbn','bmm',89,89,'bnbvn','gfhgb','ghfhg','gfjhyj','','','image1-1722419443730-176298835-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419443739-469651191-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722419443742-484595079-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722419443745-616771293-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722419443748-873247414-0ed44444-ee2d-41a1-8194-a34a7fd29727.jpg','bnbnv',40),('dgf','dgf',24,780,'sdsd','fsdfd','gfgfb','gfg','fhgjh',78,90,'hnjbhm','bmnbm','bjmnbm ','bmnbmn','bmnbm','nmbn','image1-1722419801358-252808691-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419801366-976717519-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722419801371-342021457-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722419801375-398932433-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722419801379-887922028-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','fhhgf',41),('dgf','dgf',22,780,'sdsd','fsdfd','gfgfb','gfg','fhgjh',78,90,'hnjbhm','bmnbm','bjmnbm ','bmnbmn','bmnbm','nmbn','image1-1722419875371-495983122-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419875377-840176259-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722419875380-326150534-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722419875382-714241647-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722419875387-579796367-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','fhhgf',42),('Khushboo','khushboo',22,780,'sdsd','fsdfd','gfgfb','gfg','fhgjh',78,90,'hnjbhm','bmnbm','bjmnbm ','bmnbmn','bmnbm','nmbn','image1-1722419944751-159956818-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722419944753-389840945-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722419944757-284261109-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722419944760-243600498-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722419944763-698150368-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','fhhgf',43),('Khushboo2','khushboo2',22,780,'This is a good description','nickname1','nickname2','1kg','500gram',79,90,'8908767','This is a good recepie','You May Also Like','this is good link','This is difficult restriction','free','image1-1722420223283-129919967-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722420223289-15436001-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722420223293-359028873-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722420223309-489983218-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722420223315-834470385-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','nickname3',44),('anu','anu',22,780,'This is a good description','nickname1','nickname2','1kg','500gram',79,90,'8908767','This is a good recepie','You May Also Like','this is good link','This is difficult restriction','free','image1-1722420300961-191787672-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722420300967-450500797-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image3-1722420300969-444292339-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722420300971-362406579-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722420300977-833299752-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','nickname3',45),('hghgj','hghgj',25,89,'ghgnbn',' nmn,',' bnbn ','nbbn','ghgnb ',79,89,'ghjghb',' bnbn',' nbn ','nbjhn ',' bnbn ','paid','image1-1722420829382-328910335-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722420829389-987816035-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','image3-1722420829402-135227149-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image4-1722420829414-320578164-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','image5-1722420829437-753996932-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg',' mn ',46),('Khushboo','khushboo',25,89,'ghgnbn',' nmn,',' bnbn ','nbbn','ghgnb ',79,89,'ghjghb',' bnbn',' nbn ','nbjhn ',' bnbn ','paid','image1-1722421749764-155673707-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722421749789-719761893-1d96120f-54e2-4d00-bcc1-d01ee915424e.jpg','image3-1722421749798-904211101-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image4-1722421749801-39200107-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','image5-1722421749804-550619-1a59a130-8de6-4135-8caf-85705cd53cfc.jpg',' mn ',47),('hgjhjkhjnjkkhj','hgjhjkhjnjkkhj',28,90,'hgbjghj','hjhkjk',' nmhmnm','jhhj','m,, hjhjbm',61,89,'nhuhjbn','nghyhb','you may also like','nghjgbnb ','bhjhbn ','nbghjgbnb ','image1-1722422519176-738670464-03c8c6dd-b86a-4f07-8494-7689bd3330e9.jpg','image2-1722422519187-204713811-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722422519191-996588881-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image4-1722422519197-875002881-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image5-1722422519200-595449391-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','ghghj',48),('khushboo10','khushboo10',24,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722489546833-957161087-barnyard-millet-noodle.jpg','image2-1722489546841-804571577-barnyard-millet-pasta.jpg','image3-1722489546843-843951092-achaar.jpg','image4-1722489546845-797805530-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image5-1722489546848-59188498-37f1b8cf-f24b-4f4f-8a2f-f1a7652e1e8c.jpeg','bvbdshdsbx',49),('khushboo11','khushboo11',24,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722489726118-954778697-barnyard-millet-noodle.jpg','image2-1722489726124-53230162-barnyard-millet-pasta.jpg','image3-1722489726129-486227813-achaar.jpg','image4-1722489726131-177255078-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image5-1722489726154-460559743-barnyard-millet-pasta.jpg','bvbdshdsbx',50),('khushboo12','khushboo12',24,68,'dgvhbvb','fsdvfdgvc','cdxfvcv','vcbfg','dfdgfh',46,68,'dfxvcvc','fgbcvb ','cfdgfhg','dvcv c ','sdsfd','vcv cb','image1-1722489788533-123643859-barnyard-millet-noodle.jpg','image2-1722489788543-98974591-barnyard-millet-pasta.jpg','image3-1722489788548-137540835-barnyard-millet-noodle.jpg','image4-1722489788552-879072649-barnyard-millet-pasta.jpg','image5-1722489788557-654371905-barnyard-millet-pasta.jpg','bvbdshdsbx',51),('gfbvb v','gfbvb-v',19,57,'fdgfbv','fhfghn','ghfhgg','gnhgbnb','vbhbfg',89,89,'hgnm ','gnb','vnb','bnbn ','nbvbn ','vnbv','image1-1722490600950-387179012-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722490600959-184499265-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722490600963-9232558-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image4-1722490600966-356763418-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','image5-1722490600970-146870075-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','fhgnb',52),('khushboo','khushboo',19,57,'fdgfbv','fhfghn','ghfhgg','gnhgbnb','vbhbfg',89,89,'hgnm ','gnb','vnb','bnbn ','nbvbn ','vnbv','image1-1722490692910-615378605-2bccd9df-2b1a-4952-bd8f-c8899b2795da.jpg','image2-1722490692924-250811812-3c6c7734-3b86-4ffe-ab3c-88d146a47136.jpg','image3-1722490692931-670288022-1ad06d4e-79cb-40b4-a962-aac9ebd5d08f.jpg','image4-1722490692938-969661007-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','image5-1722490692951-504493811-01e83e67-46b1-49ae-83a4-4ae3fbb3bd77.jpg','fhgnb',53),('fhggnbn','fhggnbn',31,67,'fhgj','fgfhg','fgfg','cgh','dgfh',78,78,'rygfb','fhgjh','fhgh','gfhgh','gjhj','hgfhfh','image1-1722660251633-876643242-barnyard-millet-noodle.jpg','image2-1722660251641-655649838-barnyard-millet-pasta.jpg','image3-1722660251645-466045522-achaar.jpg','image4-1722660251646-904708650-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image5-1722660251652-595401291-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','fgh',54),('Khushboo2','khushboo2',34,89,'i love this product','','','','',0,0,'','','','','','','image1-1722855631471-257111675-barnyard-millet-noodle.jpg','image2-1722855631493-959852523-badiya.jpeg','image3-1722855631494-296890255-achaar.jpg','image4-1722855631496-755668577-amu7.jpg','image5-1722855631497-674276368-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','',55),('Khushboo2','khushboo2',34,89,'i love this product','hjsds','dgfdgdjk','fhgjh','fgdf',90,56,'hgnhg','gfjgh','gfhj','gjgh','free','dsgdfg','image1-1722855954566-118251854-barnyard-millet-noodle.jpg','image2-1722855954578-89732962-achaar.jpg','image3-1722855954580-638767203-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722855954591-129394481-37f1b8cf-f24b-4f4f-8a2f-f1a7652e1e8c.jpeg','image5-1722855954592-167801935-achaar.jpg','dgfh',56),('anu','anu',34,89,'i love this','nick1','nick2','3kg','600gram',79,78,'sjfhdjbcj','shdgsjbxjns','fdgfbhgg','hggg','hf','hgfh','image1-1722856129502-760652517-barnyard-millet-pasta.jpg','image2-1722856129507-911989689-achaar.jpg','image3-1722856129508-621388639-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image4-1722856129534-701711151-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image5-1722856129547-675903023-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','nick3',57),('anu2','anu2',34,8,'ahsjahsjabx','abc1','abc2','dgfdgf','hgjhgj',89,90,'nnjhg','ngjhgj','ngjhgjnb ','sfdgf','gfhgjn','gjghj','image1-1722856580516-345106039-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image2-1722856580532-90131627-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722856580537-88622731-amu7.jpg','image4-1722856580537-645544963-360_f_317759691_togvuriztxp5pyhfy33i5cqazw8fxk0g.jpg','image5-1722856580538-727342491-achaar.jpg','avbc',58),('anu5','anu5',34,8,'ahsjahsjabx','abc1','abc2','dgfdgf','hgjhgj',89,90,'nnjhg','ngjhgj','ngjhgjnb ','sfdgf','gfhgjn','gjghj','image1-1722856782701-498847291-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','image2-1722856782707-345823123-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722856782712-861641167-amu7.jpg','image4-1722856782713-897317693-360_f_317759691_togvuriztxp5pyhfy33i5cqazw8fxk0g.jpg','image5-1722856782713-436676900-achaar.jpg','avbc',59),('anu5','anu5',34,8,'ahsjahsjabx','anu1','anu2','1kg','500gr5am',78,40,'sdfhdjvndjfg','I love my recepie','maini products','sfkdsjgkdfjghfgmb bmb','gfhgjn','free','image1-1722856904030-148132883-barnyard-millet-noodle.jpg','image2-1722856904038-164772674-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','image3-1722856904042-96759688-amu7.jpg','image4-1722856904043-597618063-360_f_317759691_togvuriztxp5pyhfy33i5cqazw8fxk0g.jpg','image5-1722856904043-622079268-achaar.jpg','anu3',60),('anuradha','anuradha',34,40,'i this is a good things','anuradha1','anuradha2','2kg','500gram',78,66,'fgjgh','hgkjhkjgh','kjlkl','ghkjl','hkjlk','kj;kl\'/','image1-1722857055285-535382814-barnyard-millet-pasta.jpg','image2-1722857055291-195422309-achaar.jpg','image3-1722857055291-706777699-barnyard-millet-pasta.jpg','image4-1722857055295-732465653-achaar.jpg','image5-1722857055295-412361551-barnyard-millet-pasta.jpg','anuradha3',61);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sayara_news`
--

DROP TABLE IF EXISTS `sayara_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sayara_news` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sayara_news`
--

LOCK TABLES `sayara_news` WRITE;
/*!40000 ALTER TABLE `sayara_news` DISABLE KEYS */;
INSERT INTO `sayara_news` VALUES ('0b7c779e-c043-4993-945c-4a7f8121bc0b','image-1722848648051-120536886-barnyard-millet-noodle.jpg','https://www.youtube.com/'),('42cc1db0-8f27-4b02-af17-7ed7a6ab8da6','image-1722844827824-625549412-barnyard-millet-noodle.jpg','hgj'),('6fcab827-247c-4467-932e-944b1c0821f5','image-1722848892789-525761199-barnyard-millet-noodle.jpg','https://www.youtube.com/'),('93cd0e03-38a6-47f0-8195-55c4122d312a','image-1723546049513-654909371-barnyard-millet-noodle.jpg','dgfhg'),('9c13f520-1a33-43b5-8d6f-4cfc66c33e4e','image-1722706975007-138082437-barnyard-millet-pasta.jpg','nbn    bn'),('c93e2a95-8784-4628-90a7-b9290f6739da','image-1722506963356-480444561-news1.jpg','https://www.youtube.com/watch?v=VJov5QWEKE4&t=1428s');
/*!40000 ALTER TABLE `sayara_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sayara_vedios`
--

DROP TABLE IF EXISTS `sayara_vedios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sayara_vedios` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sayara_vedios`
--

LOCK TABLES `sayara_vedios` WRITE;
/*!40000 ALTER TABLE `sayara_vedios` DISABLE KEYS */;
INSERT INTO `sayara_vedios` VALUES ('1b0be67f-80a9-4212-b40c-339a70bcfa5c','image-1722849350201-761768730-barnyard-millet-noodle.jpg','https://www.youtube.com/	'),('5e3a664f-c6f9-40d5-8f3a-494e4dc6752d','image-1723544311171-795237014-barnyard-millet-noodle.jpg','djfhdvbfdjkj'),('6641fe4e-7e8f-4ced-aac3-1940d2af5c9d','image-1722659398439-351529639-barnyard-millet-pasta.jpg','https://www.youtube.com/'),('83f5e4d6-ab50-4bf1-9de2-4a09f974bf47','image-1723546061077-933696473-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','fghgj'),('e028ec8f-6253-42b0-abb8-3edd59b5620f','image-1723544335145-646005195-achaar.jpg','gjhkjhukjlk'),('f98f415a-fb66-4dbf-9417-e00ab703bceb','image-1723544320609-222881567-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','gdfhgfjh');
/*!40000 ALTER TABLE `sayara_vedios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `text3`
--

DROP TABLE IF EXISTS `text3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `text3` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text3`
--

LOCK TABLES `text3` WRITE;
/*!40000 ALTER TABLE `text3` DISABLE KEYS */;
INSERT INTO `text3` VALUES (651,'image-1723459603087-470331977-barnyard-millet-pasta.jpg'),(22,'image-1723458827839-71242782-44392346-39ad-4570-9339-9f3a4cdb1345.jpg'),(4,'image-1723459702235-196173752-762a914f-2eba-4709-9525-7bd44f0744d3.jpg'),(48,'image-1723460002602-845528491-44392346-39ad-4570-9339-9f3a4cdb1345.jpg'),(337151,'image-1723460002269-958756353-44392346-39ad-4570-9339-9f3a4cdb1345.jpg'),(146,'image-1722840025019-927254530-flour--and-rice.jpeg'),(3,'image-1722686510752-545895262-barnyard-millet-pasta.jpg'),(12009,'image-1722663436032-937606530-barnyard-millet-pasta.jpg'),(428,'image-1722664372342-92888147-barnyard-millet-pasta.jpg'),(2147483647,'image-1722664485508-966173418-achaar.jpg'),(6274,'image-1722664708067-876122237-360_f_317759691_togvuriztxp5pyhfy33i5cqazw8fxk0g.jpg'),(8,'image-1723459723125-98298329-44392346-39ad-4570-9339-9f3a4cdb1345.jpg'),(56632958,'image-1723459748140-3337126-barnyard-millet-pasta.jpg'),(18,'image-1723459866446-106788658-barnyard-millet-pasta.jpg'),(7,'image-1723459866704-991327576-barnyard-millet-pasta.jpg'),(8464,'image-1723460039634-123507714-badiya.jpeg'),(67,'image-1723460056973-843124329-achaar.jpg'),(69,'image-1723460070514-804860255-amu7.jpg'),(9,'image-1723460177653-431261151-barnyard-millet-noodle.jpg'),(90203,'image-1723460198776-536345158-44392346-39ad-4570-9339-9f3a4cdb1345.jpg');
/*!40000 ALTER TABLE `text3` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top-categories`
--

DROP TABLE IF EXISTS `top-categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top-categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `name` text NOT NULL,
  `description` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2147483648 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top-categories`
--

LOCK TABLES `top-categories` WRITE;
/*!40000 ALTER TABLE `top-categories` DISABLE KEYS */;
INSERT INTO `top-categories` VALUES (875,'image-1723545725165-987870738-barnyard-millet-noodle.jpg','gdfh','fhgjh'),(331000,'image-1722842845224-872547604-24488ada-0426-470e-a6d0-e8cecbb694a6.jpg','dgffh','dfgfhgj'),(117696,'image-1722841430694-930706313-finger-millet--noodle.jpg','Finger Millet Pasta','I Love this product'),(4,'image-1722841520634-785023454-barnyard-millet-pasta.jpg','asjhdsjhf','fjsdhjfhdj'),(60000000,'image-1722841720313-708823511-44392346-39ad-4570-9339-9f3a4cdb1345.jpg','hghj','fhjhgfhgf'),(64394915,'image-1722841741421-215354239-37f1b8cf-f24b-4f4f-8a2f-f1a7652e1e8c.jpeg','khushboo','dfdgf'),(2147483647,'image-1722842709847-289152441-barnyard-millet-pasta.jpg','asgv','ddfg');
/*!40000 ALTER TABLE `top-categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `whatsNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_doe','john@example.com','123-456-7890','2024-07-31 11:25:18','2024-07-31 11:25:18',NULL,NULL,NULL),(2,'Anu12','anu8756@gmail.com','8707087926','2024-07-31 11:26:37','2024-07-31 11:35:33',NULL,NULL,NULL),(6,'Anukhushb','anukhush8756@gmail.com','8707087926','2024-07-31 11:36:04','2024-07-31 11:36:04',NULL,NULL,NULL),(7,'Anushka','anushka8756@gmail.com','8707087926','2024-07-31 11:36:46','2024-07-31 11:36:46',NULL,NULL,NULL),(8,'Anushka2','anushk28756@gmail.com','8707087926','2024-08-01 05:17:22','2024-08-01 05:17:22',NULL,NULL,NULL),(9,'Anushka6','anushk78756@gmail.com','8707087926','2024-08-01 05:21:22','2024-08-01 05:21:22',NULL,NULL,NULL),(10,'Anushka7','anushk88756@gmail.com','8707087926','2024-08-01 05:23:31','2024-08-01 05:23:31',NULL,NULL,NULL),(14,'john_doe1','john@exampl.com','12345678901','2024-08-08 10:10:58','2024-08-08 10:10:58','1','123 Main St','1000'),(15,'Anu','Anu@exampl.com','8090131405','2024-08-08 10:17:14','2024-08-08 10:17:14','8090131405','shahabad hardoi','241124'),(16,'admin','admin@gmail.com','8707087926','2024-08-08 10:29:55','2024-08-08 10:29:55','8707087925','mhjhsds','241125'),(18,'admin1','admin1@gmail.com','8707087926','2024-08-08 10:33:22','2024-08-08 10:33:22','8707087925','mhjhsds','241125'),(19,'admin2','admin2@gmail.com','8707087926','2024-08-08 10:35:10','2024-08-08 10:35:10','8707087925','mhjhsds','241125'),(20,'admin5','admin5@gmail.com','8707087926','2024-08-08 10:35:25','2024-08-08 10:35:25','8707087925','mhjhsds','241125'),(21,'admin6','admin6@gmail.com','8707087926','2024-08-08 10:37:06','2024-08-08 10:37:06','8707087925','mhjhsds','241125'),(22,'admin7','admin7@gmail.com','8707087926','2024-08-08 10:38:45','2024-08-08 10:38:45','8707087925','mhjhsds','241125'),(23,'admin8','admin8@gmail.com','8707087926','2024-08-08 10:42:33','2024-08-08 10:42:33','8707087925','mhjhsds','241125'),(24,'admin9','admin9@gmail.com','8707087926','2024-08-08 10:43:51','2024-08-08 10:43:51','8707087925','mhjhsds','241125'),(25,'admin10','admin10@gmail.com','8707087926','2024-08-08 10:44:30','2024-08-08 10:44:30','8707087925','mhjhsds','241125'),(26,'admin11','admin11@gmail.com','8707087926','2024-08-08 11:45:39','2024-08-08 11:45:39','8707087925','mhjhsds','241125'),(27,'admin12','admin12@gmail.com','8707087926','2024-08-09 04:39:09','2024-08-09 04:39:09','8707087925','mhjhsds','241125'),(28,'admin14','admin14@gmail.com','8707087926','2024-08-09 04:40:56','2024-08-09 04:40:56','8707087925','mhjhsds','241125'),(29,'anu15','admin15@gmail.com','8707087926','2024-08-09 04:42:41','2024-08-09 04:42:41','8707087925','mhjhsds','241125'),(30,'anu17','admin17@gmail.com','8707087926','2024-08-09 04:44:07','2024-08-09 04:44:07','8707087925','mhjhsds','241125'),(31,'admin17','gopalpandey8756@gmail.com','08789878787','2024-08-09 06:39:16','2024-08-09 06:39:16','8707087925','mhjhsds','241125'),(33,'admin19','gopalpande8756@gmail.com','08789878787','2024-08-09 06:44:45','2024-08-09 06:44:45','8707087925','mhjhsds','241125'),(34,'admin21','gopalpandey2156@gmail.com','08789878787','2024-08-09 06:46:42','2024-08-09 06:46:42','8707087925','mhjhsds','241125'),(35,'admin22','gopalpandey2256@gmail.com','08789878787','2024-08-09 06:57:24','2024-08-09 06:57:24','8707087925','mhjhsds','241125'),(36,'admin24','gopalpandey2456@gmail.com','08789878787','2024-08-09 06:59:42','2024-08-09 06:59:42','8707087925','mhjhsds','241125'),(37,'admin25','gopalpandey2556@gmail.com','08789878787','2024-08-09 07:23:57','2024-08-09 07:23:57','8707087925','mhjhsds','241125');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users1`
--

DROP TABLE IF EXISTS `users1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users1`
--

LOCK TABLES `users1` WRITE;
/*!40000 ALTER TABLE `users1` DISABLE KEYS */;
INSERT INTO `users1` VALUES (1,'John Doe','john@example.com','$2b$10$QmUmlt772Q1YtkJNMsSlKeetm6rEsfsUNvU/IWy3.AaRVjTFS77vy','1234567890','123 Main St',0,'2024-08-13 05:16:40','2024-08-13 05:16:40'),(2,'anu','gopalpandey8756@gmail.com','$2b$10$8b1nR978zpdbL/00.XP/B.1/z/Q1RWCZxqCLG3hlryZKDgQ.OvfIa','08789878787','mhjhsds',0,'2024-08-13 06:11:17','2024-08-13 06:11:17'),(3,'anu2','gopalpandey8758@gmail.com','$2b$10$gt0wxGAtrVE.nz9MYPv7x.UENvAGr/ZYnRwD2nE9NSNTP4xy/T1La','08789878787','mhjhsds',0,'2024-08-13 06:11:57','2024-08-13 06:11:57'),(4,'anuradha','gopalpandey8759@gmail.com','$2b$10$xDl4ZEG82y.02Ax2.OEkgegqp8G8F8tYcNBx1HYxF/rtOOmXemv3S','08789878787','mhjhsds',0,'2024-08-13 07:14:43','2024-08-13 07:14:43'),(5,'anuradha2','gopalpandey8751@gmail.com','$2b$10$Ay8XbEcmqrbMc6A97w4/cuCaII8BlczqA/zattVabg8xMLEpO3Td6','08789878787','mhjhsds',0,'2024-08-13 07:44:54','2024-08-13 07:44:54'),(6,'Deepak Dhyani','gopalpandey8754@gmail.com','$2b$10$BmONS1QTfmuwpm8LQHGLEeq6/KkD5ons.NgjCA.g1xD8ZTa8X.HnW','08789878787','mhjhsds',0,'2024-08-13 08:03:04','2024-08-13 08:03:04');
/*!40000 ALTER TABLE `users1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us`
--

DROP TABLE IF EXISTS `why_choose_us`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `why_choose_us` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50025776 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us`
--

LOCK TABLES `why_choose_us` WRITE;
/*!40000 ALTER TABLE `why_choose_us` DISABLE KEYS */;
INSERT INTO `why_choose_us` VALUES (5,'image-1724229560271-968690053-2f69e763-d50d-4278-8f64-7d36815a1531.jpeg','DGBCFBH'),(9,'image-1724238440923-62536903-93bc7e50-c7ab-477d-8cb7-8b0ada119cea.jpeg','t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '),(51,'image-1724229704309-544806288-3baa0b9e-70b3-4c2d-bff4-46e8e6fc406c.jpeg','ESGFG'),(68,'image-1724229869142-804356760-4b71884c-084b-4a5c-b7f8-12aeb6029d13.jpeg','FFHFGH'),(372,'image-1724224237362-451585298-27018b1d-6ea1-4ed6-aa4d-1fba64a8fe56.jpeg','fhgjhg'),(916,'image-1724224351773-461958853-c496e898-7ce1-4df5-b6e6-61d3208887d8.jpeg','jjgjjh'),(7396,'image-1724230044411-635633902-e0d6c50e-5461-4f60-aa90-388118152415.jpeg','fjhgjh'),(851700,'image-1724229726628-313424441-98bb82f5-b925-4dcf-83ef-961d40b959ea.jpeg','GHGJ'),(941460,'image-1724223836941-757723390-55612f5c-8010-4c06-b659-aa6e98967198.jpeg','fdhfghgj'),(29445594,'image-1724229902329-143099066-0563b713-af1c-4bb7-bb84-5392a75974f9.jpeg',' BNBM'),(50025761,'image-1724223887850-15426755-93bc7e50-c7ab-477d-8cb7-8b0ada119cea.jpeg','rgfhbgf'),(50025762,'image-1724223913666-846304190-4f361df0-0e84-4ac6-a748-24a13dac8de8.jpeg','fhhghjhg'),(50025763,'image-1724223997641-375845043-deb1e803-6e41-4b53-bc69-073201ea34b9.jpeg','dgfg'),(50025764,'image-1724224127208-605412261-e0d6c50e-5461-4f60-aa90-388118152415.jpeg','fsfdg'),(50025765,'image-1724224318185-666081314-0ebcdc8b-d9a3-4568-991c-3a5a9bb775a5.jpeg','jhjhkj'),(50025767,'image-1724228758512-822827200-af2ffd8d-ebaf-46e6-8396-e50770fca767.jpeg','jnbmn'),(50025768,'image-1724228800876-761774347-2c0e4834-48ae-4d6a-b664-ac45f875cc92.jpeg','hgjhj'),(50025769,'image-1724228811794-319888026-988675ad-2155-4023-b1f5-96e3339ac570.jpeg','mn,mn,'),(50025770,'image-1724228835920-235032549-988675ad-2155-4023-b1f5-96e3339ac570.jpeg','vmckgjbk'),(50025771,'image-1724229208381-554470562-98bb82f5-b925-4dcf-83ef-961d40b959ea.jpeg','fjnhgj'),(50025772,'image-1724229416156-354964485-4f361df0-0e84-4ac6-a748-24a13dac8de8.jpeg','FHGJHCFBV'),(50025773,'image-1724229756502-69027042-0563b713-af1c-4bb7-bb84-5392a75974f9.jpeg','LK/K/'),(50025774,'image-1724229979454-145289039-2c0e4834-48ae-4d6a-b664-ac45f875cc92.jpeg','GJHJ'),(50025775,'image-1724230068223-134908515-4b71884c-084b-4a5c-b7f8-12aeb6029d13.jpeg','ngjngvhj');
/*!40000 ALTER TABLE `why_choose_us` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-22 14:52:09
