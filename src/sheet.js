/*
主にシートの操作をするメソッドをここにまとめる
*/

/**
// タブに報告ボタンを追加
**/
const onOpen = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const discordEntries = [{
          functionName: "announceActiveDay",
          name: "Discordに報告"
        }
      ]
    spreadsheet.addMenu("Discord", discordEntries)

    const triggerEntries = [
      {
        functionName: "setSlideStartDayTrigger",
        name: "開始日を変更するトリガーをセット"
      },
      {
        functionName: "setReminderTrigger",
        name: "リマインダのトリガーをセット"
      },
      {
        functionName: "setAnnounceTrigger",
        name: "活動日アナウンスのトリガーをセット"
      }
    ]
    spreadsheet.addMenu("gasトリガー", triggerEntries)
}

/*
トリガーに設定するやつ
開始日を変更して、記入してあった予定を一週間分シフト
*/
const changeStartDate = () => {
  const today = new Date()
  
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName("スケジュール")

  const dateCell = sheet.getRange(2,5)
  dateCell.setValue(today)
  
  shiftActiveDayCells(sheet, 15, 11, 40, 14);
}


const shiftActiveDayCells = (sheet, row, column, numrows, numcolumns) => {
  const futureActiveDays = sheet.getRange(row, column, numrows, numcolumns)
  
  const futureActiveDaysValues = futureActiveDays.getValues()
  futureActiveDays.clearContent()

  const lastActiveDays = sheet.getRange(row, column - 7, numrows, numcolumns)
  lastActiveDays.clearContent()
  lastActiveDays.setValues(futureActiveDaysValues) 

  // TODO: 活動日の記録を保存したいよね？
}

const setSlideStartDayTrigger = () => {
  ScriptApp.newTrigger("changeStartDate").timeBased().onWeekDay(ScriptApp.WeekDay.SATURDAY).atHour(6).create()
}

const setReminderTrigger = () => {
  ScriptApp.newTrigger("announceReminder").timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(10).create()
}

const setAnnounceTrigger = () => {
  ScriptApp.newTrigger("announceActiveDay").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).create()
}