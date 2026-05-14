import styled from "styled-components";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={`${product.type}-${product.id}`} product={product} />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  width: 1133px;

  display: grid;
  grid-template-columns: repeat(5, 181px);
  gap: 37px 57px;

  margin: 35px auto 0;
`;
