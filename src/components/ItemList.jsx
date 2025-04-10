import React from "react";
import SingleItem from "./SingleItem";

const ItemList = ({ itemsArrays }) => {
  return (
    <>
      <div className="itemList_container">
        <div className="Lista de serviços">
          {itemsArrays
            .filter((curr) => curr.role === "services")
            .map((currObj) => (
              <SingleItem {...currObj} key={currObj.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
