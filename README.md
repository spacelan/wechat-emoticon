# 微信表情轰炸器

![](https://github.com/spacelan/wechat-emoticon/blob/master/pic.png?raw=true)

终端版微信表情轰炸器

最新 *6000+*自定义表情（未整理，存在**不可描述**的福利表情，慎用，不要搞♂事，轰炸多了会被微信**关小黑屋**）

## 运行

```
git clone https://github.com/spacelan/wechat-emoticon.git
cd wechat-emoticon
npm install
node index.js
```

如果轰炸失败，请运行`DEBUG=core node index.js`查看log

## 使用

见终端提示

## 原理

自定义表情资源来自`emoticons.json`，包括表情的URL和MD5

微信网页版发送自定义表情实际上是发送的表情的MD5

微信API由[wechat4u](https://github.com/nodeWechat/wechat4u)支持

wechat4u可能是目前唯一能发送表情的JS库

## 如何抓自定义表情

微信网页版通过`https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsync`API获取新消息

返回数据中，一个微信消息主要由以下部分组成

```json
{
"MsgId": "11973880366746079",
"FromUserName": "@7f29b95a33028240f631dda0eecb49f",
"ToUserName": "filehelper",
"MsgType": 47,
"Content": "&lt;msg&gt;&lt;emoji fromusername = \"23423asf\" tousername = \"filehelper\" type=\"2\" idbuffer=\"media:0_0\" md5=\"325e6f67bf0bf95b58ca1e0d7cc51821\" len = \"494186\" productid=\"\" androidmd5=\"325e6f67bf0bf95b58ca1e0d7cc51821\" androidlen=\"494186\" s60v3md5 = \"325e6f67bf0bf95b58ca1e0d7cc51821\" s60v3len=\"494186\" s60v5md5 = \"325e6f67bf0bf95b58ca1e0d7cc51821\" s60v5len=\"494186\" cdnurl = \"http://emoji.qpic.cn/wx_emoji/xmrm0xnjtnahibtFOjQ7ywClrojsNQYOPyickj9Yo7D0NEa16DBl5GJA/\" designerid = \"\" thumburl = \"\" encrypturl = \"http://emoji.qpic.cn/wx_emoji/CvEmibBOcGYhrj1gCOCs48L4OdgAtuuyJueljF440oic4r8j6KPRkDfw/\" aeskey= \"caee1393b6427c72e35fef94d277d00b\" width= \"85\" height= \"85\" &gt;&lt;/emoji&gt; &lt;gameext type=\"0\" content=\"0\" &gt;&lt;/gameext&gt;&lt;/msg&gt;",
...
}
```

当`MsgType == 47`为表情消息

然后可以从`Content`中提取`md5`和`cdnurl`（商店表情无法提取）

`md5`用来向别人发送表情

`cdnurl`用来直接下载表情，不需要认证

更详细的请查看代码[index.js](https://github.com/spacelan/wechat-emoticon/blob/master/index.js#L58)

## 各种表情下载脚本

https://www.v2ex.com/t/313382
https://github.com/spacelan/wechat-emoticon/issues

