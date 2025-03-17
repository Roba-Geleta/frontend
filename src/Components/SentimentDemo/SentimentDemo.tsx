import React, { useState } from "react";
import { checkSentiment } from "../../api";
import { Slider, Typography, Button } from "@mui/material";
import { BeatLoader } from "react-spinners";

interface SentimentResult {
  score: number; // Range: [-1..+1]
  confidence: number; // Range: [0..1]
}

const SentimentDemo: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [error, setError] = useState<string>("");

  const MIN_CHARS = 50;
  const MAX_CHARS = 500;

  const handleCheckSentiment = async (): Promise<void> => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const response = await checkSentiment(text);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Error fetching sentiment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const normalizedScore = result ? ((result.score + 1) / 2) * 100 : 50;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-gray-800 dark:text-gray-200">
      <Typography variant="body1" gutterBottom>
        Sentiment Analysis Demo
      </Typography>

      <Typography className="!mb-4 !text-xs text-gray-500 dark:text-gray-400">
        <strong>Note:</strong> Made using a Support Vector Machine (SVM) model
        trained on <span className="italic">software/digital-software</span>{" "}
        product reviews. While capable of analyzing general text, it
        demonstrates optimal performance on software-related content. The model
        can be retrained with diverse datasets for broader domain expertise.
      </Typography>

      <div className="relative mb-4">
        <textarea
          className={`text-sm w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
            dark:bg-gray-900 dark:text-gray-100 transition-opacity duration-200
            ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100"}
            ${
              text.length > MAX_CHARS
                ? "border-red-500 dark:border-red-400"
                : ""
            }`}
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
          placeholder={`Enter your review (${MIN_CHARS}-${MAX_CHARS} characters)...`}
          rows={2}
          disabled={loading}
        />
        <div className="flex justify-between text-xs mt-1">
          <div className="text-left">Min {MIN_CHARS} characters</div>
          <div
            className={`text-right ${
              text.length > MAX_CHARS
                ? "text-red-500 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <span
              className={`${
                text.length < MIN_CHARS
                  ? "text-yellow-500 dark:text-yellow-400"
                  : ""
              }`}
            >
              {text.length}
            </span>
            /{MAX_CHARS} characters
          </div>
        </div>
      </div>

      <Button
        variant="contained"
        onClick={handleCheckSentiment}
        size="small"
        disabled={
          loading || text.trim().length < MIN_CHARS || text.length > MAX_CHARS
        }
        className={`!text-xs disabled:dark:!text-gray-50 disabled:!text-gray-800 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white
          ${
            text.trim().length < MIN_CHARS || text.length > MAX_CHARS
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
      >
        {loading ? (
          <span className="inline-flex items-center">
            Analyzing
            <BeatLoader size={5} color="white" className="mt-1" />
          </span>
        ) : (
          "Check Sentiment"
        )}
      </Button>

      {error && <p className="mt-2 text-red-500 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-4">
          {/* Score Section */}
          <Typography variant="subtitle2" gutterBottom>
            Sentiment Score
          </Typography>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">😡</span>
            <Slider
              value={normalizedScore}
              disabled
              sx={{
                width: "100%",
                "& .MuiSlider-track": {
                  background: "linear-gradient(to right, #f87171, #34d399)",
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#ccc",
                },
                "& .MuiSlider-thumb": {
                  width: 0,
                  height: 0,
                  border: "20px solid transparent",
                  borderBottomColor: "#1976d2", // Material UI primary color
                  borderRadius: 10,
                  transform: "rotate(180deg) translateY(20px) translateX(23px)",
                  backgroundColor: "transparent",
                  "&:hover": {
                    boxShadow: "none",
                  },
                  "&::before": {
                    display: "none",
                  },
                },
              }}
            />
            <span className="text-2xl">😊</span>
          </div>
          <div className="text-xs">
            Model Confidence ({(result.confidence * 100).toFixed(3)}%)
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentDemo;
