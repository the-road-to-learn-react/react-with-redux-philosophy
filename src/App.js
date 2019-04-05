import React, { useReducer, useContext, createContext } from 'react';

const TodoContext = createContext(null);

const todos = [
  {
    id: 'a',
    task: 'Learn React',
    completed: true,
    link: 'https://www.robinwieruch.de/the-road-to-learn-react/',
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    completed: true,
    link:
      'https://www.robinwieruch.de/the-road-to-react-with-firebase-book/',
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    completed: false,
    link: 'https://www.robinwieruch.de/the-road-to-graphql-book/',
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, completed: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, completed: false };
        } else {
          return todo;
        }
      });
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, todos);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <TodoList />
    </TodoContext.Provider>
  );
};

const TodoList = () => {
  const { state } = useContext(TodoContext);

  return (
    <ul>
      {state.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            dispatch({
              type: todo.completed ? 'UNDO_TODO' : 'DO_TODO',
              id: todo.id,
            })
          }
        />
        {todo.task}
      </label>
    </li>
  );
};

export default App;
