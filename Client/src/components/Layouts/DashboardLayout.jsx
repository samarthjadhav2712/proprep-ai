import React, {useContext} from "react";
import {UserContext} from "../../context/UserContext";
import Navbar from "./Navbar";
import { Toaster } from "sonner"; // Import the Toaster

const DashboardLayout = ({children}) => {
    const {user} = useContext(UserContext);
  return (
    <div>
      <Navbar/>
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
