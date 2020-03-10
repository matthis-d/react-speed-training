import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { post } from "./api";

const sendIncrement = label => dispatch => {
  dispatch({ type: "INCREMENTING", payload: label });
  post(label).then(() => dispatch({ type: "INCREMENT", payload: label }));
};

export function Counter({ label, className = "" }) {
  const count = useSelector(state => {
    const counter = state.find(val => val.label === label);
    return counter.count || 0;
  });

  const dispatch = useDispatch();

  const onIncrement = () => {
    dispatch(sendIncrement(label));
  };

  const onDecrement = () => {
    dispatch({ type: "DECREMENT", payload: label });
  };

  return (
    <div className={className}>
      <label id={label}>{label}</label>
      <button onClick={onDecrement} title={`Decrement ${label}`}>
        -
      </button>
      <span aria-labelledby={label}>{count}</span>
      <button onClick={onIncrement} title={`Increment ${label}`}>
        +
      </button>
    </div>
  );
}
