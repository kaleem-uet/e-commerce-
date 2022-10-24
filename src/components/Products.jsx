import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const [Products, setProducts] = useState([]);
  const [FilterProducts, setFilterProducts] = useState([]);
  console.log(cat);
  const getProducts=async ()=>{
    try {
      const res= await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}`:"http://localhost:5000/api/products" );
      console.log(res.data);
      setProducts(res.data)
    } catch (error) {
    console.log(error);
    }}

useEffect(() => {
   getProducts();
  }, [cat])

  useEffect(() => {
    cat &&
      setFilterProducts(
        Products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [Products, cat, filters]);
  
  useEffect(() => {
    if (sort === "newest") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilterProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
 
  return (
    <Container>
      {
       cat ? FilterProducts.map((item) => (
        <Product item={item} key={item.id} />)) : 
        Products.slice(0,8).map((item)=>(<Product item={item} key={item.id} />))
        }
    </Container>
  );
};

export default Products;
