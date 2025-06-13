import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default Layout;