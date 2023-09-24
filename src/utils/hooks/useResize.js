import { useEffect, useCallback, useState } from 'react';

export function useResize() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);

  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleResize() {
      setScreenWidth(getScreenWidth());
    };

    window.addEventListener('resize', resizeController, false);

    let resizeTimer;

    function resizeController() {
      if (!resizeTimer) {
        resizeTimer = setTimeout(() => {
          resizeTimer = null;
          handleResize();
        }, 1000);
      }
    };

    return () => window.removeEventListener('resize', handleResize);
  }, [getScreenWidth]);

  return screenWidth;
}