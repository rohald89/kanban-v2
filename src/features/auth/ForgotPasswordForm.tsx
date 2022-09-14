import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/TextInput';
import { useForgotPasswordMutation } from './authApiSlice';

function ForgotPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  return (
    <Formik
      initialValues={{
        emailAddress: '',
      }}
      onSubmit={ async (values) => {
        console.log(values);
        try {
          await forgotPassword(values).unwrap();
          navigate('/login');
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <div className="max-w-lg w-11/12 rounded-[4px] text-darkGrey bg-white p-6 dark:text-lightGrey dark:bg-darkGrey md:p-8">
          <h1 className="heading-lg mb-6">Forgot Password</h1>

          <Form className="space-y-4">
            <TextInput
              label="Email"
              name="emailAddress"
              type="email"
              placeholder="Email"
            />

            <button
              type="submit"
              className="mt-6 w-full bg-mainPurple text-white text-base rounded-full p-2 transition duration-200 hover:bg-mainPurpleHover"
            >
              Reset Password
            </button>
          </Form>
          <p className="body-lg mt-6 text-mediumGrey dark:text-white">Remember your password? <Link to="/signup" className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover">Sign In</Link></p>
          <p className="body-lg text-mediumGrey dark:text-white">Don't have an account yet? <Link to="/signup" className="ml-2 text-mainPurple font-bold hover:text-mainPurpleHover">Sign Up</Link></p>
        </div>
      )}
    </Formik>
  );
}
export default ForgotPasswordForm;
