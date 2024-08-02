import { createContext, useContext, useState } from "react";
import styled from "styled-components";

const Span = styled.span`
  padding: 0.5rem;
`;

// 1. Create a context
const CounterContext = createContext();

// 2. Create parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((currCount) => currCount + 1);
  const decrease = () => setCount((currCount) => currCount - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to implement the common task of the compound component
function Label({ children }) {
  return <Span>{children}</Span>;
}
function Count() {
  const { count } = useContext(CounterContext);
  return <Span>{count}</Span>;
}
function Increase({ icon }) {
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}>{icon}</button>;
}
function Decrease({ icon }) {
  const { decrease } = useContext(CounterContext);
  return <button onClick={decrease}>{icon}</button>;
}

// 4. Add child components as properties to the parent component (optional)
Counter.Label = Label;
Counter.Count = Count;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
