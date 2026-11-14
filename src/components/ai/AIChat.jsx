import { useEffect, useRef, useState } from "react";
import { FiCpu, FiSend, FiUser } from "react-icons/fi";
import api from "../../api/axios.js";
function AIChat() {
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome-message",
      role: "assistant",
      content: "Hi! I am your health advisor. You can ask about nutrition, fitness, sleep, or healthy habits."
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage || loading) {
      return;
    }
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: cleanMessage
    };
    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setMessage("");
    setError("");
    try {
      setLoading(true);
      const response = await api.post("/ai-advisor/chat", {
        message: cleanMessage
      });
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response.data.reply
      };
      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage
      ]);
    } catch (requestError) {
      console.error("AI Advisor request error:", requestError);
      setError(
        requestError.response?.data?.message || "Could not get a response from the AI Advisor."
      );
    } finally {
      setLoading(false);
    }
  };
  return <section className="ai-chat-card">
      <div className="ai-chat-header">
        <div className="ai-chat-heading">
          <div className="ai-chat-logo">
            <FiCpu />
          </div>

          <div>
            <h3>AI Wellness Coach</h3>

            <p>
              <span className="ai-online-dot" />
              Powered by Gemini
            </p>
          </div>
        </div>
      </div>

      {error && <p className="ai-chat-error">{error}</p>}

      <div className="ai-chat-messages">
        {messages.map((chatMessage) => <article
    key={chatMessage.id}
    className={`ai-message ai-message-${chatMessage.role}`}
  >
            <div className="ai-message-avatar">
              {chatMessage.role === "assistant" ? <FiCpu /> : <FiUser />}
            </div>

            <div className="ai-message-content">
              <span>
                {chatMessage.role === "assistant" ? "AI Advisor" : "You"}
              </span>

              <p>{chatMessage.content}</p>
            </div>
          </article>)}

        {loading && <article className="ai-message ai-message-assistant">
            <div className="ai-message-avatar">
              <FiCpu />
            </div>

            <div className="ai-message-content">
              <span>AI Advisor</span>

              <div className="ai-typing-dots">
                <i />
                <i />
                <i />
              </div>
            </div>
          </article>}

        <div ref={messagesEndRef} />
      </div>

      <form className="ai-chat-form" onSubmit={handleSubmit}>
        <textarea
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    maxLength={1e3}
    placeholder="Ask about nutrition, fitness, sleep or healthy habits..."
  />

        <button type="submit" disabled={!message.trim() || loading}>
          <FiSend />
        </button>
      </form>

      <p className="ai-chat-disclaimer">
        AI guidance is general information, not a medical diagnosis.
      </p>
    </section>;
}
export default AIChat;
