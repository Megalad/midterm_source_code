/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */
  

  //Validaing the data
  const errorChecking=(itemName,itemCateogry,itemPrice)=>{
    if(itemName=="")
    {
      setErrorMsg("Item Name must not be empty!")
      return false;
    }
    else if(itemCateogry=="")
    {
      setErrorMsg("Please select a category")
      return false;

    }
    else if(itemPrice<=0)
    {
      setErrorMsg("Price must not be less than 0")
      return false;

    }
    setErrorMsg("");
    return true;
  }

  //Delete items for delete icons
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  //Replacing icons with category
  const changeCategoryIcon=(category)=>{
    if(category=="Stationery")
    {
      return stationaryLogo;
    }
    else if(category=="Kitchenware"){
      return kitchenwareLogo;
    }
    else if(category=="Appliance")
    {
      return applianceLogo;
    }
  };

  //Adding new items
  const addItem=()=>{
    const nameValue = itemName.current.value;

    if (!errorChecking(nameValue, itemCategory, itemPrice)) {
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].name.toLowerCase() === nameValue.toLowerCase()) {
        setErrorMsg("Item name already exists!");
        return;
      }
    }

    const newItem = {
      id: items.length + 1,
      name: nameValue,
      category: itemCategory,
      price: Number(itemPrice)
    };

    //just combineing with the existing data
    setItems([...items, newItem]);

    itemName.current.value = "";
    setItemCategory("");
    setItemPrice("");
  };


  const [items, setItems] = useState([
    { id: 1, name: "Color Pencil 24", category: "Stationery", price: 11.99 },
    { id: 2, name: "Small Kitty Lamp", category: "Kitchenware", price: 44.88 },
    { id: 3, name: "Knife Set 4pcs", category: "Appliance", price: 23.11 }]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  //TODO: Your code goes here
  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              
              /*
              * TODO: Your code goes here
              * !!! IMPORTANT !!!
              * - All items must be listed here (above the form row).
              * - Your input form must be implemented as the LAST row in this table.
              */
             items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={changeCategoryIcon(item.category)} alt="" className="categoryIcon" />
                </td>
                <td>{item.price}</td>

                <td>
                  <img src={deleteLogo} alt="Delete" className="delete-btn" onClick={() => handleDelete(item.id)}/>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td><input type="text" name="itemName" ref={itemName} /></td>
              <td>
                <select name="itemCategory" id="" value={itemCategory} onChange={(e) => setItemCategory(e.target.value)}>
                  <option value=""></option>
                  <option value="Stationery">Stationery</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
                
              </td>
              <td>
                <input type="number" name="itemPrice" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} min={0}/>
              </td>
              <td>
                <button className="addBtn" onClick={addItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         {
          /* You MUST display the errorMsg state here. */
         }
         {/* <p className="error">{errorMsg} /p> */}
          <p className="error">{errorMsg}</p>
      </div>
    </>
  );
}

export default ItemManager