import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [walletData, setWalletData] = useState({
    name: '',
    balance: '',
    currency: '',
    userId: localStorage.getItem('user').userId || '',
  });  

  // Fetch all wallets
  const fetchWallets = async () => {
    try {
      const response = await axios.get('http://localhost:8888/api/wallets');
      setWallets(response.data);
    } catch (error) {
      console.error('Error fetching wallets:', error.message);
    }
  };

  // Create a new wallet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8888/api/wallets', walletData);
      setWallets([...wallets, response.data]);
      setWalletData({ name: '', balance: '', currency: '', userId: '' });
    } catch (error) {
      console.error('Error creating wallet:', error.message);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setWalletData({
      ...walletData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  return (
    <div className="wallet-page">
      <h1>Manage Wallets</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Wallet Name:
          <input
            type="text"
            name="name"
            value={walletData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Balance:
          <input
            type="number"
            name="balance"
            value={walletData.balance}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit" className='btn'>Create Wallet</button>
      </form>

      <br />
      <br />
      
      <h2>Wallet List</h2>
      {wallets.length === 0 ? (
        <p>No wallets found.</p>
      ) : (
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id}>
              <strong>{wallet.name}</strong> - {wallet.currency} {wallet.balance}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wallets;
