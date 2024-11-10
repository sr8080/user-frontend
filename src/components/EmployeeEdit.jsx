import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Header';
import { updateEmployee, fetchEmployeeById } from '../actions/AdminActions';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit = () => {
  const { id: employeeId } = useParams(); 
  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: 'HR',
    gender: '',
    course: [],
    imgUpload: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    
    dispatch(fetchEmployeeById(employeeId)).then((data) => {
      setFormData({
        name: data.name,
        email: data.email,
        mobile: data.mobileNo,
        designation: data.designation,
        gender: data.gender,
        course: data.course,
        imgUpload: data.imgUpload,
      });
      setImagePreview(data.imgUpload); 
    });
  }, [dispatch, employeeId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        course: checked ? [...prevData.course, value] : prevData.course.filter((course) => course !== value),
      }));
    } else if (type === 'radio') {
      setFormData((prevData) => ({ ...prevData, gender: value }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, imgUpload: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const mobileRegex = /^[0-9]{10}$/;
    let formErrors = {};

    if (!emailRegex.test(formData.email)) formErrors.email = 'Please enter a valid email.';
    if (!mobileRegex.test(formData.mobile)) formErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    if (!formData.imgUpload) formErrors.imgUpload = 'Image is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        dispatch(updateEmployee(employeeId, formData)).then(() => {
            navigate('/employee'); 
          });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Edit Employee</h1>
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
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    className="ml-4 mr-2"
                    checked={formData.gender === 'Female'}
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
                    value="MCA"
                    checked={formData.course.includes('MCA')}
                    onChange={handleChange}
                  />
                  <label htmlFor="mca" className="mr-2">MCA</label>
                  <input
                    type="checkbox"
                    id="bca"
                    value="BCA"
                    checked={formData.course.includes('BCA')}
                    onChange={handleChange}
                    className="ml-4 mr-2"
                  />
                  <label htmlFor="bca">BCA</label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="imgUpload" className="block text-gray-700">Image Upload</label>
                <input
                  type="file"
                  id="imgUpload"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded"
                  accept="image/*"
                />
                {errors.imgUpload && <small className="text-red-500">{errors.imgUpload}</small>}
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
              </div>

              <button type="submit" className="bg-green-500 text-white py-5 px-8 rounded w-28 h-16">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeEdit;
