import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DUMMY_PRODUCTS } from "../../data/product";

export default function ItemDetail() {
  const { id } = useParams();

  const product = DUMMY_PRODUCTS.find((item) => item.id === Number(id));

  if (!product) {
    return <NotFound>상품을 찾을 수 없습니다.</NotFound>;
  }

  return (
    <DetailWrap>
      <ImageSection>
        <ProductImage src={product.image} alt={product.name} />
      </ImageSection>

      <InfoSection>
        <Price>{product.price.toLocaleString()}원</Price>
        <Name>{product.name}</Name>

        <ReviewRow>
          <Star>★</Star>
          <Rating>{product.rating}</Rating>
          <Review>리뷰 {product.reviewCount.toLocaleString()}</Review>
        </ReviewRow>
      </InfoSection>
    </DetailWrap>
  );
}

const DetailWrap = styled.div`
  display: flex;
  margin: 40px 160px 0;
  min-height: 760px;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 520px;
  height: 620px;
  object-fit: contain;
`;

const InfoSection = styled.div`
  width: 50%;
  border-left: 1px solid #e5e5e5;
  padding-left: 70px;
  padding-top: 180px;
`;

const Price = styled.h1`
  margin: 0 0 28px;
  color: #000;
  font-family: "Pretendard", sans-serif;
  font-size: 34px;
  font-weight: 700;
`;

const Name = styled.p`
  margin: 0 0 12px;
  color: #333;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Pretendard", sans-serif;
  font-size: 15px;
`;

const Star = styled.span`
  color: #111;
`;

const Rating = styled.span`
  color: #333;
`;

const Review = styled.span`
  color: #9b9b9b;
`;

const NotFound = styled.h1`
  margin: 80px 160px;
  font-family: "Pretendard", sans-serif;
`;
