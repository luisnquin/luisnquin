<a href="https://www.youtube.com/channel/skuldd" target="_blank"><img src="https://i.ibb.co/HFLvw99/youtube-background-gray-rounded.png" width=45></a>
<a href="https://twitter.com/sixmonths2020" target="_blank"><img src="https://i.ibb.co/MPSLnVd/twitter-background-gray-rounded.png" width=45></a>
<a href="https://luisnquin.github.io" target="_blank"><img src="https://i.ibb.co/Kj5LvTM/website-background-gray-rounded.png" width=45></a>
<a href="https://www.pinterest.com/luisnquin/_saved/"><img src="https://i.ibb.co/6vrnXyR/pinterest-background-gray-rounded.png" width=45></a>
<a href="https://www.instagram.com/luisnquin/"><img src="https://i.ibb.co/vXqkQLc/instagram-background-gray-rounded.png" width=45></a>
<a href="https://www.linkedin.com/in/luis-quinones-requelme/"><img src="https://i.ibb.co/6FYs12R/linkedin-background-gray-rounded.png" width=45></a>
<br>
<p float="left">
  <a  href="https://github.com/luisnquin"><img width="446" src="https://github-readme-stats.vercel.app/api?username=luisnquin&show_icons=true&theme=dracula">
  <a href="https://github.com/luisnquin"><img width="375" src="https://github-readme-stats.vercel.app/api/top-langs/?username=luisnquin&hide=html,scss,css,shell&langs_count=10&layout=compact&theme=dracula">
</p>
                                                                                                                                      
```go
package main

import "fmt"

type programmer struct {
	fullname, email                     string
	frontend, backend, databases, extra []string
}

func (p programmer) String() string {
	return fmt.Sprintf("Data:\n> %s\n> %s\n\n%v %v %v %v", p.fullname, p.email, p.frontend, p.backend, p.databases, p.extra)
}

func main() {
	me := programmer{
		fullname:  "Luis Quiñones Requelme",
		email:     "lpaandres2020@gmail.com",
		frontend:  []string{"HTML", "CSS"},
		backend:   []string{"Django, Flask, Go"},
		databases: []string{"MySQL", "PostgreSQL", "mongoDB"},
		extra:     []string{"PowerShell", "C++", "Docker"},
	}

	fmt.Println(me)
}
```
