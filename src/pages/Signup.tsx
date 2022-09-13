import SignupForm from '../features/users/SignupForm';

function Signup() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-white dark:bg-veryDarkGrey">
      <svg
        width="24"
        height="25"
        fill="#635FC7"
        fillRule="evenodd"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect width="6" height="25" rx="2" />
          <rect opacity=".75" x="9" width="6" height="25" rx="2" />
          <rect opacity=".5" x="18" width="6" height="25" rx="2" />
        </g>
      </svg>
      <SignupForm />
    </div>
  );
}
export default Signup;
