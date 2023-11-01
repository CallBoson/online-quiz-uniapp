CREATE DATABASE  IF NOT EXISTS `online_quiz` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `online_quiz`;
-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: online_quiz
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `authority` int NOT NULL,
  `group_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_members_group_id_user_id_unique` (`group_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
INSERT INTO `group_members` VALUES (1,'Owner',1,1,1,'2023-04-21 03:52:52','2023-04-21 03:52:52'),(2,'Owner',1,2,1,'2023-04-21 03:55:07','2023-04-21 03:55:07');
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `owner_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,'有趣科学',NULL,0,1,'2023-04-21 03:52:52','2023-04-21 03:52:52'),(2,'中外历史',NULL,0,1,'2023-04-21 03:55:07','2023-04-21 03:55:07');
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_bank_tag`
--

DROP TABLE IF EXISTS `question_bank_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_bank_tag` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `QuestionBankId` int NOT NULL,
  `TagId` int NOT NULL,
  PRIMARY KEY (`QuestionBankId`,`TagId`),
  KEY `TagId` (`TagId`),
  CONSTRAINT `question_bank_tag_ibfk_1` FOREIGN KEY (`QuestionBankId`) REFERENCES `question_banks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_bank_tag_ibfk_2` FOREIGN KEY (`TagId`) REFERENCES `Tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_bank_tag`
--

LOCK TABLES `question_bank_tag` WRITE;
/*!40000 ALTER TABLE `question_bank_tag` DISABLE KEYS */;
INSERT INTO `question_bank_tag` VALUES ('2023-03-30 03:37:46','2023-03-30 03:37:46',26,1),('2023-03-30 03:37:51','2023-03-30 03:37:51',26,2),('2023-03-30 03:37:51','2023-03-30 03:37:51',26,3),('2023-04-07 01:39:50','2023-04-07 01:39:50',29,5),('2023-04-07 01:39:56','2023-04-07 01:39:56',30,5),('2023-04-07 01:40:12','2023-04-07 01:40:12',31,4),('2023-04-07 01:40:19','2023-04-07 01:40:19',32,4),('2023-04-07 01:40:27','2023-04-07 01:40:27',33,4),('2023-04-07 01:40:34','2023-04-07 01:40:34',34,4),('2023-04-07 01:40:43','2023-04-07 01:40:43',35,3),('2023-04-07 01:40:49','2023-04-07 01:40:49',36,3),('2023-04-07 01:52:47','2023-04-07 01:52:47',37,3),('2023-04-07 01:52:54','2023-04-07 01:52:54',38,3),('2023-04-07 01:53:00','2023-04-07 01:53:00',39,3),('2023-04-07 01:53:06','2023-04-07 01:53:06',40,3),('2023-04-07 02:08:56','2023-04-07 02:08:56',41,3),('2023-04-20 09:50:34','2023-04-20 09:50:34',42,3);
/*!40000 ALTER TABLE `question_bank_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_banks`
--

DROP TABLE IF EXISTS `question_banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_banks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cover` text,
  `is_private` tinyint(1) NOT NULL DEFAULT '1',
  `owner_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `question_banks_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_banks`
--

