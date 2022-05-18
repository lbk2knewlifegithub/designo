package cache

import "time"

type Cache interface {
	Set(key *string, value *string, expiration time.Duration) error
	Read(key *string) (*string, error)
}
