import { useEffect } from "react";

interface PageMeta {
  title: string;
  favicon?: string;
}

const usePageMeta = ({ title, favicon }: PageMeta) => {
  useEffect(() => {
    document.title = title;

    if (favicon) {
      let link = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      if (link) {
        link.href = favicon;
      }
    }
  }, [title, favicon]);
};

export default usePageMeta;
