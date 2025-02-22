# Estrutura Base para Projetos Java - Padrão MVC

Este repositório fornece uma estrutura base para projetos Java seguindo o padrão **MVC (Model-View-Controller)**. Ele serve como um ponto de partida para novos projetos, garantindo organização e modularidade desde o início.

## 📂 Estrutura de Diretórios

```
/nome-projeto
│── /src
│   ├── /main
│   │   ├── /java
│   │   │   ├── /com/nomeprojeto
│   │   │   │   ├── /controller
│   │   │   │   │   ├── MainController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   ├── /model
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── DAOUser.java
│   │   │   │   ├── /view
│   │   │   │   │   ├── MainView.java
│   │   │   │   │   ├── LoginView.java
│   │   │   │   │   ├── main.fxml
│   │   │   │   │   ├── login.fxml
│   │   │   │   ├── App.java
│   │   │   │   ├── Config.java
│   │   ├── /resources
│   │   │   ├── /css
│   │   │   │   ├── style.css
│   │   │   ├── /images
│   │   │   │   ├── logo.png
│   │   │   ├── database.properties
│   ├── /test
│   │   ├── /java
│   │   │   ├── /com/nomeprojeto
│   │   │   │   ├── /controller
│   │   │   │   │   ├── UserControllerTest.java
│   │   │   │   ├── /model
│   │   │   │   │   ├── UserTest.java
│── /lib
│── /logs
│── pom.xml (caso seja um projeto Maven)
│── build.gradle (caso seja um projeto Gradle)
│── README.md
```

## 📌 Descrição dos Diretórios

- **`controller/`** → Gerencia a comunicação entre `model` e `view`.
- **`model/`** → Contém as classes que representam os dados e a lógica de negócios.
- **`view/`** → Interface com o usuário, incluindo classes JavaFX e arquivos `.fxml`.
- **`resources/`** → Arquivos estáticos como CSS, imagens e configurações.
- **`test/`** → Testes unitários para as classes do projeto.
- **`lib/`** → Bibliotecas externas (caso necessário).
- **`logs/`** → Arquivos de log do sistema.
- **`pom.xml / build.gradle`** → Arquivos de configuração para dependências.

## 📌 Considerações Finais

Está pasta serve como um **template para qualquer novo projeto Java** que siga o padrão **MVC**. Ele ajuda a manter a organização, escalabilidade e boas práticas desde o início.

Se precisar de melhorias ou adaptações, fique à vontade para modificar conforme suas necessidades! 🚀

