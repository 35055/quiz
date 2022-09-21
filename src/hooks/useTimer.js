import { useEffect, useState } from "react";

const useTimer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [timer, setTimer] = useState(0);

  const start = () => {
    setIsCounting(true);
  };

  const stop = () => {
    setIsCounting(false);
    setTimer(0);
  };

  useEffect(() => {
    if (!isCounting) return;

    let timer = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isCounting]);

  return { timer, start, stop };
};

export default useTimer;
