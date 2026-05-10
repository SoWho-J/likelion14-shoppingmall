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

function normalizeText(value) {
  return String(value ?? "").trim();
}

function normalizeGender(gender) {
  const value = normalizeText(gender);

  if (value === "male") return "남성";
  if (value === "female") return "여성";
  if (value === "unisex") return "남녀공용";

  return value;
}

function normalizeCategory(category, type) {
  const categoryValue = normalizeText(category);
  const typeValue = normalizeText(type);

  if (categoryValue) return categoryValue;
  if (typeValue === "shoes") return "신발";
  if (typeValue === "shirt") return "의류";

  return "";
}

function normalizeColor(color) {
  return normalizeText(color).toLowerCase();
}

function normalizeSizes(size) {
  return String(size ?? "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}

function applyFilters(products, filters = {}) {
  return products.filter((p) => {
    const gender = normalizeGender(p.gender);
    const color = normalizeColor(p.color);
    const category = normalizeCategory(p.category, p.type);
    const productSizes = normalizeSizes(p.size);
    const price = Number(p.price);

    if (filters["성별"]?.length && !filters["성별"].includes(gender)) {
      return false;
    }

    if (filters["색상"]?.length) {
      const selectedColors = filters["색상"].map((item) =>
        normalizeColor(item),
      );

      if (!selectedColors.includes(color)) {
        return false;
      }
    }

    if (filters["사이즈"]?.length) {
      const selectedSizes = filters["사이즈"].map((item) =>
        normalizeText(item).toUpperCase(),
      );

      const hasSize = productSizes.some((size) => selectedSizes.includes(size));

      if (!hasSize) {
        return false;
      }
    }

    if (filters["가격대"]?.length) {
      const inRange = filters["가격대"].some((range) => {
        const priceRange = PRICE_MAP[range];
        if (!priceRange) return false;

        const [min, max] = priceRange;
        return price >= min && price <= max;
      });

      if (!inRange) {
        return false;
      }
    }

    if (filters["종류"]?.length && !filters["종류"].includes(category)) {
      return false;
    }

    return true;
  });
}

function removeDuplicateProducts(products) {
  const map = new Map();

  products.forEach((product) => {
    const key = `${product.type}-${product.id}`;
    map.set(key, product);
  });

  return Array.from(map.values());
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

        const mergedProducts = [...shoes, ...shirts];
        const uniqueProducts = removeDuplicateProducts(mergedProducts);

        setProducts(uniqueProducts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const filtered = applyFilters(products, filters);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "평점 높은순") {
      return Number(b.rating ?? 0) - Number(a.rating ?? 0);
    }

    if (sort === "리뷰 많은순") {
      return (
        Number(b.reviewCount ?? b.reviews ?? 0) -
        Number(a.reviewCount ?? a.reviews ?? 0)
      );
    }

    return Number(a.createdAt ?? 0) - Number(b.createdAt ?? 0);
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
