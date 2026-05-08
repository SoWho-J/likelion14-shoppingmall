import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import Main from "./pages/Main/Main.jsx";
import ItemDetail from "./pages/ItemDetail/ItemDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<></>} />

          {/* 상품 상세 */}
          <Route path="/item/:id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
