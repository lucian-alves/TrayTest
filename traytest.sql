CREATE DATABASE `traytest`;

USE `traytest`;

CREATE TABLE `vendedor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `saldo_comissao` float NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `venda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_vendedor` int(11) NOT NULL,
  `valor` float NOT NULL,
  `comissao` float NOT NULL,
  `data` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `venda_FK` (`id_vendedor`),
  CONSTRAINT `venda_FK` FOREIGN KEY (`id_vendedor`) REFERENCES `vendedor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

