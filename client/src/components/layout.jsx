import { Outlet } from "react-router";
import Header from "./header";
const Layout = () => {
  return (
    <div className="bg-[radial-gradient(circle_at_bottom,_rgba(33,47,87,0.9)_0%,_rgba(0,0,0,1)_60%)]  max-h-full h-dvh w-dvw">
      <div className="h-[20%]">
        <Header />
      </div>
      <div className="flex flex-row justify-center items-start h-[65%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
