"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import { appStore } from "@/redux/store";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Modal } from "@/Modal";
import { Loader } from "@/Loader";

const inter = Inter({ subsets: ["latin"] });

function LayoutContent({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage?.user) {
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: sessionStorage?.user } });
    }
  }, [dispatch]);

  const isLoggedIn = useSelector((state) => state?.appReducer?.isLoggedIn);
  const user = useSelector((state) => state?.appReducer?.user);
  const isShowModal = useSelector((state) => state?.appReducer?.isShowModal);
  const isShowLoader = useSelector((state) => state?.appReducer?.isShowLoader);

  const handleLogout = () => {
    const bool = confirm("Are you sure you want to logout?");
    if (bool) {
      sessionStorage.clear();
      dispatch({ type: "LOGIN", payload: { isLoggedIn: false, user: "" } });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <h3>{user}</h3>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
          {children}
        </div>
      ) : (
        <Login />
      )}
      {isShowModal && <Modal />}
      {isShowLoader && <Loader />}
    </>
  );
}

export default function LayoutWrapper({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appStore}>
          <LayoutContent>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
