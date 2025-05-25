const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// 使用中间件解析 JSON 请求体
app.use(express.json());

// 示例路由：POST /api/data
app.post('/api/data', (req, res) => {
    const { secretKey } = req.body;

    // 从环境变量中获取验证密钥
    const expectedSecret = process.env.SECRET_KEY;

    if (!expectedSecret) {
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    if (secretKey === expectedSecret) {
        res.json({
            message: '认证成功',
            data: req.body
        });
    } else {
        res.status(401).json({ error: '无效的密钥' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
