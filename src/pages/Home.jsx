


// import axiosClient from "../utils/axiosClient";
// import React, { useState, useRef, useEffect } from "react";
// import { Send, Smile } from "lucide-react";

// function Home() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     { sender: "model", text: "How can i help you today?" },
//   ]);
//   const [showEmoji, setShowEmoji] = useState(false);
//   const [typing, setTyping] = useState(false);

//   const textareaRef = useRef(null);
//   const chatRef = useRef(null);
//   const emojiRef = useRef(null);

//   const emojis = ["😀", "😂", "😍", "😎", "😢", "🔥", "❤️", "👍", "💀", "🤯"];

//   const addEmoji = (emoji) => {
//     setInput((prev) => prev + emoji);
//     setShowEmoji(false);
//   };

//   // Load saved messages
//   useEffect(() => {
//     const savedMessages = localStorage.getItem("chatMessages");
//     if (savedMessages) {
//       setMessages(JSON.parse(savedMessages));
//     }
//   }, []);

//   // Save messages
//   useEffect(() => {
//     localStorage.setItem("chatMessages", JSON.stringify(messages));
//   }, [messages]);

//   // Auto Grow textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "38px";
//       textareaRef.current.style.height =
//         textareaRef.current.scrollHeight + "px";
//     }
//   }, [input]);

//   // Auto scroll chat
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages, typing]);

//   // 🔥 Click Outside Emoji Popup → Close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (emojiRef.current && !emojiRef.current.contains(e.target)) {
//         setShowEmoji(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Backend request
//   const getInformation = async () => {
//     try {
//       if (!input.trim()) return;

//       setMessages((prev) => [...prev, { sender: "user", text: input }]);
//       setInput("");

//       setTyping(true);
//       const { data } = await axiosClient.post("/api/allInfo", { msg: input });

//       setMessages((prev) => [...prev, { sender: "model", text: data.answer }]);
//       setTyping(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex justify-center items-center bg-black/5">
//       <div className="h-[100vh] w-full sm:w-[480px] max-w-[480px] bg-base-100 shadow-xl border border-gray-700 flex flex-col overflow-hidden">
        
//         {/* Header */}
//         <div className="px-4 py-3 text-center font-semibold bg-base-200 sticky top-0 z-10">
//           Chat
//         </div>

