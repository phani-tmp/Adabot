

// import React, { useState, useRef, useEffect } from 'react';
// import './AdaChatUI.css';
// import { Send, Plus, ChevronDown, Trash2, Upload } from 'lucide-react';

// export default function AdaChatUI() {
//   const [message, setMessage] = useState('');
//   const [selectedModel, setSelectedModel] = useState('Llama 2 7 B');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const models = [
//     'Llama 2 7 B',
//     'Mistral 7',
//     'Code Llama',
//     'Qwen 1.8 B',
//     'more models...'
//   ];
//   const DottedBoxIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     style={{ marginRight: '6px' }}
//     >
//         <rect x="2" y="2" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//         <rect x="6" y="6" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//     </svg>
//     );

//   const paragraph = `I created a clever little tool that acts like a personal research assistant for government IT contracts. Every time you run it, it springs into action - opening up SAM.gov like you would in a regular browser, typing in "IT services" just like a human would, and gathering all the latest opportunities.

//   The real magic happens after the search. It carefully examines each listing, picking out the most important details: what the project's about, which agency posted it, when the deadline is, and a full description. Then it plays matchmaker, checking how well each opportunity aligns with your specific needs by looking for keywords like "cloud services" or "cybersecurity support."

//   What I love about this tool is how thoughtful it is. It understands that government websites can be tricky, so it patiently waits for pages to load, scrolls naturally like a person would, and has backup plans when things don't appear exactly where expected. If it hits a snag, it leaves helpful notes about what went wrong.

//   When it's done, you get a neatly organized shortlist of the top 5 most relevant opportunities, complete with all the key details you need to decide which ones to pursue. It even saves everything.`;

//   const handleSend = () => {
//     if (!message.trim()) return;
//     setChatHistory([...chatHistory, { question: message, answer: paragraph }]);
//     setMessage('');
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   const handleClear = () => setChatHistory([]);

