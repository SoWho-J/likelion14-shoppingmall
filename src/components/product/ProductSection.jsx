import { useEffect, useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../assets/icons/check.svg";
import ProductList from "./ProductList";
import { getProducts } from "../../api/productApi";

const PRICE_MAP = {
  "0~30": [0, 300000],
  "31~60": [310000, 600000],
  "61~90": [610000, 900000],
};

const SORT_OPTIONS = ["기본 정렬순", "평점 높은순", "리뷰 많은순"];

function normalizeGender(gender) {
  if (gender === "male") return "남성";
  if (gender === "female") return "여성";
  if (gender === "unisex") return "남녀공용";
  return gender;
}

function normalizeCategory(category, type) {
  if (category) return category;
  if (type === "shoes") return "신발";
  if (type === "shirt") return "의류";
  return category;
}

function applyFilters(products, filters) {
  return products.filter((p) => {
    const gender = normalizeGender(p.gender);
    const category = normalizeCategory(p.category, p.type);

    if (filters["성별"]?.length && !filters["성별"].includes(gender)) {
      return false;
    }

    if (filters["색상"]?.length && !filters["색상"].includes(p.color)) {
      return false;
    }

    if (filters["사이즈"]?.length) {
      const productSizes = String(p.size)
        .split(",")
        .map((s) => s.trim().toUpperCase());

      const filterSizes = filters["사이즈"].map((s) => s.toUpperCase());

      if (!productSizes.some((size) => filterSizes.includes(size))) {
        return false;
      }
    }

    if (filters["가격대"]?.length) {
      const inRange = filters["가격대"].some((range) => {
        const [min, max] = PRICE_MAP[range];
        return p.price >= min && p.price <= max;
      });

      if (!inRange) return false;
    }

    if (filters["종류"]?.length && !filters["종류"].includes(category)) {
      return false;
    }

    return true;
  });
}

export default function ProductSection({ filters }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("기본 정렬순");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const shoes = await getProducts("shoes");
        const shirts = await getProducts("shirt");

        setProducts([...shoes, ...shirts]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const filtered = applyFilters(products, filters);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "평점 높은순") {
      return b.rating - a.rating;
    }

    if (sort === "리뷰 많은순") {
      return (b.reviewCount ?? b.reviews) - (a.reviewCount ?? a.reviews);
    }

    return (a.createdAt ?? 0) - (b.createdAt ?? 0);
  });

  return (
    <>
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
    </>
  );
}

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
  color: ${({ $isActive }) => ($isActive ? "#333" : "#afafaf")};
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
