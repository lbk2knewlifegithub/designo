package token_maker

import (
	"github.com/o1egl/paseto"
	"shared/config"
	"time"
)

// Paseto is a PASETO token_maker maker
type Paseto struct {
	tokenConfig *config.TokenConfig
	paseto      *paseto.V2
}

// Pareto creates a new Paseto
func NewPaseto(tokenConfig *config.TokenConfig) TokenMaker {
	return Paseto{
		tokenConfig: tokenConfig,
		paseto:      paseto.NewV2(),
	}
}

func (p *Paseto) Create(username *string, admin *bool, expiration time.Duration) (*string, *Payload, error) {
	payload, err := NewPayload(*username, expiration)
	if err != nil {
		return nil, payload, err
	}
	token, err := p.paseto.Encrypt(p.tokenConfig.SecretBytes, payload, nil)
	return &token, payload, err
}

func (p *Paseto) Decode(token *string) (*Payload, error) {
	payload := &Payload{}

	err := p.paseto.Decrypt(*token, p.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}
