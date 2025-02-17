import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import { updateAvatar, updateUsers } from '@/utils/api';

const Menu = () => {
      const userId = Number(localStorage.getItem("userId")); // 取得 userId
      const userName = localStorage.getItem("userName"); // 取得 userName

      const [userData, setUserData] = useState({
        id: userId, // 用戶ID
        name: userName,
        image: "https://mighty.tools/mockmind-api/content/human/119.jpg",
      }); 

      const [selectedFile, setSelectedFile] = useState(null);
      const [previewImage, setPreviewImage] = useState(userData.image);

      // 處理本地圖片 select
      const handleFileChange  = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

      //上傳圖片
    const handleUpload = async (reader) => {
      console.log("選擇的檔案:", selectedFile); 
      if (!selectedFile) return alert("請選擇圖片！");

      // 檢查文件類型
      if (!selectedFile.type.match(/^image\/(jpeg|png|gif)$/)) {
        setError('請上傳 JPG、PNG 或 GIF 格式的圖片');
        return;
      }

      // 檢查文件大小 (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('圖片大小不能超過 5MB');
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      
      try {
        setUploading(true);
        setError('');
        const response = await updateAvatar(formData);

        // 取得圖片 URL
        const imageUrl = response.data.imageUrl;
        
        console.log("上傳成功:", response); // 確保這裡有輸出回應

        // 更新用戶資料
        const updatedUser = {
          // ...userData,
          image: imageUrl, // 獲取上傳後的圖片 URL
        };

        await updateUsers(userId, updatedUser);
        // if (response.data.success) {
        //   // setUserData(updatedUser);
        //   alert('更新成功！');
        // } else {
        //   alert('更新失败！');
        // }
      } catch (error) {
        console.error('上傳失敗：', error);
        alert('上傳失敗');
      }
    };

      useEffect(() => {
        setUserData({
          id: userId, // 用戶ID
          name: userName,
          image: "https://mighty.tools/mockmind-api/content/human/119.jpg",
        });
        setPreviewImage(userData.image);

      }, []);

  return (
    <div className="custom-menu">
      <div className="user-image-wrap text-center">
            <label className="d-inline-block position-relative" style={{ cursor: "pointer" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="d-none"
              />
              <div className="avatar-img-wrap">
                <img
                  src={previewImage || image}
                  alt="User Avatar"
                  className="rounded-circle img-hover"
                  width="100"
                  height="100"
                  // onClick={handleUpload}
                />
                <span className="material-icons camera-icon">photo_camera</span>
              </div>
            </label>
            <p className="mt-2">{userData.name}</p>
        </div>

      <ul className="menu-item-wrap">
        <li>
          <NavLink to="/member-center/personal-data" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">account_circle</span>個人資料
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/order-management/list" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">receipt_long</span>訂單資訊
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/activity-review" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">star_rate</span>活動評價
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/collection-list" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">favorite</span>收藏清單
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/sign-in" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">task_alt</span>會員簽到
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/activity-points" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">monetization_on</span>活動點數
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/customer-support" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">support_agent</span>客服支援
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/center" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">savings</span>會員專區
          </NavLink>
        </li>
        <li>
          <NavLink to="/member-center/settings" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
            <span className="material-icons">settings</span>喜好設定
          </NavLink>
        </li>
      </ul>
      
  </div>
  );
};

export default Menu;
