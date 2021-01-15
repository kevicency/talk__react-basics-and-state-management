const Field = (props) => (
  <div>
    <label htmlFor="width">
      {props.label}
      <input
        type="number"
        name="width"
        value={props.value}
        onchange={(e) => props.onChange(e.target.value)}
      />
    </label>
  </div>
);

const App = () => {
  const [width, setWidth] = React.useState(400);
  const [height, setHeight] = React.useState(400);

  return (
    <div className="main">
      <Field value={width} onChange={setWidth} label="Width" />
      <Field value={height} onChange={setHeight} label="Height" />
      <div style="text-align: center">
        <img src={`http://placekitten.com/${width}/${height}`} />
      </div>
    </div>
  );
};

const log = (...args: any[]) => {
  console.log(...args);
  return args[args.length - 1];
};

let state: any[] = [];
let statePointer = 0;

const React = {
  useState: (initialState) => {
    let localPointer = statePointer;
    let localState = state[localPointer] || initialState;

    const setState = (newState) => {
      state[localPointer] = newState;
      render();
    };

    statePointer += 1;

    return [localState, setState] as const;
  },
  createElement: (fnOrTag, props, ...children) => {
    console.log({ fnOrTag, props, children });

    if (typeof fnOrTag === "function") {
      return fnOrTag(props);
    }

    return { tag: fnOrTag, props: { ...props, children } };
  },
};

const ReactDOM = {
  render: (reactElement: any, domRoot: Element) => {
    if (!reactElement) {
      return;
    }
    if (typeof reactElement === "string" || typeof reactElement === "number") {
      domRoot.appendChild(document.createTextNode(String(reactElement)));
      return;
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

    children.forEach((child) => ReactDOM.render(child, el));

    domRoot.appendChild(el);
  },
};

function render() {
  const root = document.querySelector("#root");

  root?.firstChild?.remove();

  ReactDOM.render(<App />, root!);

  statePointer = 0;
}

render();
