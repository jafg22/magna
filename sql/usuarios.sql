-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2016 a las 22:38:18
-- Versión del servidor: 5.6.24
-- Versión de PHP: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `magna`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuario` varchar(15) NOT NULL,
  `correoU` varchar(50) NOT NULL,
  `contraU` varchar(50) NOT NULL,
  `nomU` varchar(50) NOT NULL,
  `apeU` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `incidencia` tinyint(4) NOT NULL,
  `estadoU` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario`, `correoU`, `contraU`, `nomU`, `apeU`, `isAdmin`, `incidencia`, `estadoU`) VALUES
('achavez', 'chavez@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'arturo', 'chavez', 0, 0, 1),
('cespinoza', 'espinoza@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'carlos', 'espinoza', 0, 0, 1),
('da', 'ads@asdas', '*BBAE266E0E1E92B3A857E20260D41B7BC259297F', 'asd', 'asd', 0, 1, 1),
('dmorera', 'dnmoreras@est.utn.ac.cr', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'damian', 'morera salas', 1, 0, 2),
('ejimenez', 'jimenez@email.com', '321', 'elimar', 'jimenez', 0, 0, 1),
('eorias', 'orias@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'emily', 'orias', 0, 0, 1),
('farguedas', 'arguedas@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'fausto', 'arguedas', 0, 0, 1),
('ifrias', 'frias@email.com', '*7297C3E22DEB91303FC493303A8158AD4231F486', 'iris', 'frias', 0, 0, 1),
('isolorsano', 'solorsano@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'irma', 'solorsano', 0, 0, 1),
('lorgia', 'orgia@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'luis', 'orgia', 0, 0, 1),
('msolanno', 'solano@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'mephisto', 'solano', 0, 0, 1),
('psanches', 'sanches@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'pedro', 'sanches', 0, 0, 1),
('rsolis', 'solis@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'regio', 'solis', 0, 0, 1),
('sruiz', 'ruiz@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'sergio', 'ruiz', 0, 0, 1),
('ssalas', 'salas@email.com', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'solio', 'salas', 0, 0, 1);

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `banea_usuario` BEFORE UPDATE ON `usuarios`
 FOR EACH ROW BEGIN 

select CAST((select NEW.incidencia from usuarios) AS UNSIGNED) into @contadas;

SET @dateTo = NOW();

SET @dateEnd = DATE_ADD(@dateTo, INTERVAL 3 DAY);


IF @contadas >= 3 THEN
 
    INSERT INTO baneos 
    
    VALUES(NEW.usuario,@dateTo,@dateEnd); 

END IF; 
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insUsuario` BEFORE INSERT ON `usuarios`
 FOR EACH ROW BEGIN 
 
    INSERT INTO bitaMovimientos (fecha, tabla, movimiento, usuario)
    
    VALUES(NOW(),'usuarios','insert',CURRENT_USER()); 
END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario`), ADD KEY `estadoU` (`estadoU`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`estadoU`) REFERENCES `estado` (`idEstado`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
