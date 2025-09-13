# 🎨 PingColor - Color Picker Chrome Extension

> Uma extensão Chrome que funciona como conta-gotas digital para capturar códigos hexadecimais de qualquer cor no navegador.

[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/)
[![Chrome](https://img.shields.io/badge/Chrome-114+-green)](https://www.google.com/chrome/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Sobre o Projeto

PingColor é uma extensão do Google Chrome desenvolvida como parte do **Bootcamp II - Desafio de Entrega Inicial**. A extensão permite aos usuários capturar facilmente códigos hexadecimais de cores de qualquer elemento em páginas web, funcionando como uma ferramenta conta-gotas digital.

### ✨ Funcionalidades

- 🎯 **Captura Precisa**: Clique em qualquer elemento para capturar sua cor em formato hexadecimal
- 📋 **Cópia Automática**: Código hexadecimal é automaticamente copiado para a área de transferência
- 📚 **Histórico**: Mantém um histórico das últimas 10 cores capturadas
- ⚡ **Interface Intuitiva**: Design limpo com tooltips informativos durante a captura
- 🔄 **Ativação/Desativação**: Toggle simples para ativar/desativar o modo captura
- 🌐 **Compatibilidade Universal**: Funciona em qualquer site

## 🚀 Como Usar

1. **Instalar a Extensão**: Carregue a extensão no Chrome (veja [Instalação](#-instalação))
2. **Ativar Captura**: Clique no ícone da extensão e pressione "Ativar Captura"
3. **Capturar Cor**: Clique em qualquer elemento da página para capturar sua cor
4. **Usar Código**: O código hexadecimal é copiado automaticamente para uso

## 📦 Instalação

### Modo Desenvolvedor (Recomendado)

1. Baixe ou clone este repositório
2. Acesse `chrome://extensions/` no seu navegador Chrome
3. Ative o **"Modo desenvolvedor"** no canto superior direito
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta do projeto `PingColor`
6. A extensão será instalada e o ícone aparecerá na barra de ferramentas

### Via Release

1. Baixe a versão mais recente em [Releases](../../releases)
2. Extraia o arquivo ZIP
3. Siga os passos do modo desenvolvedor acima

## 🗂️ Estrutura do Projeto

```
PingColor/
├─ src/
│  ├─ popup/
│  │  ├─ popup.html        # Interface do popup
│  │  ├─ popup.js          # Lógica do popup
│  │  └─ popup.css         # Estilos do popup
│  ├─ content/
│  │  └─ content.js        # Script de captura de cores
│  ├─ background/
│  │  └─ service-worker.js # Service worker (MV3)
│  └─ assets/
│     └─ icon.svg          # Ícone da extensão em SVG
├─ icons/
│  ├─ icon16.png          # Ícone 16x16px
│  ├─ icon32.png          # Ícone 32x32px
│  ├─ icon48.png          # Ícone 48x48px
│  └─ icon128.png         # Ícone 128x128px
├─ docs/                  # GitHub Pages
│  ├─ index.html         # Landing page
│  └─ styles.css         # Estilos da landing page
├─ manifest.json         # Manifest V3
├─ README.md            # Este arquivo
└─ LICENSE              # Licença MIT
```

## 🧩 Especificações Técnicas

### Manifest V3
- **Versão**: 1.0.0
- **Manifest**: V3 (última versão)
- **Compatibilidade**: Chrome 114+
- **Tamanho**: ~15KB

### Permissões
- `storage`: Para salvar histórico de cores localmente
- `activeTab`: Para acessar elementos da página ativa

### APIs Utilizadas
- Chrome Extensions API
- Chrome Storage API
- Chrome Tabs API
- Chrome Runtime API

## 🔧 Desenvolvimento

### Pré-requisitos
- Google Chrome 114+
- Editor de código (recomendado: VS Code)

### Setup Local
```bash
# Clone o repositório
git clone https://github.com/[seu-usuario]/PingColor.git

# Entre na pasta
cd PingColor

# Carregue a extensão no Chrome
# chrome://extensions/ > Modo desenvolvedor > Carregar sem compactação
```

### Arquitetura

1. **Popup**: Interface principal com controles e histórico
2. **Content Script**: Detecta cores de elementos na página
3. **Service Worker**: Gerencia comunicação e armazenamento
4. **Storage**: Histórico persistente de cores capturadas

## 📱 Interface

### Popup da Extensão
- Botão de ativação/desativação
- Visualização da cor atual capturada
- Histórico das últimas 10 cores
- Botões para copiar cores do histórico

### Indicadores Visuais
- Cursor muda para crosshair durante captura
- Elementos recebem destaque visual ao passar o mouse
- Tooltip mostra a cor em tempo real
- Notificação de confirmação após captura

## 🌐 Demo Online

Acesse a página de demonstração: [PingColor GitHub Pages](https://[seu-usuario].github.io/PingColor/)

## 🔒 Segurança

- Utiliza apenas APIs oficiais do Chrome
- Não coleta dados pessoais
- Permissões mínimas necessárias (princípio do menor privilégio)
- Todo armazenamento é local no navegador

## 🧪 Testes

### Funcionalidades Testadas
- ✅ Captura de cores de backgrounds
- ✅ Captura de cores de texto  
- ✅ Captura de cores de bordas
- ✅ Histórico de cores
- ✅ Cópia para área de transferência
- ✅ Ativação/desativação
- ✅ Compatibilidade entre abas

### Browsers Testados
- ✅ Google Chrome 114+
- ✅ Microsoft Edge (Chromium)
- ✅ Brave Browser

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? [Abra uma issue](../../issues) com:
- Descrição do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Versão do Chrome

## 📜 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🏆 Reconhecimentos

- **Bootcamp II** - Programa de desenvolvimento
- **Chrome Extensions Documentation** - Referência técnica
- **Chrome DevTools** - Ferramenta de desenvolvimento

## 👨‍💻 Autor

**[Seu Nome]** - [Seu Email]

- GitHub: [@seu-usuario](https://github.com/seu-usuario)
- LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin)

---

## 📊 Status do Projeto

- ✅ Manifest V3 implementado
- ✅ Interface funcional
- ✅ Captura de cores operacional
- ✅ Histórico funcionando
- ✅ GitHub Pages ativo
- ✅ Documentação completa

**Versão atual**: 1.0.0 🚀

---

<div align="center">

**🎨 Desenvolvido com ❤️ para o Bootcamp II**

⭐ Se este projeto foi útil, considere dar uma estrela!

</div>