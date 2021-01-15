import React from "react";
import "./App.css";
const CounterContext = React.createContext({
  title: "My Counter",
  count: 0,
  setCount: () => {},
} as any);

const Counter = () => {
  console.log("Counter");

  return (
    <CounterContext.Consumer>
      {({ title, count, setCount }) => (
        <div>
          {title}
          <br />
          <button onClick={() => setCount(count - 1)}>-</button>
          {count}
          <button onClick={() => setCount((c) => c + 1)}>+</button>
        </div>
      )}
    </CounterContext.Consumer>
  );
};

const MoreLayout = () => (
  <div>
    <div>
      <Counter />
    </div>
  </div>
);

const Layout = () => (
  <div>
    <div>
      <MoreLayout />
    </div>
  </div>
);

const CountDisplay = () => (
  <CounterContext.Consumer>
    {({ count }) => <div>Count is {count}</div>}
  </CounterContext.Consumer>
);

function App() {
  const [title, setTitle] = React.useState("My Counter");
  const [count, setCount] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  return (
    <div>
      <div>
        <CounterContext.Provider value={{ title, count, setCount }}>
          <CounterContext.Provider
            value={{ title, count: count2, setCount: setCount2 }}
          >
            <div className="App">
              <div>
                <input
                  value={title}
                  onChange={(ev) => setTitle(ev.target.value)}
                />
              </div>
              <div>
                <Layout />
              </div>
              <br />
              <CountDisplay />
            </div>
          </CounterContext.Provider>
        </CounterContext.Provider>
      </div>
      <div>
        <CounterContext.Provider
          value={{ title, count: count2, setCount: setCount2 }}
        >
          <div className="App">
            <div>
              <input
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            <div>
              <Layout />
            </div>
            <br />
            <CountDisplay />
          </div>
        </CounterContext.Provider>
      </div>
    </div>
  );
}

export default App;
