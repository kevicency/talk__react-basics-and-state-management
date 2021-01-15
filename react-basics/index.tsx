const App = () => {
  const [width, setWidth] = React.useState(300);
  const [height, setHeight] = React.useState(400);

  return (
    <div className="main">
      <h1>Hello fellow Nerds!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid
        veritatis recusandae fugit fugiat! Fuga totam quo voluptates, quibusdam
        cumque ipsum molestiae cum suscipit perspiciatis dolore quos neque quas
        aliquid?
      </p>
      <div>
        width
        <input
          type="number"
          value={width}
          onChange={(ev) => setWidth(ev.target.value)}
        />
      </div>
      <div>
        height
        <input
          type="number"
          value={height}
          onChange={(ev) => setHeight(ev.target.value)}
        />
      </div>
      <br />
      <img src={`http://placekitten.com/${width}/${height}`} />
    </div>
  );
};

// const img = React.createElement("img", {
//   src: `http://placekitten.com/${width}/${height}`,
// });

let state: any[] = [];
let statePointer = 0;

const React = {
  createElement: (fnOrTag, props, ...children) => {
    if (typeof fnOrTag === "function") {
      return fnOrTag(props);
    }

    return { tag: fnOrTag /* <-- tag */, props: { ...props, children } };
  },
  useState: (initialState) => {
    let localPointer = statePointer;
    let localState = state[localPointer] || initialState;

    const setState = (newState) => {
      console.log({ state, newState });

      state[localPointer] = newState;

      render();
    };

    statePointer += 1;

    return [localState, setState] as const;
  },
};
const ReactDOM = {
  render: (reactElement, rootEl) => {
    if (typeof reactElement === "string" || typeof reactElement === "number") {
      rootEl.appendChild(document.createTextNode(String(reactElement)));
    }

    const el = document.createElement(reactElement.tag);

    const attributes = reactElement.props || {};
    const attrKeys = Object.keys(attributes).filter(
      (key) => key !== "children"
    );
    const children = attributes.children || [];

    attrKeys.forEach((key) => {
      el[key] = attributes[key];
    });

    children.forEach((child) => {
      ReactDOM.render(child, el);
    });

    rootEl.appendChild(el);
  },
};
const render = () => {
  const root = document.getElementById("root");
  ReactDOM.render(<App />, root);

  root?.firstChild?.remove();

  statePointer = 0;
};
render();
