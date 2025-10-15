import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  MessageCircleMore,
  Heart,
  Camera,
  Settings,
  SearchIcon,
} from "lucide-react";
import { Search } from "../root/pages";
import CreatePost from "./CreatePostModal";
import SettingsModal from "./SettingsModal";
import Modal from "../utils/Modal";
import { useUserContext } from "../ProtectRoute";

// ? ----------------------- Sidebar component -----------------------------------------------

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModal] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    setIsOpen(true);
    setIsSearchOpen(!isSearchOpen);
  };

  const data = useUserContext();
  console.log(data);

  return (
    <div>
      {isCreatePostModalOpen && (
        <Modal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModal(false)}
          modalname="postModal"
        >
          <CreatePost />
        </Modal>
      )}
      {isSettingModalOpen && (
        <Modal
          isOpen={isSettingModalOpen}
          onClose={() => setIsSettingModalOpen(false)}
          modalname="settingsModal"
        >
          <SettingsModal />
        </Modal>
      )}
      <aside
        className={`fixed h-screen bg-black border-r border-primary p-3 z-30 overflow-hidden transform transition-all duration-500 ease-in-out ${
          isOpen ? "w-20" : "w-60"
        }`}
      >
        {isOpen ? (
          <img
            src="https://imgs.search.brave.com/mqTKZyhJeZU8sFb3-M3WuWPs5D5Y_u4Yz0PC2Y1qpHI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWRpZ2l0YWxhZ2Vu/Y3kuY29tLmF1L3dw/LWNvbnRlbnQvdXBs/b2Fkcy9uZXctSW5z/dGFncmFtLWxvZ28t/cG5nLWZ1bGwtY29s/b3VyLWdseXBoLW1l/ZGl1bS1zaXplLTQ1/MC1waXhlbHMucG5n"
            alt="insta"
            className="h-8 px-3 my-4"
          />
        ) : (
          <img
            src="../../../../src/assets/socialite-logo.png"
            alt=""
            className="h-12 px-1 my-4"
          />
        )}
        <ul>
          <li className=" rounded-md hover:bg-primary p-4 mt-8">
            <NavLink to={"/"} className="flex">
              <Home />
              {isOpen || <span className="ml-10 fixed text-lg">Home</span>}
            </NavLink>
          </li>
          <li className=" rounded-md hover:bg-primary p-4">
            <button className="text-white flex" onClick={handleSearch}>
              <SearchIcon />
              {isOpen || <span className="ml-10 fixed text-lg">Search</span>}
            </button>
          </li>
          <li className=" rounded-md hover:bg-primary p-4">
            <NavLink to={"/messages"} className="flex">
              <MessageCircleMore />
              {isOpen || <span className="ml-10 fixed text-lg">Messages</span>}
            </NavLink>
          </li>
          <li className=" rounded-md hover:bg-primary p-4">
            <NavLink to={"/liked-posts"} className="flex">
              <Heart />
              {isOpen || (
                <span className="ml-10 fixed text-lg">Liked Posts</span>
              )}
            </NavLink>
          </li>
          <li className=" rounded-md hover:bg-primary p-4">
            <button
              className="text-white flex"
              onClick={() => {
                setIsCreatePostModal(true);
              }}
            >
              <Camera />
              {isOpen || <span className="ml-10 fixed text-lg">Create</span>}
            </button>
          </li>
          <li
            className=" rounded-md hover:bg-primary p-4"
            onClick={() => setIsSettingModalOpen(true)}
          >
            <button className="text-white flex">
              <Settings />
              {isOpen || <span className="ml-10 fixed text-lg">Settings</span>}
            </button>
          </li>
          <li className=" rounded-md hover:bg-primary p-4">
            <Link to={`/profile/${data._id}`}>
              <div className="text-white flex">
                <img
                  src={data.avatar}
                  alt="p"
                  className="h-8 w-8 rounded-full object-cover"
                />
                {isOpen || (
                  <span className="ml-10 fixed text-lg">{data.username}</span>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </aside>
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 border-r border-primary bg-black shadow-md z-20 transform transition-all duration-500 ease-in-out ${
          isSearchOpen ? "translate-x-20" : "-translate-x-full"
        }`}
      >
        <Search />
      </div>
    </div>
  );
}

export default Sidebar;
