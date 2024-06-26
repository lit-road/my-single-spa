const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

// 设置静态文件目录
const staticDir = path.join(__dirname, 'dist');

// 自定义中间件来处理没有后缀的请求
app.use((req, res, next) => {
  const requestedPath = path.join(staticDir, req.path);
  console.log('requestedPath', requestedPath);
  // 如果是index.html
  if (req.path === '/') {
    req.url = '/index.html';
  }
  // 如果请求的路径没有后缀
  if (path.extname(req.path) === '') {
    // 检查是否是目录
    if (fs.existsSync(requestedPath) && fs.lstatSync(requestedPath).isDirectory()) {
      // 如果是目录，检查是否存在 index.js
      const indexPath = path.join(requestedPath, 'index.js');
      if (fs.existsSync(indexPath)) {
        req.url = path.join(req.path, 'index.js');
      } else {
        // 处理没有 index.js 的情况
        res.status(404).send('Index file not found in directory');
        return;
      }
    } else {
      // 如果不是目录，尝试补充 .js 后缀
      const jsPath = `${requestedPath}.js`;
      if (fs.existsSync(jsPath)) {
        req.url += '.js';
      } else {
        // 处理文件不存在的情况
        res.status(404).send('File not found');
        return;
      }
    }
  }

  next();
});

// 设置静态文件目录
app.use(express.static(staticDir));

// 启动服务器
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});