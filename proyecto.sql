-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-12-2023 a las 20:52:47
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `correo`, `telefono`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', '1234567890'),
(2, 'María Rodríguez', 'maria.rodriguez@example.com', '9876543210'),
(3, 'Carlos Gómez', 'carlos.gomez@example.com', '555-1234'),
(4, 'Ana García', 'ana.garcia@example.com', '555-5678'),
(5, 'Roberto Martínez', 'roberto.martinez@example.com', '987-6543'),
(6, 'Laura Sánchez', 'laura.sanchez@example.com', '555-4321'),
(7, 'Daniel López', 'daniel.lopez@example.com', '123-4567'),
(8, 'Carmen Fernández', 'carmen.fernandez@example.com', '555-8765'),
(9, 'Diego Ruiz', 'diego.ruiz@example.com', '987-1234'),
(10, 'Elena Torres', 'elena.torres@example.com', '555-7890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `imagen` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `precio`, `stock`, `imagen`) VALUES
(1, 'Leche', 3, 100, 'leche.jpg'),
(2, 'Pan', 2, 150, 'pan.jpg'),
(3, 'Manzanas', 1, 200, 'manzanas.jpg'),
(4, 'Arroz', 3, 80, 'arroz.jpg'),
(5, 'Pollo', 6, 50, 'pollo.jpg'),
(6, 'Cereal', 4, 120, 'cereal.jpg'),
(7, 'Pasta', 2, 90, 'pasta.jpg'),
(8, 'Yogur', 2, 80, 'yogur.jpg'),
(9, 'Zanahorias', 1, 120, 'zanahorias.jpg'),
(10, 'Galletas', 3, 100, 'galletas.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `producto_id`, `cantidad`, `fecha`) VALUES
(1, 1, 5, '2023-01-01'),
(2, 3, 10, '2023-01-02'),
(3, 2, 8, '2023-01-03'),
(4, 5, 15, '2023-01-04'),
(5, 4, 7, '2023-01-05'),
(6, 6, 12, '2023-01-06'),
(7, 8, 3, '2023-01-07'),
(8, 7, 9, '2023-01-08'),
(9, 9, 6, '2023-01-09'),
(10, 10, 20, '2023-01-10');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
