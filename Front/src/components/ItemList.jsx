import React from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ itemsArrays, divStyle, items, typeItems }) => {
  return (
    <>
      <div className="itemList_container">
        <div className="Lista de serviços">
          {itemsArrays
            .filter((curr) => curr.role === `${typeItems}`)
            .filter((curr, index) => index < items)
            .map((currObj, index) => (
              <SingleItem
                {...currObj}
                key={currObj.id}
                divStyle={divStyle}
                index={index}
                view_button={true}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
