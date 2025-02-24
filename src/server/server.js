const path = require("path");
const fs = require('fs');
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const express = require('express');
const multer = require('multer');
const jwt_decode = require("jwt-decode");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;


// require('dotenv').config(); // 引入 dotenv 庫來讀取 .env 檔案
const JWT_SECRET_KEY = require("json-server-auth/dist/constants").JWT_SECRET_KEY;

// Cloudinary 設定
cloudinary.config({
  cloud_name: '',
  api_key: '',
  api_secret: ''
});


// 創建一個 express 實體
const app = express();
app.use(cors()); // 允許跨域請求

const port = process.env.PORT || 3002;

const server = jsonServer.create();
const router = jsonServer.router("src/json/db.json");
const middlewares = jsonServer.defaults();
const routes = require("./routes.json");
const customMiddleware = require("./middleware");

// 設定multer 檔案儲存方式，儲存圖片檔案到 uploads 資料夾
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// 設定 multer
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 限制 5MB
  }
});

// 使用 json-server middlewares
app.use(middlewares);

// 允許 json 解析
app.use(express.json());

// 設定上傳資料夾
const uploadDir = path.join(__dirname, '../../public/uploads');

// 設定靜態檔案路徑
app.use('/uploads', express.static(uploadDir));

// 上傳 API
app.post('/api/upload', upload.single('image'), (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: "未選擇文件" });
  }
  res.json({ 
    message: "圖片上傳成功",
    imageUrl: `/uploads/${req.file.filename}`,
  });

});


// 獲取上傳簽名的端點
server.get('/get-signature', (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp
    },
    cloudinary.config().api_secret
  );

  res.json({
    signature,
    timestamp,
    apiKey: cloudinary.config().api_key
  });
});


server.get('/', (req, res) => {
  res.send('Welcome to the JSON Server!');
});

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  users: 640,
  posts: 664,

  // Other rules
  // '/posts/:category': '/posts?category=:category',
});

// /!\ Bind the router db to the app server
server.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    const token = req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : null;

    if (token) {
      try {
        const decoded = jwt_decode(token); // 解碼 JWT
        // console.log({ token, JWT_SECRET_KEY, decoded }); // 輸出解碼後的 JWT 資料
        const intSub = Number(decoded.sub);
        req.body.userId = intSub;

      } catch (err) {
        console.error("Invalid Token:", err.message);
        return res.status(401).json({ error: "Unauthorized" });
      }

    }
    /* end of IF-token */
  }

  // Continue to JSON Server router
  next();
});
/* end of custom */

server.use(rules);

// You must apply the auth middleware before the router
server.use(auth);


server.use(jsonServer.rewriter(routes));

// api/admin 路徑的後端 API，需要驗證權限
server.use("/api/admin", customMiddleware);

// Use default router
server.use("/api", router);


server.listen(port, () => {
  console.log("JSON Server Listening on:" + port);
});