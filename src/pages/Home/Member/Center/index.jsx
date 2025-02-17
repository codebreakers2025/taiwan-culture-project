import React, { useState } from 'react';

const Center = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [trips, setTrips] = useState([
    { id: 1, name: "台北一日遊", date: "2025-03-10", status: "預定" },
    { id: 2, name: "九份老街美食之旅", date: "2025-03-15", status: "預定" },
  ]);

  const [rewards, setRewards] = useState({
    points: 1200,
    achievements: ["完成第一次預訂", "專屬VIP優惠"],
  });

  const [tickets, setTickets] = useState([
    { id: 1, name: "台北一日遊票券", date: "2025-03-10", status: "已發送" },
    { id: 2, name: "九份老街美食之旅票券", date: "2025-03-15", status: "已發送" },
  ]);

  const [entries, setEntries] = useState([
    { id: 1, title: "台北旅行記錄", date: "2025-03-10", content: "這是我的台北一日遊日誌..." },
    { id: 2, title: "九份老街探險", date: "2025-03-15", content: "品嘗了當地的美食..." },
  ]);

  const [cards, setCards] = useState([
    { id: 1, type: "信用卡", last4Digits: "1234" },
    { id: 2, type: "支付寶", last4Digits: "5678" },
  ]);

  return (
    <div className="page-container">
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          {/* 我的行程 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">我的行程</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>行程名稱</th>
                    <th>日期</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id}>
                      <td>{trip.name}</td>
                      <td>{trip.date}</td>
                      <td>{trip.status}</td>
                      <td>
                        <button className="btn btn-info btn-sm">查看</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 積分與獎勳 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">積分與獎勳</h5>
              <p>積分：{rewards.points} 點</p>
              <h6>已獲得的獎勳</h6>
              <ul className="list-group">
                {rewards.achievements.map((achievement, index) => (
                  <li key={index} className="list-group-item">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 我的票券 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">我的票券</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>票券名稱</th>
                    <th>日期</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.name}</td>
                      <td>{ticket.date}</td>
                      <td>{ticket.status}</td>
                      <td>
                        <button className="btn btn-success btn-sm">查看票券</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 旅行日誌 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">旅行日誌</h5>
              <ul className="list-group">
                {entries.map((entry) => (
                  <li key={entry.id} className="list-group-item">
                    <h6>{entry.title}</h6>
                    <small>{entry.date}</small>
                    <p>{entry.content}</p>
                    <button className="btn btn-info btn-sm">查看</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 訂閱與通知設定 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">訂閱與通知設定</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emailNotifications"
                  checked={settings.email}
                  onChange={() => setSettings({ ...settings, email: !settings.email })}
                />
                <label className="form-check-label" htmlFor="emailNotifications">
                  接收電子郵件通知
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="smsNotifications"
                  checked={settings.sms}
                  onChange={() => setSettings({ ...settings, sms: !settings.sms })}
                />
                <label className="form-check-label" htmlFor="smsNotifications">
                  接收短信通知
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="pushNotifications"
                  checked={settings.push}
                  onChange={() => setSettings({ ...settings, push: !settings.push })}
                />
                <label className="form-check-label" htmlFor="pushNotifications">
                  接收推播通知
                </label>
              </div>
            </div>
          </div>

          {/* 支付設定 */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">支付設定</h5>
              <ul className="list-group">
                {cards.map((card) => (
                  <li key={card.id} className="list-group-item">
                    {card.type}: **** **** **** {card.last4Digits}
                    <button className="btn btn-warning btn-sm ml-2">編輯</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Center;
