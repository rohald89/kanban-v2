import { useState } from 'react';

function NewTaskButton() {
  const [openTaskModal, setOpenTaskModal] = useState(false);

  return (
    <button
      type="button"
      className="btn btn__primary px-5 flex justify-center items-center md:btn-lg"
    >
      <svg
        fill="#FFF"
        width="12"
        height="12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
      </svg>{' '}
      <span className="hidden md:inline-block md:ml-2">Add New Task</span>
    </button>
  );
}

export default NewTaskButton;
