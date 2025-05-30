import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  // State management
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [chats, setChats] = useState([]);
  const [currentModel, setCurrentModel] = useState('llama2');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const chatMessagesRef = useRef(null);

  // Models data
  const models = {
    llama2: { name: 'Llama 2 7B', description: 'General purpose', avatar: 'L2' },
    mistral: { name: 'Mistral 7B', description: 'Balanced', avatar: 'M7' },
    codellama: { name: 'Code Llama', description: 'Programming', avatar: 'CL' }
  };

  // Quick actions
  const quickActions = [
    {
      icon: '💡',
      title: 'Learn',
      description: 'Get explanations on any topic',
      prompt: 'Explain machine learning in simple terms'
    },
    {
      icon: '💻',
      title: 'Code',
      description: 'Programming help & debugging',
      prompt: 'Write a Python function to calculate factorial'
    },
    {
      icon: '✍️',
      title: 'Write',
      description: 'Creative writing assistance',
      prompt: 'Write a short story about a robot who learns to love'
    },
    {
      icon: '🔧',
      title: 'Solve',
      description: 'Problem solving & math',
      prompt: 'Solve this math problem: (3x^2 + 2x - 5) = 0'
    }
  ];

  // Initialize app
  useEffect(() => {
    loadChatHistory();
    checkThemePreference();
    scrollToBottom();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = 'auto';
      messageInputRef.current.style.height = `${Math.min(
        messageInputRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [messageInput]);

  // Load chat history from localStorage
  const loadChatHistory = () => {
    const savedChats = localStorage.getItem('adaChats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  };

  // Check and apply theme preference
  const checkThemePreference = () => {
    const savedTheme = localStorage.getItem('adaTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    setIsDarkTheme(theme === 'dark');
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format time as HH:MM AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  // Generate a simulated AI response
  const generateAIResponse = (message, model) => {
    const responses = {
      llama2: [
        "Llama 2 here! Based on your question, I'd suggest...",
        "Interesting question! From my training data, I can tell you that...",
        "As a Llama 2 model, I can provide information about..."
      ],
      mistral: [
        "Mistral 7B responding: The answer to your query is...",
        "Thanks for your question! My analysis suggests that...",
        "As a Mistral model, I'm optimized to provide balanced responses like..."
      ],
      codellama: [
        "Code Llama at your service! Here's how to solve that coding problem:",
        "For your programming question, I'd recommend this approach:",
        "As a coding specialist, I can explain that..."
      ]
    };

    const randomResponse = responses[model][Math.floor(Math.random() * responses[model].length)];
    return randomResponse + " " + loremIpsum();
  };

  // Generate some lorem ipsum text
  const loremIpsum = () => {
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  };

  // Send a message
  const sendMessage = () => {
    const message = messageInput.trim();
    if (!message) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      content: message,
      time: formatTime(new Date())
    };

    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setShowWelcome(false);

    // Update chat history
    updateCurrentChat(message, '', false);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(message, currentModel);
      const aiMessage = {
        sender: 'ai',
        content: aiResponse,
        time: formatTime(new Date())
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Update chat history with AI response
      updateCurrentChat('', aiResponse, false);
    }, 1500);
  };

  // Handle quick action click
  const handleQuickAction = (prompt) => {
    setMessageInput(prompt);
    messageInputRef.current.focus();
  };

  // Create a new chat
  const createNewChat = () => {
    setCurrentChatId(Date.now());
    setMessages([]);
    setShowWelcome(true);
    setIsMobileMenuOpen(false);
  };

  // Clear current chat
  const clearCurrentChat = () => {
    if (window.confirm('Are you sure you want to clear this chat?')) {
      setMessages([]);
      setShowWelcome(true);
      updateCurrentChat('', '', true);
    }
  };

  // Export chat
  const exportChat = () => {
    if (messages.length === 0) {
      alert('No messages to export!');
      return;
    }

    const chatContent = messages.map(msg => {
      return `${msg.sender === 'user' ? 'You' : 'Ada'}: ${msg.content}`;
    }).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ada-chat-${currentChatId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Update current chat in history
  const updateCurrentChat = (userMessage, aiMessage, clear) => {
    setChats(prevChats => {
      let updatedChats = [...prevChats];
      let chatIndex = updatedChats.findIndex(chat => chat.id === currentChatId);
      
      if (clear) {
        if (chatIndex !== -1) {
          updatedChats[chatIndex].messages = [];
          updatedChats[chatIndex].preview = 'Empty chat';
          updatedChats[chatIndex].timestamp = formatTime(new Date());
        }
        return updatedChats;
      }

      if (chatIndex === -1) {
        // New chat
        const newChat = {
          id: currentChatId,
          model: currentModel,
          preview: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''),
          timestamp: formatTime(new Date()),
          messages: []
        };
        updatedChats = [newChat, ...updatedChats];
        chatIndex = 0;
      }

      if (userMessage) {
        updatedChats[chatIndex].messages.push({ sender: 'user', content: userMessage });
      }
      
      if (aiMessage) {
        updatedChats[chatIndex].messages.push({ sender: 'ai', content: aiMessage.content });
      }

      // Update preview with the last user message
      if (userMessage) {
        updatedChats[chatIndex].preview = userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : '');
        updatedChats[chatIndex].timestamp = formatTime(new Date());
      }

      // Save to localStorage
      localStorage.setItem('adaChats', JSON.stringify(updatedChats));

      return updatedChats;
    });
  };

  // Load a specific chat
  const loadChat = (chatId) => {
    const chat = chats.find(chat => chat.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setCurrentModel(chat.model);
      setMessages(chat.messages);
      setShowWelcome(chat.messages.length === 0);
      setIsMobileMenuOpen(false);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('adaTheme', newTheme ? 'dark' : 'light');
  };

  // Handle key down in message input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Get current chat title
  const getChatTitle = () => {
    const chat = chats.find(chat => chat.id === currentChatId);
    if (chat && chat.preview && chat.preview !== 'Empty chat') {
      return chat.preview;
    }
    return `Chat with ${models[currentModel]?.name || 'AI'}`;
  };

  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      {/* App Header */}
      <div class="app-container">
      <header className="design-header">
        <div className="brand-section">
          <div className="brand-icon">
            <img src="https://i.postimg.cc/Sx2st0P2/Chat-GPT-Image-May-20-2025-03-19-15-PM.webp" alt="Ada Logo" />
          </div>
          <div className="brand-text">
            <h1>Ada</h1>
            <p>AI Assistant</p>
          </div>
        </div>
        <div className="status-chip">
          <div className="status-dot"></div>
          <span>Online • Ready</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Left Panel */}
        <div className={`left-panel ${isMobileMenuOpen ? 'open' : ''}`}>
          {/* New Chat Button */}
          <button className="new-chat-btn" onClick={createNewChat}>
            <span>➕</span>
            New Chat
          </button>

          {/* Chat History Section */}
          <div className="panel-section">
            <div className="panel-title">Recent Chats</div>
            <div className="chat-history scroll-custom">
              {chats.map(chat => (
                <div 
                  key={chat.id}
                  className={`chat-history-item ${chat.id === currentChatId ? 'active' : ''}`}
                  onClick={() => loadChat(chat.id)}
                >
                  <div className="chat-preview">{chat.preview}</div>
                  <div className="chat-timestamp">{chat.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Models Section */}
          <div className="panel-section">
            <div className="panel-title">AI Models</div>
            
            {Object.entries(models).map(([modelId, model]) => (
              <div 
                key={modelId}
                className={`model-card ${currentModel === modelId ? 'selected' : ''}`}
                onClick={() => setCurrentModel(modelId)}
              >
                <div className="model-avatar">{model.avatar}</div>
                <div className="model-info">
                  <h4>{model.name}</h4>
                  <p>{model.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-title">{getChatTitle()}</div>
            <div className="header-actions">
              <button className="action-btn" onClick={clearCurrentChat}>Clear</button>
              <button className="action-btn" onClick={exportChat}>Export</button>
              <div className="theme-switcher">
                <button className="theme-btn" onClick={toggleTheme}>🌓</button>
              </div>
            </div>
          </div>

          <div className="chat-messages scroll-custom" ref={chatMessagesRef}>
            {showWelcome ? (
              <div className="welcome-state">
                <div className="welcome-icon">🚀</div>
                <div className="welcome-title">Welcome to Ada</div>
                <div className="welcome-subtitle">
                  Your AI assistant is ready to help with learning, coding, and creative tasks
                </div>
                
                <div className="quick-actions-grid">
                  {quickActions.map((action, index) => (
                    <div 
                      key={index}
                      className="quick-action-card"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <div className="action-icon">{action.icon}</div>
                      <div className="action-title">{action.title}</div>
                      <div className="action-desc">{action.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`message ${message.sender}-message`}
                  >
                    <div>{message.content}</div>
                    <div className="message-time">{message.time}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="chat-input-area">
            <div className="input-wrapper">
              <textarea
                ref={messageInputRef}
                className="message-input"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows="1"
              />
              <button className="send-button" onClick={sendMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default App; 
