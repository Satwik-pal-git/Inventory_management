import React, {useState} from "react";
import './Item.css';
import Select from 'react-dropdown-select';
import AddItem from "./AddItem";
import ShowItems from "./ShowItems"


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

    const setModal = ()=>{
        setShowModal(true);
    };
    const closeModal = ()=>{
        setShowModal(false);
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
                    <div className="stock_item"><button className="delete"> DELETED SELECTED</button></div>
                    <div className="stock_item"><button className="add" onClick={setModal}> + &nbsp; ADD TO INVENTORY</button></div>
                    {/* <div className="stock_item"></div> */}
                </div>
            </div>
            <ShowItems/>
          </>
    );
}

export default Item;