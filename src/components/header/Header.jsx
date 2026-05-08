import styled from "styled-components";
import logoUrl from "../../assets/images/kream_image.png";
import { useLocation, useNavigate } from "react-router-dom";

const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  padding: 0 160px;
  height: 110px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 28px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 36px;
`;

const HeaderButton = styled.button`
  border: none;
  background: transparent;

  color: ${({ $active }) => ($active ? "#000" : "#6c6c6c")};

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 400;

  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const HomeButton = styled.button`
  border: none;
  background: transparent;

  color: #111;
  font-family: "Pretendard", sans-serif;
  font-size: 24px;
  font-weight: 400;

  cursor: pointer;
`;

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMainPage = pathname === "/";
  const isAddPage = pathname === "/add";
  const isDetailPage = pathname.startsWith("/item/");

  return (
    <HeaderContainer>
      <LogoImage src={logoUrl} onClick={() => navigate("/")} />

      <HeaderRight>
        <ButtonRow>
          {(isMainPage || isAddPage || isDetailPage) && (
            <HeaderButton $active={isAddPage} onClick={() => navigate("/add")}>
              상품등록
            </HeaderButton>
          )}

          {isDetailPage && (
            <>
              <HeaderButton onClick={() => navigate(`${pathname}?delete=true`)}>
                상품삭제
              </HeaderButton>

              <HeaderButton>상품수정</HeaderButton>
            </>
          )}
        </ButtonRow>

        <HomeButton onClick={() => navigate("/")}>HOME</HomeButton>
      </HeaderRight>
    </HeaderContainer>
  );
}
