import { useState } from 'react';
import axios from 'axios';
import './recipes.css';
// import BarcodeScanner from './scanner/scanner';
// import BarcodeScanner from './pages/scanner/Scanner.tsx';

import BarcodeScanner from '../scanner/Scanner.tsx';





 // adjust path if needed

const Recipes = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');

  const fetchProductDetails = async (barcode) => {
    try {
      const response = await axios.get(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);
      if (response.data && response.data.product) {
        setProduct(response.data.product);
        setError('');
      } else {
        setProduct(null);
        setError('Product not found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setProduct(null);
      setError('Failed to fetch product.');
    }
  };

  // Called when BarcodeScanner detects a code
  const handleBarcodeDetected = (barcode) => {
    setScannedBarcode(barcode);
    fetchProductDetails(barcode);
  };

  return (
    <div className="bg">
      <div className="ingredients1">
        <table className="ingredient">
          <thead>
            <tr><th className="pixely">Upload Image to Scan</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><BarcodeScanner onDetected={handleBarcodeDetected} /></td>
            </tr>
            {scannedBarcode && (
              <tr><td><strong>Scanned Barcode:</strong> {scannedBarcode}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="ingredients2">
        <table className="recipes">
          <thead>
            <tr><th className="pixely">Product Info</th></tr>
          </thead>
          <tbody>
            {product ? (
              <>
                <tr><td><strong>Name:</strong> {product.product_name}</td></tr>
                <tr><td><strong>Brand:</strong> {product.brands}</td></tr>
                <tr><td><strong>Ingredients:</strong> {product.ingredients_text || 'N/A'}</td></tr>
                <tr><td><strong>Categories:</strong> {product.categories}</td></tr>
                <tr><td><strong>Nutrition Grade:</strong> {product.nutrition_grades}</td></tr>
                <tr><td><img src={product.image_url} alt={product.product_name} width="120" /></td></tr>
              </>
            ) : (
              <tr><td>{error || 'Upload an image to scan a barcode.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recipes;
