import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.user);

  return (
    <header className="flex items-center justify-between py-2 md:py-2 px-4 md:px-8 bg-slate-300 shadow-md">
      <Link to="/">
        <h1 className="uppercase font-medium md:font-bold text-base md:text-xl text-stone-900 flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11358/11358315.png"
            className="w-10 h-14 opacity-70"
          />
          <span>viprops</span>
        </h1>
      </Link>
      <form className="bg-slate-50 py-1 md:py-2 px-2 md:px-4 rounded-lg w-32 md:w-80 text-sm md:text-base">
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none"
        />
      </form>
      <div className="flex md:space-x-12 md:font-medium items-center">
        <Link
          to="/"
          className="hidden md:inline text-slate-600 hover:cursor-pointer hover:text-slate-900"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hidden md:inline text-slate-600 hover:cursor-pointer hover:text-slate-900"
        >
          About
        </Link>
        <Link
          to="/profile"
          className="inline text-slate-600 hover:cursor-pointer hover:text-slate-900"
        >
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt="User Profile"
              className="rounded-full w-10"
            />
          ) : (
            <span>Sign In</span>
          )}
        </Link>
      </div>
    </header>
  );
}
