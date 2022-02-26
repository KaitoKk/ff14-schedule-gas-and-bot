class DiscordBot {

  constructor(username, channel) {
    this.username = username
    this.channel = channel
    
    this.TOKEN = ""
    this.ID = ""
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
