import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../actions/AdminActions';
import Navbar from './Header';
import { useNavigate } from 'react-router-dom';
import {deleteEmployee} from '../actions/AdminActions'
const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const serverBaseURL = 'http://localhost:4000';


  const { employees, loading, error } = useSelector((state) => state.employee);

 

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (employeeId) => {
    console.log("clickk")
    navigate(`/edit-employee/${employeeId}`);
  };
  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
        
        dispatch(deleteEmployee(employeeId));
      }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Employee List</h1>
          <div>
            <button style={{ backgroundColor: 'yellow', padding: '10px', marginRight: '10px' }} onClick={() => navigate('/add-employee')}>Create Employee</button>
            <input type="text" placeholder="Enter Search Keyword" style={{ padding: '5px' }} />
          </div>
        </header>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            
            <tr style={{ backgroundColor: '#ADD8E6', textAlign: 'left' }}>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee._id} style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{index + 1}</td>
                <td style={{ padding: '10px' }}>
                <img 
                    src={`${serverBaseURL}/${employee.imgUpload.replace(/\\/g, '/')}`} 
                        alt="Profile" 
                        style={{ borderRadius: '50%', width: '50px', height: '50px' }} 
                  />
               
                         
                </td>
                <td style={{ padding: '10px' }}>{employee.name}</td>
                <td style={{ padding: '10px', color: 'blue' }}>{employee.email}</td>
                <td style={{ padding: '10px' }}>{employee.mobile}</td>
                <td style={{ padding: '10px' }}>{employee.designation}</td>
                <td style={{ padding: '10px' }}>{employee.gender}</td>
                <td style={{ padding: '10px' }}>{employee.course.join(', ')}</td>
                <td style={{ padding: '10px' }}>{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '10px' }}>
                  <button style={{ color: 'blue', marginRight: '5px' }} onClick={() => handleEdit(employee._id)}>Edit</button>
                  <button style={{ color: 'red' }}  onClick={() => handleDelete(employee._id)} >Delete</button>
                </td>
              </tr>
              
            ))}
          </tbody>
        </table>
        
      </div>
    </>
  );
};

export default EmployeeList;
