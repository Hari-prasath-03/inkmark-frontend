import clsx from "clsx";
import { motion } from "framer-motion";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  memo,
  ReactNode,
  KeyboardEvent,
} from "react";

import useClickOutside from "../../hooks/useClickOutside";
import { FaAngleUp } from "react-icons/fa";

interface SelectContextProps {
  onSelect: (value: string | null) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  optionsCount: number;
  setOptionsCount: React.Dispatch<React.SetStateAction<number>>;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
};

interface SelectProps {
  children: ReactNode;
  onSelect?: (value: string | null) => void;
  className?: string;
}

const Select: React.FC<SelectProps> & {
  Button: React.FC<SelectButtonProps>;
  List: React.FC<SelectListProps>;
  Option: React.FC<SelectOptionProps>;
} = ({ children, onSelect = () => {}, className, ...props }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [optionsCount, setOptionsCount] = useState(0);
  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  useClickOutside({ ref: selectRef, handler: () => setIsOpen(false) });

  const contextValue = useMemo(
    () => ({
      onSelect,
      isOpen,
      setIsOpen,
      selectedItem,
      setSelectedItem,
      focusedIndex,
      setFocusedIndex,
      optionsCount,
      setOptionsCount,
    }),
    [onSelect, isOpen, selectedItem, focusedIndex, optionsCount]
  );

  return (
    <div
      ref={selectRef}
      className={clsx(
        "relative h-fit bg-neutral-50 text-neutral-600",
        isOpen ? "rounded-t" : "rounded",
        className
      )}
      {...props}
    >
      <SelectContext.Provider value={contextValue}>
        {children}
      </SelectContext.Provider>
    </div>
  );
};

interface SelectButtonProps {
  className?: string;
  defaultValue?: string;
}

Select.Button = memo(function SelectButton({
  className,
  defaultValue,
}: SelectButtonProps) {
  const { setIsOpen, selectedItem, isOpen, setFocusedIndex, optionsCount } =
    useSelectContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const { key } = e;
      if (key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((pv) => (pv + 1) % optionsCount);
      } else if (key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((pv) => (pv + optionsCount - 1) % optionsCount);
      } else if (key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    },
    [optionsCount, setFocusedIndex, setIsOpen]
  );

  return (
    <button
      onClick={() => setIsOpen((pv) => !pv)}
      onKeyDown={handleKeyDown}
      className={clsx(
        "w-full px-4 py-1.5 text-left hover:bg-neutral-100 border shadow-1 rounded inline-flex gap-6 font-semibold items-center justify-between",
        className
      )}
      type="button"
      aria-expanded={isOpen}
    >
      {selectedItem || defaultValue || "Select"}
      <FaAngleUp
        className={clsx(
          "text-gray-700 transform duration-150",
          isOpen ? " rotate-0" : "rotate-180"
        )}
      />
    </button>
  );
});

interface SelectListProps {
  children: ReactNode;
  className?: string;
}

Select.List = memo(function SelectList({
  children,
  className,
}: SelectListProps) {
  const { isOpen, setOptionsCount, focusedIndex, setSelectedItem, onSelect } =
    useSelectContext();

  useEffect(() => {
    const count = React.Children.count(children);
    setOptionsCount(count);
  }, [children, setOptionsCount]);

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter" && focusedIndex >= 0) {
        const focusedChild = React.Children.toArray(children)[focusedIndex];
        const value = (focusedChild as React.ReactElement).props.value;
        setSelectedItem(value);
        if (onSelect) onSelect(value);
      }
    },
    [focusedIndex, children, onSelect, setSelectedItem]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as EventListener);
    return () =>
      document.removeEventListener("keydown", handleKeyDown as EventListener);
  }, [handleKeyDown]);

  if (!isOpen) return null;
  return (
    <motion.ul
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={clsx(
        "absolute z-10 w-full custom-scrollbar bg-inherit rounded-b shadow-2 max-h-48 overflow-auto first:border-0",
        className
      )}
    >
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child as React.ReactElement, {
          i,
          focused: i === focusedIndex,
        })
      )}
    </motion.ul>
  );
});

interface SelectOptionProps {
  children: ReactNode;
  className?: string;
  value: string;
  focused?: boolean;
  i?: number;
}

Select.Option = memo(function SelectOption({
  children,
  className,
  value,
  focused,
  i,
}: SelectOptionProps) {
  const { onSelect, setIsOpen, setSelectedItem, setFocusedIndex } =
    useSelectContext();

  const optionRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (focused && optionRef.current) {
      optionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focused]);

  const handleSelect = () => {
    setSelectedItem(value);
    setFocusedIndex(i ?? -1);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" && focused) handleSelect();
  };

  return (
    <li
      ref={optionRef}
      className={clsx(
        "px-4 py-1.5 hover:bg-neutral-200 cursor-pointer border-t",
        className,
        focused && "bg-neutral-300"
      )}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="option"
      tabIndex={0}
    >
      {children}
    </li>
  );
});

export default Select;
