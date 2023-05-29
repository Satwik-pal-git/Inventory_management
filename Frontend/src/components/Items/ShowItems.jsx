import React, {useState, useEffect} from "react";
import "./ShowItem.css";
import Axios from "axios";

const BASE_URL="https://inventory-management-backend-nine.vercel.app/";

// const tableData=[
//   { id:1, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:2, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:3, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:4, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:5, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:6, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:7, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:8, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
//   { id:9, checked: false, itemName: "Warree", itemCode:506 , Category: "Panel", stockQty: "40 Unit", stockHold:"0 Unit", stockValue: 0, purchasePrice:0 },
// ];

const ShowItems=({showModal})=>{
  const [data, setData]= useState([]);  
  
  useEffect(()=>{
    Axios.get(`${BASE_URL}`).then((response)=>{
      setData(response.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[]);

  const [checkboxes, setCheckboxes] = useState(data);
  // const [checkboxAll, setcheckboxAll] = useState(false);
  // const handleAllCheckboxChange= ()=>{
  // };

    const calc = (num1, num2) => {
      return num1 * num2;
    };
    
  const handleCheckboxChange = (id) => {
    const updatedCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      }
      return checkbox;
    });
    setCheckboxes(updatedCheckboxes);
  };

    return (
  <table className="Table">
    <thead className="header">
      <tr>
        <th>
          <div className="allcheck_box">
          {/* <input
            type="checkbox"
            checked={checkboxAll}
            onChange={() => handleAllCheckboxChange()}
          /> */}
          </div>
        </th>
        <th>Item Name</th>
        <th>Item Code</th>
        <th>Category</th>
        <th>Stock Qantity</th>
        <th>Stock on Hold</th>
        <th>Stock Value</th>
        <th>Purchase Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody className="Body">
      {/* Table rows */}
      {data.map((element)=>(
        <tr key={element.id}>
        <td>
          <div>
          <input
            type="checkbox"
            checked={element.checked}
            onChange={() => handleCheckboxChange(element.id)}
          />
          </div>
        </td>
        <td >{element.itemName}</td>
        <td>{element.itemCode}</td>
        <td>{element.category}</td>
        <td>{element.openingStock+" "+element.unit}</td>
        <td>{element.stockHold}</td>
        <td>{`${calc(element.purchasePrice,element.openingStock)}`}</td>
        <td>{element.purchasePrice}</td>
        <td>
          <div className="adjust">
            <button onClick={showModal}> &nbsp; ADJUST STOCK &nbsp;</button>
          </div>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
    );
}

export default ShowItems;