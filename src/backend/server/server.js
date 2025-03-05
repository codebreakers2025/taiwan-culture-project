import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import jsonServer from 'json-server';
import jsonServerAuth from 'json-server-auth';
import express from 'express';
import * as jwtDecode from 'jwt-decode';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

// 讀取 .env 檔案
dotenv.config();

// Cloudinary 設定
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// 創建 Express 應用
const app = express();
app.use(cors()); // 允許跨域請求
app.use(express.json()); // 允許 json 解析

// 創建 JSON Server
const router = jsonServer.router("src/backend/json/db.json");
const middlewares = jsonServer.defaults();

// 使用 json-server 相關 middleware
app.use(middlewares);
app.use("/api", jsonServer.bodyParser);
app.use("/api", jsonServerAuth); 
app.use("/api", router);

// 取得上傳簽名
app.get('/get-signature', (req, res) => {

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    cloudinary.config().api_secret
  );

  res.json({
    signature,
    timestamp,
    apiKey: cloudinary.config().api_key
  });
});

// json-server 網站首頁
app.get('/', (req, res) => {
  res.send('Welcome to the JSON Server!');
});


// 設定權限
const rules = jsonServerAuth.rewriter({
  // Permission rule
  users: 644,
  userStats: 666,
  signIns: 644,
  // Other rules
  // '/posts/:category': '/posts?category=:category',
});
app.use(rules);

// 資料庫設定
app.db = router.db;

// 設定 JWT 權限保護
app.use((req, res, next) => {
  if (req.method === "POST") {
    const token = req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : null;

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const intSub = Number(decoded.sub);
        req.body.userId = intSub;
        return next();
      } catch (err) {
        console.error("Invalid Token:", err.message);
        return res.status(401).json({ error: "Unauthorized" });
      }
    }
  }
  next();
});

// 啟動伺服器
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});