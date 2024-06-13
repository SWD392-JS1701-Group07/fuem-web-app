const initialState = {
    loginedUser: {
        accessToken: "",
    }
}
const rootReducers = (state: any, action: any) => {
    if (state === undefined) {
        return initialState;
    }
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload);
            return { ...state, loginedUser: action.payload };
        default: return state;
    }
}
export default rootReducers;