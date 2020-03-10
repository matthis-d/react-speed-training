import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "./appReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

jest.useFakeTimers();

const renderApp = () => {
  return render(
    <Provider store={createStore(appReducer, applyMiddleware(thunk))}>
      <App />
    </Provider>
  );
};

it("should display botton - and +", () => {
  const { getByTitle } = renderApp();
  expect(getByTitle("Decrement Teas")).toBeVisible();
  expect(getByTitle("Increment Teas")).toBeVisible();
});

it("should display 0 at the beginning", () => {
  const { queryAllByText } = renderApp();
  queryAllByText("0").forEach(elem => {
    expect(elem).toBeVisible();
  });
});

it("should increment when click on +", async () => {
  const { getByTitle, getByLabelText } = renderApp();
  fireEvent.click(getByTitle("Increment Teas"));
  jest.advanceTimersByTime(4000);
  await wait(() => {
    expect(getByLabelText("Teas")).toHaveTextContent("1");
  });
});

it("should not be possible to set a negative count", () => {
  const { getByTitle, queryByText, getByLabelText } = renderApp();
  fireEvent.click(getByTitle("Decrement Teas"));
  expect(queryByText("-1")).not.toBeInTheDocument();
  expect(getByLabelText("Teas")).toHaveTextContent("0");
});

it.each`
  label
  ${"Trainees"}
  ${"Teas"}
  ${"Coffees"}
`(`should display $label`, ({ label }) => {
  const { getByText } = renderApp();
  expect(getByText(label)).toBeVisible();
});

it("should display total count title", () => {
  const { getByText } = renderApp();
  expect(getByText(/Total count/)).toBeVisible();
});

it("should display total count number", async () => {
  const { getByTitle, getByText } = renderApp();
  fireEvent.click(getByTitle("Increment Teas"));
  fireEvent.click(getByTitle("Increment Teas"));
  fireEvent.click(getByTitle("Increment Coffees"));
  fireEvent.click(getByTitle("Increment Trainees"));
  jest.advanceTimersByTime(4000);
  await wait(() => {
    expect(getByText(/Total count: 4/)).toBeVisible();
  });
});

it("should display an input to add a counter", () => {
  const { getByLabelText } = renderApp();
  expect(getByLabelText("New counter:")).toBeVisible();
});

it("should display a button to add a new counter", () => {
  const { getByText } = renderApp();
  expect(getByText("Add")).toBeVisible();
});

it("should add a counter when we click on it", async () => {
  const { getByLabelText, getByText } = renderApp();
  await userEvent.type(getByLabelText("New counter:"), "Chocolate");
  fireEvent.click(getByText("Add"));

  expect(getByText("Chocolate")).toBeVisible();
});

it("should clear input when submitted", async () => {
  const { getByLabelText, getByText } = renderApp();
  await userEvent.type(getByLabelText("New counter:"), "Chocolate");
  fireEvent.click(getByText("Add"));

  expect(getByLabelText("New counter:").value).toBe("");
});

it("should not add counter when empty", async () => {
  const { getByText, queryAllByText } = renderApp();
  fireEvent.click(getByText("Add"));

  expect(queryAllByText("0")).toHaveLength(3);
});

it("should disable Add button when input is empty", async () => {
  const { getByText } = renderApp();
  expect(getByText("Add")).toBeDisabled();
});
