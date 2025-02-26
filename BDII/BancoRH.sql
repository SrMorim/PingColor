-- Criar o Banco de Dados;
CREATE DATABASE bd_rh_0301;
DROP DATABASE bd_rh_0301;

-- Usar Banco de Dados;
USE bd_rh_0301;

-- Criar tabelas
CREATE TABLE tb_cargo 
(cd_cargo INT NOT NULL PRIMARY KEY,
cargo CHAR(30)); -- Criar tabela com seus atributos, not null primary key indica que a chave primária não pode ser vazia

CREATE TABLE tb_setor
(cd_setor INT NOT NULL PRIMARY KEY,
setor CHAR(30));

CREATE TABLE tb_funcionario
(matricula INT NOT NULL PRIMARY KEY,
funcionario CHAR (50),
dt_nascimento DATE,
cd_setor INT,
cd_cargo INT,
salario DECIMAL(12,2));

-- Relacionamentos

ALTER TABLE tb_funcionario 
ADD CONSTRAINT fk_setor FOREIGN KEY (cd_setor)
REFERENCES tb_setor (cd_setor);

ALTER TABLE tb_funcionario
ADD CONSTRAINT fk_cargo FOREIGN KEY (cd_cargo)
REFERENCES tb_cargo (cd_cargo);