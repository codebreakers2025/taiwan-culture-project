import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [streak, setStreak] = useState(0);
  const [signedDays, setSignedDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // 取得本地存儲的簽到資料
    const storedSignInData = JSON.parse(localStorage.getItem("signInData")) || {
      isSignedIn: false,
      streak: 0,
      signedDays: [],
    };

    setIsSignedIn(storedSignInData.isSignedIn);
    setStreak(storedSignInData.streak);
    setSignedDays(storedSignInData.signedDays);
  }, []);

  // 獲取當月總天數
  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  // 取得當前日期
  const today = new Date().toISOString().split("T")[0];

  const handleSignIn = () => {
    if (isSignedIn) return;

    const newSignedDays = [...signedDays, today];
    const newStreak = streak + 1;

    setIsSignedIn(true);
    setStreak(newStreak);
    setSignedDays(newSignedDays);

    localStorage.setItem(
      "signInData",
      JSON.stringify({ isSignedIn: true, streak: newStreak, signedDays: newSignedDays })
    );

    Swal.fire({
      title: "簽到成功！",
      text: `你已連續簽到 ${newStreak} 天`,
      icon: "success",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">每日簽到</h2>

      {/* 簽到按鈕 */}
      <div className="text-center my-3">
        <button className={`btn ${isSignedIn ? "btn-secondary" : "btn-primary"}`} onClick={handleSignIn} disabled={isSignedIn}>
          {isSignedIn ? "今日已簽到" : "立即簽到"}
        </button>
      </div>

      {/* 連續簽到進度條 */}
      <div className="text-center">
        <p>連續簽到：{streak} 天</p>
        <div className="progress" style={{ height: "25px" }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${(streak % 7) * 14.28}%` }}
          >
            {streak % 7} / 7
          </div>
        </div>
        {streak % 7 === 0 && streak !== 0 && <p className="text-success mt-2">🎉 恭喜獲得獎勵！</p>}
      </div>

      {/* 簽到日曆 */}
      <h4 className="mt-4 text-center">{currentYear} 年 {currentMonth} 月 簽到記錄</h4>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const daysInMonth = getDaysInMonth(currentYear, currentMonth);
              const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
              const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;
              const daysArray = [];

              for (let i = 0; i < totalCells; i++) {
                const dayNum = i - firstDayOfMonth + 1;
                const dateStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

                daysArray.push(
                  dayNum > 0 && dayNum <= daysInMonth ? (
                    <td key={i} className={signedDays.includes(dateStr) ? "bg-success text-white" : ""}>
                      {dayNum}
                    </td>
                  ) : (
                    <td key={i} className="bg-light"></td>
                  )
                );
              }

              return [...Array(totalCells / 7)].map((_, weekIndex) => (
                <tr key={weekIndex}>{daysArray.slice(weekIndex * 7, (weekIndex + 1) * 7)}</tr>
              ));
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SignIn;
