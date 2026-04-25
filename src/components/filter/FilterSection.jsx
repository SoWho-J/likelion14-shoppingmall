import { useState } from "react";
import styled from "styled-components";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";

export default function FilterSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const openModal = (filterName) => {
    setSelectedFilter(filterName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <FilterWrap>
        <FilterButton text="성별" onClick={() => openModal("성별")} />
        <FilterButton text="색상" onClick={() => openModal("색상")} />
        <FilterButton text="사이즈" onClick={() => openModal("사이즈")} />
        <FilterButton text="가격대" onClick={() => openModal("가격대")} />
        <FilterButton text="종류" onClick={() => openModal("종류")} />
      </FilterWrap>

      {isModalOpen && (
        <FilterModal selectedFilter={selectedFilter} onClose={closeModal} />
      )}
    </>
  );
}

const FilterWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 13px;

  margin-left: 153px;
  margin-top: 22px;
`;
