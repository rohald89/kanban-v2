import useWindowSize from "../../hooks/useWindowSize";
import ThemeToggle from "./ThemeToggle";

function Sidebar({ isSidebarOpen }) {
  const { width } = useWindowSize();
  if (width < 768) return null;
  return (
    <div
      className={`fixed h-full w-[300px] pb-28 flex flex-col items-start py-7 border-r bg-white  border-lightGreyLine dark:bg-darkGrey dark:border-darkGreyLine transition-all duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-[300px]'}`}
    >
      {/* <BoardContainer/> */}
            <ThemeToggle />
    </div>
  );
}
export default Sidebar;
