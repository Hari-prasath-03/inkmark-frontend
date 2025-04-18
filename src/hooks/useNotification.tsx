import clsx from "clsx";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FiCheckSquare, FiX } from "react-icons/fi";
import { BiError, BiInfoSquare } from "react-icons/bi";
import { LuMessageCircleWarning } from "react-icons/lu";

type position = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type notyfType = "success" | "error" | "info" | "warning";

interface Notification {
  id: number;
  message: string;
  type: notyfType;
}

interface NotificationProps {
  message: string;
  id: number;
  ttl: number;
  position: string;
  type: notyfType;
  removeNotif: (id: number) => void;
}

const positions = {
  "top-right": "top-2 right-2 flex-col",
  "top-left": "top-2 left-2 flex-col",
  "bottom-right": "bottom-2 right-2 flex-col-reverse",
  "bottom-left": "bottom-2 left-2 flex-col-reverse",
};

const typeStyles = {
  success: { color: "bg-green-500", icon: <FiCheckSquare /> },
  error: { color: "bg-red-500", icon: <BiError /> },
  info: { color: "bg-blue-500", icon: <BiInfoSquare /> },
  warning: { color: "bg-yellow-400", icon: <LuMessageCircleWarning /> },
};

const useNotification = ({
  position = "top-right",
  ttl = 5000,
}: {
  position: position;
  ttl: number;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback(
    ({ message, type }: { message: string; type: notyfType }) =>
      setNotifications((pv) => [{ id: Date.now(), message, type }, ...pv]),
    []
  );

  const removeNotif = useCallback(
    (id: number) => setNotifications((pv) => pv.filter((n) => n.id !== id)),
    []
  );

  const container = () => (
    <div
      className={clsx(
        "flex gap-1 w-60 sm:w-72 fixed z-30",
        positions[position]
      )}
    >
      <AnimatePresence>
        {notifications.map((n) => (
          <Notification
            ttl={ttl}
            position={position}
            removeNotif={removeNotif}
            {...n}
            key={n.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );

  return { notify, NotificationContainer: container };
};

/* ====================================================================================================== */

// eslint-disable-next-line react-refresh/only-export-components
const Notification: FC<NotificationProps> = memo(
  ({ message, id, type, removeNotif, ttl, position }) => {
    useEffect(() => {
      const timerRef = setTimeout(() => {
        removeNotif(id);
      }, ttl);

      return () => clearTimeout(timerRef);
    }, [id, removeNotif, ttl]);

    const directionToFadeOut = position.split("-")[1];

    return (
      <motion.div
        layout
        layoutId={id.toString()}
        initial={{ y: -15, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{
          x: directionToFadeOut === "right" ? "100%" : "-100%",
          opacity: 0,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={clsx(
          "p-2 px-4 flex items-center rounded gap-2 text-sm font-medium shadow-lg text-white",
          typeStyles[type].color
        )}
      >
        {typeStyles[type].icon}
        <span>{message}</span>
        <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
          <FiX className="size-5" />
        </button>
      </motion.div>
    );
  }
);

Notification.displayName = "Notification";

export default useNotification;
