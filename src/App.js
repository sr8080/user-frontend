import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";  
import Dashboard from "./components/DashBoard";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import ProtectedRoute from "./ProtectedRoute";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/admin-home" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/add-employee" element={<ProtectedRoute element={CreateEmployee} />} />
        <Route path="/employee" element={<ProtectedRoute element={EmployeeList} />} />
        <Route path="/edit-employee/:id" element={<ProtectedRoute element={EmployeeEdit} />} />
      
       
        </Routes>
    </Router>
   
  );
};

export default App;
