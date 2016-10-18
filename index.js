'use strict'
const fs = require('fs')
const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const emoticons = require('./emoticons.json')

let bot = new Wechat()
let users = new Set()
let emoticonSet = new Set()

// 初始化emoticonSet,避免重复记录表情
try {
  emoticons.forEach(emoticon => emoticonSet.add(emoticon.md5))
  fs.closeSync(fs.openSync('./new-emoticons.dat', 'w'))
  fs.readFileSync('./new-emoticons.dat').split('\n').forEach(emoticon => emoticonSet.add(emoticon.split(
    ' ')[0]))
} catch (err) {

}

bot.on('error', err => {
  console.log(err)
})

bot.on('uuid', uuid => {
  // uuid事件，获取二维码
  console.log('扫码登录')
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
    small: true
  })
  console.log('如果二维码不能识别，请打开链接')
  console.log('https://login.weixin.qq.com/qrcode/' + uuid)
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
      // 自定义命令
      if (msg.Content == '科科' && msg.isSendBy(bot.user)) {
        users.add(msg.ToUserName)
        sendEmoticon(msg.ToUserName)
        console.log('开始轰炸', bot.contacts[msg.ToUserName].getDisplayName())
      } else if (msg.Content == '拜拜' && msg.isSendBy(bot.user)) {
        users.delete(msg.ToUserName)
        console.log('取消轰炸', bot.contacts[msg.ToUserName].getDisplayName())
      }
      break
    case bot.CONF.MSGTYPE_EMOTICON:
      // 新表情数据写入new-emoticons.dat,去重
      let pm = msg.Content.match(/md5\s?=\s?"(.*?)".*?cdnurl\s?=\s?"(.*?)"/)
      if (pm && !emoticonSet.has(pm[1])) {
        console.log('新表情GET')
        try {
          fs.appendFileSync('./new-emoticons.dat', `${pm[1]} ${pm[2]}\n`)
          emoticonSet.add(pm[1])
        } catch (err) {
          console.log(err)
        }
      }
      break
    default:
      break
  }
})

bot.start()

const sendEmoticon = (ToUserName, index) => {
  index = index || 0 // 自定义表情顺序
  if (users.has(ToUserName) && index < emoticons.length) {
    bot.sendEmoticon(emoticons[index].md5, ToUserName)
    setTimeout(() => {
        sendEmoticon(ToUserName, ++index)
      }, 1000) // 自定义间隔
  }
}
