import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCrypto } from '../store/selectors';
import { updateCryptoPrices } from '../store/cryptoSlice';

const CryptoTable = () => {
  const assets = useSelector(selectCrypto);
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState('market_cap');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCryptoPrices());
    }, 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  const sortedAssets = [...assets]
    .filter(asset =>
      asset.name.toLowerCase().includes(filter.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  const handleSort = field => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <input
        type="text"
        placeholder="Filter by name or symbol..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-800 text-white border border-gray-600"
      />
      <table className="w-full text-sm text-left bg-gray-900 text-white rounded-xl overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Logo</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('symbol')}>Symbol</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('price')}>Price</th>
            <th className="p-2">1h %</th>
            <th className="p-2">24h %</th>
            <th className="p-2">7d %</th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('market_cap')}>Market Cap</th>
            <th className="p-2">24h Volume</th>
            <th className="p-2">Circulating Supply</th>
            <th className="p-2">Max Supply</th>
            <th className="p-2">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset, index) => (
            <tr key={asset.symbol} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">
                <img src={asset.logo} alt={asset.symbol} className="h-6 w-6" />
              </td>
              <td className="p-2 font-medium">{asset.name}</td>
              <td className="p-2 uppercase">{asset.symbol}</td>
              <td className="p-2">${asset.price.toFixed(2)}</td>
              <td className={`p-2 ${asset.percent_change_1h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{asset.percent_change_1h}%</td>
              <td className={`p-2 ${asset.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>{asset.percent_change_24h}%</td>
              <td className={`p-2 ${asset.percent_change_7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>{asset.percent_change_7d}%</td>
              <td className="p-2">${asset.market_cap.toLocaleString()}</td>
              <td className="p-2">${asset.volume_24h.toLocaleString()}</td>
              <td className="p-2">{asset.circulating_supply.toLocaleString()}</td>
              <td className="p-2">{asset.max_supply.toLocaleString()}</td>
              <td className="p-2">
                <img src={asset.chart_7d} alt="chart" className="h-6" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
