-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2025 a las 00:03:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hospitalhis`
--
CREATE DATABASE IF NOT EXISTS `hospitalhis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `hospitalhis`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admisiones`
--

CREATE TABLE `admisiones` (
  `id` int(11) NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idTipoAdmision` int(11) NOT NULL,
  `idEstadoAdmision` int(11) NOT NULL,
  `idTurno` int(11) DEFAULT NULL,
  `derivado` varchar(255) DEFAULT NULL,
  `detalle` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `idTipoMotivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admisiones`
--

INSERT INTO `admisiones` (`id`, `idPaciente`, `idUsuario`, `idTipoAdmision`, `idEstadoAdmision`, `idTurno`, `derivado`, `detalle`, `createdAt`, `updatedAt`, `idTipoMotivo`) VALUES
(11, 22, 1, 1, 1, NULL, NULL, NULL, '2025-06-06 07:29:32', '2025-06-06 07:29:32', 17),
(12, 23, 1, 1, 1, NULL, NULL, NULL, '2025-06-06 07:34:17', '2025-06-06 07:34:17', 16),
(13, 25, 1, 1, 1, NULL, NULL, NULL, '2025-06-08 03:00:16', '2025-06-08 03:00:16', 17),
(24, 29, 1, 1, 1, NULL, NULL, NULL, '2025-06-10 01:30:12', '2025-06-10 01:30:12', 17),
(25, 16, 1, 1, 1, NULL, NULL, NULL, '2025-06-10 01:31:02', '2025-06-10 01:31:02', 17),
(26, 30, 1, 1, 1, NULL, NULL, NULL, '2025-06-10 01:31:29', '2025-06-10 01:31:29', 17),
(27, 31, 1, 3, 1, NULL, NULL, 'sdasd', '2025-06-11 02:17:01', '2025-06-11 02:17:01', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alas`
--

CREATE TABLE `alas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alas`
--

INSERT INTO `alas` (`id`, `nombre`) VALUES
(1, 'Este'),
(2, 'Oeste'),
(3, 'Sur'),
(4, 'Norte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `idHabitacion` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`id`, `numero`, `idHabitacion`, `estado`) VALUES
(1, '101-1', 1, 0),
(2, '101-2', 1, 0),
(3, '102-1', 2, 0),
(4, '102-2', 2, 1),
(5, '103-1', 3, 1),
(6, '103-2', 3, 1),
(7, '104-1', 4, 1),
(8, '104-2', 4, 1),
(9, '105-1', 5, 1),
(10, '105-2', 5, 1),
(11, '201-1', 16, 1),
(12, '201-2', 16, 1),
(13, '202-1', 17, 1),
(14, '202-2', 17, 1),
(15, '203-1', 18, 1),
(16, '203-2', 18, 1),
(17, '204-1', 19, 1),
(18, '204-2', 19, 1),
(19, '205-1', 20, 1),
(20, '205-2', 20, 1),
(32, '401-1', 6, 1),
(33, '402-1', 7, 1),
(34, '403-1', 8, 1),
(35, '404-1', 9, 1),
(36, '405-1', 10, 1),
(37, '301-1', 11, 0),
(38, '302-1', 12, 0),
(39, '303-1', 13, 0),
(40, '304-1', 14, 1),
(41, '305-1', 15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_admision`
--

CREATE TABLE `estado_admision` (
  `id` int(11) NOT NULL,
  `nombre` enum('Esperando Cama','Aceptado','Rechazado') NOT NULL DEFAULT 'Aceptado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_admision`
--

INSERT INTO `estado_admision` (`id`, `nombre`) VALUES
(1, 'Aceptado'),
(2, 'Esperando Cama'),
(3, 'Rechazado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `nombre` enum('Masculino','Femenino','No Binario','No especificado') NOT NULL DEFAULT 'No especificado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `nombre`) VALUES
(1, 'Masculino'),
(2, 'Femenino'),
(3, 'No Binario'),
(4, 'No especificado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `idAla` int(11) NOT NULL,
  `cantidadCamas` enum('1','2') NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `numero`, `idAla`, `cantidadCamas`) VALUES
(1, 101, 1, '2'),
(2, 102, 1, '2'),
(3, 103, 1, '2'),
(4, 104, 1, '2'),
(5, 105, 1, '2'),
(6, 401, 4, '1'),
(7, 402, 4, '1'),
(8, 403, 4, '1'),
(9, 404, 4, '1'),
(10, 405, 4, '1'),
(11, 301, 3, '1'),
(12, 302, 3, '1'),
(13, 303, 3, '1'),
(14, 304, 3, '1'),
(15, 305, 3, '1'),
(16, 201, 2, '2'),
(17, 202, 2, '2'),
(18, 203, 2, '2'),
(19, 204, 2, '2'),
(20, 205, 2, '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `internaciones`
--

CREATE TABLE `internaciones` (
  `id` int(11) NOT NULL,
  `fechaIngreso` date NOT NULL,
  `fechaSalida` date DEFAULT NULL,
  `idAdmision` int(11) NOT NULL,
  `idCama` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `internaciones`
--

INSERT INTO `internaciones` (`id`, `fechaIngreso`, `fechaSalida`, `idAdmision`, `idCama`) VALUES
(10, '2025-06-06', NULL, 11, 38),
(11, '2025-06-06', NULL, 12, 39),
(12, '2025-06-08', NULL, 13, 41),
(23, '2025-06-09', NULL, 24, 37),
(24, '2025-06-09', NULL, 25, 38),
(25, '2025-06-09', NULL, 26, 39),
(26, '2025-06-10', NULL, 27, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidades`
--

CREATE TABLE `localidades` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `idProvincia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidades`
--

INSERT INTO `localidades` (`id`, `nombre`, `codigo`, `idProvincia`) VALUES
(1, 'La Plata', '1900', 1),
(2, 'San Fernando del Valle de Catamarca', '4700', 2),
(3, 'Resistencia', '3500', 3),
(4, 'Rawson', '9103', 4),
(5, 'Córdoba', '5000', 5),
(6, 'Corrientes', '3400', 6),
(7, 'Paraná', '3100', 7),
(8, 'Formosa', '3600', 8),
(9, 'San Salvador de Jujuy', '4600', 9),
(10, 'Santa Rosa', '6300', 10),
(11, 'La Rioja', '5300', 11),
(12, 'Mendoza', '5500', 12),
(13, 'Posadas', '3300', 13),
(14, 'Neuquén', '8300', 14),
(15, 'Viedma', '8500', 15),
(16, 'Salta', '4400', 16),
(17, 'San Juan', '5400', 17),
(18, 'San Luis', '5700', 18),
(19, 'Río Gallegos', '9400', 19),
(20, 'Santa Fe', '3000', 20),
(21, 'Santiago del Estero', '4200', 21),
(22, 'Ushuaia', '9410', 22),
(23, 'San Miguel de Tucumán', '4000', 23);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mutuales`
--

CREATE TABLE `mutuales` (
  `id` int(11) NOT NULL,
  `nombre` enum('No Posee','DOSEP','OSDE','PAMI','IOMA','Federada Salud','Galeno','Swiss Medical','Sancor Salud') NOT NULL DEFAULT 'No Posee',
  `idTipoMutual` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mutuales`
--

INSERT INTO `mutuales` (`id`, `nombre`, `idTipoMutual`, `estado`, `createdAt`, `updatedAt`) VALUES
(0, 'No Posee', NULL, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(1, 'OSDE', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(2, 'OSDE', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(3, 'OSDE', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(4, 'DOSEP', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(5, 'DOSEP', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(6, 'DOSEP', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(7, 'Swiss Medical', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(8, 'Swiss Medical', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(9, 'Swiss Medical', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(10, 'PAMI', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(11, 'PAMI', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(12, 'PAMI', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(13, 'IOMA', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(14, 'IOMA', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(15, 'IOMA', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(16, 'Sancor Salud', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(17, 'Sancor Salud', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(18, 'Sancor Salud', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(19, 'Galeno', 1, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(20, 'Galeno', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(21, 'Galeno', 3, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `fecha_nacimiento` date NOT NULL DEFAULT '1900-01-01',
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `idGenero` int(11) NOT NULL,
  `idProvincia` int(11) NOT NULL,
  `idMutual` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `telefonoEmer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`id`, `dni`, `nombre`, `apellido`, `fecha_nacimiento`, `telefono`, `direccion`, `email`, `idGenero`, `idProvincia`, `idMutual`, `createdAt`, `updatedAt`, `telefonoEmer`) VALUES
(1, '1234', 'Matias', 'Corvalanaa', '1998-06-15', '1234', 'Eva Peron', 'mati@gmail.com', 1, 10, 0, '2025-05-31 19:08:53', '2025-06-09 08:01:13', '3213'),
(11, '87654321', 'Nicolas', 'Corvalan', '2025-06-01', '98765443321', 'Eva Peron', 'maati@gmail.com', 3, 4, 15, '2025-06-04 18:14:31', '2025-06-04 18:14:31', NULL),
(14, '12345679', 'nicorran', 'Corvcen', '2025-06-05', '213123', 'dsadsa', 'mati@gmail.com', 1, 17, 2, '2025-06-05 03:57:20', '2025-06-09 08:34:30', ''),
(16, '12345123', 'asdad', 'asdasd', '2025-06-05', '213123', 'asdad', 'mati@gmail.com', 2, 2, 19, '2025-06-05 04:19:23', '2025-06-05 04:19:23', NULL),
(17, '12341212', 'Angel', 'Baroja', '2006-01-31', '987654321', 'Quiaca 121', 'mati@gmail.com', 3, 20, 11, '2025-06-06 05:57:41', '2025-06-06 05:57:41', NULL),
(22, 'NN', 'Rick', 'Grimes', '1900-01-01', '213123', NULL, NULL, 2, 24, 0, '2025-06-06 07:29:31', '2025-06-06 07:29:31', NULL),
(23, NULL, 'Rick', 'Grimes', '1900-01-01', '', NULL, NULL, 1, 24, 0, '2025-06-06 07:34:17', '2025-06-06 07:34:17', NULL),
(25, '65464564', 'Rick', 'Grimes', '1900-01-01', '321321', NULL, NULL, 4, 24, 0, '2025-06-08 03:00:16', '2025-06-08 03:00:16', NULL),
(26, '12312', 'Rick', 'Grimes', '1900-01-01', '121321', NULL, NULL, 2, 24, 0, '2025-06-08 03:03:39', '2025-06-08 03:03:39', NULL),
(27, '123123213', 'Testin', 'dsad', '2025-06-02', '21323', 'dsad', 'mattcorva1024@gmail.com', 1, 2, 18, '2025-06-09 07:38:32', '2025-06-09 07:38:32', NULL),
(29, 'NN-001', 'Rick', 'Grimes', '1900-01-01', '3213', NULL, NULL, 1, 24, 0, '2025-06-10 01:30:12', '2025-06-10 01:30:12', NULL),
(30, '98765987', 'Rick', 'Grimes', '1900-01-01', '', NULL, NULL, 1, 24, 0, '2025-06-10 01:31:29', '2025-06-10 01:31:29', NULL),
(31, '12121212', 'dsadasd', 'sadasdsa', '2025-06-01', '312312', 'dsadasd', 'mattcorva1024@gmail.com', 3, 16, 18, '2025-06-11 02:16:27', '2025-06-11 02:16:27', '1231321');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id`, `nombre`) VALUES
(1, 'Buenos Aires'),
(2, 'Catamarca'),
(3, 'Chaco'),
(4, 'Chubut'),
(5, 'Córdoba'),
(6, 'Corrientes'),
(7, 'Entre Ríos'),
(8, 'Formosa'),
(9, 'Jujuy'),
(10, 'La Pampa'),
(11, 'La Rioja'),
(12, 'Mendoza'),
(13, 'Misiones'),
(14, 'Neuquén'),
(15, 'Río Negro'),
(16, 'Salta'),
(17, 'San Juan'),
(18, 'San Luis'),
(19, 'Santa Cruz'),
(20, 'Santa Fe'),
(21, 'Santiago del Estero'),
(22, 'Tierra del Fuego, Antártida e Islas del Atlántico Sur'),
(23, 'Tucumán'),
(24, 'Sin provincia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolusuarios`
--

CREATE TABLE `rolusuarios` (
  `id` int(11) NOT NULL,
  `nombre` enum('Administrador','Medico','Enfermero','Recepcionista') NOT NULL DEFAULT 'Recepcionista'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rolusuarios`
--

INSERT INTO `rolusuarios` (`id`, `nombre`) VALUES
(1, 'Recepcionista'),
(2, 'Administrador'),
(3, 'Enfermero'),
(4, 'Medico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('9NJMW0GD8WpxOhS4TR1w9qx2yUu2hdbV', 1750200733, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-06-17T22:52:12.572Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('_IcInJlE-hv919XrH6SsViP4qsK-wO5t', 1749625494, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-06-11T06:57:06.731Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1},\"flash\":{}}'),
('fKR67gba7nD_KacHADefjGboXgAz6O5t', 1749624683, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2025-06-11T05:54:46.718Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomutuales`
--

CREATE TABLE `tipomutuales` (
  `id` int(11) NOT NULL,
  `nombre` enum('Basico','Completo','Premium') NOT NULL DEFAULT 'Basico'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipomutuales`
--

INSERT INTO `tipomutuales` (`id`, `nombre`) VALUES
(1, 'Basico'),
(2, 'Completo'),
(3, 'Premium');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposadmision`
--

CREATE TABLE `tiposadmision` (
  `id` int(11) NOT NULL,
  `nombre` enum('Emergencia','Turno','Derivado') NOT NULL DEFAULT 'Emergencia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposadmision`
--

INSERT INTO `tiposadmision` (`id`, `nombre`) VALUES
(1, 'Emergencia'),
(2, 'Turno'),
(3, 'Derivado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_motivo`
--

CREATE TABLE `tipos_motivo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipos_motivo`
--

INSERT INTO `tipos_motivo` (`id`, `nombre`) VALUES
(1, 'ACV'),
(2, 'Accidente'),
(3, 'Aislamiento'),
(4, 'Complicaciones post-parto'),
(5, 'Control post-operatorio'),
(6, 'Crisis hipertensiva'),
(7, 'Cuidados paliativos'),
(8, 'Descompensación'),
(9, 'Deshidratación'),
(10, 'Enfermedad cardiovascular'),
(11, 'Enfermedad respiratoria'),
(12, 'Estudios diagnósticos'),
(13, 'Fractura'),
(14, 'Hemorragia interna'),
(15, 'Infección'),
(16, 'Insuficiencia renal'),
(17, 'Intoxicación'),
(18, 'Parto'),
(19, 'Psiquiatría'),
(20, 'Quemaduras'),
(21, 'Rehabilitación'),
(22, 'Shock séptico'),
(23, 'Transplante'),
(24, 'Tratamiento oncológico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `medico` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`id`, `fecha`, `hora`, `idPaciente`, `medico`, `estado`, `createdAt`, `updatedAt`) VALUES
(5, '2025-06-10', '20:15:00', 1, 'Corvennn', 0, '2025-06-09 04:01:17', '2025-06-09 23:12:27'),
(6, '2025-06-09', '21:35:00', 14, 'Corvenn', 0, '2025-06-09 09:56:24', '2025-06-10 00:08:24'),
(7, '2025-06-09', '22:42:00', 1, 'dsad', 1, '2025-06-10 01:38:00', '2025-06-10 01:38:00'),
(8, '2025-06-09', '21:33:00', 1, 'dsada', 1, '2025-06-10 01:38:16', '2025-06-10 01:38:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idRolUsuario` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `idRolUsuario`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 'Corva', 'mati@gmail.com', '$2a$10$uSpYM.XQXyKjNaWrCC1Xqu1JjONvaWuBjrSA95BsiooKaZ7imgJle', 2, 1, '2025-05-31 19:08:53', '2025-05-31 19:08:53'),
(2, 'matias', 'mati@google.com', '1234', 2, 1, '2025-06-17 18:49:51', '2025-06-17 18:49:51');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPaciente` (`idPaciente`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idTipoAdmision` (`idTipoAdmision`),
  ADD KEY `idEstadoAdmision` (`idEstadoAdmision`),
  ADD KEY `idTurno` (`idTurno`),
  ADD KEY `idTipoMotivo` (`idTipoMotivo`);

--
-- Indices de la tabla `alas`
--
ALTER TABLE `alas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idHabitacion` (`idHabitacion`);

--
-- Indices de la tabla `estado_admision`
--
ALTER TABLE `estado_admision`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAla` (`idAla`);

--
-- Indices de la tabla `internaciones`
--
ALTER TABLE `internaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAdmision` (`idAdmision`),
  ADD KEY `idCama` (`idCama`);

--
-- Indices de la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProvincia` (`idProvincia`);

--
-- Indices de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipoMutual` (`idTipoMutual`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_dni` (`dni`),
  ADD KEY `idGenero` (`idGenero`),
  ADD KEY `idProvincia` (`idProvincia`),
  ADD KEY `idMutual` (`idMutual`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rolusuarios`
--
ALTER TABLE `rolusuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `tipomutuales`
--
ALTER TABLE `tipomutuales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiposadmision`
--
ALTER TABLE `tiposadmision`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_motivo`
--
ALTER TABLE `tipos_motivo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPaciente` (`idPaciente`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`),
  ADD KEY `idRolUsuario` (`idRolUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admisiones`
--
ALTER TABLE `admisiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `alas`
--
ALTER TABLE `alas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `estado_admision`
--
ALTER TABLE `estado_admision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `internaciones`
--
ALTER TABLE `internaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `localidades`
--
ALTER TABLE `localidades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `mutuales`
--
ALTER TABLE `mutuales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `rolusuarios`
--
ALTER TABLE `rolusuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipomutuales`
--
ALTER TABLE `tipomutuales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tiposadmision`
--
ALTER TABLE `tiposadmision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipos_motivo`
--
ALTER TABLE `tipos_motivo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admisiones`
--
ALTER TABLE `admisiones`
  ADD CONSTRAINT `admisiones_ibfk_4227` FOREIGN KEY (`idPaciente`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4228` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4229` FOREIGN KEY (`idTipoAdmision`) REFERENCES `tiposadmision` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4230` FOREIGN KEY (`idEstadoAdmision`) REFERENCES `estado_admision` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4231` FOREIGN KEY (`idTurno`) REFERENCES `turnos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `admisiones_ibfk_4232` FOREIGN KEY (`idTipoMotivo`) REFERENCES `tipos_motivo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`idHabitacion`) REFERENCES `habitaciones` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`idAla`) REFERENCES `alas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `internaciones`
--
ALTER TABLE `internaciones`
  ADD CONSTRAINT `internaciones_ibfk_1453` FOREIGN KEY (`idAdmision`) REFERENCES `admisiones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `internaciones_ibfk_1454` FOREIGN KEY (`idCama`) REFERENCES `camas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `localidades`
--
ALTER TABLE `localidades`
  ADD CONSTRAINT `localidades_ibfk_1` FOREIGN KEY (`idProvincia`) REFERENCES `provincias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `mutuales`
--
ALTER TABLE `mutuales`
  ADD CONSTRAINT `mutuales_ibfk_1` FOREIGN KEY (`idTipoMutual`) REFERENCES `tipomutuales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD CONSTRAINT `pacientes_ibfk_2262` FOREIGN KEY (`idGenero`) REFERENCES `generos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pacientes_ibfk_2263` FOREIGN KEY (`idProvincia`) REFERENCES `provincias` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `pacientes_ibfk_2264` FOREIGN KEY (`idMutual`) REFERENCES `mutuales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD CONSTRAINT `turnos_ibfk_1` FOREIGN KEY (`idPaciente`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRolUsuario`) REFERENCES `rolusuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
