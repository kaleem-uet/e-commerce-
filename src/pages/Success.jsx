import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
// import { userRequest } from "../requestMethods";
const Success = ({}) => {
  const location = useLocation();
  console.log(location.state);
  const data = location.state.stripeData;
  const cart = location.state.products;
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.token;
  console.log("token",TOKEN);


  const [orderId, setOrderId] = useState(null);
   console.log(currentUser);
  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.userId,
          products: cart.product.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        }
        );
        setOrderId(res.data._id);
      } catch(error) {
        console.log(error);
      }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {
      orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}

      <Link to={"/"}>
      <button style={{ padding: 10, marginTop: 20,backgroundColor:"green",color:"white" }}>
        
        Go to Homepage
        
        </button>
        </Link>
    </div>
  );
};

export default Success;