//         {/* Chat Area */}
//         <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-4 bg-base-100">
//           {messages.map((msg, i) => (
//             <div
//               key={i}
//               className={`chat ${
//                 msg.sender === "user" ? "chat-end" : "chat-start"
//               }`}
//             >
//               <div className="chat-image avatar">
//                 <div className="w-7 sm:w-8 rounded-full">
//                   <img
//                     src={
//                       msg.sender === "user"
//                         ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
//                         : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
//                     }
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`chat-bubble rounded-2xl break-words shadow-md ${
//                   msg.sender === "user"
//                     ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
//                     : "bg-blue-300 text-black"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}

//           {/* Typing */}
//           {typing && (
//             <div className="chat chat-start">
//               <div className="chat-image avatar">
//                 <div className="w-8 rounded-full">
//                   <img src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
//                 </div>
//               </div>
//               <div className="chat-bubble bg-gray-300 text-black rounded-2xl">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="bg-base-100 p-3 relative flex items-end gap-2">

//           {/* Emoji Toggle Button */}
//           <button
//             onClick={() => setShowEmoji(!showEmoji)}
//             className="p-2 text-gray-200 hover:text-yellow-400"
//           >
//             <Smile size={24} />
//           </button>

//           {/* Emoji Popup */}
//           {showEmoji && (
//             <div
//               ref={emojiRef}
//               className="absolute bottom-16 left-3 bg-white shadow-lg rounded-xl p-3 grid grid-cols-5 gap-2 border z-20 w-48 sm:w-56"
//             >
//               {emojis.map((em, index) => (
//                 <button
//                   key={index}
//                   className="text-xl hover:scale-110 transition"
//                   onClick={() => addEmoji(em)}
//                 >
//                   {em}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Textarea */}
//           <textarea
//             ref={textareaRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 getInformation();
//               }
//             }}
//             placeholder="Message..."
//             className="flex-1 resize-none no-scrollbar bg-base-100 border border-gray-600 rounded-xl px-3 py-2 outline-none max-h-40 overflow-y-auto text-sm"
//             rows="1"
//           />

//           {/* Send Button */}
//           {input.trim() !== "" && (
//             <button
//               onClick={getInformation}
//               className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:scale-105 transition"
//             >
//               <Send size={18} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;







import axiosClient from "../utils/axiosClient";
import React, { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";

function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "model", text: "How can I help you today?" },
  ]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [typing, setTyping] = useState(false);

  const textareaRef = useRef(null);
  const chatRef = useRef(null);
  const emojiRef = useRef(null);

  const emojis = ["😀", "😂", "😍", "😎", "😢", "🔥", "❤️", "👍", "💀", "🤯"];

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmoji(false);
  };

  // Load previous chat messages
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages on change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Auto expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "38px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  // Auto scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // Close emoji popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sending request
  const getInformation = async () => {
    try {
      if (!input.trim()) return;

      setMessages((prev) => [...prev, { sender: "user", text: input }]);
      setInput("");

      setTyping(true);

      const { data } = await axiosClient.post("/api/allInfo", { msg: input });

      setMessages((prev) => [...prev, { sender: "model", text: data.answer }]);
      setTyping(false);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black/5">
      <div className="h-[100vh] w-full sm:w-[480px] max-w-[480px] bg-base-100 shadow-xl border border-gray-700 flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="px-4 py-3 text-center font-semibold bg-base-200 sticky top-0 z-10">
          Chat
        </div>

        {/* CHAT BODY */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-3 space-y-4 bg-base-100"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat ${
                msg.sender === "user" ? "chat-end" : "chat-start"
              } animate-fadeIn`}
            >
              <div className="chat-image avatar">
                <div className="w-7 sm:w-8 rounded-full">
                  <img
                    src={
                      msg.sender === "user"
                        ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                        : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>

              <div
                className={`chat-bubble rounded-2xl break-words shadow-md animate-fadeIn ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-blue-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* GPT TYPING ANIMATION */}
          {typing && (
            <div className="chat chat-start animate-fadeIn">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
                </div>
              </div>

              <div className="chat-bubble bg-transparent rounded-2xl flex gap-1 items-center">
                <span className="dot animate-bounce"></span>
                <span className="dot animate-bounce delay-150"></span>
                <span className="dot animate-bounce delay-300"></span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div className="bg-base-100 p-3 relative flex items-end gap-2">

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="p-2 text-gray-200 hover:text-yellow-400"
          >
            <Smile size={24} />
          </button>

          {/* Emoji Popup */}
          {showEmoji && (
            <div
              ref={emojiRef}
              className="absolute bottom-16 left-3 bg-white shadow-lg rounded-xl p-3 
              grid grid-cols-5 gap-2 border z-20 w-48 sm:w-56 
              transition-all duration-200 scale-95 opacity-0 animate-[popup_0.2s_ease-out_forwards]"
            >
              {emojis.map((em, index) => (
                <button
                  key={index}
                  className="text-xl hover:scale-125 transition-transform duration-150"
                  onClick={() => addEmoji(em)}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                getInformation();
              }
            }}
            placeholder="Message..."
            className="flex-1 resize-none no-scrollbar bg-base-100 border border-gray-600 rounded-xl px-3 py-2 outline-none max-h-40 overflow-y-auto text-sm"
            rows="1"
          />

          {/* Send Button */}
          {input.trim() !== "" && (
            <button
              onClick={getInformation}
              className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:scale-105 transition"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
