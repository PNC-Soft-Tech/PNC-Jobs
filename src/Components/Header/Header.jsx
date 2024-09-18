import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { StoreToCookies } from "@/Utils/cookie";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('isLoading: ', isLoading)
    if (!isLoading) {
      console.log('user: ', user)
    }
  }, [user, isLoading])
  const handleLogoutAction = async () => {
    StoreToCookies.removeUser();
    dispatch(setUser(null));
  }
  return (
    <div className="bg-slate-500">
      <div className="max-w-pnc mx-auto py-4  text-white flex flex-row items-center justify-between">
        <div className="logo">PNC Jobs</div>
        <div className="menu">
          <ul className="flex flex-row items-center justify-between">
            <li className="mr-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mr-4">
              <Link href="#">Home</Link>
            </li>
            <li className="mr-4">
              <Link href="/contests">Contests</Link>
            </li>
            <li className="mr-4">
              <Link href="/models">Model Tests</Link>
            </li>
            <li className="mr-4">
              <Link href="/archieves">Archinves</Link>
            </li>
            <li className="mr-4">
              <Link href="/schedules">Schedule</Link>
            </li>
            <li className="mr-4">
              <Link href="/circulars">Circulars</Link>
            </li>
            <li className="mr-4">
              <Link href="/about-us">About</Link>
            </li>
            <li className="mr-4">
              <Link href="contact-us">Contact</Link>
            </li>
          </ul>

        </div>
        <ul className="flex flex-row items-center justify-between space-x-2">
          {!isLoading && user && user.user ? (
            <>
              <li>Welcome <strong>{user.user.fname}</strong></li>
              <li>
                <button
                  className="px-4  py-2 rounded-md  bg-black text-white text-center"
                  onClick={handleLogoutAction}
                >Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><button className="px-4  py-2 rounded-md  bg-black text-white text-center"><Link href='/login'>Login</Link></button></li>
              <li><button className="px-4  py-2 rounded-md  bg-black text-white text-center"><Link href='/register'>Register</Link></button></li>
            </>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Header;
