class DiscordBot {

  constructor(username, channel) {
    this.username = username
    this.channel = channel
    
    this.TOKEN = "e1U3UnAR21qsZU1S0F4TLr0tghw6-aXx9HYl_sHYYbxvyITPwGVWKfT2patljqRd_BB_"
    this.ID = "945727366653677638"
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