//   const handleFileUpload = (event) => {
//     const files = Array.from(event.target.files);
//     setUploadedFiles([...uploadedFiles, ...files]);
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   return (
//     <div className="ada-wrapper">
//       <div className="status-bar">
//         <span className="active">active:</span>
//         <span className="model-name">{selectedModel}</span>
//         <span className="model-type">general purpose</span>
//       </div>

//       <div className="chat-box">
//         <div className="chat-scroll" ref={chatContainerRef}>
//           {chatHistory.map((msg, index) => (
//             <div className="chat-msg" key={index}>
//               <h3>{msg.question}</h3>
//               <hr className="chat-divider" />
//               <p>{msg.answer}</p>
//             </div>
//           ))}
//         </div>

//         <div className="input-wrapper">
//           <input
//             className={`chat-input ${chatHistory.length === 0 ? 'large-placeholder' : ''}`}
//             placeholder={chatHistory.length === 0 ? '| I\'m Ada, Ask me Anything' : 'Ask anything'}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//         </div>

//         <div className="chat-actions">
//           <div className="dropdown">
//             <button onClick={() => fileInputRef.current.click()}>
//               <Upload size={14} /><DottedBoxIcon />  Select model <ChevronDown size={14} />
//             </button>
//             <input
//               type="file"
//               multiple
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//               onChange={handleFileUpload}
//             />
//             {showDropdown && (
//               <div className="dropdown-content">
//                 {models.map((model, idx) => (
//                   <div
//                     key={idx}
//                     className="dropdown-item"
//                     onClick={() => {
//                       setSelectedModel(model);
//                       setShowDropdown(false);
//                     }}
//                   >
//                     {model}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button className="clear-chat" onClick={handleClear}>
//             <Trash2 size={14} /> Clear Chat
//           </button>

//           <button className="send-btn" onClick={handleSend}>
//             <Send size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useRef, useEffect } from 'react';
// import './AdaChatUI.css';
// import { Send, Plus, ChevronDown, Trash2 } from 'lucide-react';
// import { FiSend } from 'react-icons/fi'; // Feather Icons - Send (looks same)
// const DottedBoxIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     style={{ marginRight: '6px' }}
//   >
//     <rect x="2" y="2" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//     <rect x="6" y="6" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//   </svg>
// );

// export default function AdaChatUI() {
//   const [message, setMessage] = useState('');
//   const [selectedModel, setSelectedModel] = useState('Llama 2 7 B');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const models = [
//     'Llama 2 7 B',
//     'Mistral 7',
//     'Code Llama',
//     'Qwen 1.8 B',
//     'more models...'
//   ];

//   const handleSend = () => {
//     if (!message.trim()) return;
//     setChatHistory([...chatHistory, { question: message, answer: '...' }]);
//     setMessage('');
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   const handleClear = () => setChatHistory([]);

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   return (
//     <div className="ada-wrapper">
//       <div className="status-bar">
//         <span className="active">active:</span>
//         <span className="model-name">{selectedModel}</span>
//         <span className="model-type">general purpose</span>
//       </div>

//       <div className="chat-box">
//         <div className="chat-scroll" ref={chatContainerRef}>
//           {chatHistory.map((msg, index) => (
//             <div className="chat-msg" key={index}>
//               <h3>{msg.question}</h3>
//               <hr className="chat-divider" />
//               <p>{msg.answer}</p>
//             </div>
//           ))}
//         </div>

//         <div className="chat-input-container">
//           <input
//             className={`chat-input ${chatHistory.length === 0 ? 'large-placeholder' : ''}`}
//             placeholder={chatHistory.length === 0 ? ' I\'m Ada, Ask me Anything' : 'Ask anything'}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <div className="chat-actions">
//             <button className="upload-button" onClick={handleUploadClick}>
//               <Plus size={16} />
//             </button>
//             <input
//               type="file"
//               multiple
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//             />

//             <div className="dropdown">
//               <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
//                 <DottedBoxIcon /> Select model <ChevronDown size={14} />
//               </button>
//               {showDropdown && (
//                 <div className="dropdown-content">
//                   {models.map((model, idx) => (
//                     <div
//                       key={idx}
//                       className="dropdown-item"
//                       onClick={() => {
//                         setSelectedModel(model);
//                         setShowDropdown(false);
//                       }}
//                     >
//                       {model}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button className="clear-chat" onClick={handleClear}>
//               <Trash2 size={14} /> Clear Chat
//             </button>

            
//             <button className="send-btn" type="submit">
//                 <img src="https://i.postimg.cc/1XJ7KggJ/send.png" alt="Send" className="send-icon" />
//                 </button>

//             {/* <button className="send-btn">
//                 <img src="/send.png" alt="Search" className="send-icon" />
//                 </button>  */}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 


// import React, { useState, useRef, useEffect } from 'react';
// import './AdaChatUI.css';
// import { Plus, ChevronDown, Trash2 } from 'lucide-react';

// const DottedBoxIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="18"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     style={{ marginRight: '6px' }}
//   >
//     <rect x="2" y="2" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//     <rect x="6" y="6" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//   </svg>
// );

// const modelOptions = [
//   { name: 'Llama 2 7 B', tag: 'general Purpose' },
//   { name: 'Mistral 7', tag: 'Balanced' },
//   { name: 'Code Llama', tag: 'Programming' },
//   { name: 'Qwen 1.8 B', tag: 'Reasoning' },
//   { name: 'more models...', tag: '' }
// ];

// export default function AdaChatUI() {
//   const [message, setMessage] = useState('');
//   const [selectedModel, setSelectedModel] = useState('Llama 2 7 B');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     setChatHistory([...chatHistory, { question: message, answer: '...' }]);
//     setMessage('');
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   const handleClear = () => setChatHistory([]);

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   return (
//     <div className="ada-wrapper">
//       <div className="status-bar">
//         <span className="active">active:</span>
//         <span className="model-name">{selectedModel}</span>
//         <span className="model-type">general purpose</span>
//       </div>

//       <div className="chat-box">
//         <div className="chat-scroll" ref={chatContainerRef}>
//           {chatHistory.map((msg, index) => (
//             <div className="chat-msg" key={index}>
//               <h3>{msg.question}</h3>
//               <hr className="chat-divider" />
//               <p>{msg.answer}</p>
//             </div>
//           ))}
//         </div>

//         <div className="chat-input-container">
//           <input
//             className={`chat-input ${chatHistory.length === 0 ? 'large-placeholder' : ''}`}
//             placeholder={chatHistory.length === 0 ? ' I\'m Ada, Ask me Anything' : 'Ask anything'}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <div className="chat-actions">
//             <button className="upload-button" onClick={handleUploadClick}>
//               <Plus size={16} />
//             </button>
//             <input
//               type="file"
//               multiple
//               ref={fileInputRef}
//               style={{ display: 'none' }}
//             />

//             <div className="dropdown">
//               <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
//                 <DottedBoxIcon /> Select model <ChevronDown size={14} />
//               </button>
//               {showDropdown && (
//                 <div className={`dropdown-content ${chatHistory.length * 60 > 300 ? 'above' : ''}`}>
//                   {modelOptions.map((model, idx) => (
//                     <label key={idx} className="model-option">
//                       <input
//                         type="radio"
//                         name="model"
//                         value={model.name}
//                         checked={selectedModel === model.name}
//                         onChange={() => setSelectedModel(model.name)}
//                       />
//                       <span className="radio-circle" />
//                       <span className="model-name">{model.name}</span>
//                       {model.tag && <span className="model-tag">{model.tag}</span>}
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button className="clear-chat" onClick={handleClear}>
//               <Trash2 size={14} /> Clear Chat
//             </button>

//             <button className="send-btn" type="submit" onClick={handleSend}>
//               <img
//                 src="https://i.postimg.cc/02fSf4Q2/send.png"
//                 alt="Send"
//                 className="send-icon"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useRef, useEffect } from 'react';
// import './AdaChatUI.css';
// import { Plus, ChevronDown, Trash2 } from 'lucide-react';

// const DottedBoxIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
//     <rect x="2" y="2" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//     <rect x="6" y="6" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
//   </svg>
// );

// const modelOptions = [
//   { name: 'Llama 2 7 B', tag: 'general purpose' },
//   { name: 'Mistral 7', tag: 'Balanced' },
//   { name: 'Code Llama', tag: 'Programming' },
//   { name: 'Qwen 1.8 B', tag: 'Reasoning' },
//   { name: 'more models...', tag: '' }
// ];

// export default function AdaChatUI() {
//   const [message, setMessage] = useState('');
//   const [selectedModel, setSelectedModel] = useState('Llama 2 7 B');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [chatHistory, setChatHistory] = useState([]);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     setChatHistory([...chatHistory, { question: message, answer: '...' }]);
//     setMessage('');
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSend();
//   };

//   const handleClear = () => setChatHistory([]);

//   const handleUploadClick = () => fileInputRef.current.click();

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatHistory]);

//   return (
//     <div className="ada-wrapper">
//       <div className="status-bar">
//         <span className="active">active:</span>
//         <span className="model-name">{selectedModel}</span>
//         <span className="model-type">{modelOptions.find(m => m.name === selectedModel)?.tag}</span>
//       </div>

//       <div className="chat-box">
//         <div className="chat-scroll" ref={chatContainerRef}>
//           {chatHistory.map((msg, index) => (
//             <div className="chat-msg" key={index}>
//               <h3>{msg.question}</h3>
//               <hr className="chat-divider" />
//               <p>{msg.answer}</p>
//             </div>
//           ))}
//         </div>

//         <div className="chat-input-container">
//           <input
//             className={`chat-input ${chatHistory.length === 0 ? 'large-placeholder' : ''}`}
//             placeholder={chatHistory.length === 0 ? "I'm Ada, Ask me Anything" : "Ask anything"}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />

//           <div className="chat-actions">
//             <button className="upload-button" onClick={handleUploadClick}>
//               <Plus size={16} />
//             </button>
//             <input type="file" ref={fileInputRef} style={{ display: 'none' }} />

//             <div className="dropdown">
//               <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
//                 <DottedBoxIcon /> Select model <ChevronDown size={14} />
//               </button>
//               {showDropdown && (
//                 <div className={`dropdown-content ${chatHistory.length * 60 > 300 ? 'above' : ''}`}>
//                   {modelOptions.map((model, idx) => (
//                     <label key={idx} className="model-option" onClick={() => setSelectedModel(model.name)}>
//                       <div className={`big-radio ${selectedModel === model.name ? 'selected' : ''}`} />
//                       <span>{model.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <button className="clear-chat" onClick={handleClear}>
//               <Trash2 size={14} /> Clear Chat
//             </button>

//             <button className="send-btn" type="submit" onClick={handleSend}>
//               <img
//                 src="https://i.postimg.cc/02fSf4Q2/send.png"
//                 alt="Send"
//                 className="send-icon"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import './AdaChatUI.css';
import { Plus, ChevronDown, Trash2 } from 'lucide-react';

const DottedBoxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <rect x="2" y="2" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
    <rect x="6" y="6" width="10" height="10" rx="2" ry="2" strokeDasharray="3 2" />
  </svg>
);

