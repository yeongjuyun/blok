export function alertReducer(state = false, action: any) {
  switch (action.type) {
    case "alertOn":
      return state = true;
      
    case "alertOff":
      return state = false;
      
    default:
      return state;
  }
}
