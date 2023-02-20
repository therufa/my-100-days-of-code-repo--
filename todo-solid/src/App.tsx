import { createSignal, type Component } from 'solid-js';

const Item = (props: { item: string; onClick: (evt: Event) => void }) => {
  return (
    <li class='flex w-60'>
      <span class="flex-1">{props.item}</span>
      <button
        class="bg-red-500 text-white rounded-md px-3"
        onClick={props.onClick}
      >Delete</button>
    </li>
  );
};

const App: Component = () => {
  const [todo, setTodo] = createSignal<string[]>([]);
  const [text, setText] = createSignal('');

  return (
    <div class='flex flex-1 justify-center flex-col'>
      <div class="max-w-3xl">
        <h1 class='text-2xl'>Todo List</h1>
        <div class="flex gap-4">
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              setTodo([...todo(), text()]);
              setText('');
            }}
          >
            <input
              class="border border-gray-300 rounded-md"
              type='text'
              onInput={(e) => setText(e.currentTarget.value)}
              value={text()}
            />
            <button
              type='submit'
              class="bg-blue-500 text-white rounded-md px-3"
            >Add</button>
          </form>
        </div>
        <ul class="w-full">
          {todo().map((item, idx) => (
            <Item
              item={item}
              onClick={() => {
                const newTodo = [...todo()];
                newTodo.splice(idx, 1);
                setTodo(newTodo);
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
