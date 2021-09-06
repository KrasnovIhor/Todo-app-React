import { useState } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import styles from "./Comments.module.scss";
import React from "react";

const Comments = ({ todos, addComment }) => {
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className={styles.comments}>
      <h2>Comments #{todos.map((todo, i) => todo.isActive && i + 1)} </h2>

      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            {todo.isActive &&
              todo.comments.map((el, i) => (
                <Row key={i} className={styles.item}>
                  <Col className={styles.previewContainer} xs={2}>
                    <div style={{ background: `#${el.color}` }} className={styles.preview}></div>
                  </Col>
                  <Col>
                    <p>{el.comment}</p>
                  </Col>
                </Row>
              ))}
          </div>
        );
      })}
      {todos.map(
        (todo) =>
          todo.isActive && (
            <Row key={todo.id}>
              <Col className={styles.previewContainer} xs={2}>
                <div className={styles.preview}></div>
              </Col>

              <Col>
                <FormControl
                  key={todo.id}
                  value={commentInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      setCommentInput("");
                      return addComment(e, todo.id, commentInput);
                    }
                  }}
                  onChange={(e) => setCommentInput(e.target.value)}
                  as="textarea"
                />
              </Col>
            </Row>
          )
      )}
    </div>
  );
};

export default Comments;
