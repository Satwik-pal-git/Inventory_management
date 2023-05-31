import React, {useState} from 'react';
import "./InputLabel.css";
import "./EditStock.css";
import Axios from "axios";

const BASE_URL="https://inventory-management-backend-nine.vercel.app/";
const LOCAL_URL="http://localhost:5000";


const EditStock = ({closeStockModal, stockData})=> {
    const [stockQty, setStockQty] = useState();
    const [editedData, setEditedData] = useState(stockData);

    const handleInputChange = (e) => {
        setStockQty(e.target.value);
    };
    const closeModal = () => {
        closeStockModal();
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            editedData.openingStock= stockQty;
            // setEditedData({...editedData, [editedData.openingStock]:stockQty});
            await Axios.post(BASE_URL, editedData, {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            });
            setEditedData({});
            closeStockModal();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="EditModal">
            <form className="formToEdit" onSubmit={submitHandler}>
                <div className="headtxt">
                    <h3>Adjust Stock Quantity</h3>
                    <hr className="abcd"/>
                </div>
                <div className="Stockbody">
                        <div className="stock_items"><span>Item Name:</span> {editedData.itemName}</div>
                        <div className="stock_items"><span>Current Stock:</span> {editedData.openingStock + " " + editedData.unit}</div>
                        <div className="final_val"><div> <br /> Final Stock: {stockQty}</div>
                        <div className="gcp-input-container">
                            <input type="number" className="gcp-input" name="openingStock" value={stockQty} onChange={handleInputChange} required />
                            <label className="gcp-label">Adjust Stock</label>
                        </div>
                    </div>
                    <div className="stock_buttons">
                        <button className="cancel_stock" onClick={closeModal}> CANCEL</button>
                        <button className="edit_stock" type="submit" >EDIT</button>
                    </div>                    
                </div>
            </form>
        </div>
    );
}
export default EditStock;