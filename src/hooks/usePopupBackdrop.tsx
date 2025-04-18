import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { FC, ReactNode, useCallback, useState } from "react";

import { IoCloseOutline } from "react-icons/io5";

interface BackDropProps {
  showCloseBtn: boolean;
  closeWithBackDrop: boolean;
  children: ReactNode;
  closePopup?: () => void;
  animate?: boolean;
}

const usePopupBackDrop = ({
  showCloseBtn = false,
  closeWithBackDrop = true,
  animate = true,
}: {
  showCloseBtn?: boolean;
  closeWithBackDrop?: boolean;
  animate?: boolean;
} = {}) => {
  const [isPopupOpen, setPopupIsOpen] = useState<boolean>(false);

  const openPopup = useCallback(() => {
    setPopupIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closePopup = useCallback(() => {
    setPopupIsOpen(false);
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "auto" : "";
  }, []);

  const BackDropWrapper = ({ children }: { children: ReactNode }) => (
    <AnimatePresence>
      {isPopupOpen && (
        <BackDrop
          showCloseBtn={showCloseBtn}
          closeWithBackDrop={closeWithBackDrop}
          closePopup={closePopup}
          animate={animate}
        >
          {children}
        </BackDrop>
      )}
    </AnimatePresence>
  );

  return { BackDrop: BackDropWrapper, openPopup, closePopup };
};

export default usePopupBackDrop;

/* ====================================================================================================== */

// eslint-disable-next-line react-refresh/only-export-components
const BackDrop: FC<BackDropProps> = ({
  showCloseBtn,
  closeWithBackDrop,
  children,
  closePopup,
  animate,
}) => (
  <motion.div
    className={clsx(
      "popup fixed z-[49] top-0 left-0 h-full w-full bg-black/60 flex justify-center items-center",
      closeWithBackDrop && "cursor-pointer"
    )}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={closeWithBackDrop ? closePopup : undefined}
  >
    <motion.div
      className="px-3 cursor-auto"
      onClick={(e) => e.stopPropagation()}
      animate={animate ? { y: [-35, 0], opacity: [0.1, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>

    <motion.div
      animate={{ x: [250, 0], opacity: [0.3, 1] }}
      onClick={closePopup}
      className={clsx(`absolute top-6 right-6
        md:top-1/2 md:right-[20%] z-50 rounded-full bg-gray-500 p-1 cursor-pointer ${
          showCloseBtn ? "" : "hidden"
        }`)}
    >
      <IoCloseOutline className="size-10 sm:size-12 text-white" />
    </motion.div>
  </motion.div>
);