LOCK TABLES `question_banks` WRITE;
/*!40000 ALTER TABLE `question_banks` DISABLE KEYS */;
INSERT INTO `question_banks` VALUES (26,'海绵宝宝知识点','http://boson-website.oss-cn-hangzhou.aliyuncs.com/online-quiz/uploads/images/2023-03-30T03-44-54.668Z-src=http___5b0988e595225.cdn.sohucs.com_q_70,c_zoom,w_640_images_20191209_977c0abdf00c4243a12bee44513130a0.gif&refer=http___5b0988e595225.cdn.sohucs.gif',0,1,'2023-03-30 03:22:25','2023-03-30 03:46:33'),(29,'Vue2','',0,1,'2023-04-07 01:39:50','2023-04-07 01:39:50'),(30,'Vue3','',0,1,'2023-04-07 01:39:56','2023-04-07 01:39:56'),(31,'驾驶证科目1','',0,1,'2023-04-07 01:40:12','2023-04-07 01:40:12'),(32,'驾驶证科目4','',0,1,'2023-04-07 01:40:19','2023-04-07 01:40:19'),(33,'教师证','',0,1,'2023-04-07 01:40:27','2023-04-07 01:40:27'),(34,'公务员','',0,1,'2023-04-07 01:40:34','2023-04-07 01:40:34'),(35,'高一数学','',0,1,'2023-04-07 01:40:43','2023-04-07 01:40:43'),(36,'高二数学','',0,1,'2023-04-07 01:40:49','2023-04-07 01:40:49'),(37,'一年级语文','',0,1,'2023-04-07 01:52:47','2023-04-07 01:52:47'),(38,'二年级语文','',0,1,'2023-04-07 01:52:54','2023-04-07 01:52:54'),(39,'三年级语文','',0,1,'2023-04-07 01:53:00','2023-04-07 01:53:00'),(40,'四年级语文','',0,1,'2023-04-07 01:53:06','2023-04-07 01:53:06'),(41,'English','',0,1,'2023-04-07 02:08:56','2023-04-07 02:08:56'),(42,'世界历史','',0,1,'2023-04-20 09:50:34','2023-04-20 09:50:34');
/*!40000 ALTER TABLE `question_banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `question` text NOT NULL,
  `answer_single` text,
  `answer_multiple` text,
  `answer_judge` text,
  `answer_fill` text,
  `analysis` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `question_bank_id` int DEFAULT NULL,
  `quiz_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `question_bank_id` (`question_bank_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`question_bank_id`) REFERENCES `question_banks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (17,1,'{\"content\":\"以下哪首是张天赋的歌曲？\"}','[{\"content\":\"记忆棒\",\"isAnswer\":0},{\"content\":\"记忆棉\",\"isAnswer\":1},{\"content\":\"记忆签\",\"isAnswer\":0},{\"content\":\"鸡翼\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"bb\"}','2023-04-04 01:55:31','2023-04-04 09:36:32',26,NULL),(18,1,'{\"content\":\"我的名字？\"}','[{\"content\":\"刘家宝\",\"isAnswer\":0},{\"content\":\"唐绮蔚\",\"isAnswer\":1}]',NULL,NULL,NULL,'{\"content\":\"嘻嘻\"}','2023-04-04 01:59:35','2023-04-04 01:59:35',26,NULL),(19,1,'{\"content\":\"我在听什么歌？\"}','[{\"content\":\"广州气象台\",\"isAnswer\":1},{\"content\":\"杭州气象台\",\"isAnswer\":0},{\"content\":\"浙江气象台\",\"isAnswer\":0},{\"content\":\"上海气象台\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"是Faber唱的广州气象台\"}','2023-04-04 02:02:59','2023-04-04 02:02:59',26,NULL),(20,2,'{\"content\":\"你好，这是多选题\"}',NULL,'[{\"content\":\"是啊\",\"isAnswer\":1},{\"content\":\"不然呢\",\"isAnswer\":1},{\"content\":\"正确答案\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-04 03:22:33','2023-04-04 09:56:26',26,NULL),(21,3,'{\"content\":\"我是傻子吗？\"}',NULL,NULL,'0',NULL,'{\"content\":\"靓仔\"}','2023-04-04 03:36:05','2023-04-04 03:36:05',26,NULL),(26,3,'{\"content\":\"你觉得你是美女吗？\"}',NULL,NULL,'0',NULL,'{\"content\":\"肯定是啦\"}','2023-04-04 09:57:22','2023-04-06 01:12:08',NULL,NULL),(27,1,'{\"content\":\"要是最美的人，不管每个夜晚\"}','[{\"content\":\"11\",\"isAnswer\":0},{\"content\":\"112\",\"isAnswer\":1}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-06 03:44:49','2023-04-06 03:44:49',26,NULL),(39,1,'{\"content\":\"Excuse me, _____ can i go to the hospital?\"}','[{\"content\":\"when\",\"isAnswer\":0},{\"content\":\"how\",\"isAnswer\":1},{\"content\":\"what\",\"isAnswer\":0},{\"content\":\"where\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-07 06:21:52','2023-04-07 06:21:52',40,NULL),(40,2,'{\"content\":\"你好，这是多选题\"}',NULL,'[{\"content\":\"是啊\",\"isAnswer\":1},{\"content\":\"不然呢\",\"isAnswer\":1},{\"content\":\"正确答案\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-07 06:21:52','2023-04-07 06:21:52',40,NULL),(41,3,'{\"content\":\"我是傻子吗？\"}',NULL,NULL,'0',NULL,'{\"content\":\"靓仔\"}','2023-04-07 06:21:52','2023-04-07 06:21:52',40,NULL),(44,3,'{\"content\":\"现在新建一个判断题\"}',NULL,NULL,'1',NULL,'{\"content\":\"\"}','2023-04-07 09:26:08','2023-04-08 16:38:51',38,NULL),(46,1,'{\"content\":\"Excuse me, _____ can i go to the hospital?\"}','[{\"content\":\"when\",\"isAnswer\":0},{\"content\":\"how\",\"isAnswer\":1},{\"content\":\"what\",\"isAnswer\":0},{\"content\":\"where\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-08 16:36:55','2023-04-11 01:48:53',41,NULL),(49,3,'{\"content\":\"唐绮蔚是猪吗？\"}',NULL,NULL,'{\"answer\":true}',NULL,'{\"content\":\"是的，这个不用解释\"}','2023-04-08 17:01:36','2023-04-08 17:01:36',NULL,2),(64,2,'{\"content\":\"你好，这是多选题\"}',NULL,'[{\"content\":\"是啊\",\"isAnswer\":1},{\"content\":\"不然呢\",\"isAnswer\":1},{\"content\":\"正确答案\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-11 01:43:27','2023-04-11 01:43:27',NULL,3),(65,1,'{\"content\":\"要是最美的人，不管每个夜晚\"}','[{\"content\":\"11\",\"isAnswer\":0},{\"content\":\"112\",\"isAnswer\":1}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-11 01:43:27','2023-04-11 01:43:27',NULL,3),(69,1,'{\"content\":\"________ it is today!\"}','[{\"content\":\"What fine weather\",\"isAnswer\":1},{\"content\":\"What a fine weather\",\"isAnswer\":0},{\"content\":\"How a fine weather\",\"isAnswer\":0},{\"content\":\"How fine a weather\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选A. 此题容易误选B. weather是不可数名词，前面不能有不定冠词。英语中经常考查的不可数名词有work, news, adivice, information等。\"}','2023-04-11 02:09:20','2023-04-11 02:09:20',41,NULL),(70,1,'{\"content\":\"Which is the way to the __________?\"}','[{\"content\":\"shoe factory\",\"isAnswer\":1},{\"content\":\"shoes factory\",\"isAnswer\":0},{\"content\":\"shoe’s factory\",\"isAnswer\":0},{\"content\":\"shoes’ factory\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选A. 此题极易误选B, C, D. 英语中名词单数可以修饰名词，如：an apple tree—two apple trees. 但注意 a man teacher—two men teachers。\"}','2023-04-11 02:10:16','2023-04-11 02:10:16',41,NULL),(71,1,'{\"content\":\"This class ________ now. Miss Gao teaches them.\"}','[{\"content\":\"are studying\",\"isAnswer\":1},{\"content\":\"is studying\",\"isAnswer\":0},{\"content\":\"be studying\",\"isAnswer\":0},{\"content\":\"studying\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选A. 此题容易误选B. class, family, team等单词如果表示整体谓语就用单数，表示个体就用复数，从语境及其后面的代词them可以看出，class表示个体，故选择A。\"}','2023-04-11 02:10:55','2023-04-11 02:10:55',41,NULL),(72,1,'{\"content\":\"We will have a _________ holiday after the exam.\"}','[{\"content\":\"two month\",\"isAnswer\":0},{\"content\":\"two-month\",\"isAnswer\":1},{\"content\":\"two month’s\",\"isAnswer\":0},{\"content\":\"two-months\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选择B. 此题容易误选C, D. 在英语中数词中间用连字符号加名词单数，构成符合名词，在句中只能作定语， 如果选择C, 需要把逗号放s后面。\"}','2023-04-11 02:11:27','2023-04-11 02:11:27',41,NULL),(73,2,'{\"content\":\"Which of the following are advantages of using renewable energy sources?\"}',NULL,'[{\"content\":\"They are cheaper than fossil fuels.\",\"isAnswer\":0},{\"content\":\"They produce fewer greenhouse gas emissions.\",\"isAnswer\":1},{\"content\":\"They are not available everywhere.\",\"isAnswer\":0},{\"content\":\"They do not require as much maintenance as traditional power sources.\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-11 02:17:18','2023-04-11 02:17:18',41,NULL),(74,1,'{\"content\":\"Which is the way to the __________?\"}','[{\"content\":\"shoe factory\",\"isAnswer\":1},{\"content\":\"shoes factory\",\"isAnswer\":0},{\"content\":\"shoe’s factory\",\"isAnswer\":0},{\"content\":\"shoes’ factory\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选A. 此题极易误选B, C, D. 英语中名词单数可以修饰名词，如：an apple tree—two apple trees. 但注意 a man teacher—two men teachers。\"}','2023-04-18 03:19:23','2023-04-18 03:19:23',NULL,4),(75,1,'{\"content\":\"This class ________ now. Miss Gao teaches them.\"}','[{\"content\":\"are studying\",\"isAnswer\":1},{\"content\":\"is studying\",\"isAnswer\":0},{\"content\":\"be studying\",\"isAnswer\":0},{\"content\":\"studying\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"选A. 此题容易误选B. class, family, team等单词如果表示整体谓语就用单数，表示个体就用复数，从语境及其后面的代词them可以看出，class表示个体，故选择A。\"}','2023-04-18 03:19:23','2023-04-18 03:19:23',NULL,4),(76,2,'{\"content\":\"Which of the following are advantages of using renewable energy sources?\"}',NULL,'[{\"content\":\"They are cheaper than fossil fuels.\",\"isAnswer\":0},{\"content\":\"They produce fewer greenhouse gas emissions.\",\"isAnswer\":1},{\"content\":\"They are not available everywhere.\",\"isAnswer\":0},{\"content\":\"They do not require as much maintenance as traditional power sources.\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-18 03:19:23','2023-04-18 03:19:23',NULL,4),(77,1,'{\"content\":\"以下哪首是张天赋的歌曲？\"}','[{\"content\":\"记忆棒\",\"isAnswer\":0},{\"content\":\"记忆棉\",\"isAnswer\":1},{\"content\":\"记忆签\",\"isAnswer\":0},{\"content\":\"鸡翼\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"bb\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(78,1,'{\"content\":\"我在听什么歌？\"}','[{\"content\":\"广州气象台\",\"isAnswer\":1},{\"content\":\"杭州气象台\",\"isAnswer\":0},{\"content\":\"浙江气象台\",\"isAnswer\":0},{\"content\":\"上海气象台\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"是Faber唱的广州气象台\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(79,2,'{\"content\":\"你好，这是多选题\"}',NULL,'[{\"content\":\"是啊\",\"isAnswer\":1},{\"content\":\"不然呢\",\"isAnswer\":1},{\"content\":\"正确答案\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(80,4,'{\"content\":\"和你____了画面，栗子们_____\"}',NULL,NULL,NULL,'[[\"构成\"],[\"一颗又一颗\",\"一个又一个\"]]','{\"content\":\"\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(81,5,'{\"content\":\"美轮美奂\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(82,3,'{\"content\":\"haha\"}',NULL,NULL,'{\"answer\":true}',NULL,'{\"content\":\"\"}','2023-04-18 08:22:57','2023-04-18 08:22:57',NULL,5),(83,5,'{\"content\":\"面对复杂局面应如何运用好辩证思维?\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-19 08:53:32','2023-04-19 08:53:32',NULL,6),(84,5,'{\"content\":\"面对复杂局面应如何运用好辩证思维?\"}',NULL,NULL,NULL,NULL,'{\"content\":\"（1）要想更好地运用辩证思维，首先是要坚持学习和运用唯物辩证法，即要坚持联系的、发展的、矛盾的观点看问题和解决问题，不能片面的、孤立的、静止的看问题，这样才能让我们在面对复杂局面的时候能妥善处理各种重大关系，有效解决影响中国特色社会主义前进发展中存在的各种矛盾。\\n\\n（2）辩证思维能力就是用矛盾的、联系的、发展的观点看问题，即承认矛盾、分析矛盾、解决矛盾，善于抓住关键、找准重点、洞察事物发展规律的能力，就要求实事求是的充分发挥主观能动性，在科学理论的指导下采用两点论和重点论结合的方式处理和解决复杂局面中出现的各种问题，尊重历史，尊重规律，按规律办事。\"}','2023-04-19 08:53:32','2023-04-19 08:53:32',NULL,6),(85,5,'{\"content\":\"请描述一下你去过什么地方旅游？并简述那次旅游的经历。\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:06','2023-04-20 09:44:06',41,NULL),(86,5,'{\"content\":\"Please describe where you have traveled? And briefly describe the experience of that trip.\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:12','2023-04-20 09:44:12',41,NULL),(87,1,'{\"content\":\"Excuse me, _____ can i go to the hospital?\"}','[{\"content\":\"when\",\"isAnswer\":0},{\"content\":\"how\",\"isAnswer\":1},{\"content\":\"what\",\"isAnswer\":0},{\"content\":\"where\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:50','2023-04-20 09:44:50',NULL,7),(88,2,'{\"content\":\"Which of the following are advantages of using renewable energy sources?\"}',NULL,'[{\"content\":\"They are cheaper than fossil fuels.\",\"isAnswer\":0},{\"content\":\"They produce fewer greenhouse gas emissions.\",\"isAnswer\":1},{\"content\":\"They are not available everywhere.\",\"isAnswer\":0},{\"content\":\"They do not require as much maintenance as traditional power sources.\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:50','2023-04-20 09:44:50',NULL,7),(89,5,'{\"content\":\"请描述一下你去过什么地方旅游？并简述那次旅游的经历。\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:50','2023-04-20 09:44:50',NULL,7),(90,5,'{\"content\":\"Please describe where you have traveled? And briefly describe the experience of that trip.\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-20 09:44:50','2023-04-20 09:44:50',NULL,7),(91,5,'{\"content\":\"14——16世纪文艺复兴运动的指导思想是什么？它是古希腊、古罗马文化的复兴吗？为什么？文艺复兴运动有何影响？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"文艺复兴运动的指导思想是人文主义。它不是古希腊、古罗马文化的复兴。因为它实质上是一场资产阶级反封建的思想文化运动的兴起。影响：它冲破了几百年来封建制度和宗教神学思想对人的束缚，解放了人们的思想，为资本主义的发展创造了必要的思想文化前提。\"}','2023-04-20 09:50:49','2023-04-20 09:50:49',42,NULL),(92,5,'{\"content\":\"15——16世纪西欧人为什么要开辟新航路？最早开辟新航路的国家有哪些？新航路的开辟有什么影响？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"西欧人开辟新航路的原因有：①商品经济的发展，使西欧人渴望寻求财富。②《马可·波罗行纪》使西欧各国炽烈追求东方财富。③奥斯曼土耳其帝 国阻隔了西欧各国通往东方的传统商路。最早开辟新航路的国家是西班牙和葡萄牙。新航路开辟的影响有：它推动了海外扩张和世界市场的初步形成，促进了资本的 原始积累。打破了世界各地区间的封闭和孤立状态，把旧大陆和新大陆联系在一起，世界历史迈出了从分散到整体的关键性一步。\"}','2023-04-20 09:51:04','2023-04-20 09:51:04',42,NULL),(93,5,'{\"content\":\"14——16世纪文艺复兴运动的指导思想是什么？它是古希腊、古罗马文化的复兴吗？为什么？文艺复兴运动有何影响？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"文艺复兴运动的指导思想是人文主义。它不是古希腊、古罗马文化的复兴。因为它实质上是一场资产阶级反封建的思想文化运动的兴起。影响：它冲破了几百年来封建制度和宗教神学思想对人的束缚，解放了人们的思想，为资本主义的发展创造了必要的思想文化前提。\"}','2023-04-20 09:51:20','2023-04-20 09:51:20',NULL,8),(94,5,'{\"content\":\"15——16世纪西欧人为什么要开辟新航路？最早开辟新航路的国家有哪些？新航路的开辟有什么影响？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"西欧人开辟新航路的原因有：①商品经济的发展，使西欧人渴望寻求财富。②《马可·波罗行纪》使西欧各国炽烈追求东方财富。③奥斯曼土耳其帝 国阻隔了西欧各国通往东方的传统商路。最早开辟新航路的国家是西班牙和葡萄牙。新航路开辟的影响有：它推动了海外扩张和世界市场的初步形成，促进了资本的 原始积累。打破了世界各地区间的封闭和孤立状态，把旧大陆和新大陆联系在一起，世界历史迈出了从分散到整体的关键性一步。\"}','2023-04-20 09:51:20','2023-04-20 09:51:20',NULL,8),(95,1,'{\"content\":\"新冠疫苗有必要接种吗？\"}','[{\"content\":\"有必要\",\"isAnswer\":true},{\"content\":\"没有必要\",\"isAnswer\":false}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:02:28','2023-04-21 16:02:28',NULL,9),(96,1,'{\"content\":\"当前重点接种人群为？\"}','[{\"content\":\"18岁以下\",\"isAnswer\":false},{\"content\":\"18-59岁\",\"isAnswer\":true},{\"content\":\"60岁以上\",\"isAnswer\":false}]',NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:02:28','2023-04-21 16:02:28',NULL,9),(97,3,'{\"content\":\"变更车道前确认后方无来车时可以不开转向灯变道。\"}',NULL,NULL,'{\"answer\":false}',NULL,'{\"content\":\"\"}','2023-04-21 16:18:07','2023-04-21 16:18:07',32,NULL),(98,2,'{\"content\":\"行车中驾驶人接打手机或发短信有什么危害？\"}',NULL,'[{\"content\":\"影响乘车人休息\",\"isAnswer\":1},{\"content\":\"分散驾驶注意力\",\"isAnswer\":1},{\"content\":\"遇紧急情况反应不及\",\"isAnswer\":1},{\"content\":\"影响正常驾驶操作\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:19:16','2023-04-21 16:19:16',32,NULL),(99,4,'{\"content\":\"驾驶人进入驾驶室前，首先要做扣上______？\"}',NULL,NULL,NULL,'[[\"安全带\",\"安全扣\"]]','{\"content\":\"\"}','2023-04-21 16:20:04','2023-04-21 16:20:04',32,NULL),(100,5,'{\"content\":\"出车前对轮胎进行哪些方面的检查？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:20:36','2023-04-21 16:20:36',32,NULL),(101,3,'{\"content\":\"变更车道前确认后方无来车时可以不开转向灯变道。\"}',NULL,NULL,'{\"answer\":false}',NULL,'{\"content\":\"\"}','2023-04-21 16:21:07','2023-04-21 16:21:07',NULL,10),(102,2,'{\"content\":\"行车中驾驶人接打手机或发短信有什么危害？\"}',NULL,'[{\"content\":\"影响乘车人休息\",\"isAnswer\":1},{\"content\":\"分散驾驶注意力\",\"isAnswer\":1},{\"content\":\"遇紧急情况反应不及\",\"isAnswer\":1},{\"content\":\"影响正常驾驶操作\",\"isAnswer\":1}]',NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:21:07','2023-04-21 16:21:07',NULL,10),(103,4,'{\"content\":\"驾驶人进入驾驶室前，首先要做扣上______？\"}',NULL,NULL,NULL,'[[\"安全带\",\"安全扣\"]]','{\"content\":\"\"}','2023-04-21 16:21:07','2023-04-21 16:21:07',NULL,10),(104,5,'{\"content\":\"出车前对轮胎进行哪些方面的检查？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:21:07','2023-04-21 16:21:07',NULL,10),(105,1,'{\"content\":\"什么水果最甜\"}','[{\"content\":\"芒果\",\"isAnswer\":false},{\"content\":\"香蕉\",\"isAnswer\":false},{\"content\":\"雪梨\",\"isAnswer\":true}]',NULL,NULL,NULL,'{\"content\":\"雪梨糖分最高\"}','2023-04-21 16:54:39','2023-04-21 16:54:39',NULL,11),(106,5,'{\"content\":\"雪梨里面有什么成分导致它这么甜？\"}',NULL,NULL,NULL,NULL,'{\"content\":\"\"}','2023-04-21 16:54:39','2023-04-21 16:54:39',NULL,11),(107,1,'{\"content\":\"我的名字？\"}','[{\"content\":\"刘家宝\",\"isAnswer\":0},{\"content\":\"唐绮蔚\",\"isAnswer\":1}]',NULL,NULL,NULL,'{\"content\":\"嘻嘻\"}','2023-04-21 16:55:47','2023-04-21 16:55:47',42,NULL),(108,1,'{\"content\":\"我在听什么歌？\"}','[{\"content\":\"广州气象台\",\"isAnswer\":1},{\"content\":\"杭州气象台\",\"isAnswer\":0},{\"content\":\"浙江气象台\",\"isAnswer\":0},{\"content\":\"上海气象台\",\"isAnswer\":0}]',NULL,NULL,NULL,'{\"content\":\"是Faber唱的广州气象台\"}','2023-04-21 16:55:47','2023-04-21 16:55:47',42,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_records`
--

DROP TABLE IF EXISTS `quiz_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int NOT NULL,
  `user_id` int NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `score` int NOT NULL DEFAULT '0',
  `correct_count` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `answer_analysis` text,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `quiz_records_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizs` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quiz_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_records`
--

LOCK TABLES `quiz_records` WRITE;
/*!40000 ALTER TABLE `quiz_records` DISABLE KEYS */;
INSERT INTO `quiz_records` VALUES (3,3,1,'2023-04-17 08:47:23','2023-04-17 08:47:28',0,0,3,'2023-04-17 08:47:23','2023-04-17 08:47:28',NULL),(4,3,1,'2023-04-17 08:47:28','2023-04-17 08:50:00',0,0,3,'2023-04-17 08:47:28','2023-04-17 08:50:00',NULL),(5,3,1,'2023-04-17 08:50:00','2023-04-17 08:53:43',0,0,3,'2023-04-17 08:50:00','2023-04-17 08:53:43',NULL),(6,3,1,'2023-04-17 08:53:43','2023-04-17 08:56:04',0,0,3,'2023-04-17 08:53:43','2023-04-17 08:56:04',NULL),(7,3,1,'2023-04-17 08:56:04','2023-04-17 08:56:46',0,0,3,'2023-04-17 08:56:04','2023-04-17 08:56:46',NULL),(8,3,1,'2023-04-17 08:56:46','2023-04-17 08:56:53',0,0,3,'2023-04-17 08:56:46','2023-04-17 08:56:53',NULL),(9,3,1,'2023-04-17 08:56:53','2023-04-17 08:57:09',0,0,3,'2023-04-17 08:56:53','2023-04-17 08:57:09',NULL),(10,3,1,'2023-04-17 08:57:09','2023-04-17 08:57:10',0,0,3,'2023-04-17 08:57:09','2023-04-17 08:57:10',NULL),(11,3,1,'2023-04-17 08:57:10','2023-04-17 08:58:18',0,0,3,'2023-04-17 08:57:10','2023-04-17 08:58:18',NULL),(12,3,1,'2023-04-17 08:58:18','2023-04-17 08:59:10',0,0,3,'2023-04-17 08:58:18','2023-04-17 08:59:10',NULL),(13,3,1,'2023-04-17 08:59:10','2023-04-17 08:59:29',0,0,3,'2023-04-17 08:59:10','2023-04-17 08:59:29',NULL),(14,3,1,'2023-04-17 08:59:29','2023-04-18 02:10:32',0,0,3,'2023-04-17 08:59:29','2023-04-18 02:10:32',NULL),(15,3,1,'2023-04-18 02:10:32','2023-04-18 03:13:29',0,0,3,'2023-04-18 02:10:32','2023-04-18 03:13:29',NULL),(16,3,1,'2023-04-18 03:13:29','2023-04-18 03:15:40',0,0,3,'2023-04-18 03:13:29','2023-04-18 03:15:40',NULL),(17,3,1,'2023-04-18 03:15:40',NULL,0,0,2,'2023-04-18 03:15:40','2023-04-18 03:15:40',NULL),(18,4,1,'2023-04-18 03:21:30',NULL,0,0,2,'2023-04-18 03:21:30','2023-04-18 03:21:30',NULL),(19,5,1,'2023-04-18 08:26:08','2023-04-18 10:05:01',2050,2,3,'2023-04-18 08:26:08','2023-04-18 10:05:01',NULL),(20,5,1,'2023-04-18 10:06:12','2023-04-18 10:06:46',80,3,3,'2023-04-18 10:06:12','2023-04-18 10:06:46',NULL),(21,5,1,'2023-04-18 10:08:09','2023-04-18 10:08:13',70,2,3,'2023-04-18 10:08:09','2023-04-18 10:08:13',NULL),(22,5,1,'2023-04-18 10:08:30','2023-04-18 10:08:54',70,2,3,'2023-04-18 10:08:30','2023-04-18 10:08:54',NULL),(23,5,1,'2023-04-18 10:14:47','2023-04-18 10:14:53',50,1,3,'2023-04-18 10:14:47','2023-04-18 10:14:53',NULL),(24,5,1,'2023-04-18 10:14:58','2023-04-18 10:15:09',70,2,3,'2023-04-18 10:14:58','2023-04-18 10:15:09',NULL),(25,5,1,'2023-04-18 10:15:13','2023-04-18 10:15:19',50,1,3,'2023-04-18 10:15:13','2023-04-18 10:15:19',NULL),(26,5,1,'2023-04-18 10:16:04','2023-04-19 01:10:40',200,7,3,'2023-04-18 10:16:04','2023-04-19 01:10:40',NULL),(27,5,1,'2023-04-19 01:39:47','2023-04-19 01:40:43',200,7,3,'2023-04-19 01:39:47','2023-04-19 01:40:43',NULL),(28,5,1,'2023-04-19 02:39:51','2023-04-19 02:39:58',50,1,3,'2023-04-19 02:39:51','2023-04-19 02:39:58',NULL),(29,5,1,'2023-04-19 02:49:19','2023-04-19 03:27:03',90,4,3,'2023-04-19 02:49:19','2023-04-19 03:27:03',NULL),(30,5,1,'2023-04-19 08:35:48','2023-04-19 08:39:36',80,2,3,'2023-04-19 08:35:48','2023-04-19 08:39:36',NULL),(31,5,1,'2023-04-19 08:42:54','2023-04-19 08:43:55',110,3,3,'2023-04-19 08:42:54','2023-04-19 08:43:55','{\"77\":{\"answer\":\"记忆棉\",\"correct\":true},\"78\":{\"answer\":\"杭州气象台\",\"correct\":false},\"79\":{\"answer\":\"不然呢；正确答案\",\"correct\":false},\"80\":{\"answer\":\"构成；\",\"correct\":false},\"81\":{\"answer\":{\"content\":\"\"},\"correct\":true},\"82\":{\"answer\":\"正确\",\"correct\":true}}'),(32,5,1,'2023-04-19 08:47:16','2023-04-20 09:07:21',100,3,3,'2023-04-19 08:47:16','2023-04-20 09:07:27','{\"77\":{\"answer\":\"记忆棉\",\"correct\":true,\"score\":10},\"78\":{\"answer\":\"广州气象台\",\"correct\":true,\"score\":10},\"79\":{\"answer\":\"是啊；不然呢；正确答案\",\"correct\":true,\"score\":20},\"80\":{\"answer\":\"构成；一个又一个\",\"correct\":false,\"score\":20},\"81\":{\"answer\":\"美轮美奂指的是一件东西非常非常地美\",\"correct\":false,\"ai_reason\":\"回答准确且完整，逻辑清晰，条理性强，严谨性高，但缺少深度和广度以及新颖、创新和独到性。\",\"score\":40},\"82\":{\"answer\":\"错误\",\"correct\":false,\"score\":false}}'),(33,6,1,'2023-04-19 09:14:09','2023-04-19 09:47:25',0,0,3,'2023-04-19 09:14:09','2023-04-19 09:47:25','{}'),(34,6,1,'2023-04-19 09:51:56','2023-04-19 09:52:09',3040,0,3,'2023-04-19 09:51:56','2023-04-19 09:52:13','{\"83\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"回答中没有具体列举运用辩证思维的方法和实际案例，不够充分和具体。\"},\"84\":{\"answer\":{\"content\":\"要冷静思考\"},\"correct\":false,\"ai_reason\":\"回答比较简略，没有具体说明如何运用好辩证思维，需要更进一步的解释和举例说明。\"}}'),(35,6,1,'2023-04-19 10:11:56','2023-04-19 10:12:01',60,0,3,'2023-04-19 10:11:56','2023-04-19 10:12:04','{\"83\":{\"answer\":{\"content\":\"你好\"},\"correct\":false,\"ai_reason\":\"回答与问题不相关\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"回答较为全面，但缺乏具体例子和实践操作指导。\"}}'),(36,6,1,'2023-04-19 10:12:25','2023-04-19 10:12:30',20,0,3,'2023-04-19 10:12:25','2023-04-19 10:12:33','{\"83\":{\"answer\":{\"content\":\"你好\"},\"correct\":false,\"ai_reason\":\"回答没有回应问题的要点，也没有给出具体的解决方案，分数较低。\"},\"84\":{\"answer\":{\"content\":\"啊\"},\"correct\":false,\"ai_reason\":\"回答不符合问题要求\"}}'),(37,6,1,'2023-04-19 10:14:27','2023-04-19 10:14:30',40,0,3,'2023-04-19 10:14:27','2023-04-19 10:14:33','{\"83\":{\"answer\":{\"content\":\"阿斯顿\"},\"correct\":false,\"ai_reason\":\"答案无关问题，未能给出正确和充分的回答\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"回答过于简单，缺乏具体实例和深度阐述\"}}'),(38,6,1,'2023-04-20 00:59:05','2023-04-20 00:59:12',30,0,3,'2023-04-20 00:59:05','2023-04-20 00:59:15','{\"83\":{\"answer\":{\"content\":\"呵呵哒哒\"},\"correct\":false,\"ai_reason\":\"回答和问题完全不相关，无法得出任何分数。\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"回答缺乏具体性，没有提供实际的应用方法和案例\"}}'),(39,6,1,'2023-04-20 01:05:24','2023-04-20 01:05:30',0,0,3,'2023-04-20 01:05:24','2023-04-20 01:05:34','{\"83\":{\"answer\":{\"content\":\"呵呵哒哒\"},\"correct\":false,\"ai_reason\":\"回答未提供任何有关问题的相关信息，没有准确、完整、逻辑、条理、严谨、深度、广度、新颖、创新、独到、原创、个性化、个人化的回答\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"答案为空，无法评分\"}}'),(40,6,1,'2023-04-20 01:06:10','2023-04-20 01:07:31',40,0,3,'2023-04-20 01:06:10','2023-04-20 01:07:35','{\"83\":{\"answer\":{\"content\":\"坚持辩证思维，只有自觉树立并灵活运用辩证思维观察事物、剖析矛盾，才能切实提高处理复杂问题、驾驭复杂局面的本领，更加妥善地处理好局部和全局、当前和长远、重点和非重点的关系，在权衡利弊中作出最为有利的战略抉择\"},\"correct\":false,\"ai_reason\":\"回答准确、完整、严谨，逻辑性好，条理清晰，但在深度和新颖性方面稍有欠缺\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"答案为空\"}}'),(41,6,1,'2023-04-20 01:11:06','2023-04-20 01:11:10',30,0,3,'2023-04-20 01:11:06','2023-04-20 01:11:14','{\"83\":{\"answer\":{\"content\":\"坚持辩证思维\"},\"correct\":false,\"ai_reason\":\"回答的内容正确，但是过于简单，没有涉及如何运用好辩证思维的具体方法和技巧，建议加强回答的内容\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"没有给出具体的描述和策略，回答不完整\"}}'),(42,6,1,'2023-04-20 03:19:59','2023-04-20 03:20:03',0,0,3,'2023-04-20 03:19:59','2023-04-20 03:20:06','{\"83\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"答案为空，无法得分。\"},\"84\":{\"answer\":{\"content\":\"\"},\"correct\":false,\"ai_reason\":\"答案为空，无法评分。\"}}'),(43,6,1,'2023-04-20 03:37:09','2023-04-20 03:37:18',20,0,3,'2023-04-20 03:37:09','2023-04-20 03:37:23','{\"83\":{\"answer\":{\"content\":\"啊时间段哈几点回家卡圣诞节狂欢啊快结束的很快就啊活动空间啊是的阿斯顿阿斯顿阿斯顿\"},\"correct\":false,\"ai_reason\":\"回答与问题无关，完全没有涉及到复杂局面及辩证思维，缺乏逻辑性和条理性\"},\"84\":{\"answer\":{\"content\":\"阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿八十多啊阿斯顿啊实打实的吧阿斯顿\"},\"correct\":false,\"ai_reason\":\"回答与问题不相关，缺乏准确性、完整性、逻辑性、条理性、严谨性、深度、广度、新颖性、创新性、独到性。\"}}'),(44,6,1,'2023-04-20 03:40:07','2023-04-20 03:40:16',15,0,3,'2023-04-20 03:40:07','2023-04-20 03:40:18','{\"83\":{\"answer\":{\"content\":\"啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就\"},\"correct\":false,\"ai_reason\":\"回答不相关，字数过少。\"},\"84\":{\"answer\":{\"content\":\"啊实打实的哈就是看到后就卡上的几哈是的\"},\"correct\":false,\"ai_reason\":\"回答不相关\"}}'),(45,6,1,'2023-04-20 03:41:21','2023-04-20 03:41:25',0,0,3,'2023-04-20 03:41:21','2023-04-20 03:41:28','{\"83\":{\"answer\":{\"content\":\"啊实打实的哈就是看到后就卡上的几哈是的\"},\"correct\":false,\"ai_reason\":\"回答完全不相关，未能对问题进行回答\"},\"84\":{\"answer\":{\"content\":\"啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的啊实打实的哈就是看到后就卡上的几哈是的\"},\"correct\":false,\"ai_reason\":\"回答完全不相关\"}}'),(46,6,1,'2023-04-20 07:49:51','2023-04-20 07:50:00',0,0,3,'2023-04-20 07:49:51','2023-04-20 07:50:03','{\"83\":{\"answer\":{\"content\":\"咩话\"},\"correct\":false,\"ai_reason\":\"回答完全不相关\",\"score\":0},\"84\":{\"answer\":{\"content\":\"你话果队叫咩话\"},\"correct\":false,\"ai_reason\":\"回答完全不相关\",\"score\":0}}'),(47,6,1,'2023-04-20 08:46:22','2023-04-20 08:46:36',0,0,3,'2023-04-20 08:46:22','2023-04-20 08:46:38','{\"83\":{\"answer\":\"你打算几点过去，我最主要想知道一下每个人问的问题大概怎样的\",\"correct\":false,\"ai_reason\":\"完全敷衍回答，与问题无关\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"未给出回答\",\"score\":0}}'),(48,6,1,'2023-04-20 08:48:06','2023-04-20 08:48:25',10,0,3,'2023-04-20 08:48:06','2023-04-20 08:48:29','{\"83\":{\"answer\":\"nicai你猜猜\",\"correct\":false,\"ai_reason\":\"回答完全不相关\",\"score\":0},\"84\":{\"answer\":\"应该仔细思考\",\"correct\":false,\"ai_reason\":\"回答简单，缺乏完整性、逻辑性和深度\",\"score\":10}}'),(49,5,1,'2023-04-20 09:13:42','2023-04-20 09:13:59',80,4,3,'2023-04-20 09:13:42','2023-04-20 09:14:01','{\"77\":{\"answer\":\"记忆棉\",\"correct\":true,\"score\":10},\"78\":{\"answer\":\"广州气象台\",\"correct\":true,\"score\":10},\"79\":{\"answer\":\"是啊；不然呢；正确答案\",\"correct\":true,\"score\":20},\"80\":{\"answer\":\"构成；一个又一个\",\"correct\":true,\"score\":40},\"81\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答完全不相关\",\"score\":0},\"82\":{\"answer\":\"\",\"correct\":false,\"score\":0}}'),(50,5,1,'2023-04-20 09:16:00','2023-04-20 09:16:04',0,0,3,'2023-04-20 09:16:00','2023-04-20 09:16:07','{\"77\":{\"answer\":\"\",\"correct\":false,\"score\":0},\"78\":{\"answer\":\"\",\"correct\":false,\"score\":0},\"79\":{\"answer\":\"\",\"correct\":false,\"score\":0},\"80\":{\"answer\":\"；\",\"correct\":false,\"score\":0},\"81\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"答案为空\",\"score\":0},\"82\":{\"answer\":\"\",\"correct\":false,\"score\":0}}'),(51,6,1,'2023-04-20 09:17:20','2023-04-20 09:17:22',0,0,3,'2023-04-20 09:17:20','2023-04-20 09:17:25','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答为空\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答为空\",\"score\":0}}'),(52,6,1,'2023-04-20 09:18:14','2023-04-20 09:18:16',40,0,3,'2023-04-20 09:18:14','2023-04-20 09:18:26','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答准确、完整、逻辑性强，但表述略显混乱\",\"score\":40},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答缺失\",\"score\":0}}'),(53,6,1,'2023-04-20 09:19:49','2023-04-20 09:19:51',0,0,3,'2023-04-20 09:19:49','2023-04-20 09:19:54','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答为空\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答为空\",\"score\":0}}'),(54,6,1,'2023-04-20 09:22:47','2023-04-20 09:22:48',80,0,3,'2023-04-20 09:22:47','2023-04-20 09:23:30','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答准确，完整且条理清晰，有深度和广度；缺少新颖性和创新性\",\"score\":40},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答基本准确，逻辑清晰，但深度和广度有所欠缺。\",\"score\":40}}'),(55,6,1,'2023-04-20 09:25:18','2023-04-20 09:25:20',40,0,3,'2023-04-20 09:25:18','2023-04-20 09:25:36','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答完全为空，没有回答任何问题，不给分。\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答完整，逻辑清晰，条理清晰，严谨深入，但缺乏广度和新颖性\",\"score\":40}}'),(56,6,1,'2023-04-20 09:31:12','2023-04-20 09:31:14',0,0,3,'2023-04-20 09:31:12','2023-04-20 09:31:14','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_fail\":true},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_fail\":true}}'),(57,6,1,'2023-04-20 09:31:35','2023-04-20 09:31:39',40,0,3,'2023-04-20 09:31:35','2023-04-20 09:31:52','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答逻辑性强，条理分明，严谨性高，但回答深度和创新性稍欠缺。\",\"score\":40},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答为空\",\"score\":0}}'),(58,6,1,'2023-04-20 09:37:16','2023-04-20 09:37:17',0,0,3,'2023-04-20 09:37:16','2023-04-20 09:37:32','{\"83\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"完全未回答问题\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"完全未回答问题\",\"score\":0}}'),(59,6,1,'2023-04-20 09:37:44','2023-04-20 09:37:46',0,0,3,'2023-04-20 09:37:44','2023-04-20 09:38:25','{\"83\":{\"answer\":\"asdasdasd\",\"correct\":false,\"ai_reason\":\"完全敷衍回答\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"未回答问题，并未对问题进行任何分析\",\"score\":0}}'),(60,6,1,'2023-04-20 09:40:06','2023-04-20 09:40:09',0,0,3,'2023-04-20 09:40:06','2023-04-20 09:40:24','{\"83\":{\"answer\":\"adds\",\"correct\":false,\"ai_reason\":\"完全敷衍回答\",\"ai_answer\":\"思考与问题相关的知识和经验，结合具体情况，辩证分析，找到问题的矛盾点和解决方案，思考未来可能出现的问题并提前做好应对措施。\",\"score\":0},\"84\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"完全没有回答问题\",\"ai_answer\":\"面对复杂局面时，应该以辩证思维的方式去思考问题，不断分析问题的各个方面和角度，找出问题的根源和解决方法，同时注意把握问题的主次关系，处理好矛盾和统一的关系。具体而言，可以通过对问题进行全面、深入、系统的分析，注重纵横比较和多角度思考，把握事物的本质和发展规律，以达到更好的解决问题的效果。\",\"score\":0}}'),(61,7,1,'2023-04-20 09:44:58','2023-04-20 09:45:40',20,2,3,'2023-04-20 09:44:58','2023-04-20 09:45:51','{\"87\":{\"answer\":\"how\",\"correct\":true,\"score\":10},\"88\":{\"answer\":\"They are cheaper than fossil fuels.；They produce fewer greenhouse gas emissions.；They are not available everywhere.；They do not require as much maintenance as traditional power sources.\",\"correct\":true,\"score\":10},\"89\":{\"answer\":\"Paris, good trip\",\"correct\":false,\"ai_reason\":\"回答完全敷衍，没有描述具体的经历\",\"ai_answer\":\"需要具体描述旅游的地方、时间、人物以及旅游的感受，让回答更加详细和完整。例如可以说在什么时间去巴黎，和什么人一起去的，去了哪些景点，对景点的感受如何，还有什么有趣的经历等\",\"score\":0},\"90\":{\"answer\":\"Paris, good trip\",\"correct\":false,\"ai_reason\":\"回答完全敷衍\",\"ai_answer\":\"该问题要求描述自己曾经去过哪些地方，以及这些旅行的经历。回答中仅提到了一个地方，并没有描述具体的经历，且回答相当简略，故不给分。\",\"score\":0}}'),(62,8,1,'2023-04-20 09:51:27','2023-04-20 09:51:55',8,0,3,'2023-04-20 09:51:27','2023-04-20 09:52:20','{\"93\":{\"answer\":\"文艺复兴运动的指导思想是人文主义。它不是古希腊、古罗马文化的复兴。因为它实质上是一场资产阶级反封建的思想文化运动的兴起。影响：它冲破了几百年来封建制度和宗教神学思想对人的束缚，解放了人们的思想，为资本主义的发展创造了必要的思想文化前提。\",\"correct\":false,\"ai_reason\":\"回答相对准确，完整性、逻辑性、条理性、严谨性、深度、广度、新颖性和创新性较好，但在回答是否为古希腊、古罗马文化的复兴这一问题上存在一定偏差，因为文艺复兴运动确实是在古希腊、古罗马文化基础上兴起的，但并非是一味的复兴，更多的是对古代艺术、哲学、文学等方面的改良和发展，并且也受到了其他文化的影响。\",\"ai_answer\":\"文艺复兴运动的指导思想是人文主义，它是在古希腊、古罗马文化基础上兴起的，但并非是一味的复兴，更多的是对古代艺术、哲学、文学等方面的改良和发展，并且也受到了其他文化的影响。其影响包括：推动了人文主义和艺术、哲学、科学的发展，支持了个人权利的观念，推动了知识的普及，培育了文化士大夫阶层的形成，成为了现代西方文化发展的重要基石之一。\",\"score\":8},\"94\":{\"answer\":\"文艺复兴运动的指导思想是人文主义。它不是古希腊、古罗马文化的复兴。因为它实质上是一场资产阶级反封建的思想文化运动的兴起。影响：它冲破了几百年来封建制度和宗教神学思想对人的束缚，解放了人们的思想，为资本主义的发展创造了必要的思想文化前提。\",\"correct\":false,\"ai_reason\":\"完全敷衍回答，未能回答问题\",\"ai_answer\":\"用户回答与问题完全不相关。问题是关于15——16世纪西欧人为什么要开辟新航路以及最早开辟新航路的国家有哪些，以及新航路开辟的影响。用户回答了文艺复兴运动的指导思想是人文主义，并且谈到了影响，但完全没有提到问题中的内容。\",\"score\":0}}'),(63,8,1,'2023-04-20 09:59:28','2023-04-20 09:59:34',0,0,3,'2023-04-20 09:59:28','2023-04-20 10:00:56','{\"93\":{\"answer\":\"不知道啊\",\"correct\":false,\"score\":null},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_marking\":false,\"ai_fail\":true}}'),(64,8,1,'2023-04-20 10:01:51','2023-04-20 10:01:58',0,0,3,'2023-04-20 10:01:51','2023-04-20 10:02:28','{\"93\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答准确，完整，逻辑、条理性较好，但是未提及文艺复兴运动的深度和广度，未涉及其新颖、创新和独到之处。\",\"ai_answer\":\"14-16世纪文艺复兴运动的指导思想是人文主义，强调人类中心论，并且借鉴了古希腊、罗马文化的精华进行创新，不仅在艺术、文学、哲学等领域推动了人类文明的发展，还对教育、社会制度等方面产生了影响。因此，在回答问题时需要涉及到文艺复兴运动的深度、广度以及其独到、新颖、创作等方面，这样回答才能更加完整、严谨和全面。\",\"score\":8},\"94\":{\"answer\":\"不知道啊\",\"correct\":false,\"score\":null}}'),(65,8,1,'2023-04-20 10:04:07','2023-04-20 10:04:08',9,0,3,'2023-04-20 10:04:07','2023-04-20 10:05:42','{\"93\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"回答准确、完整、逻辑清晰、有条理性、严谨性高、深度和广度都有涉及，但是不够新颖、创新和独到。\",\"ai_answer\":\"文艺复兴运动的指导思想是人文主义，它强调个人和人类的尊严、价值和能力，以人的本性和特点作为创作的核心，推崇人的多样性、自由和平等。文艺复兴运动的确是对古希腊、古罗马文化的复兴和传承，但并不是简单的复制，而是对古代文化的发扬光大和创新。文艺复兴运动在艺术、文学、科学、哲学等多个领域都有重要的创新和贡献，为现代欧洲的发展奠定了基础。\",\"score\":9},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_marking\":false,\"ai_fail\":true}}'),(66,8,1,'2023-04-20 10:06:34','2023-04-20 10:06:36',9,0,3,'2023-04-20 10:06:34','2023-04-20 10:07:07','{\"93\":{\"answer\":\"\",\"correct\":false,\"ai_marking\":true},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"答案准确、完整、逻辑清晰、条理分明、严谨详尽，但缺乏广度和新颖性。\",\"ai_answer\":\"15——16世纪西欧人开辟新航路有以下几个原因：一是重商主义思想的提倡；二是经济和政治上的需求；三是基督教的宣传。最早开辟新航路的国家是葡萄牙，从1415年开始，他们开始探险并开拓新航路。此后西班牙、荷兰、英国等国家也相继加入。新航路的开辟带来了农产品、新鲜水果、珠宝、纺织品等商品的交流，这些商品使得欧洲的商业和市场变得更加繁荣。此外，新航路的开辟也促进了奴隶贸易，导致了很多不幸的人受到奴役，也给全球带来了一些问题和挑战。\",\"score\":9}}'),(67,8,1,'2023-04-20 10:10:01','2023-04-20 10:10:02',0,0,3,'2023-04-20 10:10:01','2023-04-20 10:10:20','{\"93\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"14——16世纪文艺复兴运动的指导思想是以人文主义为核心，主张以人的价值和尊严为中心；它不仅是古希腊、古罗马文化的复兴，也有中世纪基督教的影响；文艺复兴运动对欧洲经济、政治、宗教等方面产生了深远的影响，推动了欧洲社会向现代化方向发展。\",\"score\":0},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"15——16世纪西欧人主要为了寻找新的贸易路线和贵重商品，开辟了新航路。最早开辟新航路的国家有葡萄牙和西班牙。新航路开辟后，一方面促进了欧洲和亚洲、非洲等地区的贸易和文化交流，另一方面也导致了欧洲的殖民扩张和奴隶贸易，对其他地区的人民带来了严重的影响。\",\"score\":0}}'),(68,8,1,'2023-04-21 01:43:27','2023-04-21 01:43:32',0,0,3,'2023-04-21 01:43:27','2023-04-21 01:43:47','{\"93\":{\"answer\":\"en\",\"correct\":false,\"score\":null},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"15——16世纪西欧人开辟新航路主要是为了打通通往印度和中国的商路，获取更多的贸易利益。最早开辟新航路的国家有葡萄牙和西班牙。新航路的开辟推动了欧洲文艺复兴时期的发展，促进了地理知识和科技的进步，进一步扩大了世界贸易。而且新航路开辟后，欧洲人也开始向其他地区扩张，导致了殖民主义的兴起。\",\"score\":0}}'),(69,8,1,'2023-04-21 06:30:34','2023-04-21 06:30:39',0,0,3,'2023-04-21 06:30:34','2023-04-21 06:30:56','{\"93\":{\"answer\":\"嗯\",\"correct\":false,\"score\":null},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"未作答\",\"ai_answer\":\"西欧人在15-16世纪开始探索新航路，主要原因是希望能够寻找到更多的贸易和财富，同时也是为了寻找新的殖民地和资源。最早开辟新航路的国家主要有葡萄牙和西班牙。新航路的开辟使得欧洲各国和其他地区更加紧密联系，加速了殖民地和贸易的发展，推动了欧洲国家的经济和政治力量的增长。同时也带来了文化和知识的交流，对全球的历史和人类社会的发展都有着重要的影响。\",\"score\":0}}'),(70,8,1,'2023-04-21 06:32:44','2023-04-21 06:32:48',0,0,3,'2023-04-21 06:32:44','2023-04-21 06:33:04','{\"93\":{\"answer\":\"mnmnmn\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"14~16世纪文艺复兴运动的指导思想是倡导人文主义，反对中世纪神学。它不仅是古希腊、古罗马文化的复兴，也是对中世纪文化的一种反叛。文艺复兴运动对欧洲文艺、哲学、科技、社会等各个领域都产生了深远的影响。\",\"score\":0},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"15——16世纪西欧人开辟新航路的原因有多方面，主要包括寻求新的贸易航路、探索未知的海外地区、追求国家的政治和军事利益等。最早开辟新航路的国家有葡萄牙、西班牙、荷兰等欧洲国家。新航路的开辟导致了欧洲与南美洲、非洲、亚洲等地区的贸易加强，促进了东西方文化的交流和融合，也推动了欧洲殖民扩张的进程。\",\"score\":0}}'),(71,8,1,'2023-04-21 09:37:44','2023-04-21 09:38:15',0,0,3,'2023-04-21 09:37:44','2023-04-21 09:38:40','{\"93\":{\"answer\":\"14额4938499额额额\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"14——16世纪文艺复兴运动的指导思想是以人文主义为核心，强调人类价值、自由、独立思考与美的追求，不是简单的古希腊、古罗马文化的复兴，而是对文艺创作的重大变革；对艺术、科学与社会思想的全面推进；对现代世界的形成产生了深远的影响。\",\"score\":0},\"94\":{\"answer\":\"\",\"correct\":false,\"ai_reason\":\"空答案\",\"ai_answer\":\"在15-16世纪时，欧洲经济发展迅速，人口增长，但土地有限，引起了资源短缺的问题。为了获取更多资源和新市场，西欧国家开始寻找新航路。葡萄牙在15世纪初率先开辟了一条通向印度的海上贸易路线，并建立了与印度的商贸关系。16世纪初，荷兰开始挑战葡萄牙的贸易垄断地位，并在其殖民地地区建立了贸易网络。新航路的开辟提高了欧洲的商业和科技水平，拓展了市场和资源。它也导致了欧洲殖民帝国和新大陆的发现，带来了历史上的巨大变革。\",\"score\":0}}'),(72,9,1,'2023-04-21 16:03:02',NULL,0,0,2,'2023-04-21 16:03:02','2023-04-21 16:03:02',NULL),(73,10,1,'2023-04-21 16:21:32','2023-04-21 16:21:57',26,2,3,'2023-04-21 16:21:32','2023-04-21 16:22:10','{\"101\":{\"answer\":\"错误\",\"correct\":true,\"score\":10},\"102\":{\"answer\":\"分散驾驶注意力；遇紧急情况反应不及；影响正常驾驶操作\",\"correct\":false,\"score\":0},\"103\":{\"answer\":\"安全带\",\"correct\":true,\"score\":10},\"104\":{\"answer\":\"检查胎压\",\"correct\":false,\"ai_reason\":\"回答的完整性、广度、深度、新颖性、创新性、独到性都有欠缺，只涉及到了胎压这一点，未能覆盖问题的其他方面和细节。\",\"ai_answer\":\"出车前需要对轮胎进行胎压、花纹、磨损、裂纹等多方面的检查，确保轮胎状况安全，防止在行驶过程中发生意外。\",\"score\":6}}'),(74,11,1,'2023-04-21 16:54:52','2023-04-21 16:55:01',90,1,3,'2023-04-21 16:54:52','2023-04-21 16:55:14','{\"105\":{\"answer\":\"雪梨\",\"correct\":true,\"score\":50},\"106\":{\"answer\":\"糖\",\"correct\":false,\"ai_reason\":\"回答准确，但缺乏深度、广度、创新性和独到性\",\"ai_answer\":\"雪梨里面的成分包括葡萄糖、果糖、蔗糖等多种糖类物质，以及有机酸、氨基酸、维生素等营养物质，其中以果糖和葡萄糖为主要甜味物质，并且雪梨的甜度也与其品种、生长环境、成熟程度等因素有关。\",\"score\":40}}'),(75,7,1,'2023-10-27 07:56:07','2023-10-27 07:56:26',10,1,3,'2023-10-27 07:56:07','2023-10-27 07:56:26','{\"87\":{\"answer\":\"how\",\"correct\":true,\"score\":10},\"88\":{\"answer\":\"They are not available everywhere.\",\"correct\":false,\"score\":0},\"89\":{\"answer\":\"fuck you\",\"correct\":false,\"ai_marking\":true},\"90\":{\"answer\":\"fuck you again\",\"correct\":false,\"ai_marking\":true}}');
/*!40000 ALTER TABLE `quiz_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizs`
--

DROP TABLE IF EXISTS `quizs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `each_score` varchar(255) NOT NULL,
  `is_shuffle` tinyint(1) NOT NULL DEFAULT '0',
  `is_show_answer` tinyint(1) NOT NULL DEFAULT '0',
  `date_range` varchar(255) DEFAULT NULL,
  `countdown_minutes` int DEFAULT NULL,
  `is_random_options` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `owner_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizs`
--

LOCK TABLES `quizs` WRITE;
/*!40000 ALTER TABLE `quizs` DISABLE KEYS */;
INSERT INTO `quizs` VALUES (2,'ddd','aaa','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',1,0,'[\"2023-04-09 00:00\",\"2023-05-09 23:59\"]',0,0,'2023-04-08 17:01:36','2023-04-08 17:01:36',1),(3,'你是学霸还是学渣？','测一测啦','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,NULL,0,0,'2023-04-11 01:43:27','2023-04-11 01:43:27',1),(4,'Dear Jane','asd','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,'[\"2023-04-18 00:00\",\"2023-05-18 23:59\"]',0,0,'2023-04-18 03:19:23','2023-04-18 03:19:23',1),(5,'测试答题','','','{\"single\":\"10\",\"multiple\":\"20\",\"judge\":\"30\",\"fill\":\"40\",\"short\":\"50\"}',0,0,'[\"2023-04-18 00:00\",\"2023-05-18 23:59\"]',0,0,'2023-04-18 08:22:57','2023-04-18 08:22:57',1),(6,'简答题ai','','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"50\"}',0,0,NULL,0,0,'2023-04-19 08:53:32','2023-04-19 08:53:32',1),(7,'English quiz','','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,NULL,0,0,'2023-04-20 09:44:50','2023-04-20 09:44:50',1),(8,'世界历史知识','','','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,NULL,0,0,'2023-04-20 09:51:20','2023-04-20 09:51:20',1),(9,'新冠肺炎基础知识测试','','http://boson-website.oss-cn-hangzhou.aliyuncs.com/online-quiz/uploads/images/2023-04-21T15-53-20.830Z-decor12.jpeg','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,NULL,0,0,'2023-04-21 16:02:28','2023-04-21 16:02:28',1),(10,'驾驶证知识','','http://boson-website.oss-cn-hangzhou.aliyuncs.com/online-quiz/uploads/images/2023-04-21T16-20-57.935Z-decor1.jpeg','{\"single\":\"10\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"10\"}',0,0,NULL,0,0,'2023-04-21 16:21:07','2023-04-21 16:21:07',1),(11,'水果基础知识','小测试','http://boson-website.oss-cn-hangzhou.aliyuncs.com/online-quiz/uploads/images/2023-04-21T16-52-32.862Z-decor1.jpeg','{\"single\":\"50\",\"multiple\":\"10\",\"judge\":\"10\",\"fill\":\"10\",\"short\":\"50\"}',0,0,'[\"2023-04-22 00:00\",\"2023-05-22 23:59\"]',0,0,'2023-04-21 16:54:39','2023-04-21 16:54:39',1);
/*!40000 ALTER TABLE `quizs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
INSERT INTO `Tags` VALUES (1,'趣味测试','2023-03-23 06:04:03','2023-03-23 06:04:03'),(2,'生活百科','2023-03-23 06:04:27','2023-03-23 06:04:27'),(3,'学科知识','2023-03-23 06:04:32','2023-03-23 06:04:32'),(4,'考证刷题','2023-03-23 06:04:32','2023-03-23 06:04:32'),(5,'Web前端','2023-03-23 06:04:32','2023-03-23 06:04:32');
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'13535339346','84873231a','刘家宝','http://boson-website.oss-cn-hangzhou.aliyuncs.com/online-quiz/uploads/images/2023-04-10T08-13-27.733Z-decor7.jpeg','2023-03-23 03:47:39','2023-04-21 16:52:18','爱好答题~'),(2,'13535339347','84873231a','user_2',NULL,'2023-04-04 09:59:50','2023-04-04 09:59:50',NULL),(3,'15625063203','84873231a','user_3',NULL,'2023-10-27 07:48:34','2023-10-27 07:48:35',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-27 16:12:33
