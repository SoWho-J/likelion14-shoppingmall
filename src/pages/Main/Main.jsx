import { useEffect, useState } from "react";
import styled from "styled-components";
import FilterSection from "../../components/filter/FilterSection";
import ProductSection from "../../components/product/ProductSection";
import { getProducts } from "../../api/productApi";

export default function Main() {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const shoes = await getProducts("shoes");
        const clothes = await getProducts("clothes");

        const mergedProducts = [...shoes, ...clothes];

        if (!cancelled) {
          setProducts(mergedProducts);
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          setProducts([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
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
