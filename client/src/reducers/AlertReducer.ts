const alert = false;

export function alertReducer(state = alert, action: any) {
  switch (action.type) {
    case "on":
      state = true;
      return state;
    case "off":
      state = false;
      return state;
    default:
      state = false;
      return state;
  }
}
