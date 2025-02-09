import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Footer } from "@/layout/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}
