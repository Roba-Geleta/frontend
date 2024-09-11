import React from "react";
import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({
  companyName,
  ticker,
  price,
}: Props): JSX.Element => {
  return (
    <div className="card">
      <img
        src="https://media.istockphoto.com/id/1370772148/photo/track-and-mountains-in-valle-del-lago-somiedo-nature-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=QJn62amhOddkJSbihcjWKHXShMAfcKM0hPN65aCloco="
        alt="Image"
      />
      <div className="details">
        <h1>
          {companyName} ({ticker})
        </h1>
        <p>${price}</p>
      </div>
      <p className="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
        velit, vulputate eu pharetra nec, mattis ac neque.
      </p>
    </div>
  );
};

export default Card;
