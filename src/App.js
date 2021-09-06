import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./App.scss";
import Comments from "./components/Comments/Comments";
import Todo from "./components/Todo/Todo";
import TodoForm from "./components/TodoForm/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);

  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  useEffect(() => {
    try {
      const json = localStorage.getItem("todos");
      const options = JSON.parse(json);

      if (options) {
        setTodos(options);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  const addTodo = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9),
        task: userInput,
        complete: false,
        comments: [],
        isActive: false,
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const handleToggle = (id) => {
    setTodos([...todos.map((todo) => (todo.id === id ? { ...todo, isActive: true } : { ...todo, isActive: false }))]);
  };

  const addComment = (event, id, comment) => {
    if (event.keyCode === 13 && event.ctrlKey) {
      setTodos([
        ...todos.map((todo) => {
          if (todo.id === id && comment) {
            todo.comments.push({ comment, color: randomColor });
            return { ...todo, comments: [...todo.comments] };
          } else {
            return { ...todo };
          }
        }),
      ]);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="aside-bar" xs={3}>
            <aside>
              <h2>DAIRY APP</h2>
              <p>Comment with no sense</p>
            </aside>
          </Col>
          <Col xs={4} className="todos">
            <div className="todos-wrapper">
              <TodoForm addTodo={addTodo} />
              {todos.map((todo) => {
                return <Todo todo={todo} key={todo.id} toggleTodo={handleToggle} removeTodo={removeTodo} />;
              })}
            </div>
          </Col>
          <Col className="comments" xs={4}>
            <div className="comments-wrapper">
              <Comments addComment={addComment} todos={todos} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
