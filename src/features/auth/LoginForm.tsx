import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
      onSubmit={ async (values) => {
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
        <div className="w-full mx-auto rounded-md p-6 bg-white dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6">Login</h1>

          <Form>
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
        </div>
      )}
    </Formik>
  );
}
export default LoginForm;
