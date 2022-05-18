package config

import (
	"log"
	"os"
)

type InvoicesConfig struct {
	Address string
}

func NewInvoicesConfigFromEnv() (i InvoicesConfig) {
	var ok bool
	i.Address, ok = os.LookupEnv("INVOICES_SERVER_ADDRESS")
	if !ok {
		log.Fatal("INVOICES_SERVER_ADDRESS is not set")
	}
	return
}
