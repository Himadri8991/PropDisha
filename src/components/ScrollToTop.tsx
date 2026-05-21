import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Prevent the browser from retaining scroll position on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll to the top of the window on every route change and page load
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant to prevent jarring scroll animations on load
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
