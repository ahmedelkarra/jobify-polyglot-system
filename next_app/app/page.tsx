'use client'
import HomePage from "@/pages/HomePage";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
