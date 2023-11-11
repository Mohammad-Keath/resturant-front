import React, { useEffect, useState } from "react";
import { axiosHandler } from "../handlers/axiosHandler";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Maintenance from "../components/maintenance";
import {IoAdd} from 'react-icons/io5'
import ItemCard from "../components/itemCard";
import AddToCart from "../components/addToCart";
import Header from "../components/header";
import AddItem from "../components/addItem";
import Cookies from "js-cookie";
import Cart from "../components/cart";
import AddMaintenance from "../components/addMaintenance";
import Footer from '../components/footer'

function MainPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);
  const [role, setRole] = useState(false);
  const [options, setOptions] = useState([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [itemToCart, setItemToCart] = useState();
  const [showCart, setShowCart] = useState(false);
  const [addingMaintenance, setAddingMaintenance] = useState(false);
  
  const categories = [];

  async function getData() {
    try {
      const response = await axiosHandler("GET", "/items");
      if (response.status == 200) {
        setData(response.data);
        response.data.map((item) => {
          if (!categories.includes(item.category)) {
            categories.push(item.category);
          }
        });
        setOptions(categories);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    }
  }
  console.log(itemToCart);
  useEffect(() => {
    getData();
    if (Cookies.get("user_info")) {
      const { role } = JSON.parse(Cookies.get("user_info"));
      setRole(role);
    }
  }, []);
  return (
    <div className="mainPage">

      {Cookies.get("user_info")&&<AiOutlineShoppingCart
        onClick={() => {
          setShowCart(!showCart);
        }}
        className="cartIcon"
      />}
        {showCart&&<Cart/>}

        {addingMaintenance&&<AddMaintenance setAdding={setAddingMaintenance}/>}

      {itemToCart && (
        <AddToCart itemToCart={itemToCart} setItemToCart={setItemToCart} />
      )}
      {adding && <AddItem setAdding={setAdding} getData={getData} />}
      <Header
        options={options}
        setError={setError}
        setCategorySelected={setCategorySelected}
        categorySelected={categorySelected}
      />
      {role == "admin" && (
        <button
          onClick={() => {
            setAdding(true);
          }}
          className="addItem"
        >
          <IoAdd className="addItemIcon"/>
        </button>
      )}
      {error && <h3 className="error">Please reload the page</h3>}
      <div className="itemsContainer">
        {data.map((item) => {
          if (item.category == categorySelected || categorySelected == "") {
            return <ItemCard setItemToCart={setItemToCart} item={item} />;
          }
        })}
      </div>
      <Maintenance setAddingMaintenance={setAddingMaintenance} addingMaintenance={addingMaintenance}/>
      <Footer/>
    </div>
  );
}

export default MainPage;
