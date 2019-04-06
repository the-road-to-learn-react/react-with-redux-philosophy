import React, { useState } from 'react';
import uuid from 'uuid/v4';

const initalTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: uuid(),
    task: 'Learn GraphQL',
    complete: false,
  },
];

const App = () => {
  const [todos, setTodos] = useState(initalTodos);
  const [task, setTask] = useState('');

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      setTodos(todos.concat({ id: uuid(), task, complete: false }));
    }

    setTask('');

    event.preventDefault();
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleChangeInput}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default App;
