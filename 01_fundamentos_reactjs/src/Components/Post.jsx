import { format, formatDistanceToNow } from "date-fns"
import ptBr from "date-fns/locale/pt-BR"

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";
import { useState } from "react";


export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    "post muito bacana"
  ])

  const [newCommentText, setNewCommentText] = useState("")

  const publishedDataFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  });

  const publishedDateToRelativeToNow =  formatDistanceToNow(publishedAt, {
    locale:ptBr,
    addSuffix: true
  })

  function handleCreatNewComment() {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity("")
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteComment(commentToDelete) {
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
        <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedDataFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateToRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type == "paragraph") {
              <p key={line.content}>{line.content}</p>
            } else if (line.type == "link") {
              <p key={line.content}><a href="#">{line.content}</a></p>
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