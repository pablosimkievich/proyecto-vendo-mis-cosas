-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: vendo_mis_cosas_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `category_description` text NOT NULL,
  `category_image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electrónica y Tecnología','Celulares, Notebooks, Televisores LED, etc','electronica y tecnologia.jpg'),(2,'Salud y Belleza','Cosméticos, Medidores de Presión, etc','salud y belleza.jpg'),(3,'Hogar y Jardín','Muebles, Mesas y Sillas para Exteriores , etc','hogar y jardin.jpg'),(4,'Deportes y Fitness','Fútbol, Tenis, Golf, etc','deportes y fitness.jpg'),(5,'Libros y Medios','Libros, Discos de Vinilo, Videojuegos ','libros y medios.jpg'),(6,'Juguetes','Juegos de Mesa, Artículos para Bebés, etc','juguetes.jpg'),(7,'Herramientas','Taladros, Máquinas de Coser, etc','herramientas.jpg'),(8,'Música y Equipamiento Musical','Guitarras, Baterías Electrónicas, Micrófonos, etc','musica y equipamiento musical.jpg'),(9,'Arte y Decoración','Cuadros, Adornos de Mesa, etc','arte y decoracion.jpg'),(10,'Joyería y Relojes','Relojes, Collares, Pulseras','joyeria y relojes.jpg'),(11,'Ropa y Accesorios','Indumentaria Dama, Caballeros y Niños','ropa y accesorios.jpg'),(12,'Calzado','Zapatillas, Calzado para Dama, etc','calzado.jpg'),(13,'Bolsos y Carteras','Bolsos de Viaje, Carteras para Dama, etc','bolsos y carteras.jpg'),(14,'Productos para Mascotas','Juguetes para Perros y Gatos, Alimentos y Accesorios','productos para mascotas.jpg'),(15,'Coleccionables','Articúlos para Estantes, Cartas Coleccionables, etc','coleccionables.jpg'),(16,'Variedades y Miscelaneas','Artículos Variados, Otros Productos, etc','variedades y miscelaneas.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_fk_id` int(11) NOT NULL,
  `product_fk_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `fk_vendor_user_id` int(11) NOT NULL,
  `fk_buyer_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_fk_id_idx` (`product_fk_id`),
  KEY `vendor_user_fk_id_idx` (`fk_vendor_user_id`),
  KEY `buyer_user_fk_id_idx` (`fk_buyer_user_id`),
  KEY `order_fk_id_idx` (`order_fk_id`),
  CONSTRAINT `buyer_user_fk` FOREIGN KEY (`fk_buyer_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_fk_id` FOREIGN KEY (`order_fk_id`) REFERENCES `shop_orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `product_fk` FOREIGN KEY (`product_fk_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vendor_user_fk` FOREIGN KEY (`fk_vendor_user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,1,1,1,2);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pay_method_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Mercado Pago');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_additional_images`
--

DROP TABLE IF EXISTS `product_additional_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_additional_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_fk_id` int(11) NOT NULL,
  `image_2` varchar(100) DEFAULT NULL,
  `image_3` varchar(100) DEFAULT NULL,
  `image_4` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product id en product additional images_idx` (`product_fk_id`),
  CONSTRAINT `product id en product additional images` FOREIGN KEY (`product_fk_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_additional_images`
--

LOCK TABLES `product_additional_images` WRITE;
/*!40000 ALTER TABLE `product_additional_images` DISABLE KEYS */;
INSERT INTO `product_additional_images` VALUES (1,1,'camara-nikkon-2.webp','camara-nikkon-3.webp','camara-nikkon-4.webp'),(2,2,'smart-tv-tcl-2.webp','smart-tv-tcl-3.webp','smart-tv-tcl-4.webp'),(3,3,'bloques-armar-zuru-2.webp','bloques-armar-zuru-3.webp','bloques-armar-zuru-4.webp'),(4,4,'paleta-sixzero-paddle-2.webp','paleta-sixzero-paddle-2.webp','paleta-sixzero-paddle-4.webp'),(5,5,'sillon-sofa-3-cuerpos-2.webp','sillon-sofa-3-cuerpos-3.webp','sillon-sofa-3-cuerpos-4.webp'),(6,6,'libro-el-aleph-2.webp','libro-el-aleph-3.webp','libro-el-aleph-4.webp'),(7,7,'perfume-amor-amor-2.webp','perfume-amor-amor-3.webp','perfume-amor-amor-4.webp'),(8,8,'hasbro-figura-wicket-2.webp','hasbro-figura-wicket-3.webp','hasbro-figura-wicket-4.webp'),(9,9,'taladro-black-decker-2.webp','taladro-black-decker-3.webp','taladro-black-decker-4.webp'),(10,10,'guitarra-clasica-parquer-custom-2.webp','guitarra-clasica-parquer-custom-3.webp','guitarra-clasica-parquer-custom-4.webp'),(11,12,'cortina-rollerpro-blackout-2.webp','cortina-rollerpro-blackout-3.webp','cortina-rollerpro-blackout-4.webp'),(12,13,'reloj-digital-gadnic-2.webp','reloj-digital-gadnic-3.webp','reloj-digital-gadnic-4.webp'),(13,14,'pantalon-pampero-cargo-2.webp','pantalon-pampero-cargo-3.webp','pantalon-pampero-cargo-4.webp'),(14,15,'zapato-hombre-mocasin-2.webp','zapato-hombre-mocasin-3.webp','zapato-hombre-mocasin-4.webp'),(15,16,'cartera-mujer-minibag-2.webp','cartera-mujer-minibag-3.webp','cartera-mujer-minibag-4.webp'),(16,17,'juguete-perro-peluche-2.webp','juguete-perro-peluche-3.webp','juguete-perro-peluche-4.webp'),(17,18,'box-trumpeter-malbec-2.webp','box-trumpeter-malbec-3.webp','box-trumpeter-malbec-4.webp'),(18,19,'consola-playstation-ps4-2.webp','consola-playstation-ps4-3.webp','consola-playstation-ps4-4.webp'),(19,20,'tablet-enova-2.webp','tablet-enova-3.webp','tablet-enova-4.webp'),(20,21,'jbl-speaker-authentics-2.webp','jbl-speaker-authentics-3.webp','jbl-speaker-authentics-4.webp'),(21,22,'corrector-ojeras-maybelline-2.webp','corrector-ojeras-maybelline-3.webp','corrector-ojeras-maybelline-4.webp'),(22,23,'combo-surtido-maquillaje-tejar-2.webp','combo-surtido-maquillaje-tejar-3.webp','combo-surtido-maquillaje-tejar-4.webp'),(23,24,'tensiometro-digital-brazo-2.webp','tensiometro-digital-brazo-3.webp','tensiometro-digital-brazo-4.webp'),(24,25,'juego-jardin-acapulco-2.webp','juego-jardin-acapulco-3.webp','juego-jardin-acapulco-4.webp'),(25,26,'sillon-tolix-exterior-2.webp','sillon-tolix-exterior-3.webp','sillon-tolix-exterior-4.webp'),(26,27,'mesa-de-tela-plegable-2.webp','mesa-de-tela-plegable-3.webp','mesa-de-tela-plegable-4.webp'),(27,28,'bicicleta-retro-lamborghini-2.webp','bicicleta-retro-lamborghini-3.webp','bicicleta-retro-lamborghini-4.webp'),(28,29,'pelota-voley-munich-alfa-2.webp','pelota-voley-munich-alfa-3.webp','pelota-voley-munich-alfa-4.webp'),(29,30,'robot-camion-convertible-2.webp','robot-camion-convertible-3.webp','robot-camion-convertible-4.webp'),(30,31,'figura-muñeco-gasaphone-2.webp','figura-muñeco-gasaphone-3.webp','figura-muñeco-gasaphone-4.webp'),(31,32,'cartera-lipa-mujer-amphora-2.webp','cartera-lipa-mujer-amphora-3.webp','cartera-lipa-mujer-amphora-4.webp'),(32,33,'gaban-tapado-abrigo-hombre-2.webp','gaban-tapado-abrigo-hombre-3.webp','gaban-tapado-abrigo-hombre-4.webp');
/*!40000 ALTER TABLE `product_additional_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_description` text DEFAULT NULL,
  `product_price` decimal(15,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `main_image` varchar(100) NOT NULL,
  `user_fk_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id-producto_idx` (`category_id`),
  KEY `id users en productos_idx` (`user_fk_id`),
  CONSTRAINT `id categorias en productos` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id usuarios en productos` FOREIGN KEY (`user_fk_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nikkon Kit D5300','Color negro, 0.26 GB de memoria',1450000.00,1,'camara-nikkon-1.webp',1),(2,'Smart TV TCL','Con Google assistance, color negro',440000.00,1,'smart-tv-tcl-1.webp',2),(3,'Bloques para armar Zuru Max','759 piezas, contiene piezas en formas geométricas',70000.00,6,'bloques-armar-zuru-1.webp',3),(4,'Paleta Sixzero Paddle','Hecha en fibra de vidrio ',85700.00,4,'paleta-sixzero-paddle-1.webp',4),(5,'Sillon Sofá 3 Cuerpos','Calidad premium, antidesgarro',490700.00,3,'sillon-sofa-3-cuerpos-1.webp',4),(6,'El Aleph J. L. Borges','Editorial La Nación',5000.00,5,'libro-el-aleph-1.webp',4),(7,'Perfume Amor Amor de Cacharel','EDT 100 ml, para mujer',60500.00,2,'perfume-amor-amor-1.webp',4),(8,'Hasbro Figura Wicket','Ariculado, 15 cm',45200.00,15,'hasbro-figura-wicket-1.webp',5),(9,'Taladro Percutor Black & Decker Tm555','550w color naranja',61300.00,7,'taladro-black-decker-1.webp',5),(10,'Guitarra Clásica Parquer Custom','Marrón claro laca, para diestros',70800.00,8,'guitarra-clasica-parquer-custom-1.webp',5),(12,'Cortina RollerPro Blackout','Color blanco 224x220cm',73500.00,9,'cortina-rollerpro-blackout-1.webp',6),(13,'Reloj Digital Deportivo Gadnic','Sumergible, color malla negro',39800.00,10,'reloj-digital-gadnic-1.webp',6),(14,'Pantalón Pampero Cargo','De trabajo, fit elastizado',35200.00,11,'pantalon-pampero-cargo-1.webp',6),(15,'Zapatp Hombre Mocasín','Náutico estilo urbano',26990.00,12,'zapato-hombre-mocasin-1.webp',6),(16,'Cartera de Mujer Minibag','Rígida con cadena, calidad cuero',31000.00,13,'cartera-mujer-minibag-1.webp',8),(17,'Juguete para Perros Peluche','Color naranja, con chifle',4000.00,14,'juguete-perro-peluche-1.webp',8),(18,'Box Trumpeter Malbec','Con 2 copas negras grabadas',31000.00,16,'box-trumpeter-malbec-1.webp',9),(19,'Consola Playstation PS4','1tb God of War Ragnarok bundle',1425000.00,1,'consola-playstation-ps4-1.webp',10),(20,'Tablet Enova 10','32Gb 2Gb ram Android 11, color gris',139000.00,1,'tablet-enova-1.webp',10),(21,'JBL Speaker Authentics 300','Color negro',759000.00,1,'jbl-speaker-authentics-1.webp',10),(22,'Corrector-de Ojeras Maybelline','Instant age rewind tono 110',11500.00,2,'corrector-ojeras-maybelline-1.webp',10),(23,'Combo Surtido Maquillaje Tejar','Kit con 12 productos',32500.00,2,'combo-surtido-maquillaje-tejar-1.webp',10),(24,'Tensiómetro Digital Brazo','Medidor presión arterial enfermería',29800.00,2,'tensiometro-digital-brazo-1.webp',7),(25,'Juego Jardín Acapulco','Con mesa, sillon cable',165000.00,3,'juego-jardin-acapulco-1.webp',7),(26,'Sillón Tolix Exterior','Ideal jardín, gastronomía',29900.00,3,'sillon-tolix-exterior-1.webp',7),(27,'Mesa de Tela Plegable','Marca Iael, con funda roja',14200.00,3,'mesa-de-tela-plegable-1.webp',7),(28,'Bicicleta Retro Lamborghini','Para dama, rodado 20, con canasto',176300.00,4,'bicicleta-retro-lamborghini-1.webp',5),(29,'Pelota de Voley Munich Alfa','Costura máquina, color azul rojo y blanco',11200.00,4,'pelota-voley-munich-alfa-1.webp',5),(30,'Robot Camión Convertible','4 vehículos en 1, Transformer Ditoys',12400.00,6,'robot-camion-convertible-1.webp',1),(31,'Figura Muñeco Gasaphone','De One Piece, Cabezona Luffy',14600.00,15,'figura-muñeco-gasaphone-1.webp',1),(32,'Cartera Lipa Mujer Amphora','Acabado herrajes negro, color blanco',62500.00,13,'cartera-lipa-mujer-amphora-1.webp',1),(33,'Gabán Tapado Abrigo Hombre','Campera lana, sobretodo Briganti',285000.00,11,'gaban-tapado-abrigo-hombre-1.webp',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_orders`
--

DROP TABLE IF EXISTS `shop_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_user_fk_id` int(11) NOT NULL,
  `order_total_amt` decimal(15,2) NOT NULL,
  `order_date` date NOT NULL,
  `order_status` varchar(100) NOT NULL,
  `order_address` varchar(100) NOT NULL,
  `pay_method_fk_id` int(11) NOT NULL,
  `buyer_user_fk_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_user_fk_id_idx` (`vendor_user_fk_id`),
  KEY `buyer_user_fk_id_idx` (`buyer_user_fk_id`),
  KEY `payment_method_fk_id_idx` (`pay_method_fk_id`),
  CONSTRAINT `buyer_user_fk_id` FOREIGN KEY (`buyer_user_fk_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `payment_method_fk_id` FOREIGN KEY (`pay_method_fk_id`) REFERENCES `payment_methods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vendor_user_fk_id` FOREIGN KEY (`vendor_user_fk_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_orders`
--

LOCK TABLES `shop_orders` WRITE;
/*!40000 ALTER TABLE `shop_orders` DISABLE KEYS */;
INSERT INTO `shop_orders` VALUES (1,1,1450000.00,'2024-08-21','Enviado','Machado 2547',1,2);
/*!40000 ALTER TABLE `shop_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_reviews`
--

DROP TABLE IF EXISTS `user_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_user_fk_id` int(11) NOT NULL,
  `review_title` varchar(100) NOT NULL,
  `review_text` text NOT NULL,
  `review_rating` int(11) NOT NULL,
  `buyer_user_fk_id` int(11) NOT NULL,
  `shop_order_fk_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_user_fk_idx` (`vendor_user_fk_id`),
  KEY `comprador_idx` (`buyer_user_fk_id`),
  KEY `order_fk_id_idx` (`shop_order_fk_id`),
  KEY `shop_order_idx` (`shop_order_fk_id`),
  CONSTRAINT `comprador` FOREIGN KEY (`buyer_user_fk_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `or` FOREIGN KEY (`shop_order_fk_id`) REFERENCES `shop_orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vendedor` FOREIGN KEY (`vendor_user_fk_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_reviews`
--

LOCK TABLES `user_reviews` WRITE;
/*!40000 ALTER TABLE `user_reviews` DISABLE KEYS */;
INSERT INTO `user_reviews` VALUES (3,1,'Todo Correcto','Muy correcto el vendedor y el producto ha llegado en buenas condiciones',95,2,1);
/*!40000 ALTER TABLE `user_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `sales_description` text DEFAULT NULL,
  `user_avatar` varchar(100) NOT NULL,
  `user_type_fk_id` int(11) NOT NULL,
  `status` enum('Activo','Inactivo') NOT NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  KEY `user type en users_idx` (`user_type_fk_id`),
  CONSTRAINT `user type en users` FOREIGN KEY (`user_type_fk_id`) REFERENCES `user_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Franchesca Segunda Forest','franchesca@gmail.com','123456789','Vendo varias cosas que ya no necesito','avatar_1724966714870.png',1,'Activo'),(2,'Reinaldo Quevedo Ríos','quevedo@gmail.com','1234','Vendo todo tipo de cosas por falta de espacio','avatar_1703300360.png',1,'Activo'),(3,'Jonathan Kobrinsky','jkobrinsky@gmail.com','1234','Colección de exelentes items a la venta','avatar_1703301124.png',1,'Activo'),(4,'Carla Grijalbo','carlagrijalbo@gmail.com','1234','Vendo todo porque abandono el país','avatar_1703301201.png',1,'Activo'),(5,'Esther Séneca','esther@gmail.com','1234','Oportunidad para comprar buenos elementos que tengo a la venta','avatar_1703302636.png',1,'Activo'),(6,'Benedicto Caballares','benedict@gmail.com','1234','Vendo todo tipo de cosas','avatar_1703303340.png',1,'Activo'),(7,'Juan Palomino','palomino@gmail.com','1234','Vendo mis cosas','avatar_1703303391.png',2,'Activo'),(8,'Michelle de Laferrere','laferrere@gmail.com','1234','Productos excelentes a la venta. Oportunidad','avatar_1703303974.png',1,'Activo'),(9,'Facundo Ramirez','ramirez@gmail.com','1234','Tengo a la venta cosas a muy buen precio','avatar_1703304212.png',1,'Activo'),(10,'Diana Deleuze','ddeleuze@gmail.com','1234','Oportunidad para comprar cosas de muy buena calidad a un precio accesible','avatar_1703377638.png',1,'Activo'),(11,'Regina Delfos','delfos@gmail.com','$2a$10$uThFrIH1mHHsLwBmlJXRiepGvA5gBiwcqJdIvxLvk9zPbiYRU1Tn2',NULL,'avatar_1724713636154.png',1,'Activo'),(12,'Humberto Toledo','humb@gmail.com','$2a$10$.jM1lgcuakDVgSd3Bo.8Ou/9Qpy/IPJiqiwWwVHCFnqNDsk7Ixgpu',NULL,'avatar_1724713747622.png',1,'Activo'),(13,'','hum','$2a$10$q0dEE4gpPCpdATsYiPq4WObdtEkHeaer7ExHYFKSSrEiGGTpGc4Me',NULL,'avatar_1724784464494.png',1,'Activo'),(14,'','hum','$2a$10$PbUtfKOXismMZJU21rMeFel.fEl9UmNAWpsfjsog8O8h7T4HXlWQy',NULL,'avatar_1724784819141.png',1,'Activo'),(15,'','','$2a$10$xN0xJSoNlCLyhp.ivBGZ8OhU9CSTDxfogz51sB57LP21iqsR8TlI.',NULL,'avatar_1724784966966.png',1,'Activo'),(16,'Hugo Brindisi','brindisi@gmail.com','$2a$10$9IivByRFCWTb5qd8qYpfV.Gci7GZuSnRzuAiEluBOiu7GBF7qG8t2',NULL,'avatar_1724786444624.png',1,'Activo'),(17,'Hilda Saluzzi','hilda@gmail.com','$2a$10$FqBCig.YT7rpz7c8TB/QV.a8BCvoJi1w3D09XFxNattXFj8.wbeVq',NULL,'avatar_1724787682841.png',1,'Activo'),(18,'Dalmira Estevez','estevez@gmail.com','$2a$10$9CHVS86Q2WnXQ3OMoizbPO/.VlADoZrnBUFJZJybq4DTEIJ8WyoFa',NULL,'avatar_1724788048450.png',1,'Activo'),(19,'Hector Burma','burma@gmail.com','$2a$10$6COHClBi0r6en3DDC2KtLOPZeNz2m6XXSPy9BvIJwBEiymfTUaqx2',NULL,'avatar_1724788147617.png',1,'Activo'),(20,'Facundo Alzaga','facu_alzaga@gmail.com','$2a$10$XBihXDG9w.4qxV54cPi.u.DmPJj6dt7SAs80YlTLF8CHfpvt6mV0.',NULL,'avatar_1724788248677.png',1,'Activo'),(21,'Romina Noriega','noriega@gmail.com','$2a$10$hwP23BX7orjVMNJxvctRt.a.L3H8LJ2TiIPBEmU/n6qB7mh6Rrud2',NULL,'avatar_1724789008259.png',1,'Activo'),(22,'Sandra Villanueva','sandra@gmail.com','$2a$10$1FhUXgFR5DnG24uUMkSZse7BFmInlhcZRp4dWoJEzrX2YmDC8oseG','Vendo cosas, que a usted pueden interesarle','avatar_1724973506858.png',1,'Activo'),(23,'Pedro Velazquez','pedro@gmail.com','$2a$10$cWap1atBz4OJf712TQtKeu./PQw3KCo6aMjr3chNOdQM3PZ6XFZ32',NULL,'avatar_1724791270324.png',1,'Activo'),(24,'Diana Wurlitzer','diana@gmail.com','$2a$10$p0jxTUqudrfbQOOOzFm0o.Ii73kfeMw2g.b672oDRmctONGJfBtuW',NULL,'avatar_1724791538559.png',1,'Activo'),(25,'Darío Sergio Varela','sergio_varela@gmail.com','$2a$10$YrwDsWZox9so0CB.GDr37Om8sZfMWBO8ttCXnj7ZbSZX2See.xCS.',NULL,'avatar_1724791646819.png',1,'Activo'),(26,'Ezequiel Calamares','calamares@gmail.com','$2a$10$myJkIFHsl.0hbO83jz5z3.5lqvsAngka56dCR6JfnfxDHfe3bTkTC',NULL,'avatar_1724792344793.png',1,'Activo'),(27,'Gloria Reinolds','reinolds@gmail.com','$2a$10$lGuHKR.upL/w.uk8m8aiwufQa7XJ11oJStHKmYuUD7pBthT1Z57H.',NULL,'avatar_1724793388222.png',1,'Activo'),(28,'Silvia Olivo','olivo@gmail.com','$2a$10$rhM2pjOuUfP9EI6wCDVP9.gWSXE0WXpJPwuy5hwEkEYf2iYrK6sNG',NULL,'avatar_1724794769003.png',1,'Activo'),(29,'Rita Colmenares','colmenares@gmail.com','$2a$10$WopjjuVZAV8BwxwZci6RHOQ3.yuiK91wnMnKAmNy2QDlxjzyNAmIS',NULL,'avatar_1724795495021.png',1,'Activo'),(30,'Francisco Granada','frangranada@gmail.com','$2a$10$ylI5PntiVx5t8gh5md6GKOvyGA5ZDhwP314kjNJogNv3Mf.5xnoV6',NULL,'avatar_1724801667477.png',1,'Activo'),(31,'Esther Robles','esther_robles@gmail.com','$2a$10$JykCzSHvIO7HJh8/1iaacekftoc8AlDAV9LjoW.4JkSJ8rznkIR3O',NULL,'avatar_1724801876080.png',1,'Activo'),(32,'Diego Suarez','diego@gmail.com','$2a$10$YsK5J6vKCk.wIhqYV8vo3OMAnPAKIxDV79Ji0o78OcPULe4Jaoh/i',NULL,'avatar_1724801928560.png',1,'Activo'),(33,'Silvio Azcuénaga','silvio@gmail.com','$2a$10$9WWeUk4PIM4kpibE9LhSFuaRNhNXXq.lloP1bzbH9IcWKwLj5aFeK',NULL,'avatar_1724802137437.png',1,'Activo'),(34,'Rupert Goldwing','rup@gmail.com','$2a$10$ajRd1LUzOuFh2azMJe.mce5kSroC4.m174d.ndn7ZsBx6CIeC6R5S',NULL,'avatar_1724803883785.png',1,'Activo'),(35,'Lisa Trevor','lisa@gmail.com','$2a$10$IgJVF7lE94u10oy5IXWmy.LDzXPyTvRU5udv/bjsEQ0KSj14BBDgC',NULL,'avatar_1724807554796.png',1,'Activo'),(36,'Ernesto Finkestein','ernesto@gmail.com','$2a$10$GvbU8Y8vPtCDkZPwkWP1Ve1fdlETUHGznkXWggoze0wRKfpkGi7dy',NULL,'avatar_1724807871039.png',1,'Activo'),(37,'Debora Reynolds','debora_reynolds@gmail.com','$2a$10$FglPW5kVA2YIE3QtR2.CieG.n0wUKB1PSPcGcKp.S.Fekl7/XWyvO',NULL,'avatar_1724808217931.png',1,'Inactivo'),(38,'Valeria Flores','vale_flores@gmail.com','$2a$10$IFUzl6k.4T0NHubzTV0cFO/hNn.B4QuxMMYUOh9H6JXBcoE85aMdi',NULL,'avatar_1724808292520.png',1,'Inactivo'),(39,'Michael Cañaverales','michael@gmail.com','$2a$10$nzvf1.0XttGzSqvNPtDB9O1X7GoPmpRReZoi0qLdYaMo1X.38H8IC','A la venta productos de gran calidad a un buen precio','avatar_1724967410952.png',1,'Activo'),(40,'Melvin Lancaster','lancaster@gmail.com','$2a$10$U4748d/rs1sBSmEzbjoBfO1K3m9IGg7ckYZ0nGE595piqT5/B8Ev6','Vendo todo por viaje','avatar_1724972280116.png',1,'Activo'),(41,'Burt Marvin','burt@gmail.com','$2a$10$xv9PRJP5ZFRL0fClTVZkee6B2zCzM/KVRe7.APMLjA1OYEWvOJV52','Vendo items coleccionables','avatar_1724973114057.png',1,'Inactivo'),(42,'Tadeo Bonelli','tadeo@gmail.com','$2a$10$Fs10XmrO.3xafKDHQWCnAO4aKuCgUMpRQNgn9GKZDCT1KV9tqjdte','Vendo electrónicos de calidad','avatar_1724973248061.png',1,'Inactivo'),(43,'Cristian Schaffon','cristian@gmail.com','$2a$10$3uhpLraHtgnaZ9zOE.HjneFyCSI8K7Yh4.kuOqZtKv9dOFdtRuvlu','Vendo solo cosas usadas','avatar_1724988460862.png',1,'Activo');
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

-- Dump completed on 2024-08-30  0:38:13
