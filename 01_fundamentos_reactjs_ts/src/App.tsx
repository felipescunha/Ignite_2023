import { Header } from './Components/Header';
import { Post, PostType } from './Components/Post';
import { Sidebar } from './Components/Sidebar';

import styles from "./App.module.css";

import "./global.css";

  const posts: PostType[] = [
    {
      id: 1,
      author: {
        avatarUrl: "https://github.com/felipescunha.png",
        name: "Felipe Cunha",
        role: "Developer",
      },
      content: [
        { type: "paragraph", content: "Fala pessoal 👋"},
        { type: "paragraph", content: "Vocês estão vendo o primeiro post do meu Ignite em React e ele será postado em breve no meu github"},
        { type: "paragraph", content: "github.com/felipescunha"},
      ],
        publishedAt: new Date("2023-09-27 12:34:00"),
    },
    {
      id: 2,
      author: {
        avatarUrl: "https://github.com/ricardogorki.png",
        name: "Ricardo Gorki",
        role: "Developer",
      },
      content: [
        { type: "paragraph", content: "Fala pessoal 👋"},
        { type: "paragraph", content: "Vocês estão vendo o primeiro post do meu Ignite em React e ele será postado em breve no meu github"},
        { type: "paragraph", content: "github.com/felipescunha"},
      ],
        publishedAt: new Date("2023-09-28 00:40:00"),
    }
  ]


function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}
export default App
