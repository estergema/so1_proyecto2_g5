package main

import (
	"context"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql" // La librería que nos permite conectar a MySQL
	"google.golang.org/grpc"
	_ "google.golang.org/grpc"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
	"net"
)

var ctx = context.Background()
var db *sql.DB

type server struct {
	UnimplementedGetInfoServer
}

const (
	port = ":3002"
)

var Database *gorm.DB
var Uri = "root:secret@tcp(34.68.177.89)/FASE2?charset=utf8mb4&parseTime=True&loc=Local"

type Data struct {
	gorm.Model
	Album  string
	Year   string
	Artist string
	Ranked string
}

func mysqlConnect() error {
	var err error
	Database, err = gorm.Open(mysql.Open(Uri), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
	})
	if err != nil {
		log.Fatal(err)
	}

	err = Database.AutoMigrate(&Data{})
	if err != nil {
		return err
	}

	return nil
}

func (s *server) ReturnInfo(ctx context.Context, in *RequestId) (*ReplyInfo, error) {
	fmt.Println("Recibí de cliente: ", in.GetArtist())
	data := Data{
		Year:   in.GetYear(),
		Album:  in.GetAlbum(),
		Artist: in.GetArtist(),
		Ranked: in.GetRanked(),
	}
	insertMysql(data)
	return &ReplyInfo{Info: "Hola cliente, recibí el comentario"}, nil
}

func main() {

	listen, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalln(err)
	}
	s := grpc.NewServer()
	RegisterGetInfoServer(s, &server{})

	err2 := mysqlConnect()
	if err2 != nil {
		log.Fatalln(err)
		return
	}

	if err := s.Serve(listen); err != nil {
		log.Fatalln(err)
	}

	fmt.Printf("Corriendo en puerto: 3002")

}

func insertMysql(rank Data) {
	Database.Create(&rank)
}
