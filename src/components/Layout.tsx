import type { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className=" bg-gradient-to-br from-zinc-950 to-stone-950 text-white">
      <Header />
      <main className="min-h-screen mx-auto py-8 container px-4 max-w-7xl sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-5 supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="container max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 text-center text-gray-400">
          <p>Made with 💗 by Gaurav</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
