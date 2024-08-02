import { useEffect, useRef } from "react";

export function useOutsideClick(handler, isOnlyCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // e.stopPropagation(); // prevents easy toggle from one menu to the next but allows for closing selected menu on double-click
          handler();
        }
      }

      document.addEventListener("click", handleClick, isOnlyCapturing);

      return () =>
        document.removeEventListener("click", handleClick, isOnlyCapturing);
    },
    [handler, isOnlyCapturing],
  );

  return ref;
}
