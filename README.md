# 微信表情轰炸器

![](https://github.com/spacelan/wechat-emoticon/blob/master/pic.png?raw=true)

终端版微信表情轰炸器

1000+自定义表情（未整理，存在奇奇怪怪的表情，慎用，不要搞♂事）

## 运行

```
git clone https://github.com/spacelan/wechat-emoticon.git
cd wechat-emoticon
npm install
node index.js
```

## 使用

见终端提示

## 原理

自定义表情资源来自`emoticons.json`，包括表情的URL和MD5

微信网页版发送自定义表情实际上是发送的表情的MD5

微信API由[wechat4u](https://github.com/nodeWechat/wechat4u)支持

## 如何抓自定义表情

我想想再写
