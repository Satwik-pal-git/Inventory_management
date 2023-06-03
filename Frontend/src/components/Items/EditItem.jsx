import React, {useState} from "react";
import "./AddItem.css";
import "./InputLabel.css";
import Axios from "axios";
import { SlClose } from "react-icons/sl";
import PreLoader from "./Preloader";

const AddItem = ({closeModalEdit, inventData})=>{
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const preLaoder= () => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 9000);
    };

    // console.log("in editItem=, ", inventData);
    const [formData, setFormData] = useState({
        img: inventData.img,
        itemName: inventData.itemName,
        category: inventData.category,
        itemCode: inventData.itemCode,
        itemDescription: inventData.itemDescription,
        unit: inventData.unit,
        openingStock: inventData.openingStock,
        date: inventData.date,
        purchasePrice: inventData.purchasePrice,
        tax: inventData.tax,
      });
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setFormData({...formData, img: file});
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log("invent= ", inventData);
            const newData = {...formData, itemId: inventData._id}; 
            // setFormData({...formData, itemId: inventData._id});
            // console.log(newData);
            // console.log("in edit=", newData.itemId);
            // console.log(process.env.REACT_APP_URL);
            await Axios.post(process.env.REACT_APP_URL, newData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',

                }
            });
            console.log("data is updated to server");
            setFormData({ 
                img: '',
                itemName: '',
                category: '',
                itemCode: '',
                itemDescription: '',
                unit: '',
                openingStock: '',
                date: '',
                purchasePrice: '',
                tax: '',
            });
            closeModalEdit();
        } catch (error) {
            console.log('error =', error);            
        }
      };

    return (
        <>
        {loading && <PreLoader/>}
        <div className="Modal">
            <form onSubmit={handleSubmit} className="formToAdd">
                <div className="MyModal">
                    <div className="text">
                        <h2>Edit Item</h2>
                    </div>
                    <div className="cross" onClick={closeModalEdit}>
                        <SlClose/>
                    </div>
                </div>
                <hr className="abcd"/>
                <div className="body">
                    <div className="general">
                        <div className="Heading_details"><h3>General Details</h3></div>
                        <div className="img">
                            <label><p className="imagetxt">Upload Item Imges</p></label>
                            <input
                                type="file"
                                accept="image/*"
                                name="img"
                                className="imagePicker"
                                onChange={handleImageUpload}
                            />                            
                            {selectedImage && (
                                <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100px' }} />
                            )}
                        </div>
                        <br />
                        <div className="gcp-input-container">
                            <input type="text" className="gcp-input" name="itemName" value={formData.itemName} onChange={handleInputChange} required />
                            <label className="gcp-label">Item Name</label>
                        </div>
                        <div className="gcp-input-container">
                            <select className="gcp-input" value={formData.category} name="category" onChange={handleInputChange} required>
                                <option value="" selected disabled hidden></option>
                                <option value="Panel">Panel</option>
                                <option value="Inverter">Inverter</option>
                                <option value="Wire">Wire</option>
                                <option value="MC4 Converter">MC4 Converter</option>
                                <option value="Other">Other</option>
                            </select>
                            <label className="gcp-label">Category</label>
                        </div>
                        <div className="gcp-input-container">
                            <input type="text" className="gcp-input" value={formData.itemCode} name="itemCode" onChange={handleInputChange} required />
                            <label className="gcp-label">Item Code</label>
                        </div>
                        <div className="gcp-input-container">
                            <textarea className="gcp-input" value={formData.itemDescription} name="itemDescription" onChange={handleInputChange} required></textarea>
                            <label className="gcp-label">Item Description</label>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="Details">
                        <div className="stockDetails">
                            <div className="Heading_details"><h3>Stock Details</h3></div>
                            <div className="wrapper_stockDetails">
                                <div className="gcp-input-container">
                                    <select className="gcp-input" value={formData.unit} name="unit" onChange={handleInputChange} required>
                                        <option value="" selected disabled hidden></option>
                                        <option value="FT">FEET(FT) </option>
                                        <option value="IN">INCHES(IN)</option>
                                        <option value="UNT">UNITS(UNT)</option>
                                        <option value="PCS">PIECES(PCS)</option>
                                        <option value="NOS">NUMBERS(NOS)</option>
                                        <option value="MM">MILLIMETERS(MM)</option>
                                        <option value="CMS">CENTIMETERS(CMS)</option>
                                        <option value="MTR">METERS(MTR)</option>
                                    </select>
                                    <label className="gcp-label">Unit</label>
                                </div>
                                <div className="gcp-input-container">
                                    <input type="text" name="openingStock" value={formData.openingStock} onChange={handleInputChange} className="gcp-input" required />
                                    <label className="gcp-label">Opening Stock</label>
                                </div>
                                <div className="gcp-input-container">
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="gcp-input-date" required/>
                                    <label className="gcp-label-date">As of Date</label>
                                </div>
                            </div>
                            <div className="toggle-container">
                                {/* <input type="checkbox" onChange={handleInputChange} classclassName="toggle-input" id="toggle" />
                                <label class="toggle-label" for="toggle"></label> */}
                            </div>
                        </div>
                        <div className="pricing">
                            <div className="Heading_details"><h3>Pricing Details</h3></div>
                            <div className="wrapper_heading">
                                <div className="gcp-input-container">
                                    <input type="text" value={formData.purchasePrice} name="purchasePrice" onChange={handleInputChange} className="gcp-input" required />
                                    <label className="gcp-label">Purchase Price</label>
                                </div>  
                                <div className="gcp-input-container">
                                    <select className="gcp-input" value={formData.tax} name="tax" onChange={handleInputChange} required>
                                        <option value="" selected disabled hidden>GST Tax Rate (%)</option>
                                        <option value="None">None</option>
                                        <option value="Exempted">Exempted</option>
                                        <option value="gst 0">GST @ 0 %</option>
                                        <option value="gst 0.1">GST @ 0.1 %</option>
                                        <option value="gst 0.25">GST @ 0.25 %</option>
                                        <option value="gst 3">GST @ 3 %</option>
                                        <option value="gst 5">GST @ 5 %</option>
                                        <option value="gst 12">GST @ 12 %</option>
                                    </select>
                                </div>    
                            </div>                  
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="" type="submit" onClick={preLaoder}>EDIT</button>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
}

export default AddItem;