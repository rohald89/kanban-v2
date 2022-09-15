import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import SidebarToggle from './sidebar/SidebarToggle';

function DashboardLayout() {
  const { width } = useWindowSize();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main
          className={`transition duration-300 ${
            isSidebarOpen && width > 768
              ? 'translate-x-[300px]'
              : 'translate-x-0'
          }`}
        >
          <Outlet />
        </main>
        <SidebarToggle
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </>
  );
}

export default DashboardLayout;
