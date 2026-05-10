import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/item/${product.type}/${product.id}`)}>
      <ImageWrap>
        <img src={product.image} alt={product.name} />
      </ImageWrap>

      <Name>{product.name}</Name>

      <Price>{product.price.toLocaleString()}원</Price>

      <Review>
        리뷰 {(product.reviewCount ?? product.reviews).toLocaleString()}
      </Review>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  width: 181px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  cursor: pointer;
`;

const ImageWrap = styled.div`
  width: 181px;
  height: 237px;
  background: transparent;
  border-radius: 12px;
  border: none;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Name = styled.p`
  align-self: stretch;
  color: #333;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin: 0;
`;

const Price = styled.p`
  align-self: stretch;
  color: #000;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: #000;

  margin: 0;
`;

const Review = styled.p`
  align-self: stretch;
  color: #a7a7a7;

  font-family: "Pretendard", sans-serif;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin: 0;
`;
