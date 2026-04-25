import styled from "styled-components";
import ArrowIcon from "../../assets/icons/Vector.svg";

export default function FilterButton({ text, onClick }) {
  return (
    <StyledFilterButton onClick={onClick}>
      <span>{text}</span>
      <Arrow src={ArrowIcon} alt="arrow" />
    </StyledFilterButton>
  );
}

const StyledFilterButton = styled.button`
  display: flex;
  min-width: 58px;
  padding: 8px 10px 11px 10px;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border: none;
  border-radius: 20px;
  background: #f2f2f2;

  color: #555;
  font-size: 13px;
  cursor: pointer;

  white-space: nowrap;
`;
const Arrow = styled.img`
  width: 10px;
  height: 5px;
`;
