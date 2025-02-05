import { Link } from "react-router-dom";
import cloudLogo from "../../public/cloudlogo.svg";

const Header = () => {
  return (
    <header className="w-full flex justify-center sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur py-1 supports-[backdrop-filter]:bg-zinc-950/60 ">
      <div className="container mx-auto flex items-center justify-between  max-w-7xl sm:px-6 lg:px-8">
        <Link to="/">
          <img src={cloudLogo} alt="logo" className="h-12 " />
        </Link>

        <div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
