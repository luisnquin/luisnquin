<a href="https://www.youtube.com/channel/UC2W6vIOuSd7UAAsnOpL-c8A" target="_blank"><img src="https://i.ibb.co/FmKm31t/youtube-background-gray-rounded.png" alt="youtube-icon" width=45></a>
<a href="https://twitter.com/sixmonths2020" target="_blank"><img src="https://i.ibb.co/kGTj9nC/twitter-background-gray-rounded.png" alt="twitter-icon" width=45></a>
<a href=# target="_blank"><img src="https://i.ibb.co/9tZ1Jzw/website-background-gray-rounded.png" alt="website-icon" width=45></a>
<br>
<p float="left">
  <a  href="https://github.com/luisnquin"><img width="400" src="https://github-readme-stats.vercel.app/api?username=luisnquin&show_icons=true&theme=dracula">
  <a href="https://github.com/luisnquin"><img width="400" src="https://github-readme-stats.vercel.app/api/top-langs/?username=luisnquin&hide=html,scss,css,shell&langs_count=10&layout=compact&theme=dracula">
  
</p>
                                                                                                                                      
    package main

    import "fmt"

    func main() {
      type stack_one struct{ first, second, third string }
      type stack_two struct{ first, second string }
      type stack_three struct{ first, second, third string }

      type Programmer struct {
        fullname, email string
        frontend        stack_one
        backend         stack_two
        databases       stack_three
      }

      frtnd := stack_one{"HTML", "CSS", "JavaScript"}
      bcknd := stack_two{"Django", "Flask"}
      dtbss := stack_three{"MySQL", "PostgreSQL", "mongoDB"}

      Me := Programmer{
        fullname:  "Luis Quiñones Requelme",
        email:     "lpaandres2020@gmail.com",
        frontend:  frtnd,
        backend:   bcknd,
        databases: dtbss,
      }

      fmt.Println(Me)
    }
