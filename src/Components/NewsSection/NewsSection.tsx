// src/components/NewsSection.tsx
import React from "react";
import { NewsArticlesGet } from "../../Models/NewsArticle";

interface NewsSectionProps {
  newsArticles: NewsArticlesGet[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ newsArticles }) => {
  return (
    <section className="text-gray-600 body-font shadow-xl dark:shadow-gray-700 bg-[#f8f4e1] dark:bg-gray-900 !bg-opacity-90 rounded-lg">
      <div className="container px-5 py-24 mx-auto">
        <h2 className="text-3xl font-semibold title-font mb-12 text-gray-900 dark:text-white text-center">
          Latest Market News
        </h2>
        <div className="flex flex-wrap -m-4">
          {newsArticles.map((article) => (
            <div key={article.id} className="p-4 md:w-1/3">
              <div className="h-full bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                {article.image && (
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={article.image}
                    alt={article.title}
                  />
                )}
                <div className="p-6">
                  <h3 className="title-font text-lg font-medium text-gray-900 dark:text-white mb-3">
                    {article.title}
                  </h3>
                  <p className="leading-relaxed mb-3 text-gray-700 dark:text-gray-300">
                    {article.text.substring(0, 100)}...
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-600 dark:text-gray-400 ml-auto">
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
