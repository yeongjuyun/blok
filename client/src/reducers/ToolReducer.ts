const toolList = ["Block", "Appearance", "Setting"];

export function toolReducer(state = "", action: any) {
  switch (action.type) {
    case toolList[1]:
      state = toolList[1];
      return state;

    case toolList[2]:
      state = toolList[2];
      return state;
      
    default:
      state = toolList[0];
      return state;
  }
}
