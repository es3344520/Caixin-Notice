const express = require('express');
const bodyParser = require('body-parser');

// 初始化Express应用
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST 请求处理
app.post('/verify', (req, res) => {
    const { verificationInfo } = req.body; // 请求体中的变量信息

    if (!verificationInfo) {
        return res.status(400).send({ error: "Missing verification info" });
    }

    // 示例验证逻辑 - 实际使用时请替换为更安全的验证方法
    if (process.env.VERIFICATION_KEY === verificationInfo) {
        res.send({ message: "Verification successful", receivedInfo: verificationInfo });
    } else {
        res.status(403).send({ error: "Invalid verification info" });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
