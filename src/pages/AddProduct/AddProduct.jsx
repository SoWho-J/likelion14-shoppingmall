import { useRef, useState } from "react";
import styled from "styled-components";
import UploadIconImage from "../../assets/icons/UploadIcon.png";
import UploadIconClickImage from "../../assets/icons/UploadIconClick.png";
import { createProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";

const CATEGORY_OPTIONS = ["의류", "신발"];
const GENDER_OPTIONS = ["남성", "여성", "남녀공용"];
const COLOR_OPTIONS = [
  "red",
  "pink",
  "blue",
  "gray",
  "black",
  "denim",
  "multi",
  "rainbow",
  "holographic",
];

export default function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [previewImage, setPreviewImage] = useState("");
  const [isHover, setIsHover] = useState(false);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const type = selectedCategory === "신발" ? "shoes" : "clothes";

    const newProduct = {
      image: previewImage,
      name,
      rating: Number(rating),
      reviews: Number(reviews),
      price: Number(price),
      color: selectedColor,
      size,
      gender:
        selectedGender === "남성"
          ? "male"
          : selectedGender === "여성"
            ? "female"
            : "unisex",
    };

    try {
      await createProduct(type, newProduct);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrap>
      <ImageUploadBox
        onClick={handleImageClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {previewImage && <PreviewImage src={previewImage} alt="preview" />}

        <UploadOverlay>
          <UploadIcon
            src={isHover ? UploadIconClickImage : UploadIconImage}
            alt="upload"
          />
        </UploadOverlay>
      </ImageUploadBox>

      <Divider />

      <FormCard>
        <Title>상품 정보 등록</Title>

        <InputGroup>
          <Label>상품명</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Label>평점</Label>
          <Input value={rating} onChange={(e) => setRating(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Label>리뷰수</Label>
          <Input value={reviews} onChange={(e) => setReviews(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Label>가격</Label>
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Label>사이즈</Label>
          <Input value={size} onChange={(e) => setSize(e.target.value)} />
        </InputGroup>

        <OptionSection>
          <Label>종류</Label>
          <CategoryRow>
            {CATEGORY_OPTIONS.map((item) => (
              <OptionButton
                key={item}
                type="button"
                $active={selectedCategory === item}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </OptionButton>
            ))}
          </CategoryRow>
        </OptionSection>

        <OptionSection>
          <Label>성별</Label>
          <GenderRow>
            {GENDER_OPTIONS.map((item) => (
              <OptionButton
                key={item}
                type="button"
                $active={selectedGender === item}
                onClick={() => setSelectedGender(item)}
              >
                {item}
              </OptionButton>
            ))}
          </GenderRow>
        </OptionSection>

        <OptionSection>
          <Label>색상</Label>
          <ColorGrid>
            {COLOR_OPTIONS.map((item) => (
              <OptionButton
                key={item}
                type="button"
                $active={selectedColor === item}
                onClick={() => setSelectedColor(item)}
              >
                {item}
              </OptionButton>
            ))}
          </ColorGrid>
        </OptionSection>

        <SubmitButton type="button" onClick={handleSubmit}>
          상품 등록 완료
        </SubmitButton>
      </FormCard>
    </PageWrap>
  );
}

const PageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 105px;

  margin-top: 30px;
  padding-bottom: 40px;
`;

const ImageUploadBox = styled.div`
  position: relative;

  width: 407px;
  height: 533px;
  border-radius: 12px;
  background: #eee;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  overflow: hidden;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadIcon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
`;

const UploadOverlay = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Divider = styled.div`
  width: 1px;
  height: 560px;
  background: #e5e5e5;
`;

const FormCard = styled.div`
  width: 250px;
  padding: 29px 31px 27px;

  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin: 0 0 24px;

  color: #1a1a1a;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #1a1a1a;

  font-family: "Pretendard", sans-serif;
  font-size: 24px;
  font-weight: 400;
`;

const InputGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.p`
  margin: 0 0 5px;

  color: #6c6c6c;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  height: 25px;
  padding: 5px 10px;

  border-radius: 5px;
  border: 1px solid #6c6c6c;

  box-sizing: border-box;
  font-size: 12px;
`;

const OptionSection = styled.div`
  margin-bottom: 10px;
`;

const CategoryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
`;

const GenderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
`;

const OptionButton = styled.button`
  height: 27px;

  border-radius: 5px;
  border: 1px solid ${({ $active }) => ($active ? "#dfdfdf" : "#f2f2f2")};
  background: ${({ $active }) => ($active ? "#dfdfdf" : "#f2f2f2")};

  color: #333;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;

  cursor: pointer;

  &:hover {
    border: 1px solid #dfdfdf;
    background: #dfdfdf;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 27px;
  margin-top: 8px;

  border-radius: 5px;
  border: 1px solid #f2f2f2;
  background: #f2f2f2;

  color: #333;
  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;

  cursor: pointer;

  &:hover {
    border: 1px solid #dfdfdf;
    background: #dfdfdf;
  }
`;
