import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/Products";
import DetailedProduct from "./pages/DetailedProducts";
import NewProduct from "./pages/AddNewProduct";

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <Router>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<DetailedProduct />} />
          <Route path="/product/:id/edit" element={<NewProduct />} />
          <Route path="/product/add" element={<NewProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
