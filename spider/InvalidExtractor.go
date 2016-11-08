package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

func main() {
	// file, err := ioutil.ReadFile("./meta/meta.csv") // For read access.
	file, err := os.Open("./meta/meta.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	// scan on comma? https://golang.org/src/bufio/example_test.go
	scanner.Split(bufio.ScanLines)

	invalidObjectIds := make([]string, 0)
	invalidObjectChan := make(chan string)

	// Scan.
	for scanner.Scan() {
		go func(text string) {
			segments := strings.Split(text, "|")
			// something invalid
			if len(segments) != 2 {
				fmt.Println(text, " omitted")
				return
			}

			url := "http://www.xvideos.com/video" + segments[1] + "/"
			fmt.Println("url is ", url)

			resp, err := http.Get(url)
			if err != nil {
				fmt.Println("invalid pushed ", segments[0])
				invalidObjectChan <- segments[0]
			} else if resp.StatusCode != 200 {
				fmt.Println("invalid pushed ", segments[0])
				invalidObjectChan <- segments[0]
			} else {
				bodyBytes, _ := ioutil.ReadAll(resp.Body)
				respBodyStr := string(bodyBytes)
				// deleted
				if strings.Contains(respBodyStr, "deleted") {
					fmt.Println("invalid pushed ", segments[0])
					invalidObjectChan <- segments[0]
				}
			}
			defer resp.Body.Close()
		}(scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "reading input:", err)
	}

	for {
		select {
		case s := <-invalidObjectChan:
			invalidObjectIds = append(invalidObjectIds, s)
		case <-time.After(10 * time.Minute):
			writeLines(invalidObjectIds, "./meta/metaextracted.csv")
			return
		}
	}
}

// writeLines writes the lines to the given file.
func writeLines(lines []string, path string) error {
	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	w := bufio.NewWriter(file)
	for _, line := range lines {
		fmt.Fprintln(w, line)
	}
	return w.Flush()
}
