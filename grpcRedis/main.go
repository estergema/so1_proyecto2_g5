package main

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"log"
)

var ctx = context.Background()
var rdb *redis.Client

type server struct {
	pb.UnimplementedGetInfoServer
}

type Voto struct {
	Album  string
	Year   string
	Artist string
	Ranked string
}

func redisConnect() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "10.103.169.107:6379",
		Password: "",
		DB:       15,
	})

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(pong)
}

func main() {

	/*app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		client := redis.NewClient(&redis.Options{
			Addr:     "10.103.169.107:6379",
			Password: "",
			DB:       0,
		})

		pong, err := client.Ping(ctx).Result()
		var errorstr string = ""
		if err != nil {
			errorstr = err.Error()
		}
		fmt.Println(pong, err)

		return c.SendString("Hello there 👋" + pong + "\n" + errorstr)
	})

	app.Post("/add", func(c *fiber.Ctx) error {

		client := redis.NewClient(&redis.Options{
			Addr:     "34.30.166.94:6379",
			Password: "",
			DB:       0,
		})

		user := new(Voto)
		if err := c.BodyParser(user); err != nil {
			panic(err)
		}

		payload, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}

		if err := client.Publish(ctx, "send-user-data", payload).Err(); err != nil {
			panic(err)
		}

		client.Incr(ctx, "range")
		err = client.LPush(ctx, "votos", payload).Err()
		if err != nil {
			panic(err)
		}
		return c.SendStatus(200)
	})

	app.Listen(":8000")*/

	redisConnect()

	fmt.Printf("Corriendo en puerto: 8000")

}
