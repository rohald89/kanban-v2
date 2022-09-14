import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useResetPasswordMutation } from './authApiSlice';

function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await resetPassword({ resetToken: token, ...values }).unwrap();
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <div className="max-w-lg w-11/12 rounded-[4px] text-darkGrey bg-white p-6 dark:text-lightGrey dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6">Reset Password</h1>

          <Form className="space-y-4">
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="New Password"
            />
            <TextInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
            />

            <button
              type="submit"
              className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover"
            >
              Reset Password
            </button>
          </Form>
          <p className="body-lg mt-6 text-mediumGrey dark:text-white">
            Remember your password?{' '}
            <Link
              to="/signin"
              className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover"
            >
              Sign In
            </Link>
          </p>
          <p className="body-lg text-mediumGrey dark:text-white">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover"
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
}
export default ResetPasswordForm;
