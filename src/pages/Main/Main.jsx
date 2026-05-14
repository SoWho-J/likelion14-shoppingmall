import { useEffect, useState } from "react";
import styled from "styled-components";
import FilterSection from "../../components/filter/FilterSection";
import ProductSection from "../../components/product/ProductSection";
import { getProducts } from "../../api/productApi";

export default function Main() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const shoes = await getProducts("shoes");
        const clothes = await getProducts("clothes");

        const shoesWithType = shoes.map((item) => ({
          ...item,
          type: "shoes",
        }));

        const clothesWithType = clothes.map((item) => ({
          ...item,
          type: "clothes",
        }));

        setProducts([...shoesWithType, ...clothesWithType]);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  return (
    <MainWrap>
      <FilterSection onFilterChange={setFilters} />
      <ProductSection filters={filters} products={products} />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
