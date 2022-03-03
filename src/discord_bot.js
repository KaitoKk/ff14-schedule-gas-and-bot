class DiscordBot {

  constructor(username, channel) {
    this.username = username
    this.channel = channel
    
    this.TOKEN = ""
    this.ID = ""
  }

  sendMessage(message, sheet_url = null, sheet_title = "スプレッドシート") {
    const url = `https://discord.com/api/webhooks/${this.ID}/${this.TOKEN}`

    const payload = {
      "token": this.TOKEN,
      "channel": this.channel,
      "content": message,
      "username": this.username,
      "parse": "full"
    }

    if(sheet_url !== null) {
      payload["embeds"] = [
        this._buildUrlEmbedObject(
          sheet_title,
          sheet_url
        )
      ]
    }
    const params = {
      "method": "POST",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    }
    
    const result = UrlFetchApp.fetch(url, params)
    Logger.log(result)
  }

  _buildUrlEmbedObject(title, url) {
    return {
      title,
      url,
      color: "6412288"
    }
  }
}
