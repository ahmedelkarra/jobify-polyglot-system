'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/redux/store";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "@/redux/userSlice";
import { changeStatus } from "@/redux/statusSlice";

const inter = Inter({ subsets: ["latin"] });



const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.status)

  
  useEffect(() => {
    dispatch(fetchUserInfo() as any)
    dispatch(changeStatus(false))
  }, [status?.isChange]);

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
