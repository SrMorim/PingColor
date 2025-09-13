chrome.runtime.onInstalled.addListener(() => {
  console.log('PingColor extensão instalada.');
  
  chrome.storage.local.set({ 
    pickerActive: false,
    colorHistory: [],
    installDate: Date.now()
  });
  
  // Injetar content script em todas as abas existentes (se possível)
  injectContentScriptInExistingTabs();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
  return true;
});

async function handleMessage(message, sender, sendResponse) {
  try {
    switch (message.type) {
      case 'COLOR_CAPTURED':
        await handleColorCaptured(message, sender);
        sendResponse({ success: true });
        break;
        
      case 'GET_PICKER_STATUS':
        const status = await getPickerStatus();
        sendResponse({ active: status });
        break;
        
      case 'TOGGLE_PICKER':
        await setPickerStatus(message.active);
        sendResponse({ success: true });
        break;
        
      default:
        sendResponse({ error: 'Tipo de mensagem não reconhecido' });
    }
  } catch (error) {
    console.error('Erro no service worker:', error);
    sendResponse({ error: error.message });
  }
}

async function handleColorCaptured(message, sender) {
  try {
    const color = message.color;
    
    await addColorToHistory(color);
    
    await chrome.runtime.sendMessage({
      type: 'COLOR_CAPTURED',
      color: color,
      timestamp: Date.now()
    });
    
    console.log('Cor capturada:', color);
    
  } catch (error) {
    console.error('Erro ao processar cor capturada:', error);
  }
}

async function addColorToHistory(color) {
  try {
    const result = await chrome.storage.local.get(['colorHistory']);
    let history = result.colorHistory || [];
    
    const upperColor = color.toUpperCase();
    
    if (!history.includes(upperColor)) {
      history.unshift(upperColor);
      
      if (history.length > 10) {
        history = history.slice(0, 10);
      }
      
      await chrome.storage.local.set({ colorHistory: history });
    }
  } catch (error) {
    console.error('Erro ao adicionar cor ao histórico:', error);
  }
}

async function getPickerStatus() {
  try {
    const result = await chrome.storage.local.get(['pickerActive']);
    return result.pickerActive || false;
  } catch (error) {
    console.error('Erro ao obter status do picker:', error);
    return false;
  }
}

async function setPickerStatus(active) {
  try {
    await chrome.storage.local.set({ pickerActive: active });
    console.log('Status do picker atualizado:', active);
  } catch (error) {
    console.error('Erro ao definir status do picker:', error);
  }
}

chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: 'PING',
      message: 'Extension is active'
    });
  } catch (error) {
    console.log('Tab não tem content script injetado:', error);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const status = await getPickerStatus();
    
    if (status) {
      await chrome.tabs.sendMessage(activeInfo.tabId, {
        type: 'TOGGLE_PICKER',
        active: true
      });
    }
  } catch (error) {
    console.log('Erro ao sincronizar picker status:', error);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const status = await getPickerStatus();
      
      if (status) {
        setTimeout(async () => {
          try {
            await chrome.tabs.sendMessage(tabId, {
              type: 'TOGGLE_PICKER',
              active: true
            });
          } catch (error) {
            console.log('Content script ainda não carregado:', error);
          }
        }, 1000);
      }
    } catch (error) {
      console.log('Erro ao inicializar picker na aba:', error);
    }
  }
});

// Função para injetar content script em abas existentes
async function injectContentScriptInExistingTabs() {
  try {
    const tabs = await chrome.tabs.query({});
    
    for (const tab of tabs) {
      // Verificar se é uma aba válida para injeção
      if (tab.url && !tab.url.startsWith('chrome://') && 
          !tab.url.startsWith('chrome-extension://') && 
          !tab.url.startsWith('moz-extension://') &&
          !tab.url.startsWith('about:')) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['src/content/content.js']
          });
          console.log(`Content script injetado na aba: ${tab.url}`);
        } catch (error) {
          console.log(`Não foi possível injetar content script na aba ${tab.id}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao injetar content scripts em abas existentes:', error);
  }
}

// Função utilitária para verificar se uma aba suporta content scripts
function isValidTabForContentScript(url) {
  return url && 
         !url.startsWith('chrome://') && 
         !url.startsWith('chrome-extension://') && 
         !url.startsWith('moz-extension://') &&
         !url.startsWith('about:') &&
         !url.startsWith('data:') &&
         !url.startsWith('file://');
}