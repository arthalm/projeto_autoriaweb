-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/01/2024 às 01:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco_hotel`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcategoria_quarto`
--

CREATE TABLE `tbcategoria_quarto` (
  `id` tinyint(4) NOT NULL,
  `nomecategoria` varchar(50) NOT NULL,
  `descricao` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbcategoria_quarto`
--

INSERT INTO `tbcategoria_quarto` (`id`, `nomecategoria`, `descricao`) VALUES
(1, 'Double', 'Ideal para casais.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbhotel`
--

CREATE TABLE `tbhotel` (
  `cnpj` int(3) NOT NULL,
  `nomehotel` varchar(50) NOT NULL,
  `cep` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbcategoria_quarto`
--
ALTER TABLE `tbcategoria_quarto`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbhotel`
--
ALTER TABLE `tbhotel`
  ADD PRIMARY KEY (`cnpj`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbcategoria_quarto`
--
ALTER TABLE `tbcategoria_quarto`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