const modelOptions = [
  { name: 'Llama 2 7 B', tag: 'general purpose' },
  { name: 'Mistral 7', tag: 'Balanced' },
  { name: 'Code Llama', tag: 'Programming' },
  { name: 'Qwen 1.8 B', tag: 'Reasoning' },
  { name: 'more models...', tag: '' }
];

export default function AdaChatUI() {
  const [message, setMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('Llama 2 7 B');
  const [showDropdown, setShowDropdown] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { question: message, answer: '...' }]);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleClear = () => setChatHistory([]);

  const handleUploadClick = () => fileInputRef.current.click();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="ada-wrapper">
      <div className="status-bar">
        <span className="active">active:</span>
        <span className="model-name">{selectedModel}</span>
        <span className="model-type">{modelOptions.find(m => m.name === selectedModel)?.tag}</span>
      </div>

      <div className="chat-box">
        <div className="chat-scroll" ref={chatContainerRef}>
          {chatHistory.map((msg, index) => (
            <div className="chat-msg" key={index}>
              <h3>{msg.question}</h3>
              <hr className="chat-divider" />
              <p>{msg.answer}</p>
            </div>
          ))}
        </div>

        <div className="chat-input-container">
          <input
            className={`chat-input ${chatHistory.length === 0 ? 'large-placeholder' : ''}`}
            placeholder={chatHistory.length === 0 ? "I'm Ada, Ask me Anything" : "Ask anything"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="chat-actions">
            <button className="upload-button" onClick={handleUploadClick}>
              <Plus size={16} />
            </button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} />

            <div className="dropdown">
              <button type="button" onClick={() => setShowDropdown(!showDropdown)}>
                <DottedBoxIcon /> Select model <ChevronDown size={14} />
              </button>
              {showDropdown && (
                <div className={`dropdown-content ${chatHistory.length * 60 > 300 ? 'above' : ''}`}>
                  {modelOptions.map((model, idx) => (
                    <label key={idx} className="model-option" onClick={() => {
                      setSelectedModel(model.name);
                      setShowDropdown(false);
                    }}>
                      <div className={`big-radio ${selectedModel === model.name ? 'selected' : ''}`} />
                      <span>{model.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button className="clear-chat" onClick={handleClear}>
              <Trash2 size={14} /> Clear Chat
            </button>

            <button className="send-btn" type="submit" onClick={handleSend}>
              <img
                src="https://i.postimg.cc/02fSf4Q2/send.png"
                alt="Send"
                className="send-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
