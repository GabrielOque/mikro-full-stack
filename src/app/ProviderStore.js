"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export const ProviderStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
