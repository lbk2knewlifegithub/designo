package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	p1 := Person{
		Name: "John",
		Age:  30,
	}
	fmt.Println(p1)
}
