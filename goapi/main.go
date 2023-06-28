package main

import (
	"context"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
)

var ctx = context.Background()

type Data struct {
	Album  string
	Year   string
	Artist string
	Ranked string
}

func insertData(c *fiber.Ctx) error {
	var data map[string]string
	e := c.BodyParser(&data)
	if e != nil {
		fmt.Println("Error Body" + e.Error())
		return e
	}

	rank := Data{
		Album:  data["album"],
		Year:   data["year"],
		Artist: data["artist"],
		Ranked: data["ranked"],
	}

	sendRedisServer(rank)
	//go sendMysqlServer(rank)

	return c.JSON(fiber.Map{"res": "insert successful"})
}

func sendRedisServer(rank Data) {
	conn, err := grpc.Dial("34.27.129.65:3001", grpc.WithTransportCredentials(insecure.NewCredentials()),
		grpc.WithBlock())
	if err != nil {
		log.Fatalln(err)
	}

	cl := NewGetInfoClient(conn)
	defer func(conn *grpc.ClientConn) {
		err := conn.Close()
		if err != nil {
			log.Fatalln(err)
		}
	}(conn)

	ret, err := cl.ReturnInfo(ctx, &RequestId{
		Artist: rank.Artist,
		Album:  rank.Album,
		Year:   rank.Year,
		Ranked: rank.Ranked,
	})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Respuesta del server " + ret.GetInfo())
}

func sendMysqlServer(rank Data) {

}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"res": "todo bien",
		})
	})

	app.Post("/insert", insertData)

	fmt.Println("Corriendo puerto 3000")
	app.Listen(":3000")

}
