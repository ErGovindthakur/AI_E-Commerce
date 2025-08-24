import { useContext, useState } from "react";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3, HiX } from "react-icons/hi"; // Added for mobile hamburger menu
import { userDataContext } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // NEW state for mobile menu toggle
  const navigate = useNavigate();
  const {serverUrl} = useContext(authDataContext);
  const {userData} = useContext(userDataContext);

  const handleLogout = async() => {
     try {
          const res = await axios.post(`${serverUrl}/api/v1/auth/logout`,{},{withCredentials:true});

          console.log(res)
          toast.success(res.data.message);
          navigate("/login")
     } catch (err) {
          console.log(err.message);
          toast.error(err.message)
     }
  }

  return (
    <nav className="w-full shadow-md bg-white transition-all sticky top-0 z-50">
      {/* Main Container */}
      <div className="w-full py-4 px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-[#8200DB] cursor-pointer">
          Logo
        </div>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex gap-6">
          {/* Changed: used hidden md:flex -> hides on mobile, shows on medium+ screens */}
          <li className="text-[#8200DB] text-lg hover:underline cursor-pointer">
            Home
          </li>
          <li className="text-[#8200DB] text-lg hover:underline cursor-pointer">
            Collection
          </li>
          <li className="text-[#8200DB] text-lg hover:underline cursor-pointer">
            About
          </li>
          <li className="text-[#8200DB] text-lg hover:underline cursor-pointer">
            Contact
          </li>
        </ul>

        {/* Right side: Search, Profile, Cart */}
        <div className="flex items-center gap-5">
          {/* Search Toggle */}
          <div
            className="cursor-pointer"
            onClick={() => setShowSearch((search) => !search)}
          >
            {!showSearch ? (
              <IoSearchCircleOutline className="text-3xl md:text-4xl" />
            ) : (
              <IoSearchCircleSharp className="text-3xl md:text-4xl" />
            )}
          </div>

          {/* Profile Dropdown */}
          <div
            className="relative cursor-pointer"
            onClick={() => setShowProfile((prof) => !prof)}
          >
          {
               userData ? (<div className="text-white  text-2xl bg-[#8200DB] px-3 py-1 rounded-full align-middle">{userData.name.slice(0,1)}</div>) : (<FaUserCircle className="text-2xl md:text-3xl" />)
          }
            
            {showProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                {/* Changed: improved dropdown UI with spacing & hover */}
                <ul className="flex flex-col gap-2 text-gray-700">
                  <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                  <li className="px-4 py-1 hover:bg-gray-100 cursor-pointer">
                    About
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <FaShoppingCart className="text-2xl md:text-3xl cursor-pointer" />

          {/* Hamburger Menu (Mobile Only) */}
          <div className="md:hidden cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="w-full flex justify-center pb-3 px-4">
          <input
            className="w-full md:w-1/3 rounded-l-full px-4 py-2 border-[#8200DB] border-2 outline-none"
            type="text"
            placeholder="Search Here..."
          />
          <button className="bg-[#8200DB] text-white rounded-r-full px-4">
            <CiSearch className="text-xl" />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col gap-4 p-4 text-[#8200DB] text-lg">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Collection</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
