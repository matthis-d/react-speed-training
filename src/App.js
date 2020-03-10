import React, { useState } from "react";
import { Counter } from "./Counter";

import styles from "./App.module.css";
import { connect } from "react-redux";

function App({ values, dispatch }) {
  const [inputValue, setInputValue] = useState("");

  // Get sum of all counts
  const totalCount = values.reduce((sum, val) => sum + val.count, 0);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue) {
      dispatch({ type: "ADD", payload: inputValue });
      setInputValue("");
    }
  };

  return (
    <div className={styles.App}>
      {values.map(value => (
        <Counter key={value.label} label={value.label} />
      ))}
      <div>Total count: {totalCount}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="counter-name">New counter:</label>
        <input
          name="counter-name"
          id="counter-name"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button disabled={!inputValue} type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    values: state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
