/* eslint-disable react-hooks/exhaustive-deps */
import { FaXmark } from "react-icons/fa6";
import {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { debounce } from "../../utils";

interface MarkDownInputgroupProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  resetValue: () => void;
  className: string;
}

const MarkDownInputgroup: FC<MarkDownInputgroupProps> = memo(
  ({ value, setValue, className, resetValue }) => {
    const [localValue, setLocalValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    const debounceUpdate = useCallback(
      debounce((newFilename: string) => {
        setValue(newFilename);
      }, 300),
      [setValue]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        debounceUpdate(newValue);
      },
      [debounceUpdate]
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    return (
      <div className={className}>
        <input
          value={isFocused ? localValue : localValue && `${localValue}.md`}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-3 py-1 pb-1.5 min-w-56 font-anek text-gray-700 tracking-wide font-semibold text-sm rounded-br outline-none border-b focus:border-r border-transparent focus:border-indigo-300"
          placeholder="Enter the file name"
        />
        <FaXmark
          role="button"
          onClick={() => {
            resetValue();
            setLocalValue("");
          }}
          className="size-3 absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-700/70 cursor-pointer"
        />
      </div>
    );
  }
);

export default MarkDownInputgroup;
