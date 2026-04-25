import styled from "styled-components";
import CloseIcon from "../../assets/icons/X.png";

export default function FilterModal({ selectedFilter, onClose }) {
  const options = FILTER_OPTIONS[selectedFilter] || [];

  return (
    <Overlay>
      <ModalBox>
        <ModalHeader>
          <Title>{selectedFilter}</Title>

          <CloseButton onClick={onClose}>
            <CloseImage src={CloseIcon} alt="close" />
          </CloseButton>
        </ModalHeader>

        <OptionWrap>
          {options.map((option) => (
            <OptionButton key={option}>{option}</OptionButton>
          ))}
        </OptionWrap>
      </ModalBox>
    </Overlay>
  );
}

const FILTER_OPTIONS = {
  성별: ["남성", "여성", "남녀공용"],
  색상: [
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
  사이즈: ["9", "10", "S", "M", "L", "XL"],
  가격대: ["0~30", "31~60", "61~90"],
  종류: ["의류", "신발"],
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

const ModalBox = styled.div`
  width: 230px;
  background: #fff;
  border-radius: 16px;
  padding: 18px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseImage = styled.img`
  width: 13px;
  height: 13px;
  display: block;
`;

const OptionWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
`;

const OptionButton = styled.button`
  border: none;
  border-radius: 20px;
  background: #f2f2f2;
  padding: 7px 10px;
  font-size: 12px;
  cursor: pointer;
`;
