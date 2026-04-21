import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import { ProductProvider } from "./context/ProductContext";


function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
          <Route path="/product" element={<AddProductPage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
