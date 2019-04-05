import React from 'react';

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

const App = () => (
  <div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
            />
            {todo.task}
          </label>
        </li>
      ))}
    </ul>
  </div>
);

export default App;
