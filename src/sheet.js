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

  const activityRange = sheet.getRange("C3:J13")
  storeActivityLog(activityRange)

  shiftActiveDayCells(sheet, 18, 11, 72, 14);
}


// 日付をずらす
const shiftActiveDayCells = (sheet, row, column, numrows, numcolumns) => {
  const futureActiveDays = sheet.getRange(row, column, numrows, numcolumns)

  const futureActiveDaysValues = futureActiveDays.getValues()
  futureActiveDays.clearContent()

  const lastActiveDays = sheet.getRange(row, column - 7, numrows, numcolumns)
  lastActiveDays.clearContent()
  lastActiveDays.setValues(futureActiveDaysValues)

  // TODO: 活動日の記録を保存したいよね？
}

const storeActivityLog = (activityRange) => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const logSheet = spreadsheet.getSheetByName("活動履歴")

  const lastRow = logSheet.getLastRow()
  const writtenRange = logSheet.getRange(`A${lastRow+1}:H${lastRow+11}`)
  activityRange.copyTo(writtenRange, {fotmatOnly: true})
  activityRange.copyTo(writtenRange, {contentsOnly: true})
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
