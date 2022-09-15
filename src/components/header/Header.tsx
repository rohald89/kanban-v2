import { Link } from 'react-router-dom';
import Logo from './Logo';
import NewTaskButton from './NewTaskButton';

function Header() {
  return (
    <header className="p-4 h-[85px] flex bg-white justify-between items-center border-b border-lightGreyLine dark:bg-darkGrey dark:text-white dark:border-darkGreyLine">
      <div className="flex items-center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <NewTaskButton />
    </header>
  );
}
export default Header;
