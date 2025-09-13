# 🔧 Comandos de Debug - PingColor

## Console do Service Worker
```javascript
// Verificar storage
chrome.storage.local.get(null, console.log);

// Limpar storage
chrome.storage.local.clear();

// Verificar status do picker
chrome.storage.local.get(['pickerActive'], console.log);
```

## Console da Página (F12)
```javascript
// Verificar se content script carregou
console.log('PingColor content script:', typeof colorPicker);

// Simular ativação do picker
if (typeof colorPicker !== 'undefined') {
    colorPicker.activate();
}

// Testar captura de cor manual
colorPicker.getElementColor(document.body);
```

## URLs Úteis
- `chrome://extensions/` - Gerenciar extensões
- `chrome://extensions-internals/` - Debug avançado
- `chrome://inspect/#extensions` - Inspector de extensões

## Verificações Rápidas
1. ✅ Manifest válido?
2. ✅ Todos os arquivos existem?
3. ✅ Ícones PNG criados?
4. ✅ Popup abre?
5. ✅ Content script injeta?
6. ✅ Service worker ativo?