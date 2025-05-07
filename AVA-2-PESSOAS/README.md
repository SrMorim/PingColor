# Sistema de Cadastro - Swexato (POO)

## 🎯 Objetivo

O projeto simula o sistema de cadastro da empresa Swexato, com foco em:
- Clientes
- Fornecedores
- Funcionários (incluindo vendedores)
- Usuários de acesso ao ERP

A solução aplica os princípios da Programação Orientada a Objetos (POO) para garantir reutilização, escalabilidade e facilidade de manutenção.

---

## 🧠 Modelagem e Justificativas

### 🔸 Abstração

A classe abstrata `Pessoa` foi criada para representar todos os cadastros que envolvem pessoas físicas ou jurídicas, com atributos comuns como:
- nome
- documento
- endereço
- telefone
- email

Subclasses herdam dela, especializando o comportamento.

### 🔸 Herança

- `Cliente` e `Fornecedor` herdam diretamente de `Pessoa`.
- `Funcionario` também herda de `Pessoa`, sendo abstrata.
- `Vendedor` herda de `Funcionario`, pois todo vendedor é um funcionário com atributos extras: `comissao` e `metaVendas`.
- `UsuarioSistema` **não herda de Pessoa**, pois representa um cadastro técnico de acesso ao sistema (login/senha).

### 🔸 Encapsulamento

Todos os atributos são privados (`private`) e acessados via getters/setters públicos para manter segurança e controle.

---

## 🛠️ Estrutura dos Arquivos

src/
├── Pessoa.java
├── Cliente.java
├── Fornecedor.java
├── Funcionario.java
├── Vendedor.java
├── UsuarioSistema.java
└── Main.java


