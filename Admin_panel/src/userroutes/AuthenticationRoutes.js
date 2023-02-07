// project imports
import MinimalLayout from 'layout/MinimalLayout';
import LoginPage from 'Pages/Authentication/LoginPage';
import UserLoginPage from 'Pages/Authentication/UserLoginPage';
import SignupPage from 'Pages/Authentication/SignupPage';
import ForgetPassword from 'Pages/Authentication/ForgetPassword';
import ResetPassword from 'Pages/Authentication/Resetpassword';
import UserSignup from 'Pages/Authentication/UserSignup';

// login option 3 routing

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'user/login',
            element: <UserLoginPage />
        },
        {
            path: 'register',
            element: <SignupPage />
        },
        {
            path: 'user/register',
            element: <UserSignup />
        },
        {
            path: 'forget_password',
            element: <ForgetPassword />
        },
        {
            path: 'api/admin/reset-password/reset/:token',
            element: <ResetPassword />
        }
    ]
};

export default AuthenticationRoutes;
