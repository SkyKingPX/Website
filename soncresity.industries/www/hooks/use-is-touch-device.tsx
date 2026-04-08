import React, { useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    setIsTouch(mq.matches);
  }, []);

  return isTouch;
}