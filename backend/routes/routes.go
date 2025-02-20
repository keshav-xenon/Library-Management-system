package routes

import (
	"library-management/backend/controllers"
	"library-management/backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	// Admin routes
	admin := router.Group("/admin")
	admin.Use(middleware.AuthMiddleware("admin")) // Only Admins can access these routes
	{
		admin.POST("/add-book", controllers.AddBook)
		admin.DELETE("/remove-book/:isbn", controllers.RemoveBook)
		admin.PUT("/update-book/:isbn", controllers.UpdateBook)
		admin.GET("/list-issue-requests", controllers.ListIssueRequests)
		admin.POST("/approve-request/:reqID", controllers.ApproveRequest)
		admin.POST("/reject-request/:reqID", controllers.RejectRequest)
	}

	// Reader routes
	reader := router.Group("/reader")
	reader.Use(middleware.AuthMiddleware("reader")) // Only Readers can access these routes
	{
		reader.GET("/search-book", controllers.SearchBook)
		reader.POST("/raise-issue-request", controllers.RaiseIssueRequest)
	}
}
