export function alertReducer(state = false, action: any) {
  switch (action.type) {
    case "alertOn":
      state = true;
      return state;
      
    case "alertOff":
      state = false;
      return state;
      
    default:
      state = false;
      return state;
  }
}
