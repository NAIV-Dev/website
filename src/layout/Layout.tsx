import type { HTMLAttributes } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { AxiosClient } from "../api-client/AxiosClient";
import { ToastProvider } from "@heroui/react";

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {}

export function Layout(props: LayoutProps) {
  return (
    <div 
      {...props}
      className={`dark min-h-screen flex flex-col ${props.className || ''}`}>
      <ToastProvider />
      <Header />
      { props.children }
      <Footer />
    </div>
  );
}
