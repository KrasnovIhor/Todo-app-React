import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import styles from "./TodoForm.module.scss";

const TodoForm = ({ addTodo }) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(userInput);
    setUserInput("");
  };

  const handleKeyPress = () => {};

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <h2>Items</h2>
      <Row>
        <Col xs={9}>
          <Form.Control
            value={userInput}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Type name here..."
          />
        </Col>
        <Col className={styles.button} xs={3}>
          <Button type="submit" variant="primary">
            Add new
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
