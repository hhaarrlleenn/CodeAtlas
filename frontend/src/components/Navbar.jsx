import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="h-[108px] bg-[#1E293B] flex items-center justify-between px-12">
      <h1 className="text-white text-[40px] font-bold">
        CodeAtlas
      </h1>

      <div className="flex items-center gap-16">
        <Link
          to="/"
          className="text-white text-xl font-semibold hover:text-blue-400 transition"
        >
          Home
        </Link>

        <Link
          to="/upload"
          className="text-white text-xl font-semibold hover:text-blue-400 transition"
        >
          Upload
        </Link>

        <Link
          to="/about"
          className="text-white text-xl font-semibold hover:text-blue-400 transition"
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;