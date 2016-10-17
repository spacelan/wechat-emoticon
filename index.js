'use strict'
const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const emoticons = require('./emoticons.json')

let bot = new Wechat()
let users = new Set()

bot.on('error', err => {
  console.log(err)
})

bot.on('uuid', uuid => {
  // uuid事件，获取二维码
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
    small: true
  })
})

bot.on('login', () => {
  console.log('登录成功')
  console.log('选择你要轰炸的对象,直接在手机上向TA发送"科科",取消发送"拜拜"')
})

bot.on('logout', () => {
  console.log('登出成功')
})

bot.on('message', msg => {
  switch (msg.MsgType) {
    case bot.CONF.MSGTYPE_TEXT:
      // 文本消息
      if (msg.Content == '科科' && msg.isSendBy(bot.user)) {
        users.add(msg.ToUserName)
        sendEmoticon(msg.ToUserName)
        console.log('开始轰炸', bot.contacts[msg.ToUserName].getDisplayName())
      } else if (msg.Content == '拜拜' && msg.isSendBy(bot.user)) {
        users.delete(msg.ToUserName)
        console.log('取消轰炸', bot.contacts[msg.ToUserName].getDisplayName())
      }
      break
    default:
      break
  }
})

bot.start()

const sendEmoticon = (ToUserName, index) => {
  index = index || 0
  if (users.has(ToUserName) && index < emoticons.length) {
    bot.sendEmoticon(emoticons[index].md5, ToUserName)
    setTimeout(() => {
      sendEmoticon(ToUserName, ++index)
    }, 1000)
  }
}
