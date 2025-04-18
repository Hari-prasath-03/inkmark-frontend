import { Outlet, useOutletContext } from "react-router-dom";
import { OutletContextType } from "./RootLayout";

const MarkDownLayout = () => {
  const { openAuthLay } = useOutletContext<OutletContextType>();

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Outlet context={{ openAuthLay }} />
    </main>
  );
};

export default MarkDownLayout;
