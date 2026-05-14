import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { deleteProduct, getProductDetail } from "../../api/productApi";

export default function ItemDetail() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [product, setProduct] = useState(null);
  const isDeleteOpen = searchParams.get("delete") === "true";

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const data = await getProductDetail(type, id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProductDetail();
  }, [type, id]);

  if (!product) return <NotFound>상품을 찾을 수 없습니다.</NotFound>;

  const handleDelete = async () => {
    try {
      await deleteProduct(type, id);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageWrap>
      <DetailWrap $dimmed={isDeleteOpen}>
        <ImageSection>
          <ProductImage src={product.image} alt={product.name} />
        </ImageSection>

        <InfoSection>
          <Price>{product.price.toLocaleString()}원</Price>
          <Name>{product.name}</Name>

          <ReviewRow>
            <Star>★</Star>
            <Rating>{product.rating}</Rating>
            <Review>리뷰 {product.reviews.toLocaleString()}</Review>
          </ReviewRow>
        </InfoSection>
      </DetailWrap>

      {isDeleteOpen && (
        <Overlay>
          <ConfirmModal>
            <ModalText>상품을 삭제하시겠습니까?</ModalText>

            <ModalButtonRow>
              <ModalButton onClick={handleDelete}>확인</ModalButton>
              <ModalButton onClick={() => setSearchParams({})}>
                취소
              </ModalButton>
            </ModalButtonRow>
          </ConfirmModal>
        </Overlay>
      )}
    </PageWrap>
  );
}

const PageWrap = styled.div`
  position: relative;
`;

const DetailWrap = styled.div`
  display: flex;
  margin: 40px 160px 0;
  min-height: 760px;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.35 : 1)};
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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const ConfirmModal = styled.div`
  width: 280px;
  height: 125px;
  border-radius: 20px;
  background: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalText = styled.p`
  margin: 0 0 28px;
  color: #111;
  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ModalButton = styled.button`
  width: 95px;
  height: 30px;

  border: none;
  border-radius: 5px;
  background: #f2f2f2;

  color: #333;

  font-family: "Pretendard", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:hover {
    background: #dfdfdf;
  }
`;

const NotFound = styled.h1`
  margin: 80px 160px;
  font-family: "Pretendard", sans-serif;
`;
