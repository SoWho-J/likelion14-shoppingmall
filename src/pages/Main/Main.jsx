import { useState } from "react";
import styled from "styled-components";
import FilterSection from "../../components/filter/FilterSection";
import ProductSection from "../../components/product/ProductSection";

export default function Main() {
  const [filters, setFilters] = useState({});

  return (
    <MainWrap>
      <FilterSection onFilterChange={setFilters} />
      <ProductSection filters={filters} />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
