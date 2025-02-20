package middleware

import (
	"library-management/backend/database"
	"library-management/backend/models"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware validates the user's email and role
func AuthMiddleware(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		email := c.GetHeader("Authorization")
		if email == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		var user models.User
		if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user"})
			c.Abort()
			return
		}

		if requiredRole != "" && strings.ToLower(user.Role) != strings.ToLower(requiredRole) {
			c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
			c.Abort()
			return
		}

		// Add user info to the context
		c.Set("user", user)
		c.Next()
	}
}
