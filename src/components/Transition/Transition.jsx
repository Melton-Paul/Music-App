import styles from "./Transition.module.css";
import React from "react";
import { useLocation } from "react-router";
import { Power4, gsap } from "gsap";

const Transition = ({ children }) => {
  const { pathname } = useLocation();
  const trans = React.useRef(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(trans.current, {
        x: 2600,
        opacity: 0,
        duration: 1.6,
        ease: Power4.easeOut,
      });
    }, trans);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={trans} className={styles["transition-effect"]}>
      {children}
    </div>
  );
};

export default Transition;
