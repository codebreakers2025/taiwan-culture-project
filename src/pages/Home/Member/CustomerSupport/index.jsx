import { useState, useEffect, useRef } from 'react';

const CustomerSupport = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: '歡迎來到旅遊客服中心 👋',
      time: '09:00'
    },
    {
      id: 2,
      type: 'agent',
      sender: 'Lisa',
      content: '您好，我是您的專屬旅遊顧問Lisa，很高興能夠協助您！',
      time: '09:01'
    }
  ]);

  const chatEndRef = useRef(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  const quickResponses = {
    '訂單': '請問您需要查詢哪一筆訂單呢？請提供訂單編號，我馬上為您查詢。',
    '價格': '我們的價格都是即時更新的，建議您直接在網站上查看最新優惠。另外，我們目前有早鳥優惠活動進行中！',
    '行程': '我們有許多精選行程供您選擇，請問您想去哪個地區呢？我可以為您推薦最適合的方案。',
    '退款': '關於退款申請，我需要為您確認一下訂單資訊。請您提供訂單編號，我會立即為您處理。'
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');

      // 自動回覆邏輯
      const matchedKey = Object.keys(quickResponses).find(key => 
        message.toLowerCase().includes(key)
      );

      if (matchedKey) {
        setIsAgentTyping(true);
        setTimeout(() => {
          const autoResponse = {
            id: Date.now() + 1,
            type: 'agent',
            sender: 'Lisa',
            content: quickResponses[matchedKey],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, autoResponse]);
          setIsAgentTyping(false);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentTyping]);

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center align-items-center">
            <div className="shadow-lg border-0 rounded-4 overflow-hidden">
              {/* 頭部 */}
              <div className="border-bottom-0 p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <h5 className="mb-0 fw-semibold">旅遊客服中心</h5>
                      <div className="d-flex align-items-center gap-2">
                        <span className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></span>
                        <small className="text-secondary">線上服務中</small>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* 聊天內容區 */}
              <div className=" bg-light p-4" style={{ height: '500px', overflowY: 'auto' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 d-flex ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`${msg.type === 'user' ? 'order-1' : 'order-2'}`} style={{ maxWidth: '80%' }}>
                      {msg.type === 'agent' && (
                        <div className="small text-secondary mb-1">{msg.sender}</div>
                      )}
                      <div className={`rounded-4 p-3 ${
                        msg.type === 'user' 
                          ? 'bg-primary text-white' 
                          : msg.type === 'system'
                          ? 'bg-secondary bg-opacity-10 text-secondary'
                          : 'bg-white border text-dark'
                      }`}>
                        <p className="small mb-1">{msg.content}</p>
                        <div className={`small ${
                          msg.type === 'user' ? 'text-white-50' : 'text-secondary'
                        }`}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isAgentTyping && (
                  <div className="d-flex justify-content-start mb-4">
                    <div className="border rounded-4 p-3">
                      <div className="d-flex gap-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* 快速功能按鈕 */}
              <div className="border-top border-bottom p-3">
                <div className="d-flex gap-2 overflow-auto pb-2">
                  {['行程諮詢', '訂單查詢', '優惠資訊', '退款申請', '常見問題'].map((item) => (
                    <button
                      key={item}
                      className="btn btn-light btn-sm rounded-pill px-3 text-secondary"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 輸入區域 */}
              <div className="border-top-0 p-3">
                <form onSubmit={handleSendMessage}>
                  <div className="input-group">
                    <button className="btn btn-light" type="button">
                      <span className="material-icons text-secondary">
                        image
                      </span>
                    </button>
                    <input
                      type="text"
                      className="form-control border-secondary-subtle"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="輸入訊息..."
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      <span className="material-icons">
                        send
                      </span>
                    </button>
                  </div>
                </form>
              </div>
        </div>
    </div>
    </div>
  );
};

export default CustomerSupport;