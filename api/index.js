// index.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 设置 body 解析中间件
app.use(bodyParser.json());

// 获取环境变量中的验证密钥
const API_SECRET = process.env.API_SECRET;

if (!API_SECRET) {
  throw new Error("API_SECRET 环境变量未设置");
}

// 定义 POST 接口
app.post('/api/data', (req, res) => {
  const { secret, data } = req.body;

  if (secret !== API_SECRET) {
    return res.status(401).json({ error: '无效的验证密钥' });
  }

  // 成功验证后返回接收到的数据
  res.json({
    message: "请求成功",
    receivedData: data
  });
});

// Vercel Serverless 函数需要导出 handler
module.exports = app;
