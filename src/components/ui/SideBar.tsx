import { NavLink } from "react-router-dom";
import { forwardRef, MutableRefObject, ReactNode } from "react";

import { BsInfoCircle, BsMarkdown } from "react-icons/bs";
import { GoFileCode, GoHistory } from "react-icons/go";
import { GrStorage } from "react-icons/gr";
import { LuFileHeart } from "react-icons/lu";
import { TbTrash } from "react-icons/tb";
import { PiUserCircleCheck } from "react-icons/pi";

interface Link {
  text: string;
  to: string;
  icon: ReactNode;
  onClick?: () => void;
}

const SideBar = forwardRef<HTMLDivElement, { openAuth: () => void }>(
  ({ openAuth }, ref) => {
    const links: Link[] = [
      { text: "Markdown", to: "/md/create", icon: <BsMarkdown /> },
      { text: "My files", to: "/mine", icon: <GrStorage /> },
      { text: "Favorites", to: "/favorites", icon: <LuFileHeart /> },
      { text: "Trash", to: "/trash", icon: <TbTrash /> },
      { text: "History", to: "/history", icon: <GoHistory /> },
      {
        text: "Login/Register",
        to: "",
        icon: <PiUserCircleCheck />,
        onClick: openAuth,
      },
      { text: "About site", to: "/about", icon: <BsInfoCircle /> },
    ];

    return (
      <nav
        ref={ref as MutableRefObject<HTMLDivElement>}
        className="overflow-x-hidden fixed top-0 left-0 z-10 h-full transition-all duration-150 border-r"
      >
        <div className="flex flex-col h-full bg-neutral-50 px-2">
          <div className="bg-primary-600 mb-4 px-3.5 py-2.5 flex items-center gap-3 border-b text-xl">
            <a href="/" className="bg-indigo-600 text-white p-1.5 rounded">
              <GoFileCode className="size-7" />
            </a>
            <span className="font-outfit text-neutral-800 tracking-wide leading-5 mt-1">
              InkMark
              <span className="text-xs block text-neutral-500 tracking-normal font-anek">
                Make your md work easy
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {links.map(({ to, icon, text, onClick }, i) => (
              <div key={i} className="flex items-center gap-3">
                <NavLink
                  to={to !== "" ? to : "#"}
                  onClick={() => onClick && onClick()}
                  className={`${to !== "" ? "navlink" :""} relative flex gap-2 w-full items-center px-3 py-1.5 rounded-md font-anek text-base transition-colors duration-150 bg-indigo-50 hover:bg-indigo-200/70`}
                >
                  <span className="text-neutral-700">{icon}</span>
                  <span>{text}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </nav>
    );
  }
);

export default SideBar;
