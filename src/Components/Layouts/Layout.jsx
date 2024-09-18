import React, { useEffect } from "react";
import { useAppDispatch } from "@/redux/hook";
import { StoreToCookies } from "@/Utils/cookie";
import Header from "../Header/Header";
import '../../app/globals.css';
import { setUser, setUserLoading } from "@/redux/features/user/userSlice";
const Layout = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserLoading(true));
    dispatch(setUser(StoreToCookies.getUserFromCookie()));
    dispatch(setUserLoading(false));
  }, [dispatch]);
  return (
    <div>
      <Header />
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

export default Layout;
