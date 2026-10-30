import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const timer = window.setTimeout(
      () =>
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({
            behavior: "auto",
            block: "start",
            inline: "nearest",
          }),
      150,
    );
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
