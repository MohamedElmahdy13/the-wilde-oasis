import { useRef, useEffect } from 'react';

export function useOutsideClick(handler, listerCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, listerCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listerCapturing);
    },
    [handler, listerCapturing]
  );

  return ref;
}
