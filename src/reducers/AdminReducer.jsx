// import{LOGIN_ADMIN_REQUEST,
//     LOGIN_ADMIN_SUCCESS,
//     LOGIN_ADMIN_FAIL,} from '../constants/AdminConstants'

// export const initialState = {
//     admin: {}, 
//     loading: false,
//     isAuthenticatedAdmin: false,
//     token: localStorage.getItem('admintoken') || null,
//     error: null,
// };


// export const adminReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'LOGIN_ADMIN_REQUEST':
//             return {
//                 ...state,
//                 loading: true,
//                 isAuthenticatedAdmin: false,
//             };
//         case 'LOGIN_ADMIN_SUCCESS':
//             console.log("lofijnsyucesss")
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticatedAdmin: true,
//                 admin: action.payload.user,
//                 token: action.payload.token,
                
//             };
//         case 'LOGIN_ADMIN_FAIL':
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticatedAdmin: false,
//                 admin: null,
//                 token: null,
//                 error: action.payload,
//             };
//         case 'LOGOUT_ADMIN':
//             return {
//                 ...state,
//                 admin: null,
//                 token: null,
//                 isAuthenticatedAdmin: false,
//             };
//         default:
//             return state;
//     }
// };


const initialState = {
    loading: false,
    isAuthenticatedAdmin: false,
    admin: null,
    error: null,
    token: null,
  };
  
  export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_ADMIN_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'LOGIN_ADMIN_SUCCESS':
        console.log("entersd")
        return {
          ...state,
          loading: false,
          isAuthenticatedAdmin: true,
          admin: action.payload.user,
          token: action.payload.token,
        };
      case 'LOGIN_ADMIN_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

  const EmployeeinitialState = {
    loading: false,
    employees: [],
    error: '',
  };
  
  export const employeeReducer = (state = EmployeeinitialState, action) => {
    switch (action.type) {
      case 'FETCH_EMPLOYEES_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_EMPLOYEES_SUCCESS':
        return { loading: false, employees: action.payload, error: '' };
      case 'FETCH_EMPLOYEES_FAILURE':
        return { loading: false, employees: [], error: action.payload };
      default:
        return state;
    }
  };