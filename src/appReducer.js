const initialState = [
  { label: "Trainees", count: 0 },
  { label: "Teas", count: 0 },
  { label: "Coffees", count: 0 }
];

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
    case "DECREMENT": {
      const inc = action.type === "DECREMENT" ? -1 : 1;
      return state.map(val => {
        if (val.label === action.payload) {
          return { ...val, count: Math.max(val.count + inc, 0) };
        }
        return val;
      });
    }

    case "ADD":
      return [...state, { label: action.payload, count: 0 }];

    default:
      return state;
  }
};

export default appReducer;
