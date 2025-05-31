// import React, { useState, useRef, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [model, setModel] = useState('Code Llama');
//   const chatEndRef = useRef(null);

//   const models = ['Llama 2 7 B', 'Mistral 7', 'Code Llama', 'Qwen-1.8B'];

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     const aiMessage = {
//       role: 'ai',
//       content:
//         'Quantum gravity is a field of theoretical physics that seeks to unify general relativity, which describes gravity as the curvature of spacetime, with quantum mechanics, which governs the behavior of particles and forces at tiny scales...',
//     };

//     setMessages((prev) => [...prev, userMessage, aiMessage]);
//     setInput('');
//   };

//   const handleClear = () => {
//     setMessages([]);
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="app-container">


//     <div className="header">
//       <span className="active-dot"></span>
//       <span>
//         active: <b>{model}</b> <span className="subtext">general purpose</span>
//       </span>
//     </div>

//     <div className="chat-area">
//       {messages.map((msg, idx) => (
//         <div key={idx} className={`chat-bubble ${msg.role}`}>
//           {msg.content}
//         </div>
//       ))}
//       <div ref={chatEndRef} />
//     </div>

//     <div className="input-section">
//       <input
//         type="text"
//         placeholder="Ask anything"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//       />
//       <button onClick={handleSend}>➤</button>
//     </div>

//     <div className="footer">
//       <div className="model-select">
//         Select model:
//         <select value={model} onChange={(e) => setModel(e.target.value)}>
//           {models.map((m) => (
//             <option key={m} value={m}>
//               {m}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button className="clear-button" onClick={handleClear}>
//         Clear Chat
//       </button>
//     </div>

  
// </div>

//   );
// };

// export default App;
import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';  // Add this import
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('Code Llama');
  const chatEndRef = useRef(null);

  const models = ['Llama 2 7 B', 'Mistral 7', 'Code Llama', 'Qwen-1.8B'];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const aiMessage = {
      role: 'ai',
      content:
        'Quantum gravity is a field of theoretical physics that seeks to unify general relativity, which describes gravity as the curvature of spacetime, with quantum mechanics, which governs the behavior of particles and forces at tiny scales...',
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput('');
  };

  const handleClear = () => {
    setMessages([]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="app-container">
      {/* Add the Helmet component at the top */}
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Helmet>

      <div className="header">
        <span className="active-dot"></span>
        <span>
          active: <b>{model}</b> <span className="subtext">general purpose</span>
        </span>
      </div>
      <div class="main-content">
      <div className="chat-area">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Ask anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>

      <div className="footer">
        <div className="model-select">
          Select model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <button className="clear-button" onClick={handleClear}>
          Clear Chat
        </button>
      </div>
      </div>
    </div>
  );
};

export default App;