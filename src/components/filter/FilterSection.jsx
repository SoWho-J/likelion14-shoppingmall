import { useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";

const FILTERS = ["성별", "색상", "사이즈", "가격대", "종류"];

export default function FilterSection({ onFilterChange }) {
  const [openFilter, setOpenFilter] = useState(null);
  const [activeSelections, setActiveSelections] = useState({});

  const handleToggle = (filterName) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  // 옵션 하나를 클릭했을 때 선택/해제를 전부 여기서 처리
  const handleOptionToggle = (filterName, option) => {
    const current = activeSelections[filterName] || [];

    const nextOptions = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    const next = {
      ...activeSelections,
      [filterName]: nextOptions,
    };

    if (nextOptions.length === 0) {
      delete next[filterName];
    }

    setActiveSelections(next);
    onFilterChange(next);
  };

  return (
    <>
      <FilterWrap>
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter}
            text={filter}
            isActive={activeSelections[filter]?.length > 0}
            onClick={() => handleToggle(filter)}
          />
        ))}
      </FilterWrap>

      {openFilter && (
        <FilterModal
          selectedFilter={openFilter}
          currentSelections={activeSelections[openFilter] || []}
          onClose={() => setOpenFilter(null)}
          onOptionToggle={handleOptionToggle}
        />
      )}
    </>
  );
}

const FilterWrap = styled.div`
  width: 1133px;
  margin: 28px auto 0;

  display: flex;
  align-items: center;
  gap: 8px;
`;
