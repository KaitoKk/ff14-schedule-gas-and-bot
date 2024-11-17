use reqwest::Client;
use serde_json::json;

pub struct DiscordClient {
    bot_token: String,
    channel_id: String,
    client: Client,
}

impl DiscordClient {
    pub fn new(bot_token: &str, channel_id: &str) -> Self {
        Self {
            bot_token: bot_token.to_string(),
            channel_id: channel_id.to_string(),
            client: Client::new(),
        }
    }

    pub async fn send_message(&self, content: &str) -> Result<(), reqwest::Error> {
        let message_content = json!({
            "content": content,
        });

        let url = format!("https://discord.com/api/v10/channels/{}/messages", self.channel_id);

        let response = self.client
            .post(&url)
            .header("Authorization", format!("Bot {}", self.bot_token))
            .header("Content-Type", "application/json")
            .json(&message_content)
            .send()
            .await?;

        if response.status().is_success() {
            println!("Message sent successfully!");
        } else {
            eprintln!("Failed to send message. Status: {}", response.status());
        }

        Ok(())
    }
}