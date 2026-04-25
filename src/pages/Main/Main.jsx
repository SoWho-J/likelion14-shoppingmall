import { useState } from "react";
import styled from "styled-components";
import FilterSection from "../../components/filter/FilterSection";
import CheckIcon from "../../assets/icons/check.svg";
import ProductList, {
  DUMMY_PRODUCTS,
} from "../../components/product/ProductList";

const PRICE_MAP = {
  "0~30": [0, 300000],
  "31~60": [310000, 600000],
  "61~90": [610000, 900000],
};

function applyFilters(products, filters) {
  return products.filter((p) => {
    if (filters["성별"]?.length && !filters["성별"].includes(p.gender))
      return false;
    if (filters["색상"]?.length && !filters["색상"].includes(p.color))
      return false;
    if (
      filters["사이즈"]?.length &&
      !p.size.some((s) => filters["사이즈"].includes(s))
    )
      return false;
    if (filters["가격대"]?.length) {
      const inRange = filters["가격대"].some((range) => {
        const [min, max] = PRICE_MAP[range];
        return p.price >= min && p.price <= max;
      });
      if (!inRange) return false;
    }
    if (filters["종류"]?.length && !filters["종류"].includes(p.category))
      return false;
    return true;
  });
}

export default function Main() {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("기본 정렬순");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const SORT_OPTIONS = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

  const filtered = applyFilters(DUMMY_PRODUCTS, filters);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "평점 높은순") return b.rating - a.rating;
    if (sort === "리뷰 많은순") return b.reviewCount - a.reviewCount;
    return a.id - b.id;
  });

  return (
    <MainWrap>
      <FilterSection onFilterChange={setFilters} />

      <SortBar>
        <SortButton onClick={() => setIsSortOpen((prev) => !prev)}>
          정렬순 ⇅
        </SortButton>
        {isSortOpen && (
          <SortDropdown>
            {SORT_OPTIONS.map((option) => (
              <SortOption
                key={option}
                $isActive={sort === option}
                onClick={() => {
                  setSort(option);
                  setIsSortOpen(false);
                }}
              >
                {option}
                {sort === option && <CheckImg src={CheckIcon} alt="check" />}
              </SortOption>
            ))}
          </SortDropdown>
        )}
      </SortBar>

      <ProductList products={sorted} />
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-right: 153px;
  margin-top: 16px;
`;

const SortButton = styled.button`
  border: none;
  background: none;
  font-size: 13px;
  color: #555;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 28px;
  right: 0;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 100;
  min-width: 140px;
`;

const SortOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 14px;
  font-family: "Pretendard", sans-serif;
  color: ${({ $isActive }) => ($isActive ? "#333" : "#AFAFAF")};
  font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;

const CheckImg = styled.img`
  width: 14px;
  height: 14px;
`;
