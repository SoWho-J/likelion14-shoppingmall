import styled from "styled-components";
import ArrowIcon from "../../assets/icons/Vector.svg";

export default function FilterButton({ text, onClick, isActive }) {
  return (
    <StyledFilterButton onClick={onClick} $isActive={isActive}>
      <span>{text}</span>
      <Arrow src={ArrowIcon} alt="arrow" $isActive={isActive} />
    </StyledFilterButton>
  );
}

const StyledFilterButton = styled.button`
  display: flex;
  height: 34px;
  padding: 0 11px 0 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border-radius: 20px;
  border: none;
  background: ${({ $isActive }) => ($isActive ? "#000" : "#F2F2F2")};

  color: ${({ $isActive }) => ($isActive ? "#fff" : "#616161")};
  font-family: Pretendard, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: normal;

  cursor: pointer;
  white-space: nowrap;
`;

const Arrow = styled.img`
  width: 8px;
  height: 4px;
  filter: ${({ $isActive }) => ($isActive ? "invert(1)" : "none")};
`;
