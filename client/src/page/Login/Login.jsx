import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

import './Login.css';
import { logOnOrOff } from '../../store/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies();

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
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const loginReq = await fetch(
        'https://dkgicggupnrxldwvkeft.supabase.co/auth/v1/token?grant_type=password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg`,
          },
          body: JSON.stringify(values),
        }
      );
      const loginRes = await loginReq.json();
      if (loginRes.error) {
        handleAlert(loginRes.error_description);
      } else {
        setCookie('accessToken', loginRes.access_token, {
          maxAge: loginRes.expires_in,
        });
        setCookie('refreshToken', loginRes.refresh_token, {
          maxAge: loginRes.expires_in,
        });
        setCookie('test', 'RAMU', { maxAge: 10 });
        dispatch(
          logOnOrOff({
            status: true,
            userInfo: {
              name: loginRes.user.user_metadata.name,
              email: loginRes.user.email,
              userId: loginRes.user.id,
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
    <div className="login-container">
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
      <form onSubmit={formik.handleSubmit} className="form-container">
        <h1 style={{ margin: '0' }}>Login</h1>
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
          New user?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              textDecoration: 'underline',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Register
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

export default Login;
