class PopupController {
  constructor() {
    this.isPickerActive = false;
    this.currentColor = null;
    this.colorHistory = [];
    
    this.init();
  }
  
  async init() {
    this.bindEvents();
    await this.loadHistory();
    await this.checkPickerStatus();
    this.updateUI();
  }
  
  bindEvents() {
    const toggleBtn = document.getElementById('togglePicker');
    const copyBtn = document.getElementById('copyColor');
    const clearBtn = document.getElementById('clearHistory');
    
    toggleBtn.addEventListener('click', () => this.togglePicker());
    copyBtn.addEventListener('click', () => this.copyCurrentColor());
    clearBtn.addEventListener('click', () => this.clearHistory());
  }
  
  async togglePicker() {
    this.isPickerActive = !this.isPickerActive;
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Verificar se a aba é válida para content scripts
      if (!tab || !tab.url || tab.url.startsWith('chrome://') || 
          tab.url.startsWith('chrome-extension://') || tab.url.startsWith('moz-extension://')) {
        throw new Error('Não é possível capturar cores nesta página. Tente em uma página web normal.');
      }
      
      console.log('Tentando enviar mensagem para tab:', tab.id, tab.url);
      
      // Tentar enviar mensagem para content script
      try {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'TOGGLE_PICKER',
          active: this.isPickerActive
        });
        console.log('Mensagem enviada com sucesso para content script');
      } catch (sendError) {
        console.warn('Content script não encontrado, tentando injetar:', sendError);
        
        // Tentar injetar content script programaticamente
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['src/content/content.js']
          });
          
          // Aguardar um pouco e tentar novamente
          await new Promise(resolve => setTimeout(resolve, 100));
          
          await chrome.tabs.sendMessage(tab.id, {
            type: 'TOGGLE_PICKER',
            active: this.isPickerActive
          });
          
          console.log('Content script injetado e ativado com sucesso');
        } catch (injectError) {
          console.error('Falha ao injetar content script:', injectError);
          throw new Error('Não foi possível ativar a captura de cores nesta página.');
        }
      }
      
      await chrome.storage.local.set({ pickerActive: this.isPickerActive });
      this.updatePickerButton();
      
      // Mostrar feedback de sucesso
      this.showActivationFeedback(this.isPickerActive);
      
    } catch (error) {
      console.error('Erro ao alternar picker:', error);
      this.isPickerActive = false;
      this.updatePickerButton();
      this.showError(error.message || 'Erro ao ativar captura de cores');
    }
  }
  
  async loadHistory() {
    try {
      const result = await chrome.storage.local.get(['colorHistory']);
      this.colorHistory = result.colorHistory || [];
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      this.colorHistory = [];
    }
  }
  
  async saveHistory() {
    try {
      await chrome.storage.local.set({ colorHistory: this.colorHistory });
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
    }
  }
  
  async checkPickerStatus() {
    try {
      const result = await chrome.storage.local.get(['pickerActive']);
      this.isPickerActive = result.pickerActive || false;
    } catch (error) {
      console.error('Erro ao verificar status do picker:', error);
      this.isPickerActive = false;
    }
  }
  
  updatePickerButton() {
    const toggleBtn = document.getElementById('togglePicker');
    const statusSpan = document.getElementById('pickerStatus');
    
    if (this.isPickerActive) {
      toggleBtn.classList.add('active');
      statusSpan.textContent = 'Desativar Captura';
    } else {
      toggleBtn.classList.remove('active');
      statusSpan.textContent = 'Ativar Captura';
    }
  }
  
  updateCurrentColor(color) {
    this.currentColor = color;
    const currentColorDiv = document.getElementById('currentColor');
    const colorPreview = document.getElementById('colorPreview');
    const hexCode = document.getElementById('hexCode');
    
    if (color) {
      currentColorDiv.style.display = 'block';
      colorPreview.style.backgroundColor = color;
      hexCode.textContent = color.toUpperCase();
      
      this.addToHistory(color);
    } else {
      currentColorDiv.style.display = 'none';
    }
  }
  
  addToHistory(color) {
    const upperColor = color.toUpperCase();
    
    if (!this.colorHistory.includes(upperColor)) {
      this.colorHistory.unshift(upperColor);
      
      if (this.colorHistory.length > 10) {
        this.colorHistory = this.colorHistory.slice(0, 10);
      }
      
      this.saveHistory();
      this.renderHistory();
    }
  }
  
  renderHistory() {
    const historyContainer = document.getElementById('colorHistory');
    const clearBtn = document.getElementById('clearHistory');
    
    if (this.colorHistory.length === 0) {
      historyContainer.innerHTML = '<div class="empty-state"><p>Nenhuma cor capturada ainda</p></div>';
      clearBtn.style.display = 'none';
    } else {
      const historyHTML = this.colorHistory.map(color => `
        <div class="color-item" onclick="popupController.selectHistoryColor('${color}')">
          <div class="color-item-preview" style="background-color: ${color};"></div>
          <span class="color-item-code">${color}</span>
        </div>
      `).join('');
      
      historyContainer.innerHTML = historyHTML;
      clearBtn.style.display = 'block';
    }
  }
  
  selectHistoryColor(color) {
    this.copyToClipboard(color);
  }
  
  copyCurrentColor() {
    if (this.currentColor) {
      this.copyToClipboard(this.currentColor.toUpperCase());
    }
  }
  
  async copyToClipboard(color) {
    try {
      await navigator.clipboard.writeText(color);
      this.showCopyFeedback();
    } catch (error) {
      console.error('Erro ao copiar cor:', error);
      
      const textArea = document.createElement('textarea');
      textArea.value = color;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showCopyFeedback();
    }
  }
  
  showCopyFeedback() {
    const copyBtn = document.getElementById('copyColor');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = 'Copiado!';
    copyBtn.style.background = '#38a169';
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = '#38a169';
    }, 1500);
  }
  
  async clearHistory() {
    this.colorHistory = [];
    await this.saveHistory();
    this.renderHistory();
  }
  
  showActivationFeedback(isActive) {
    const statusSpan = document.getElementById('pickerStatus');
    const originalText = statusSpan.textContent;
    
    if (isActive) {
      statusSpan.textContent = '✅ Ativado - Clique em elementos';
      statusSpan.style.color = '#38a169';
    } else {
      statusSpan.textContent = '⭕ Desativado';
      statusSpan.style.color = '#e53e3e';
    }
    
    setTimeout(() => {
      statusSpan.style.color = '';
      this.updatePickerButton();
    }, 2000);
  }
  
  showError(message) {
    const statusSpan = document.getElementById('pickerStatus');
    const originalText = statusSpan.textContent;
    
    statusSpan.textContent = `❌ ${message}`;
    statusSpan.style.color = '#e53e3e';
    
    setTimeout(() => {
      statusSpan.style.color = '';
      this.updatePickerButton();
    }, 3000);
  }
  
  updateUI() {
    this.updatePickerButton();
    this.renderHistory();
  }
}

const popupController = new PopupController();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'COLOR_CAPTURED') {
    popupController.updateCurrentColor(message.color);
    sendResponse({ success: true });
  }
});