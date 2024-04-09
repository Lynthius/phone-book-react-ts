import { useRef } from "react";
import { useOnClickOutside } from "./test/useClickOutside";

type TestButtonProps = {
  children: React.ReactNode;
};

export const TestButton = ({ children }: TestButtonProps) => {
  const ref = useRef(null);

  const handleClickOutside = () => {
    console.log("clicked outside");
  };

  const handleClickInside = () => {
    console.log("clicked inside");
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <button ref={ref} onClick={handleClickInside} style={{ width: 200, height: 200, background: "black" }}>
      {children}
    </button>
  );
};
