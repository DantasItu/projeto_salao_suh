import React from "react";
import { Link } from "react-router-dom";

const SingleItem = ({ divStyle, image, name, description, price }) => {
  // transfromar o price em Valor monetário em real brasileiro
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className={divStyle}>
      <img
        src={image}
        alt="Imagem do serviço"
        className={`${divStyle}_image`}
      />
      <div className={`${divStyle}_texts`}>
        <div className={`${divStyle}_2lines`}>
          <h1>{name}</h1>
        </div>
        <p className={`${divStyle}_2lines_description`}>{description}</p>
        <p className={`${divStyle}_valor`}>{formattedPrice}</p>
      </div>
      <Link to="/" className={`${divStyle}_button`}>
        Agendar
      </Link>
    </div>
  );
};

export default SingleItem;
