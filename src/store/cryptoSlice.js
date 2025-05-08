import { createSlice } from '@reduxjs/toolkit';
import btcChart from '../assets/btc-chart.svg';
import ethChart from '../assets/eth-chart.svg';
import usdtChart from '../assets/usdt-chart.svg';
import bnbChart from '../assets/bnb-chart.svg';
import solChart from '../assets/sol-chart.svg';
import solana_logo from '../assets/solona.png';
import Bitcoin_logo from '../assets/bitcoin-btc-logo.png';
import Ethereum_logo from '../assets/ethereum-eth-logo.png';
import Tether from '../assets/tether-usdt-logo.png';
import BNB_logo from '../assets/binance-coin-bnb-logo.png';

const initialState = [
  {
    name: 'Bitcoin', symbol: 'BTC', price: 63000,
    percent_change_1h: 0.5, percent_change_24h: 1.2, percent_change_7d: 4.5,
    market_cap: 1220000000000, volume_24h: 30000000000,
    circulating_supply: 19700000, max_supply: 21000000,
    logo: Bitcoin_logo,
    chart_7d: btcChart
  },
  {
    name: 'Ethereum', symbol: 'ETH', price: 3100,
    percent_change_1h: -0.2, percent_change_24h: 0.3, percent_change_7d: 2.1,
    market_cap: 372000000000, volume_24h: 18000000000,
    circulating_supply: 118000000, max_supply: 0,
    logo: Ethereum_logo,
    chart_7d: ethChart
  },
  {
    name: 'Tether', symbol: 'USDT', price: 1.00,
    percent_change_1h: 0.0, percent_change_24h: 0.0, percent_change_7d: 0.0,
    market_cap: 100000000000, volume_24h: 45000000000,
    circulating_supply: 100000000000, max_supply: 0,
    logo: Tether,
    chart_7d: usdtChart
  },
  {
    name: 'BNB', symbol: 'BNB', price: 570,
    percent_change_1h: -0.3, percent_change_24h: 2.4, percent_change_7d: 5.0,
    market_cap: 88000000000, volume_24h: 3000000000,
    circulating_supply: 150000000, max_supply: 200000000,
    logo: BNB_logo,
    chart_7d: bnbChart
  },
  {
    name: 'Solana', symbol: 'SOL', price: 160,
    percent_change_1h: 1.2, percent_change_24h: 3.8, percent_change_7d: 12.0,
    market_cap: 72000000000, volume_24h: 2200000000,
    circulating_supply: 420000000, max_supply: 550000000,
    logo: solana_logo,
    chart_7d: solChart
  }
];

const getRandomChange = () => (Math.random() * 2 - 1).toFixed(2);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrices: (state) => {
      state.forEach(asset => {
        const priceChange = parseFloat(getRandomChange());
        asset.price = Math.max(asset.price + priceChange, 0);
        asset.percent_change_1h = parseFloat(getRandomChange());
        asset.percent_change_24h = parseFloat(getRandomChange());
        asset.percent_change_7d = parseFloat(getRandomChange());
        asset.volume_24h = asset.volume_24h + Math.floor(Math.random() * 10000000 - 5000000);
        
      });
    }
  }
});

export const { updateCryptoPrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;

