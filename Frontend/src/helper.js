import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Tab from "./components/Tabs/Tabs";
import Item from "./components/Items/Item"
// import AddItem from "./components/Items/AddItem"

function Helper() {
    return (
        <div className="App">
            <Navbar />
            <h2 className="Books">BOOKS</h2>
            <Tab />
            <Item />
            {/* <AddItem /> */}
        </div>
    );
}

export default Helper;
