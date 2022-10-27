import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCookies } from 'react-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';

import './Register.css';
import { logOnOrOff } from '../../store/userSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAlert = (msg) => {
    setTimeout(() => {
      setAlert((prev) => {
        return { status: false, message: '' };
      });
    }, 3000);
    setAlert({ status: true, message: msg });
  };

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    name: yup
      .string('Enter your name')
      .min(3, 'Name should be of minimum 3 characters length')
      .max(20, 'Name should be of maximum 20 characters length')
      .required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const registerReq = await fetch(
        'https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg`,
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            data: { name: values.name },
          }),
        }
      );
      const registerRes = await registerReq.json();
      if (registerRes.code === 400) {
        handleAlert(registerRes.msg);
      } else {
        setCookie('accessToken', registerRes.access_token, {
          maxAge: registerRes.expires_in,
        });
        setCookie('refreshToken', registerRes.refresh_token, {
          maxAge: registerRes.expires_in,
        });
        dispatch(
          logOnOrOff({
            status: true,
            userInfo: {
              name: registerRes.user.user_metadata.name,
              email: registerRes.user.email,
              userId: registerRes.user.id,
            },
          })
        );
        navigate('/dashboard');
      }
      setIsLoading(false);
      resetForm();
    },
  });

  return (
    <div className="register-container">
      {/* Alert box */}
      {alert.status ? (
        <Alert
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '15em',
            textAlign: 'center',
            top: 10,
          }}
          severity="error"
        >
          {alert.message}
        </Alert>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="register-form-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src="https://cdn.dribbble.com/users/35253/screenshots/3984334/ideate_dribb.gif"
            alt="Register logo"
            width="100"
            style={{ margin: '0' }}
          />
          <h1 style={{ margin: '0', marginBottom: '1em' }}>Register</h1>
        </div>
        <TextField
          name="name"
          style={{ margin: '0.5em' }}
          className="login-input"
          type="text"
          label={'Name'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          name="email"
          style={{ margin: '0.5em' }}
          className="login-input"
          type="mail"
          label={'Email'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          name="password"
          style={{ margin: '0.5em' }}
          className="login-input"
          type={showPassword ? 'text' : 'password'}
          label={'Password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleShowPassword()}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon fontSize="medium" />
              </InputAdornment>
            ),
          }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <p>
          Already a user?{' '}
          <span
            className="redirect-url-register"
            onClick={() => navigate('/login')}
            style={{
              textDecoration: 'underline',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Login
          </span>
        </p>
        <Button
          type="submit"
          style={{
            width: '10em',
            margin: '0.5em auto',
            backgroundColor: isLoading ? 'white' : 'purple',
          }}
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress color="secondary" size={20} />
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Register;
