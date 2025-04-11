import React from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ itemsArrays, divStyle, items }) => {
  return (
    <>
      <div className="itemList_container">
        <div className="Lista de serviços">
          {itemsArrays
            .filter((curr) => curr.role === "services")
            .filter((curr, index) => index < items)
            .map((currObj, index) => (
              <SingleItem
                {...currObj}
                key={currObj.id}
                divStyle={divStyle}
                index={index}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
