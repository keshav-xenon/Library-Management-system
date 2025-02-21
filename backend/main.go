// package main

// import (
// 	"library-management/backend/database"
// 	"library-management/backend/routes"

// 	"github.com/gin-gonic/gin"
// )

// func main() {
// 	// Connect to the database
// 	database.ConnectDatabase()

// 	// Initialize Gin router
// 	r := gin.Default()

// 	// Setup routes
// 	routes.SetupRoutes(r)

// 	// Start the server
// 	r.Run(":8080") // Server will run on http://localhost:8080
// }
// package main

// import (
//     "library-management/backend/database"
//     "library-management/backend/routes"
//     "github.com/gin-gonic/gin"
//     "github.com/gin-contrib/cors"
// )

// func main() {
//     database.ConnectDatabase()

//     r := gin.Default()

//     // Add CORS middleware
//     r.Use(cors.New(cors.Config{
//         AllowOrigins:     []string{"http://localhost:3000"}, // Add your frontend URL
//         AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
//         AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
//         ExposeHeaders:    []string{"Content-Length"},
//         AllowCredentials: true,
//     }))

//     routes.SetupRoutes(r)
//     r.Run(":8080")
// }

package main

import (
	"library-management/backend/database"
	"library-management/backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Connect to the database
	database.ConnectDatabase()

	// Initialize Gin router
	r := gin.Default()

	// Enable CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Setup routes
	routes.SetupRoutes(r)

	// Start the server
	r.Run(":8080") // Server will run on http://localhost:8080
}
