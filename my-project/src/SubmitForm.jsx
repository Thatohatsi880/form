import React, { useState } from 'react'; // Import useState
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SubmitForm = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track errors
  const [success, setSuccess] = useState(false); // State to track success status

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true); // Set loading state to true while fetching data
        setError(null); // Reset error state before API call
        setSuccess(false); // Reset success state before API call
        // Make an API call using Axios
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
        console.log(response.data); // Log response data
        resetForm(); // Reset the form to blank state
        setSuccess(true); // Set success state to true on successful submission
      } catch (error) {
        setError(error); // Set error state if API call fails
      } finally {
        setLoading(false); // Set loading state to false after API call is completed
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkgray">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md" style={{ border: 'none' }}> {/* Set border to none */}
        <h1 className="text-2xl font-bold mb-6 text-center">Submit Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              className="border rounded p-2 w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
              id="email"
              name="email"
              type="text"
              value={formik.values.email}
              className="border rounded p-2 w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              className="border rounded p-2 w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
            {/* Warning message for password */}
            {(formik.touched.password && formik.values.password.length < 6 && !formik.errors.password) ? (
              <div className="text-yellow-500 text-sm mt-1">Password strength: Weak</div>
            ) : null}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            {loading ? 'Submitting...' : 'Submit'} {/* Show 'Submitting...' while loading */}
          </button>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error.message}</div>} {/* Display error message if error occurs */}
        {success && <div className="text-green-500 text-sm mt-2">Form submitted successfully!</div>} {/* Display success message if form is submitted */}
      </div>
    </div>
  );
};

export default SubmitForm;
