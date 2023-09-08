import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      MainPage
      <Outlet />
      Footer
    </>
  );
};

export default MainPage;
