export function toolReducer(state = '', action: any) {
    const tools = ['Block', 'Appearance', 'Setting'];

    switch(action.type) {
        case tools[1]:
            state = tools[1];
            return state;
        case tools[2]:
            state = tools[2];
            return state;
        default:
            state = tools[0];
            return state;
    }
}