import { useEffect, useState } from "react";
import styled from "styled-components";
import UploadIconImage from "../../assets/icons/UploadIcon.png";
import { getProductDetail, patchProduct } from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditProduct() {
  const { type, id } = useParams();
  const navigate = useNavigate();

  const [originalProduct, setOriginalProduct] = useState(null);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductDetail(type, id);

        setOriginalProduct(data);

        setImage(data.image);
        setName(data.name);
        setRating(String(data.rating));
        setReviews(String(data.reviews));
        setPrice(String(data.price));
        setSize(data.size);

        setSelectedCategory(type === "shoes" ? "신발" : "의류");

        setSelectedGender(
          data.gender === "male"
            ? "남성"
            : data.gender === "female"
              ? "여성"
              : "남녀공용",
        );

        setSelectedColor(data.color);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [type, id]);

  const handleEdit = async () => {
    if (
      !image ||
      !name ||
      !price ||
      !selectedCategory ||
      !selectedGender ||
      !selectedColor
    ) {
      alert("필수 정보를 입력해주세요.");
      return;
    }

    if (!originalProduct) return;

    const nextGender =
      selectedGender === "남성"
        ? "male"
        : selectedGender === "여성"
          ? "female"
          : "unisex";

    const patchData = {};

    if (image !== originalProduct.image) {
      patchData.image = image;
    }

    if (name !== originalProduct.name) {
      patchData.name = name;
    }

    if (Number(rating) !== Number(originalProduct.rating)) {
      patchData.rating = Number(rating);
    }

    if (Number(reviews) !== Number(originalProduct.reviews)) {
      patchData.reviews = Number(reviews);
    }

    if (Number(price) !== Number(originalProduct.price)) {
      patchData.price = Number(price);
    }

    if (size !== originalProduct.size) {
      patchData.size = size;
    }

    if (selectedColor !== originalProduct.color) {
      patchData.color = selectedColor;
    }

    if (nextGender !== originalProduct.gender) {
      patchData.gender = nextGender;
    }

    if (Object.keys(patchData).length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      await patchProduct(type, id, patchData);
      navigate(`/item/${type}/${id}`);
    } catch (error) {
      console.error(error);
      alert("상품 수정에 실패했습니다.");
    }
  };

  return (
    <PageWrap>
      <ImageUploadBox>
        {image ? (
          <PreviewImage src={image} alt="preview" />
        ) : (
          <UploadIcon src={UploadIconImage} alt="upload" />
        )}
      </ImageUploadBox>

      <Divider />

      <FormCard>
        <Title>상품 정보 수정</Title>

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
          <Label>이미지 URL</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
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

        <SubmitButton type="button" onClick={handleEdit}>
          수정 완료
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
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const UploadIcon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
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
