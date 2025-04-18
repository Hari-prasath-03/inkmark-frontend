import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import usePopupBackDrop from "../hooks/usePopupBackdrop";
import SideBar from "../components/ui/SideBar";
import Auth from "../pages/Auth";

export type OutletContextType = {
  openAuthLay: () => void;
}

const RootLayout = () => {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const {
    BackDrop: AuthBackDrop,
    openPopup: openAuthLay,
    closePopup: closeAuthLay,
  } = usePopupBackDrop({ animate: false });

  useEffect(() => {
    (function () {
      const sidebarWidth = sidebarRef.current?.clientWidth;
      const root = document.getElementById("sidebar");
      root?.setAttribute("style", `margin-left: ${sidebarWidth}px`);
    })();
  }, []);

  return (
    <>
      <div>
        <SideBar openAuth={openAuthLay} ref={sidebarRef} />
        <section id="sidebar">
          <Outlet context={{ openAuthLay }} />
        </section>
      </div>
      <AuthBackDrop>
        <Auth closeAuthLay={closeAuthLay} />
      </AuthBackDrop>
    </>
  );
};

export default RootLayout;
