class ColorPicker {
  constructor() {
    this.isActive = false;
    this.originalCursor = null;
    this.overlay = null;
    this.tooltip = null;
    this.currentElement = null;
    
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    
    this.init();
  }
  
  init() {
    console.log('🎨 PingColor content script carregado na página:', window.location.href);
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Manter canal de comunicação aberto para respostas assíncronas
    });
    
    // Confirmar carregamento para o service worker
    this.confirmLoading();
  }
  
  async confirmLoading() {
    try {
      await chrome.runtime.sendMessage({
        type: 'CONTENT_SCRIPT_LOADED',
        url: window.location.href,
        timestamp: Date.now()
      });
      console.log('✅ Content script confirmado com service worker');
    } catch (error) {
      console.warn('⚠️ Não foi possível confirmar carregamento:', error);
    }
  }
  
  handleMessage(message, sender, sendResponse) {
    console.log('📨 Content script recebeu mensagem:', message.type, message);
    
    switch (message.type) {
      case 'TOGGLE_PICKER':
        try {
          if (message.active) {
            this.activate();
            console.log('✅ Picker ativado com sucesso');
          } else {
            this.deactivate();
            console.log('⭕ Picker desativado com sucesso');
          }
          sendResponse({ success: true, active: this.isActive });
        } catch (error) {
          console.error('❌ Erro ao alternar picker:', error);
          sendResponse({ success: false, error: error.message });
        }
        break;
        
      case 'PING':
        console.log('🏓 Ping recebido, respondendo...');
        sendResponse({ alive: true, url: window.location.href });
        break;
        
      default:
        console.warn('⚠️ Tipo de mensagem não reconhecido:', message.type);
        sendResponse({ error: 'Tipo de mensagem não reconhecido' });
    }
  }
  
  activate() {
    if (this.isActive) {
      console.log('⚠️ Picker já está ativo');
      return;
    }
    
    console.log('🎯 Ativando color picker...');
    
    this.isActive = true;
    this.originalCursor = document.body.style.cursor;
    
    this.createOverlay();
    this.createTooltip();
    
    document.addEventListener('mousemove', this.handleMouseMove, true);
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('keydown', this.handleKeyDown, true);
    
    document.body.style.cursor = 'crosshair';
    document.body.style.userSelect = 'none';
    
    console.log('✅ Color picker ativado com sucesso');
    
    // Mostrar instrução visual
    this.showActivationMessage();
  }
  
  deactivate() {
    if (!this.isActive) return;
    
    this.isActive = false;
    
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('keydown', this.handleKeyDown, true);
    
    this.removeOverlay();
    this.removeTooltip();
    
    document.body.style.cursor = this.originalCursor || '';
    document.body.style.userSelect = '';
    
    if (this.currentElement) {
      this.currentElement.style.outline = '';
      this.currentElement = null;
    }
    
    console.log('Color picker desativado');
  }
  
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'pingcolor-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.1);
      z-index: 2147483646;
      pointer-events: none;
      backdrop-filter: blur(1px);
    `;
    document.body.appendChild(this.overlay);
  }
  
  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
  
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.id = 'pingcolor-tooltip';
    this.tooltip.style.cssText = `
      position: fixed;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      font-weight: bold;
      z-index: 2147483647;
      pointer-events: none;
      transform: translate(-50%, -100%);
      margin-top: -10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: none;
    `;
    document.body.appendChild(this.tooltip);
  }
  
  removeTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }
  
  handleMouseMove(event) {
    if (!this.isActive) return;
    
    event.stopPropagation();
    event.preventDefault();
    
    const element = document.elementFromPoint(event.clientX, event.clientY);
    
    if (element && element !== this.overlay && element !== this.tooltip) {
      if (this.currentElement && this.currentElement !== element) {
        this.currentElement.style.outline = '';
      }
      
      this.currentElement = element;
      
      const color = this.getElementColor(element);
      
      if (color) {
        element.style.outline = '3px solid #ff6b6b';
        element.style.outlineOffset = '2px';
        
        this.updateTooltip(event.clientX, event.clientY, color);
      }
    }
  }
  
  handleClick(event) {
    if (!this.isActive) return;
    
    event.stopPropagation();
    event.preventDefault();
    
    const element = document.elementFromPoint(event.clientX, event.clientY);
    
    if (element && element !== this.overlay && element !== this.tooltip) {
      const color = this.getElementColor(element);
      
      if (color) {
        this.captureColor(color);
        this.deactivate();
      }
    }
  }
  
  handleKeyDown(event) {
    if (!this.isActive) return;
    
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.deactivate();
    }
  }
  
  getElementColor(element) {
    if (!element) return null;
    
    const computedStyle = window.getComputedStyle(element);
    
    let color = computedStyle.backgroundColor;
    
    if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
      color = computedStyle.color;
    }
    
    if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
      color = computedStyle.borderColor;
    }
    
    if (!color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
      const parent = element.parentElement;
      if (parent) {
        return this.getElementColor(parent);
      }
      return null;
    }
    
    return this.rgbToHex(color);
  }
  
  rgbToHex(color) {
    if (!color) return null;
    
    if (color.startsWith('#')) {
      return color.length === 7 ? color : null;
    }
    
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    
    if (!rgbMatch) return null;
    
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    
    const hex = ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    
    return `#${hex}`;
  }
  
  updateTooltip(x, y, color) {
    if (!this.tooltip) return;
    
    this.tooltip.textContent = color.toUpperCase();
    this.tooltip.style.left = `${x}px`;
    this.tooltip.style.top = `${y}px`;
    this.tooltip.style.display = 'block';
    
    this.tooltip.style.background = `linear-gradient(135deg, ${color} 0%, rgba(0, 0, 0, 0.8) 100%)`;
    this.tooltip.style.borderLeft = `4px solid ${color}`;
  }
  
  async captureColor(color) {
    try {
      await chrome.runtime.sendMessage({
        type: 'COLOR_CAPTURED',
        color: color,
        timestamp: Date.now(),
        url: window.location.href
      });
      
      this.showCaptureFeedback(color);
      
    } catch (error) {
      console.error('Erro ao enviar cor capturada:', error);
    }
  }
  
  showCaptureFeedback(color) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, ${color} 0%, rgba(0, 0, 0, 0.9) 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      font-weight: 600;
      z-index: 2147483647;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      border-left: 4px solid ${color};
      animation: slideIn 0.3s ease-out;
    `;
    
    feedback.innerHTML = `
      <div>🎨 Cor capturada!</div>
      <div style="font-family: 'Courier New', monospace; margin-top: 4px;">${color.toUpperCase()}</div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        feedback.remove();
        style.remove();
      }, 300);
    }, 2000);
  }
  
  showActivationMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(102, 126, 234, 0.95);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      font-weight: 600;
      z-index: 2147483647;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
      animation: fadeInOut 3s ease-out forwards;
    `;
    
    message.innerHTML = '🎯 Modo captura ativo! Clique em qualquer elemento para capturar sua cor. ESC para cancelar.';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0px); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
      style.remove();
    }, 3000);
  }
}

const colorPicker = new ColorPicker();

// Prevenir múltiplas instâncias
if (window.pingColorLoaded) {
  console.log('⚠️ PingColor content script já estava carregado');
} else {
  window.pingColorLoaded = true;
  console.log('🎨 PingColor content script carregado e inicializado');
}