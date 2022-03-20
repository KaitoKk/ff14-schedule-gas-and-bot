class DiscordBot {

  embeds = []

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

    if(this.embeds.length !== 0) {
      payload["embeds"] = this.embeds
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

  setEmbed(title = "スプレッドシート", url = null, description = null, fields = {}) {
    if(sheet_url !== null) {
      this.embeds.push(
        this._buildUrlEmbedObject(
          title,
          url
        )
      )
    } else {
      this.embeds.push(
        this._buildFieldEmbedObject(
          title,
          description,
          fields
        )
      )
    }

  }

  _buildUrlEmbedObject(title, url) {
    return {
      title,
      url,
      color: "6412288"
    }
  }

  _buildFieldEmbedObject(title, description, fields) {
    return {
      title,
      description,
      fields
    }
  }
}
