// import axios from 'axios';
// import{LOGIN_ADMIN_REQUEST,
//     LOGIN_ADMIN_SUCCESS,
//     LOGIN_ADMIN_FAIL,} from '../constants/AdminConstants'


// export const adminlogin = (userData) => async (dispatch) => {
//     debugger
//     try {
//       dispatch({ type: LOGIN_ADMIN_REQUEST });
  
//       const { data } = await axios.post('http://localhost:4000/api/admin/adminlogin',userData);
//         console.log(data.admin,"admin show")
//         localStorage.setItem("name",data.admin.name)
//       console.log(data.token, 'show');
//       localStorage.setItem('admintoken', data.token);
      
//       dispatch({
//         type: LOGIN_ADMIN_SUCCESS,
//         payload: {
//           user: data.admin,
//           token: data.token,
//         },
//       });
  
//       return data.user;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         dispatch({
//           type: LOGIN_ADMIN_FAIL,
//           payload: error.response?.data.message || 'An error occurred',
//         });
//       } else {
//         dispatch({
//           type: LOGIN_ADMIN_FAIL,
//           payload: 'An unknown error occurred',
//         });
//       }
//     }
//   };

import axios from 'axios';
import { debug } from 'util';

export const adminlogin = (userData) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_ADMIN_REQUEST' });

    const { data } = await axios.post('http://localhost:4000/api/admin/adminlogin', userData);
    
    localStorage.setItem('name', data.admin.name);
    localStorage.setItem('admintoken', data.token);

    dispatch({
      type: 'LOGIN_ADMIN_SUCCESS',
      payload: {
        user: data.admin,
        token: data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ADMIN_FAIL',
      payload: error.response?.data.message || 'An error occurred',
    });
  }
};

export const createEmployee = (employeeData) => async (dispatch) => {

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };
    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("email", employeeData.email);
    formData.append("mobile", employeeData.mobile);
    formData.append("designation", employeeData.designation);
    formData.append("gender", employeeData.gender);
    employeeData.course.forEach((course) => formData.append("course[]", course));
    if (employeeData.imgUpload) {
      formData.append("imgUpload", employeeData.imgUpload);
    }

    const { data } = await axios.post('http://localhost:4000/api/admin/addemployees', formData, config);

    dispatch({
      type: 'CREATE_EMPLOYEE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'CREATE_EMPLOYEE_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const fetchEmployees = () => async (dispatch) => {
 
  dispatch({ type: 'FETCH_EMPLOYEES_REQUEST' });
  try {
    const response = await axios.get('http://localhost:4000/api/admin/fetchemployees'); 
    dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_EMPLOYEES_FAILURE', payload: error.message });
  }
};

export const fetchEmployeeById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/admin/employees/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching employee:', error);
  }
};

export const updateEmployee = (id, formData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:4000/api/admin/updateemployees/${id}`, formData);
    console.log('Employee updated:', response.data);
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    
    await axios.delete(`http://localhost:4000/api/admin/removeemployees/${employeeId}`);

    
  

    dispatch(fetchEmployees());
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};