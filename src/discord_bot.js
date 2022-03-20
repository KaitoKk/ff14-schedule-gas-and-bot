class DiscordBot {

  constructor(username, channel, token_sheet) {
    this.username = username
    this.channel = channel


    const token = token_sheet.getRange("B1:B2").getValues()
    this.ID = token[0][0]
    this.TOKEN = token[1][0]
  }

  sendMessage(message) {
    const url = `https://discord.com/api/webhooks/${this.ID}/${this.TOKEN}`
    const params = {
      "method": "POST",
      "payload": {
        "token": this.TOKEN,
        "channel": this.channel,
        "content": message,
        "username": this.username,
        "parse": "full"
      },
      "muteHttpExceptions": true
    }

    const result = UrlFetchApp.fetch(url, params)
    Logger.log(result)
  }
}
