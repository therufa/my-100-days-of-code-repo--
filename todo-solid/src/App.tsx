import { createSignal, type Component } from 'solid-js';

const App: Component = () => {
  const [todo, setTodo] = createSignal<string[]>([]);
  const [text, setText] = createSignal('');

  return (
    <div class='text-red-700'>
      <h1 class='text-2xl'>Todo List</h1>
      <ul>
        {todo().map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <input
        type='text'
        onInput={(e) => setText(e.currentTarget.value)}
        value={text()}
      />
      <button
        onClick={() => {
          setTodo([...todo(), text()]);
          setText('');
        }}
      >+</button>
    </div>
  );
};

export default App;
