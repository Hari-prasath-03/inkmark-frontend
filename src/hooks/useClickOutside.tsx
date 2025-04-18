import { RefObject, useCallback, useEffect } from "react";

const useClickOutside = ({
  ref,
  handler,
}: {
  ref: RefObject<HTMLElement>;
  handler: (event: MouseEvent) => void;
}) => {
  const listener = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler(e);
    },
    [handler, ref]
  );

  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [ref, handler, listener]);
};

export default useClickOutside;
