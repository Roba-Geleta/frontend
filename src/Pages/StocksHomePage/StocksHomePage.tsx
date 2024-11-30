import React, { useEffect, useState } from "react";
import { NewsGetAPI } from "../../Services/NewsService/NewsService";
import { NewsArticlesGet } from "../../Models/NewsArticle";
import HeroSection from "../../Components/HeroSection/HeroSection";
import NewsSection from "../../Components/NewsSection/NewsSection";
import GetStartedSection from "../../Components/GetStartedSection/GetStartedSection";
import { useAuth } from "../../Context/userAuth";
import FeaturesSection from "../../Components/FeatureSection/FeatureSection";
import { BeatLoader } from "react-spinners";
import usePageMeta from "../../hooks/usePageMeta/usePageMeta";
import FIPLogoIconDark from "../../assets/FIPLogoIconDark.svg";

const StocksHomePage: React.FC = () => {
  usePageMeta({
    title: "FIP - Home",
    favicon: FIPLogoIconDark,
  });
  const { isLoggedIn } = useAuth();
  const [newsArticles, setNewsArticles] = useState<NewsArticlesGet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch news articles
    const fetchNews = async () => {
      const response = await NewsGetAPI();
      if (response && response.data) {
        setNewsArticles(response.data);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div id="Home" className="min-h-screen space-y-3  bg-opacity-45 rounded-lg">
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeaturesSection />
      {!isLoggedIn && <GetStartedSection />}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-700 dark:text-gray-300">
            Loading news <BeatLoader color="gray" />
          </p>
        </div>
      ) : (
        <NewsSection newsArticles={newsArticles} />
      )}
    </div>
  );
};

export default StocksHomePage;
