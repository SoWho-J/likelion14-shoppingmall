import styled from "styled-components";
import logoUrl from "../../assets/images/Kream.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isMainPage = pathname === "/";
  const isAddPage = pathname === "/add";
  const isDetailPage = pathname.startsWith("/item/");
  const isEditPage = pathname.startsWith("/edit/");

  const pathParts = pathname.split("/");
  const detailType = pathParts[2];
  const detailId = pathParts[3];

  return (
    <HeaderContainer>
      <LogoImage src={logoUrl} onClick={() => navigate("/")} />

      <HeaderRight>
        <ButtonRow>
          {(isMainPage || isAddPage || isDetailPage || isEditPage) && (
            <HeaderButton $active={isAddPage} onClick={() => navigate("/add")}>
              상품등록
            </HeaderButton>
          )}

          {(isDetailPage || isEditPage) && (
            <>
              <HeaderButton
                onClick={() =>
                  navigate(`/item/${detailType}/${detailId}?delete=true`)
                }
              >
                상품삭제
              </HeaderButton>

              <HeaderButton
                $active={isEditPage}
                onClick={() => navigate(`/edit/${detailType}/${detailId}`)}
              >
                상품수정
              </HeaderButton>
            </>
          )}
        </ButtonRow>

        <HomeButton onClick={() => navigate("/")}>HOME</HomeButton>
      </HeaderRight>
    </HeaderContainer>
  );
}

const LogoImage = styled.img`
  width: 166px;
  height: 141px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  width: 1133px;
  height: 110px;
  margin: 0 auto;

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
