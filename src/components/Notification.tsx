function Notification({ t, status, message }) {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      }
      ${ status === 'error' ? 'border-mainRed' : 'border-mainPurple'}
      flex space-x-6 bg-white dark:bg-darkGrey border rounded-[4px] p-4`}
    >
      <p className={`${ status === 'error' ? 'text-mainRed' : 'text-mainPurple'} capitalize dark:text-mainPurpleDark font-bold`}>
        {status}!
      </p>
      <p className="text-darkGrey dark:text-lightGrey">{message}</p>
    </div>
  );
}
export default Notification;
