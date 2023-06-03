import React, {useState, useEffect} from "react";
import "./ShowItem.css";
import EditItem from "./EditItem";
import EditStock from "./EditStock";
import Axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import PreLoader from "./Preloader";
// import {REACT_APP_URL} from "../../../.env";

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

const ShowItems=({buttonData})=>{
  const [data, setData]= useState([]);  
  const [Modal, setModal]= useState(false);
  const [stockModal, setStockModal]= useState(false);
  const [inventData, setInventData]= useState({});
  const [stockData, setStockData]= useState({});
  const [loading, setLoading] = useState(true);

  
  useEffect(()=>{
    Axios.get(process.env.REACT_APP_URL).then((response)=>{
      setData(response.data);
      setLoading(false);
    }).catch((error)=>{
      console.log(error);
    })
  },[data]);

  // const [checkboxAll, setcheckboxAll] = useState(false);
  // const handleAllCheckboxChange= ()=>{
  // };

    const calc = (num1, num2) => {
      return num1 * num2;
    };
    const handleEdit = (id)=>{
      setModal(true);
      const foundElement = data.find(item => item._id === id);
      setInventData(foundElement);
    };

    const handleStockEdit = (id)=>{
      setStockModal(true);
      const foundElement = data.find(item => item._id === id);
      setStockData(foundElement);
    };

    const closeModal = ()=>{
      setModal(false);
      setStockModal(false);
    };

    const handleCheckboxChange = (id) => {
      const updatedCheckboxes = data.map((checkbox) => {
        // console.log(checkbox);
        if (checkbox._id === id) {
          buttonData(id);
        }
      });
    // setCheckboxes(updatedCheckboxes);
    // console.log(checkboxes);
  };

    return (
      <>
      {loading && <PreLoader/>}
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
          <tr key={element._id}>
          <td>
            <div className="CheckBox">
            <input
              type="checkbox"
              checked={element.checked}
              onChange={() => handleCheckboxChange(element._id)}
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
          <td className="edit">
            <div className="editPen" onClick={()=> handleEdit(element._id)}>
              <MdModeEditOutline />
            </div>
            <div className="adjust">
              <button onClick={()=> handleStockEdit(element._id)}> &nbsp; ADJUST STOCK &nbsp;</button>
            </div>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
      {Modal && <EditItem closeModalEdit={closeModal} inventData={inventData}/>}
      {stockModal && <EditStock closeStockModal={closeModal} stockData={stockData}/>}
      </>
  
    );
}

export default ShowItems;