package main

import (
	"fmt"
	"os"

	"github.com/bwmarrin/discordgo"
)

func main() {
	token := os.Getenv("BOT_TOKEN")
	if token == "" {
		panic("not found BOT_TOKEN")
	}

	dg, err := discordgo.New("Bot " + token)
	if err != nil {
		fmt.Println("session not started: ", err)
		return
	}

	err = dg.Open()
	if err != nil {
		fmt.Println("bot not started: ", err)
		return
	}
	defer dg.Close()

	channelID := "1302527181095964713" // とりあえず OnlyMeサーバのdiscord-bot-sandboxチャンエル
	message := "Hello world"

	_, err = dg.ChannelMessageSend(channelID, message)
	if err != nil {
		fmt.Println("fail send message: ", err)
		return
	}

	fmt.Println("message send sccess")
	return
}
