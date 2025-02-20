package main

import (
	"library-management/backend/database"
	"library-management/backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.ConnectDatabase()

	// Initialize Gin router
	r := gin.Default()

	// Setup routes
	routes.SetupRoutes(r)

	// Start the server
	r.Run(":8080") // Server will run on http://localhost:8080
}
