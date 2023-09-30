import { ThumbsUp, Trash } from "phosphor-react"
import { Avatar } from "./Avatar"

import styles from "./Comment.module.css"
import { useState } from "react";

export function Comment({ content, onDeleteComment }) {
    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment() {
        setLikeCount( (state) => {
            return likeCount + 1
        });
    }

    function handlerDeleteComment() {
        onDeleteComment(content);
    }
    
    return (
        <div className={styles.comment}>
             <Avatar hasBorder={false} src={"https://github.com/ricardogorki.png"}/>
             <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Ricardo Gorki</strong>
                            <time title="27 de Setembro às 12:34" dateTime="2023-09-27 12:34:00">Cerca de 1h atrás</time>
                        </div>
                        <button
                            onClick={handlerDeleteComment}
                            title="Deletar comentário">
                            <Trash size={24} />    
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                   <button onClick={handleLikeComment}>
                    <ThumbsUp size={20} />
                    Aplaudir <span>{likeCount}</span>
                   </button>
                </footer>
             </div>
        </div>
    )
}