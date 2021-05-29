package api

import (
	log "github.com/Sirupsen/logrus"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

// Start the API listener
func Start() {
	router := gin.Default()

	v1 := router.Group("/v1")
	v1.GET("/scalers", getScalers)
	v1.GET("/scalers/:name", getScaler)
	v1.POST("/scalers", createScaler)
	v1.PATCH("/scalers/:name", patchScaler)
	v1.DELETE("/scalers/:name", deleteScaler)

	v1.GET("/rules", getRules)
	v1.GET("/rules/:name", getRule)
	v1.POST("/rules", createRule)
	v1.PATCH("/rules/:name", patchRule)
	v1.DELETE("/rules/:name", deleteRule)

	err := router.Run(viper.GetString("api-port"))
	if err != nil {
		log.Errorf("%s", err)
	}
}
