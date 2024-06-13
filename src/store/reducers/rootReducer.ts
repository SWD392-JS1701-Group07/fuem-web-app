
const initialState = {
    loginedUser: {
        role: 0,
        accessToken: "",
    }
}
const rootReducers = (state: any, action: any) => {
    state = {
        loginedUser: {
            role: localStorage.getItem("role") ? localStorage.getItem("role") : 0,
            accessToken: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "",
        }
    }
    switch (action.type) {
        case 'LOGIN':
            console.log("payload: ", action.payload);
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("role", action.payload.role);
            //localStorage.setItem("refreshToken", data.refreshToken);
            return { ...state, loginedUser: action.payload };
        case 'LOGOUT':
            localStorage.setItem("accessToken", "");
            localStorage.setItem("role", "0");
            return { ...state, loginedUser: { role: 0, accessToken: "" } };
        default: return state;
    }
}
export default rootReducers;