import { format, formatDistanceToNow } from "date-fns"
import ptBr from "date-fns/locale/pt-BR"

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState([
    "post muito bacana"
  ])

  const [newCommentText, setNewCommentText] = useState("")

  const publishedDataFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  });

  const publishedDateToRelativeToNow =  formatDistanceToNow(post.publishedAt, {
    locale:ptBr,
    addSuffix: true
  })

  function handleCreatNewComment(event: FormEvent) {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete: string) {
    const commentWithoutDeleteOne = comments.filter(comment =>{
      return comment !=  commentToDelete;
    })
    setComments(commentWithoutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length == 0;
  
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
        <Avatar src={post.author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time title={publishedDataFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateToRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type == "paragraph") {
            return  <p key={line.content}>{line.content}</p>
          } else if (line.type == "link") {
            return  <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>
      <form onSubmit={handleCreatNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button
            type="submit"
            disabled={isNewCommentEmpty}>
              Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment} 
            />
          )
        })}
      </div>
    </article>
  );
}