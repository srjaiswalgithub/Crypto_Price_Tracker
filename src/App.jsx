import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateCryptoPrices } from './store/cryptoSlice';
import CryptoTable from './components/CryptoTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    

    const interval = setInterval(() => {
      dispatch(updateCryptoPrices());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Real-Time Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
