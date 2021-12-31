<a href="https://www.youtube.com/channel/skuldd" target="_blank"><img src="https://i.ibb.co/HFLvw99/youtube-background-gray-rounded.png" width=45></a>
<a href="https://twitter.com/sixmonths2020" target="_blank"><img src="https://i.ibb.co/MPSLnVd/twitter-background-gray-rounded.png" width=45></a>
<a href="https://luis-quinones.web.app" target="_blank"><img src="https://i.ibb.co/Kj5LvTM/website-background-gray-rounded.png" width=45></a>
<a href="https://www.instagram.com/luisnquin/" target="_blank"><img src="https://i.ibb.co/vXqkQLc/instagram-background-gray-rounded.png" width=45></a>
<a href="https://www.linkedin.com/in/luis-quinones-requelme/" target="_blank"><img src="https://i.ibb.co/6FYs12R/linkedin-background-gray-rounded.png" width=45></a>
<br>
<p float="left">
  <a  href="https://github.com/luisnquin"><img width="446" src="https://github-readme-stats.vercel.app/api?username=luisnquin&show_icons=true&theme=tokyonight">
  <a href="https://github.com/luisnquin"><img width="375" src="https://github-readme-stats.vercel.app/api/top-langs/?username=luisnquin&hide=html,scss,css,shell&langs_count=10&layout=compact&theme=tokyonight">
</p>
                                                                                                                                      
```go
package main

import "fmt"

type programmer struct {
	fullname, email    string
	s1, s2, s3, s4, s5 []string
}

func (p programmer) String() string {
	return fmt.Sprintf(
		"\n> %s\n> %s\n\nStack: [\n\t%v,\n\t%v,\n\t%v,\n\t%v,\n\t%v,\n]", 
		p.fullname, p.email, p.s1, p.s2, p.s3, p.s4, p.s5,
	)
}

func main() {
	me := programmer{
		fullname: "Luis Quiñones Requelme",
		email:    "lpaandres2020@gmail.com",
		s1:       []string{"HTML", "SCSS", "JavaScript"},
		s2:       []string{"Python", "Go"},
		s3:       []string{"Django, FastAPI, Echo, Fiber"},
		s4:       []string{"GORM", "SQLAlchemy"},
		s5:       []string{"MySQL", "PostgreSQL", "mongoDB"},
	}

	fmt.Println(me)
}
```
<p align="center">
	<a href="https://gist.github.com/luisnquin" target='_blank'><img src='https://i.postimg.cc/4dwRrRgK/gist.png' alt='gist' width=120/></a>
<p>
