import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import Main from "./pages/Main/Main.jsx";
import ItemDetail from "./pages/ItemDetail/ItemDetail.jsx";
import AddProduct from "./pages/AddProduct/AddProduct.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />

          {/* 상품 등록 */}
          <Route path="/add" element={<AddProduct />} />

          {/* 상품 상세 */}
          <Route path="/item/:type/:id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
