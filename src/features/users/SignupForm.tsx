import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useLoginMutation } from '../auth/authApiSlice';
import { setCredentials } from '../auth/authSlice';
import { useAddNewUserMutation } from './usersApiSlice';

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [addNewUser, { isLoading: addUserLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    emailAddress: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const newUser = await addNewUser(values);
          const { accessToken } = await login({
            emailAddress: values.emailAddress,
            password: values.password,
          }).unwrap();
          dispatch(setCredentials({ accessToken }));
          navigate('/dashboard');
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <div className="space-y-6 max-w-lg w-11/12 rounded-[4px] text-darkGrey bg-white p-6 dark:text-lightGrey dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6">Sign Up</h1>

          <Form className="space-y-4">
            <TextInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <TextInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
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
              Sign Up
            </button>
          </Form>
          <p className="body-lg text-mediumGrey dark:text-white">
            Already have an account?{' '}
            <Link
              to="/login"
              className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover"
            >
              Sign In
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
}
export default SignupForm;
