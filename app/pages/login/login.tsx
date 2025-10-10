import React from "react";
import Header from "~/component/Header";
import Footer from "~/component/Footer";
import LoginComponent from "~/component/login";


export default function Login() {
  return (
    <main className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-neutral-900 to-stone-800">
      <div className="snap-center">
        <Header />
      </div>

      <div className="snap-center">
        <LoginComponent />
      </div>

      <div className="snap-center">
        <Footer />
      </div>
    </main>
  );
}