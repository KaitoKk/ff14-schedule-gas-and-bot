use shared_lib::DiscordClient;

#[tokio::main]
async fn main() {
    // Discord Botトークン
    let bot_token = "";

    // 送信先のチャンネルID
    let channel_id = "";

    let discord_client = DiscordClient::new(bot_token, channel_id);

    match discord_client.send_message("Hello from Rust!").await {
        Ok(_) => println!("Message sent successfully!"),
        Err(e) => eprintln!("Failed to send message: {}", e),
    }
}
