import { Row, Col, Button } from "react-bootstrap";
import styles from "./Todo.module.scss";

const Todo = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <Row className={styles.itemTodo__row}>
      <Col
        onClick={() => toggleTodo(todo.id)}
        className={todo.isActive ? [styles.itemTodo, styles.itemTodo_active].join(" ") : styles.itemTodo}
      >
        {todo.task}
        <span>{todo.comments.length}</span>
      </Col>
      <Button className={styles.button} onClick={() => removeTodo(todo.id)} variant="outline-danger">
        Delete
      </Button>
    </Row>
  );
};

export default Todo;
