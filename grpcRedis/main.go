package main

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"google.golang.org/grpc"
	_ "google.golang.org/grpc"
	"log"
	"net"
	"strconv"
)

var ctx = context.Background()
var rdb *redis.Client

type server struct {
	UnimplementedGetInfoServer
}

const (
	port = ":3001"
)

type Data struct {
	Album  string
	Year   string
	Artist string
	Ranked string
}

func redisConnect() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "10.103.169.107:6379",
		Password: "",
		DB:       0,
	})

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(pong)
}

func (s *server) ReturnInfo(ctx context.Context, in *RequestId) (*ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetArtist())
	data := Data{
		Year:   in.GetYear(),
		Album:  in.GetAlbum(),
		Artist: in.GetArtist(),
		Ranked: in.GetRanked(),
	}
	insertRedis(data)
	return &ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func insertRedis(rank Data) {
	array := rank.Artist + "-" + rank.Year
	ranked, _ := strconv.ParseFloat(rank.Ranked, 64)

	rdb.ZAddArgsIncr(ctx, array, redis.ZAddArgs{
		XX:      false,
		NX:      true,
		Members: []redis.Z{{Score: ranked, Member: rank.Album}},
	})

	key := array + "-" + rank.Album
	rdb.HIncrBy(ctx, key, rank.Ranked, 1)
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

		user := new(Data)
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
	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	RegisterGetInfoServer(s, &server{})

	redisConnect()

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("Corriendo en puerto: 3001")

}
