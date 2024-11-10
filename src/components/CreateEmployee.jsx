import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Header";
import { createEmployee } from "../actions/AdminActions"; 
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CreateEmployee = () => {
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    course: [],
    imgUpload: null,
  });

  const [errors, setErrors] = useState({
    email: "",
    mobile: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          course: [...prevData.course, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          course: prevData.course.filter((course) => course !== value),
        }));
      }
    } else if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imgUpload: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^[0-9]{10}$/;
    let formErrors = {};

    if (!emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
    }

    if (!mobileRegex.test(formData.mobile)) {
      formErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (formData.imgUpload && !["image/jpeg", "image/jpg"].includes(formData.imgUpload.type)) {
      alert("Only JPG/JPEG images are allowed.");
      return false;
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createEmployee(formData));
      toast.success("Employee created successfully!");
      setTimeout(() => {
        navigate("/employee");
      }, 1000); 
    }
  };
  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Create Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-red-500">{errors.email}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="mobile" className="block text-gray-700">Mobile No</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                className="w-full px-4 py-2 border rounded"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              {errors.mobile && <small className="text-red-500">{errors.mobile}</small>}
            </div>

            <div className="mb-4">
              <label htmlFor="designation" className="block text-gray-700">Designation</label>
              <select
                id="designation"
                name="designation"
                className="w-full px-4 py-2 border rounded"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  className="mr-2"
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  className="ml-4 mr-2"
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Course</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mca"
                  name="course"
                  value="MCA"
                  className="mr-2"
                  checked={formData.course.includes("MCA")}
                  onChange={handleChange}
                />
                <label htmlFor="mca">MCA</label>
                <input
                  type="checkbox"
                  id="bca"
                  name="course"
                  value="BCA"
                  className="ml-4 mr-2"
                  checked={formData.course.includes("BCA")}
                  onChange={handleChange}
                />
                <label htmlFor="bca">BCA</label>
                <input
                  type="checkbox"
                  id="bsc"
                  name="course"
                  value="BSC"
                  className="ml-4 mr-2"
                  checked={formData.course.includes("BSC")}
                  onChange={handleChange}
                />
                <label htmlFor="bsc">BSC</label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="imgUpload" className="block text-gray-700">Image Upload</label>
              <input
                type="file"
                id="imgUpload"
                name="imgUpload"
                accept=".jpg,.jpeg,.png"
                className="w-full px-4 py-2 border rounded"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-4">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
    
  );
};

export default CreateEmployee;
