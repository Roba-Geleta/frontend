import React from "react";

const PDFViewer: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <embed
        src="/research-paper.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default PDFViewer;
