package controllers

import (
	"library-management/backend/database"
	"library-management/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AddBook adds a new book to the inventory
func AddBook(c *gin.Context) {
	var book models.BookInventory
	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the book already exists
	var existingBook models.BookInventory
	if err := database.DB.Where("isbn = ?", book.ISBN).First(&existingBook).Error; err == nil {
		// If the book exists, increment the total and available copies
		existingBook.TotalCopies += book.TotalCopies
		existingBook.AvailableCopies += book.TotalCopies
		database.DB.Save(&existingBook)
		c.JSON(http.StatusOK, gin.H{"message": "Book copies updated successfully!"})
		return
	}

	// Add the new book
	if err := database.DB.Create(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book added successfully!"})
}

// RemoveBook removes a book from the inventory
func RemoveBook(c *gin.Context) {
	isbn := c.Param("isbn")

	// Check if the book exists
	var book models.BookInventory
	if err := database.DB.Where("isbn = ?", isbn).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	// Check if there are issued copies
	if book.TotalCopies > book.AvailableCopies {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot remove book with issued copies"})
		return
	}

	// Decrement the total copies
	if book.TotalCopies > 1 {
		book.TotalCopies--
		book.AvailableCopies--
		database.DB.Save(&book)
		c.JSON(http.StatusOK, gin.H{"message": "Book copy removed successfully!"})
		return
	}

	// Delete the book if no copies are left
	if err := database.DB.Delete(&book).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove book"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Book removed successfully!"})
}

// UpdateBook updates the details of a book
func UpdateBook(c *gin.Context) {
	isbn := c.Param("isbn")
	var updatedBook models.BookInventory

	if err := c.ShouldBindJSON(&updatedBook); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the book and update its details
	var book models.BookInventory
	if err := database.DB.Where("isbn = ?", isbn).First(&book).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	book.Title = updatedBook.Title
	book.Authors = updatedBook.Authors
	book.Publisher = updatedBook.Publisher
	book.Version = updatedBook.Version
	database.DB.Save(&book)

	c.JSON(http.StatusOK, gin.H{"message": "Book updated successfully!"})
}
func ListIssueRequests(c *gin.Context) {
	var requests []models.RequestEvent
	if err := database.DB.Find(&requests).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch issue requests"})
		return
	}

	c.JSON(http.StatusOK, requests)
}
func ApproveRequest(c *gin.Context) {
	reqID := c.Param("reqID")

	tx := database.DB.Begin() // Start a transaction

	var request models.RequestEvent
	if err := tx.Where("req_id = ?", reqID).First(&request).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	var book models.BookInventory
	if err := tx.Where("isbn = ?", request.BookID).First(&book).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "Book not found"})
		return
	}

	if book.AvailableCopies <= 0 {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Book not available"})
		return
	}

	book.AvailableCopies--
	if err := tx.Save(&book).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update book availability"})
		return
	}

	request.ApprovalDate = "2025-02-17"
	request.ApproverID = c.MustGet("user").(models.User).ID
	if err := tx.Save(&request).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to approve request"})
		return
	}

	tx.Commit() // Commit the transaction
	c.JSON(http.StatusOK, gin.H{"message": "Request approved successfully!"})
}
func RejectRequest(c *gin.Context) {
	reqID := c.Param("reqID")

	var request models.RequestEvent
	if err := database.DB.Where("req_id = ?", reqID).First(&request).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	// Reject the request
	database.DB.Delete(&request)

	c.JSON(http.StatusOK, gin.H{"message": "Request rejected successfully!"})
}

func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the user
	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
		"user":    user,
	})
}
func CreateLibrary(c *gin.Context) {
	var library models.Library
	if err := c.ShouldBindJSON(&library); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the library
	if err := database.DB.Create(&library).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create library"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Library created successfully",
		"library": library,
	})
}
