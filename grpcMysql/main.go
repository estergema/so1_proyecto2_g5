package main

import (
	"context"
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql" // La librería que nos permite conectar a MySQL
)

var ctx = context.Background()

type server struct {
	pb.UnimplementedGetInfoServer
}

type Voto struct {
	Album  string
	Year   string
	Artist string
	Ranked string
}

func main() {

	db, err := obtenerBaseDeDatos()
	if err != nil {
		fmt.Printf("Error obteniendo base de datos: %v", err)
		return
	}
	// Terminar conexión al terminar función
	defer db.Close()

	// Ahora vemos si tenemos conexión
	err = db.Ping()
	if err != nil {
		fmt.Printf("Error conectando: %v", err)
		return
	}
	// Listo, aquí ya podemos usar a db!
	fmt.Printf("Corriendo en puerto: 9000")

}

func obtenerBaseDeDatos() (db *sql.DB, e error) {

	//Debe tener la forma usuario:contraseña@host/nombreBaseDeDatos
	//usuario := "root"
	//pass := "secret"
	//host := "tcp(localhost:3306)"
	//nombreBaseDeDatos := "practica1"
	//db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/%s", usuario, pass, host, nombreBaseDeDatos))
	db, err := sql.Open("mysql", "root:secret@tcp(34.68.177.89)/practica1")
	if err != nil {
		return nil, err
	}
	return db, nil
}

func insertar(c Voto) (e error) {
	db, err := obtenerBaseDeDatos()
	if err != nil {
		return err
	}
	defer db.Close()

	// Preparamos para prevenir inyecciones SQL
	sentenciaPreparada, err := db.Prepare("INSERT INTO voto (Album, Artist, Year, Raked) VALUES(?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer sentenciaPreparada.Close()
	// Ejecutar sentencia, un valor por cada '?'
	_, err = sentenciaPreparada.Exec(c.Album, c.Artist, c.Year, c.Ranked)
	if err != nil {
		return err
	}
	return nil
}
