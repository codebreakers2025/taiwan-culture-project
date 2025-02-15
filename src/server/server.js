const path = require("path");
const fs = require('fs');
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const express = require('express');
const multer = require('multer');
const jwt_decode = require("jwt-decode");

// require('dotenv').config(); // 引入 dotenv 庫來讀取 .env 檔案
const JWT_SECRET_KEY = require("json-server-auth/dist/constants").JWT_SECRET_KEY;



// 創建一個 express 實體
const app = express();

const port = process.env.PORT || 3001;

const server = jsonServer.create();
const router = jsonServer.router("src/json/db.json");
const middlewares = jsonServer.defaults();



// 設定檔案儲存方式，儲存圖片檔案到 uploads 資料夾

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    // 生成檔案名稱：時間戳 + 原始檔名
    cb(null, Date.now() + '-' + file.originalname)
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

// 設定靜態檔案路徑
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// 上傳 API
app.post('/api/upload', upload.single('image'), (req, res) => {

  const { image } = req.body; // Base64 字串
  
  if (!image) {
    return res.status(400).json({ error: '沒有上傳檔案' });
  }

  // 解析 Base64 格式
  const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return res.status(400).json({ error: '無效的 Base64 圖片格式' });
  }

  const extension = matches[1];  // 取得副檔名 (png, jpg, etc.)
  const base64Data = matches[2]; // 取得 Base64 純數據
  const buffer = Buffer.from(base64Data, 'base64');

  // 設定上傳資料夾
  const uploadDir = path.join(__dirname, '../../public/uploads');

  // 確保上傳資料夾存在
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 儲存圖片
  const fileName = `image_${Date.now()}.${extension}`;
  const filePath = path.join(uploadDir, fileName);

  // 回傳圖片 URL
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      return res.status(500).json({ error: '無法儲存圖片' });
    }
    res.json({ imageUrl: `/uploads/${fileName}` });
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

// Use default router
server.use("/api", router);

server.listen(port, () => {
  console.log("JSON Server Listening on:" + port);
});