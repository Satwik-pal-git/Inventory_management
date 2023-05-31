import React, {useState} from "react";
import './Item.css';
import Select from 'react-dropdown-select';
import AddItem from "./AddItem";
import { AiTwotoneDelete } from "react-icons/ai";
import ShowItems from "./ShowItems"
import Axios from "axios";

const BASE_URL="https://inventory-management-backend-nine.vercel.app/";
const LOCAL_URL="http://localhost:5000";

const options = [
    { 
        value: 1,
        label: "All        "
    },
    {
        value:  2,
        label: "Low stock"
    }
];

const Item = () => {
    const [item, setItem] = useState(options[0].label);
    const [showModal, setShowModal]= useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [deleteId, setDeleteId] = useState();

    const setModal = ()=>{
        setShowModal(true);
    };
    const closeModal = ()=>{
        setShowModal(false);
    };
    const handleDelete = async () => {
        if(deleteId!==undefined)
        {
            try {
                // console.log("in delete = ", deleteId);
                await Axios.post(BASE_URL, [deleteId], {
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                });
                setDisabledButton(true);
            } catch (error) {
                console.log("Error= ", error);   // Error=  TypeError: Cannot read properties of undefined (reading 'status')
            }
        }else{
            setDisabledButton(true);
        }
    };

    const handleDeleteButton = (data) =>{
        if(data!==undefined)
        {
            setDisabledButton(false);
            setDeleteId(data);
        }
    };

      return (
          <>
            <div className="Stock_filter">
                <div className="modal">
                    {showModal && <AddItem closeModal={closeModal}/>}
                </div>
                <div className="wrapper">
                    <div className="stock_item"><p>SHOW LOW STOCK</p></div>
                    <div className="stock_item">
                        <Select className="dropdown" placeholder="All         " options={options} value={item} onChange={(values) => setItem(values)} />
                    </div>
                    {/* <div className="stock_item">DELETE SELECTED BUTTON</div> */}
                    <div className="stock_item"><button className="delete" disabled={disabledButton} onClick={handleDelete}> <AiTwotoneDelete size={20} style={{ marginBottom: "-4px"}} /> DELETED SELECTED</button></div>
                    <div className="stock_item"><button className="add" onClick={setModal}> + &nbsp; ADD TO INVENTORY</button></div>
                    {/* <div className="stock_item"></div> */}
                </div>
            </div>
            <ShowItems buttonData={handleDeleteButton}/>
          </>
    );
}

export default Item;