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
  display: grid;
  grid-template-columns: repeat(5, 181px);
  gap: 37px 57px;
  margin-left: 158px;
  margin-right: 149px;
  margin-top: 20px;
`;
