/*
主にシートの操作をするメソッドをここにまとめる
*/

/**
// タブに報告ボタンを追加
**/
const onOpen = () => {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
    const entries = [{
          functionName: "announceActiveDay",
          name: "Discordに報告"
        }
      ]
    spreadsheet.addMenu("Discord", entries)
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