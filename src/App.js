import React, {
  useState,
  useReducer,
  useContext,
  createContext,
} from 'react';

import uuid from 'uuid/v4';

const TodoContext = createContext(null);
const FilterContext = createContext(null);

const initalTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
  },
];

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: uuid(),
        complete: false,
      });
    default:
      throw new Error();
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

const App = () => {
  const [filter, filterDispatch] = useReducer(filterReducer, 'ALL');
  const [todos, todosDispatch] = useReducer(todoReducer, initalTodos);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    }

    if (filter === 'COMPLETE' && todo.complete) {
      return true;
    }

    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true;
    }

    return false;
  });

  return (
    <TodoContext.Provider
      value={{ todos: filteredTodos, todosDispatch }}
    >
      <FilterContext.Provider value={filterDispatch}>
        <Filter />
        <TodoList />
        <AddTodo />
      </FilterContext.Provider>
    </TodoContext.Provider>
  );
};

const AddTodo = () => {
  const [task, setTask] = useState('');

  const { todosDispatch } = useContext(TodoContext);

  const handleSubmit = event => {
    if (task) {
      todosDispatch({ type: 'ADD_TODO', task });
    }

    setTask('');

    event.preventDefault();
  };

  const handleChange = event => setTask(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo }) => {
  const { todosDispatch } = useContext(TodoContext);

  const handleChange = () =>
    todosDispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id,
    });

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChange}
        />
        {todo.task}
      </label>
    </li>
  );
};

const Filter = () => {
  const filterDispatch = useContext(FilterContext);

  const handleShowAll = () => {
    filterDispatch({ type: 'SHOW_ALL' });
  };

  const handleShowComplete = () => {
    filterDispatch({ type: 'SHOW_COMPLETE' });
  };

  const handleShowIncomplete = () => {
    filterDispatch({ type: 'SHOW_INCOMPLETE' });
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  );
};

export default App;
