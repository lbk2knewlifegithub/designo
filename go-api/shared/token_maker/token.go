package token_maker

import "time"

type CreateTokenParams struct {
	username   *string
	admin      *string
	expiration *time.Duration
}

type TokenMaker interface {
	Create(params CreateTokenParams) (*string, *Payload, error)
	Decode(params CreateTokenParams) (*string, *Payload, error)
}
