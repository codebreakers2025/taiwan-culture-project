import { useState } from "react";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    category: "美食",
    location: "東京",
    budget: 3000,
    days: 3,
    transport: "接駁車",
    showRecommendations: true,
  });

  const categories = ["美食", "浮潛", "遊樂園", "文化體驗", "健行", "SPA"];
  const locations = ["台中", "台北", "桃園", "新竹", "台南", "高雄"];
  const transports = ["接駁車", "租車", "當地交通"];

  return (
    <div className="page-container">
      <div className="container mt-5">
      <h4 className="mb-3">🌍 旅遊體驗設定</h4>

      {/* 旅遊類別選擇 */}
      <div className="row">
        <div className="col-md-12">
          <h6>選擇旅遊體驗</h6>
          <div className="d-flex flex-wrap">
            {categories.map((type) => (
              <button
                key={type}
                className={`btn me-2 mb-2 ${
                  preferences.category === type ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setPreferences({ ...preferences, category: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 目的地選擇 */}
      <div className="row mt-3">
        <div className="col-md-12">
          <h6>選擇目的地</h6>
          <select
            className="form-select"
            value={preferences.location}
            onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 預算 & 旅遊天數 */}
      <div className="row mt-3">
        <div className="col-md-6">
          <h6>預算範圍 (${preferences.budget})</h6>
          <input
            type="range"
            className="form-range"
            min="1000"
            max="10000"
            step="500"
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
          />
        </div>

        <div className="col-md-6">
          <h6>旅遊天數</h6>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setPreferences({ ...preferences, days: preferences.days - 1 })}
              disabled={preferences.days <= 1}
            >
              ➖
            </button>
            <span className="mx-3">{preferences.days} 天</span>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setPreferences({ ...preferences, days: preferences.days + 1 })}
              disabled={preferences.days >= 14}
            >
              ➕
            </button>
          </div>
        </div>
      </div>

      {/* 交通方式 */}
      <div className="row mt-3">
        <div className="col-md-12">
          <h6>選擇交通方式</h6>
          {transports.map((mode) => (
            <div className="form-check form-check-inline" key={mode}>
              <input
                className="form-check-input"
                type="radio"
                name="transport"
                checked={preferences.transport === mode}
                onChange={() => setPreferences({ ...preferences, transport: mode })}
                id={`transport-${mode}`}
              />
              <label className="form-check-label" htmlFor={`transport-${mode}`}>
                {mode}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 顯示推薦 */}
      <div className="row mt-3">
        <div className="col-md-12">
          <h6>顯示即時推薦</h6>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="show-recommendations"
              checked={preferences.showRecommendations}
              onChange={() =>
                setPreferences({
                  ...preferences,
                  showRecommendations: !preferences.showRecommendations,
                })
              }
            />
            <label className="form-check-label" htmlFor="show-recommendations">
              {preferences.showRecommendations ? "開啟" : "關閉"}
            </label>
          </div>
        </div>
      </div>

      {/* 提交按鈕 */}
      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg">搜尋推薦行程</button>
      </div>
    </div>
    </div>
  );
};

export default Preferences;
