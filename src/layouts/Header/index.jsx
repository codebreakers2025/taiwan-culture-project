import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.scss';
import { register, login } from '@/utils/api';


const Header = () => {
    // 設定語言
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => { i18n.changeLanguage(lng); };

    // 用戶
    const [userData, setUserData] = useState({}); // 存儲用戶資料

    // 登入註冊資料
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 表單輸入處理
    const handleInputChange = (e, isLoginForm) => {
        const { id, value } = e.target;
        if (isLoginForm) {
            setLoginData((prev) => {
                const newData = { ...prev, [id]: value };
                return newData;
            });
        } else {
            setRegisterData((prev) => {
                const newData = { ...prev, [id]: value };
                return newData;
            });
        }
    };

  //登入註冊邏輯
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // 控制登入/註冊切換
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 控制登入/登出切換
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // const handleGoogleSignIn = () => {
    //     // 在這裡處理 Google 登入邏輯
    //     console.log("Google Sign-In triggered");
    // };

    // 登入邏輯
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await login(loginData); // 替換為你的 API 函數
            setIsLoggedIn(true);
            updateUserData({
                name: "Olivier",
                image: "https://mighty.tools/mockmind-api/content/cartoon/27.jpg", // 使用者圖片的 URL
            });
            alert("登入成功!");
            handleCloseModal(); // 關閉模態框
        } catch (error) {
            setError("登入失敗，請檢查帳號或密碼");
            console.error('登入失敗:', error);
        } finally {
            setLoading(false);
        }
    };

    // 註冊邏輯
    const handleRegister = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            setError("密碼與確認密碼不一致");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await register(registerData); // 替換為你的 API 函數
            alert("註冊成功:", response);
            setIsLogin(true); // 切換回登入模式
        } catch (error) {
            setError("註冊失敗，請稍後再試");
            console.log(registerData);
        } finally {
            setLoading(false);
        }
    };

    // 登出函式
    const handleLogout = () => {
        // 清除 token
        localStorage.removeItem("token");

        // 更新登入狀態
        setIsLoggedIn(false);

        updateUserData({});

        // 顯示登出成功訊息
        alert("登出成功！");

        // 關閉 modal
        handleCloseModal();
    };

    // 更新用戶資料
    const updateUserData = (data) => {
        setUserData(data);
    };

    // 處理手機選單
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleNavbar = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (showModal) {
        // 禁用背景滾動
            document.body.style.overflow = "hidden";
        } else {
        // 恢復背景滾動
            document.body.style.overflow = "auto";
        }
        // 清理函數，確保組件卸載時恢復滾動
        return () => {
            document.body.style.overflow = "auto";
        };

    }, [showModal]); // 僅在 `showModal` 狀態改變時執行

   // 檢查是否有 token，若有則表示已登入
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUserData({
                name: "Jolin",
                image: "https://mighty.tools/mockmind-api/content/cartoon/27.jpg", // 使用者圖片的 URL
            });
        } else {
            setIsLoggedIn(false);
            setUserData({
                name: "",
                image: "", // 使用者圖片的 URL
            });
        }
    }, []);

    
    return (
        <header className={`header ${menuOpen ? "menu-open" : ""}`}>
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container d-flex justify-content-between align-items-center">
            <Link className="navbar-brand nav-link d-flex align-items-center" to="/">
                <h1 className="header-logo-side m-0 d-flex align-items-center"></h1>
            </Link>
            <button 
                className={`navbar-toggler ${menuOpen ? "" : "collapsed"}`}
                type="button" 
                
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded={menuOpen} 
                aria-label="Toggle navigation"
                onClick={toggleNavbar}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/activityList" onClick={closeMenu}>{t('menu.activityList')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/journal" onClick={closeMenu}>{t('menu.journal')}</Link>
                </li>
                {/* 多國語系切換 */}
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {t('menu.lang')}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <button className="dropdown-item" onClick={() => changeLanguage('zhCn')}>{t('lang.zhCn')}</button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => changeLanguage('zhCn')}>{t('lang.en')}</button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => changeLanguage('zhCn')}>{t('lang.jp')}</button>
                    </li>
                    </ul>
                </li>
                {/* 登入註冊按鈕 */}
                <li className="nav-item">
                    {isLoggedIn ? (
                            <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={userData.image}
                                    alt="User"
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                />
                                <span className="ms-2">{userData.name}</span>
                            </button>
                            <ul className="dropdown-menu user-dropdown-menu" aria-labelledby="userDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">{t('member.center')}</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">{t('member.orderList')}</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">{t('member.favoritesList')}</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                                        {t('member.signOut')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        ) : (
                            <button className="btn btn-primary" onClick={handleOpenModal}>
                                {t('member.signIn')}
                            </button>
                        )}
                </li>
                </ul>
            </div>
            </div>
        </nav>

        {/* 登入/註冊彈窗 */}
        {showModal && (
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isLogin ? t('form.login') : t('form.register')}</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {isLogin ? (
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">{t('form.email')}</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        value={loginData.email} 
                                        onChange={(e) => handleInputChange(e, true)} 
                                        placeholder={t('form.pleaseEnterYourEmail')} 
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">{t('form.password')}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={loginData.password}
                                        onChange={(e) => handleInputChange(e, true)}
                                        placeholder={t('form.pleaseEnterYourPassword')}
                                        required />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? t('form.loggingIn') : t('form.login')}</button>
                                    {/* <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        onClick={() => console.log("Google 登入")} >
                                        <i className="fab fa-google"></i> {t('form.loginGoogle')}
                                    </button> */}

                                <div className="text-center mt-3">
                                    <span>{t('form.notMember')}</span>{" "}
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        onClick={() => setIsLogin(false)} >
                                        {t('form.registerNow')}
                                    </button>
                                </div>
                            </form>
                            ) : (
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">{t('form.email')}</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={registerData.email}
                                        onChange={(e) => handleInputChange(e, false)}
                                        placeholder={t('form.pleaseEnterYourEmail')}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">{t('form.password')}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={registerData.password}
                                        onChange={(e) => handleInputChange(e, false)}
                                        placeholder={t('form.pleaseEnterYourPassword')}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">{t('form.confirmPassword')}</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => handleInputChange(e, false)}
                                        placeholder={t('form.ReEnterPassword')}
                                        required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? t('form.Registering') : t('form.register')}</button>
                                <div className="text-center mt-3">
                                <span>{t('form.isMember')}</span>{" "}
                                <button type="button" className="btn btn-link" onClick={() => setIsLogin(true)}>{t('form.signInNow')}</button>
                                </div>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </header>
    );
    };

    export default Header;