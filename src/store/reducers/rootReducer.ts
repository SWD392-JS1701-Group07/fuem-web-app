import { logout } from "@/api/userAPI";

const initialState = {
  loginedUser: {
    role: localStorage.getItem('role') || 0,
    accessToken: localStorage.getItem('accessToken') || '',
    userProfile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      // eslint-disable-next-line no-case-declarations
      const { accessToken, role, accountId, accountDTO } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', accountId);
      localStorage.setItem('userProfile', JSON.stringify(accountDTO));
      return { ...state, loginedUser: { ...action.payload, userProfile: accountDTO } };
    case 'LOGOUT':
      logout(state.loginedUser.accessToken)
        .then(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          localStorage.removeItem('userProfile');
        })
        .catch((err) => {
          console.error(err);
        });
      return { ...state, loginedUser: { role: 0, accessToken: '', userProfile: {} } };
    default:
      return state;
  }
};

export default rootReducers;
