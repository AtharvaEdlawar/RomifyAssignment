import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Formik, Form, ErrorMessage } from 'formik';
import { signupSchema, loginSchema } from '../Stores/Schema';
import { useAuthHook } from '../Stores/Hook';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import type { LoginHookResult } from '../Stores/Types';
import './Auth.css'

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}


const AuthPage = () => {
   console.log('AuthPage rendering'); 
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { loginHook, signupHook } = useAuthHook();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (values: LoginFormValues): Promise<void> => {
    try {
      const loginApiCall: LoginHookResult = await loginHook(values.email, values.password);
      console.log('Login response:', loginApiCall.success);
      
      if (loginApiCall.success && loginApiCall.data) {
        localStorage.setItem('token', loginApiCall.data.token);
        navigate('/task');
      } else {
        console.log('Login failed:', loginApiCall.message);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };


const handleSignup = async (values: SignupFormValues): Promise<void> => {
    const result = await signupHook(values.email, values.password, values.firstName, values.lastName);
    toast.success("Proceed To login")
    if (result.success) {
        toast.success("Account created successfully! Proceed to Login");
    } else {
        toast.error(result.message);
    }
};

  return (

    <div className="auth-container">
      <div className="background-elements">
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
        <div className="bg-circle"></div>
        <div className="floating-particles"></div>
        <div className="floating-particles"></div>
        <div className="floating-particles"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-icon">
            <div className="logo-inner"></div>
          </div>
          <h1 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your account' : 'Join us today'}
          </p>
        </div>

        {isLogin ? (
          <Formik<LoginFormValues>
            key="login"
            initialValues={{
              email: '',
              password: '',
              rememberMe: false
            }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, values, errors, touched, setFieldValue }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`custom-input ${touched.email && errors.email ? 'p-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <Password
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => setFieldValue('password', e.target.value)}
                    placeholder="Enter your password"
                    toggleMask
                    feedback={false}
                    className={touched.password && errors.password ? 'p-invalid' : ''}
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="remember-forgot">
                  <div className="checkbox-wrapper">
                    <Checkbox
                      inputId="rememberMe"
                      name="rememberMe"
                      checked={values.rememberMe || false}
                      onChange={(e) => setFieldValue('rememberMe', e.checked)}
                    />
                    <label htmlFor="rememberMe" className="checkbox-label">Remember me</label>
                  </div>
                  <button type="button" className="forgot-password">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <i className="pi pi-arrow-right"></i>
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik<SignupFormValues>
            key="signup"
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={signupSchema}
            onSubmit={handleSignup}
          >
            {({ isSubmitting, values, errors, touched, setFieldValue }) => (
              <Form className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <InputText
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={(e) => setFieldValue('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className={`custom-input ${touched.firstName && errors.firstName ? 'p-invalid' : ''}`}
                    />
                    <ErrorMessage name="firstName" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <InputText
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={(e) => setFieldValue('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className={`custom-input ${touched.lastName && errors.lastName ? 'p-invalid' : ''}`}
                    />
                    <ErrorMessage name="lastName" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`custom-input ${touched.email && errors.email ? 'p-invalid' : ''}`}
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="password">Password</label>
                  <Password
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={(e) => setFieldValue('password', e.target.value)}
                    placeholder="Enter your password"
                    toggleMask
                    feedback={false}
                    className={touched.password && errors.password ? 'p-invalid' : ''}
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                  <Password
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    toggleMask
                    feedback={false}
                    className={touched.confirmPassword && errors.confirmPassword ? 'p-invalid' : ''}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>

                <Button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <i className="pi pi-arrow-right"></i>
                    </>
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        )}

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleAuthMode} className="toggle-button">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* <p className="auth-terms">
        By continuing, you agree to our{' '}
        <button className="terms-link">Terms of Service</button>
        {' '}and{' '}
        <button className="terms-link">Privacy Policy</button>
      </p> */}
    </div>
  );
};

export default AuthPage;