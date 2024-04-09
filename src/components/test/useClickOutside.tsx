import { useEffect,RefObject,useCallback } from "react";

export const useOnClickOutside = (ref: RefObject<HTMLElement>, handler:(event:any)=>void ) => {
  const listener =useCallback((event:any) => {
    if (!ref.current || ref.current.contains(event.currentTarget)) {
      return;
    }
    handler(event);
  },[ref,handler]);

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [listener]);
};

