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

        const shoesWithType = shoes.map((item) => ({
          ...item,
          type: "shoes",
        }));

        const clothesWithType = clothes.map((item) => ({
          ...item,
          type: "clothes",
        }));

        const mergedProducts = [...clothesWithType, ...shoesWithType];

        console.log(
          mergedProducts.map((p) => ({
            name: p.name,
            type: p.type,
            createdAt: p.createdAt,
          })),
        );

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
