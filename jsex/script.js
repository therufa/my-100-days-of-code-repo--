"use strict";


const [myName, setMyName] = signel("Piskóta");

const app = document.querySelector("#app");
app.innerHTML = `<div>
  <div>Hello, <span id="name"></span>!</div>
  <div id="myInput"></div>
</div>`;

const fragment = document.createDocumentFragment();
fragment.appendChild(MyInput());
fragment.appendChild(MyInput());
fragment.appendChild(MyInput());

document.querySelector("#myInput").replaceWith(fragment);

const nameNode = document.createTextNode("")
document.querySelector("#name").replaceWith(nameNode);
myName(nameNode)

function MyInput() {
  function onInput(e) {
    setMyName(e.target.value);
  }

  const input = document.createElement("input");
  input.type = "text";
  input.oninput = onInput;
  myName(input)

  return input;
}

function signel(initialValue) {
  const listeners = [];
  const _signel = new Proxy({ value: initialValue }, {
    set: (target, prop, value) => {
      target[prop] = value;
      listeners.forEach(listener => listener(value));
      return true;
    }
  });

  const setSignel = (value) => {
    _signel.value = value;
  };
  const bindSignel = (target) => {
    const setTarget = (value) => {
      console.log(target, value)
      if (target.value !== undefined) 
        target.value = value;
      else if (target.textContent !== undefined)
        target.textContent = value;
      else
        target.innerHTML = value;
    };
    listeners.push(setTarget)
    setTarget(_signel.value)
  };

  return [bindSignel, setSignel];
}
