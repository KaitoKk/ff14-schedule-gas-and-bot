/*
主にディスコードに今週のスケジュールメッセージを送信する処理をまとめる
*/

const TOKEN_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Token")
const SHEET_URL =  SpreadsheetApp.getActiveSpreadsheet().getUrl()

const myFunction = () => {
  const message = "なんか確認できるファンクション"
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const bot = new DiscordBot("確認システム", "#general", TOKEN_SHEET)
  bot.setEmbed("スプレッドシートはこちら", SHEET_URL)
  bot.sendMessage(message)
}

/**
//Discordへのアナウンス
//・日曜日アナウンス
//・固定活動日アナウンス
**/
const announceReminder = () => {
  const today = new Date()
  const dayOfWeek = getDayOfWeek(today)


  // const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // const sheet = spreadsheet.getSheetByName("スケジュール");
  // TODO: だれが入力していないかも確認したいね

  const message = `今日は${dayOfWeek}だよ\n予定をスプレッドシートに入れてね！` // TODO: スプレッドシートのリンクも貼りたいね
  const bot = new DiscordBot("予定管理システム", "#general", TOKEN_SHEET)
  bot.setEmbed("スプレッドシートはこちら", SHEET_URL)
  bot.sendMessage(message)
}

/* トリガーに設定する
** - 毎週月曜日の朝ごろに起動するようにする
*/
const announceActiveDay = () => {//週の活動日をお知らせ
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName("スケジュール")

  const scheduleRange = sheet.getRange(5, 6, 8, 7)

  const activeTime = checkActive(scheduleRange)

  const timeText = sheet.getRange(5,3,8).getValues()
  const dateText = sheet.getRange("F4:L4").getValues()

  const message = "今週の活動時間についてお知らせします(現在時点)"
  const messageFields = buildMessageFields(activeTime, timeText, dateText[0])

  const bot = new DiscordBot("予定管理システム", "#general", TOKEN_SHEET)
  bot.setEmbed("活動予定", null, null, messageFields)
  bot.setEmbed("スプレッドシートはこちら", SHEET_URL)
  bot.sendMessage(message)
}

const buildMessageFields = (activeTime, timeText, dateText) => {

  const activeMessage = activeTime.map( (timeIndex, i) => { // TODO: 終了時間も入れたい？
    const date = new Date(dateText[i])
    const name = `${date.getMonth()+1}/${date.getDate()}(${getDayOfWeek(date)})`
    const value = timeIndex == -1 ? "なし" : `${timeText[timeIndex][0]}`
    return {
      name,
      value
    }
  })

  return activeMessage
}

const checkActive = (range) => { // 活動可能な日をチェック
  const values = transpose(range.getValues())

  const activeTime = values.map( startHours => {
    let startHour = -1
    let isBreak = false
    startHours.forEach( (activeNum, index) => {
      if (isBreak) return
      if (isActive(activeNum)) {
        startHour = index
        isBreak = true
      }
    })
    return startHour
  })

  return activeTime
}

const isActive = (num) => { // 活動できるかどうか
  return num >= 8 ? true : false
}

const getDayOfWeek = (date) => { // 指定の日付の曜日を返す
  const daysOfWeek = [ "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日" ]
  return daysOfWeek[date.getDay()]
}

const transpose = (array) => {
  return array[0].map((_, c) => array.map(r => r[c]))
}
