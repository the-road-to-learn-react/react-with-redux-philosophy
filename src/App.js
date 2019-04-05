import React, { useReducer, useContext, createContext } from 'react';

const TodoContext = createContext(null);
const FilterContext = createContext(null);

const initalTodos = [
  {
    id: 'a',
    task: 'Learn React',
    complete: true,
    url: 'https://www.robinwieruch.de/the-road-to-learn-react/',
  },
  {
    id: 'b',
    task: 'Learn Firebase',
    complete: true,
    url:
      'https://www.robinwieruch.de/the-road-to-react-with-firebase-book/',
  },
  {
    id: 'c',
    task: 'Learn GraphQL',
    complete: false,
    url: 'https://www.robinwieruch.de/the-road-to-graphql-book/',
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
      </FilterContext.Provider>
    </TodoContext.Provider>
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
      <a href={todo.url}>(Link)</a>
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
