const request = require('request')
const Nightmare = require('nightmare')
const nightmare = new Nightmare()
const searchUrl = 'https://search.yahoo.co.jp/realtime/search?p=%E3%83%9B%E3%83%93%E3%83%BC%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97&ei=UTF-8&rkf=1'

let postSlack = async () => {
  return await Promise(async function(){
    nightmare.goto(searchUrl)
    const text = await nightmare.evaluate(() => document.querySelector('#TSm > div:nth-child(2) > h2').textContent.trim())
    const options = {
      uri: "<your slack webhook url>",
      headers: {
        "Content-type": "application/json",
      },
      json: {
        "text": text,
      }
    }
    let res = request.post(options, function(error, response, body){})
    // console.log(res)
    console.log("function end")
    return res
  })
}

let exec = async () => {
  postSlack()
  console.log("end post")
}

exec()
