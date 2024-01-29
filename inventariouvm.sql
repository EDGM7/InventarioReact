/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : inventariouvm

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2024-01-29 10:49:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for equipos
-- ----------------------------
DROP TABLE IF EXISTS `equipos`;
CREATE TABLE `equipos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ubicacion` enum('Laboratorio2','Laboratorio1') NOT NULL DEFAULT 'Laboratorio1',
  `nombre` varchar(100) NOT NULL,
  `tipo` enum('Equipos Audiovisuales','Aire Acondicionado','Dispositivos de Red','Cableado','Material de Oficina','Impresoras','Muebles','Equipos de Computación') NOT NULL DEFAULT 'Material de Oficina',
  `codigo` varchar(20) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `numserie` varchar(50) NOT NULL,
  `stock` smallint(2) NOT NULL,
  `estado` enum('Desincorporado','Reparacion','Operativo') NOT NULL DEFAULT 'Operativo',
  `tipoimpre` enum('Otra','Inyeccion','Laser') DEFAULT NULL,
  `topomueble` enum('Mesa','Silla','Escritorio') DEFAULT NULL,
  `tipocableado` enum('Otro','USB','Ethernet') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equipos
-- ----------------------------
INSERT INTO `equipos` VALUES ('1', 'Laboratorio1', 'Impresora Scaner color negro, docle bandeja', 'Impresoras', 'IMPRE1458', 'EPSON', 'NIJU78', '1458X22', '2', 'Operativo', 'Laser', '', '');
INSERT INTO `equipos` VALUES ('3', 'Laboratorio1', 'Equipo HP completo, CPU,monitor y todos su cables de conexion', 'Equipos de Computación', 'EQ88', 'HP', '594', 'KI999', '10', 'Operativo', '', '', '');
INSERT INTO `equipos` VALUES ('12', 'Laboratorio2', 'IMPRESORA EPSON', 'Impresoras', 'HYU888', 'SDDDD66', 'SDDDD66', 'SDDDD66', '1', 'Operativo', 'Laser', null, null);
INSERT INTO `equipos` VALUES ('13', 'Laboratorio1', 'mas de nuevo', 'Impresoras', 'cvcggg', 'cv', 'cvcv', 'vbv', '1', 'Operativo', 'Laser', null, null);
INSERT INTO `equipos` VALUES ('14', 'Laboratorio1', 'Camara Digital', 'Dispositivos de Red', 'gty789', 'fgf', 'fgfg', 'fgfg', '1', 'Operativo', null, null, null);
INSERT INTO `equipos` VALUES ('15', 'Laboratorio2', 'otro mas', 'Dispositivos de Red', 'ffffff', 'f', 'f', 'f', '1', 'Operativo', null, null, null);
INSERT INTO `equipos` VALUES ('16', 'Laboratorio1', 'ccc', 'Equipos de Computación', 'cvgggg', 'cv', 'cc', 'c', '1', 'Operativo', null, null, null);
INSERT INTO `equipos` VALUES ('17', 'Laboratorio1', 'agrega', 'Muebles', 'asas44', 'a', '44', '4444', '3', 'Operativo', null, 'Mesa', null);
