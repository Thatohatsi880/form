import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';

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
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // const response = await axios.post('YOUR_API_ENDPOINT', values);
        // console.log(response.data);
        console.log(values); // For debugging purposes
        resetForm(); // Reset the form to blank state
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkgray">
      <div className="bg-white p-8 rounded shadow-md border border-lightgray w-full max-w-md">
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;
