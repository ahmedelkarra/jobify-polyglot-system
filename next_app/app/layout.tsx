'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/redux/userSlice";

const inter = Inter({ subsets: ["latin"] });



const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.me);

  useEffect(() => {
    dispatch(fetchUserInfo() as any)
  }, [dispatch]);
  
  return (
    <>
      <html lang="en">
        <body className={`${inter.className} relative min-h-[100dvh]`}>
          <HeaderComponent />
          {children}
          <FooterComponent />
        </body>
      </html>
    </>
  );
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Layout>{children}</Layout>
    </Provider>
  );
}
