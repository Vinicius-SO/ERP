package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx context.Context
	db  *sql.DB
}

// Criar a tabela `Items`
func (a *App) createItensTable() error {
	query := `
	CREATE TABLE IF NOT EXISTS Items (
		id_item INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT,
		quantity INTEGER NOT NULL DEFAULT 0,
		type TEXT CHECK(type IN ('materia-prima', 'produto')) NOT NULL
	);`
	_, err := a.db.Exec(query)
	if err != nil {
		log.Printf("Erro ao criar a tabela Itens: %v", err)
		return err
	}
	log.Println("Tabela Itens criada com sucesso!")
	return nil
}

func (a *App) AddItem(name, description string, quantity int, itemType string) error {
	if quantity == 0 {
		log.Println("Quantidade definida explicitamente como 0")
	}

	query := `
	INSERT INTO Items (name, description, quantity, type)
	VALUES (?, ?, ?, ?);`
	_, err := a.db.Exec(query, name, description, quantity, itemType)
	if err != nil {
		log.Printf("Erro ao inserir item: %v", err)
		return err
	}
	log.Printf("Item '%s' adicionado com sucesso! Quantidade: %d", name, quantity)
	return nil
}

// Buscar todos os itens (não exposto no frontend)
func (a *App) GetItems() ([]map[string]interface{}, error) {
	query := `SELECT id_item, name, description, quantity, type FROM Items;`
	rows, err := a.db.Query(query)
	if err != nil {
		log.Printf("Erro ao buscar itens: %v", err)
		return nil, err
	}
	defer rows.Close()

	items := []map[string]interface{}{}
	for rows.Next() {
		var id int
		var name, description, itemType string
		var quantity int

		err := rows.Scan(&id, &name, &description, &quantity, &itemType)
		if err != nil {
			log.Printf("Erro ao escanear resultado: %v", err)
			return nil, err
		}

		item := map[string]interface{}{
			"id":          id,
			"name":        name,
			"description": description,
			"quantity":    quantity,
			"type":        itemType,
		}
		items = append(items, item)
	}

	return items, nil
}

// NewApp creates a new App application struct
func NewApp() *App {
	db, err := sql.Open("sqlite3", "./erp.db")
	if err != nil {
		log.Fatalf("Erro ao conectar ao banco de dados: %v", err)
	}

	return &App{db: db}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx

	err := a.createItensTable()
	if err != nil {
		log.Fatalf("Erro ao criar a tabela Itens: %v", err)
	}
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
