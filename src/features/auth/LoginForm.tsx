import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  return (
    <Formik
      initialValues={{
        emailAddress: '',
        password: '',
      }}
      onSubmit={async (values) => {
        console.log(values);
        try {
          const { accessToken } = await login(values).unwrap();
          dispatch(setCredentials({ accessToken }));
          navigate('/dashboard');
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <div className="max-w-lg w-11/12 rounded-[4px] text-darkGrey bg-white p-6 dark:text-lightGrey dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6">Sign In</h1>
          <Form className="space-y-4">
            <TextInput
              label="Email"
              name="emailAddress"
              type="email"
              placeholder="Email"
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />

            <button
              type="submit"
              className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover"
            >
              Sign In
            </button>
          </Form>
          <p className="body-lg mt-6 text-mediumGrey dark:text-white">
            Don't have an account yet?{' '}
            <Link
              to="/signup"
              className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover"
            >
              Sign Up
            </Link>
          </p>
          <p className="body-lg  text-mediumGrey dark:text-white">
            Forgot password?{' '}
            <Link
              to="/forgot"
              className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover"
            >
              Request Reset
            </Link>
          </p>{' '}
        </div>
      )}
    </Formik>
  );
}
export default LoginForm;
