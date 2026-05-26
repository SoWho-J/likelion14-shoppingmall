import styled from "styled-components";
import CloseIcon from "../../assets/icons/X.png";

const FILTER_OPTIONS = {
  성별: { layout: "row", options: ["남성", "여성", "남녀공용"] },
  색상: {
    layout: "grid3",
    options: [
      "red",
      "pink",
      "blue",
      "black",
      "gray",
      "denim",
      "multi",
      "rainbow",
      "holographic",
    ],
  },
  사이즈: {
    layout: "size",
    options: [
      ["9", "10"],
      ["S", "M", "L", "XL"],
    ],
  },
  가격대: { layout: "row", options: ["0~30", "31~60", "61~90"] },
  종류: { layout: "row", options: ["의류", "신발"] },
};

export default function FilterModal({
  selectedFilter,
  currentSelections,
  onClose,
  onOptionToggle,
}) {
  const { layout, options } = FILTER_OPTIONS[selectedFilter] || {
    layout: "row",
    options: [],
  };

  const colorRows =
    layout === "grid3"
      ? [options.slice(0, 3), options.slice(3, 6), options.slice(6, 9)]
      : [];

  return (
    <Overlay onClick={onClose}>
      <ModalBox $layout={layout} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>{selectedFilter}</Title>
          <CloseButton onClick={onClose}>
            <CloseImage src={CloseIcon} alt="close" />
          </CloseButton>
        </ModalHeader>

        {layout === "size" ? (
          <SizeWrap>
            {options.map((group, i) => (
              <OptionRow key={i}>
                {group.map((option) => (
                  <OptionButton
                    key={option}
                    $isSelected={currentSelections.includes(option)}
                    onClick={() => onOptionToggle(selectedFilter, option)}
                  >
                    {option}
                  </OptionButton>
                ))}
              </OptionRow>
            ))}
          </SizeWrap>
        ) : layout === "grid3" ? (
          <ColorWrap>
            {colorRows.map((row, i) => (
              <OptionRow key={i}>
                {row.map((option) => (
                  <OptionButton
                    key={option}
                    $isSelected={currentSelections.includes(option)}
                    onClick={() => onOptionToggle(selectedFilter, option)}
                  >
                    {option}
                  </OptionButton>
                ))}
              </OptionRow>
            ))}
          </ColorWrap>
        ) : (
          <OptionRow>
            {options.map((option) => (
              <OptionButton
                key={option}
                $isSelected={currentSelections.includes(option)}
                onClick={() => onOptionToggle(selectedFilter, option)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionRow>
        )}
      </ModalBox>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  width: ${({ $layout }) => ($layout === "grid3" ? "300px" : "fit-content")};
  min-width: 260px;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 28px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  margin: 0;
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #111;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f2f2f2;
  }
`;

const CloseImage = styled.img`
  width: 12px;
  height: 12px;
`;

const SizeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ColorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
`;

const OptionButton = styled.button`
  min-width: 51px;
  height: 29px;
  border: none;
  border-radius: 20px;
  background: ${({ $isSelected }) => ($isSelected ? "#000" : "#f2f2f2")};
  padding: 0 15px;

  color: ${({ $isSelected }) => ($isSelected ? "#fff" : "#616161")};
  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;

  cursor: pointer;
  white-space: nowrap;
`;
