/*
主にディスコードに今週のスケジュールメッセージを送信する処理をまとめる
*/

const myFunction = () => {
  const message = "なんか確認できるファンクション"
  const bot = new DiscordBot("確認システム", "#general")

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  bot.sendMessage(message, spreadsheet.getUrl())
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
  const bot = new DiscordBot("予定管理システム", "#general")
  bot.sendMessage(message)
}

/* トリガーに設定する
** - 毎週月曜日の朝ごろに起動するようにする
*/
const announceActiveDay = () => {//週の活動日をお知らせ
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName("スケジュール")
  
  const scheduleRange = sheet.getRange(5, 6, 5, 7)
    
  const activeTime = checkActive(scheduleRange)
  
  const timeRange = sheet.getRange(5,3,5)
  
  const message = createMessage(activeTime, timeRange)
  
  Logger.log(message)

  const bot = new DiscordBot("予定管理システム", "#general")
  bot.sendMessage(message)
}

const buildMessage = (activeTime, timeText) => {
  
  const preMessage = "今週の活動時間についてお知らせします(現在時点)"

  const activeMessage = activeTime.map( timeIndex => { // TODO: 終了時間も入れたい？
    return timeIndex == -1 ? "なし" : `${timeText[timeIndex][0]}` 
  })

  return activeMessage.unshift(preMessage).join("\n")
}

const checkActive = (range) => { // 活動可能な日をチェック
  const values = range.getValues()

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