import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import atmABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [atm, setATM] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactionCount, setTransactionCount] = useState(null); // New state for transaction count

  useEffect(() => {
    async function loadWallet() {
      if (window.ethereum) {
        setEthWallet(window.ethereum);
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getATMContract();
        }
      } else {
        console.log("MetaMask not detected");
      }
    }
    loadWallet();
  }, []);

  const getATMContract = async () => {
    if (ethWallet) {
      const provider = new ethers.providers.Web3Provider(ethWallet);
      const signer = provider.getSigner();
      const atmContract = new ethers.Contract(contractAddress, atmABI.abi, signer);
      setATM(atmContract);
      getBalance();
      getTransactionCount(); // Call new function to fetch transaction count
    }
  };

  const getBalance = async () => {
    if (atm) {
      const balance = await atm.getBalance();
      setBalance(balance.toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      const tx = await atm.deposit(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
      increaseTransactionCount();
    }
  };

  const withdraw = async () => {
    if (atm) {
      const tx = await atm.withdraw(ethers.utils.parseEther("1.0"));
      await tx.wait();
      getBalance();
      increaseTransactionCount();
    }
  };

  const getTransactionCount = async () => {
    if (atm) {
      const count = await atm.getTransactionCount();
      setTransactionCount(count.toNumber());
    }
  };

  const increaseTransactionCount = async () => {
    if (atm) {
      await atm.increaseTransactionCount();
      getTransactionCount(); 
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p className="message">Please install MetaMask to use this app.</p>;
    }
    if (!account) {
      return (
        <button className="connectButton" onClick={connectAccount}>
          Connect MetaMask
        </button>
      );
    }
    return (
      <div className="userDetails">
        <p className="account">Your Account: {account}</p>
        <p className="balance">Your Balance: {balance} ETH</p>
        <p className="transactionCount">Transaction Count: {transactionCount}</p> {/* Display transaction count */}
        <div className="buttons">
          <button onClick={deposit}>Deposit 1 ETH</button>
          <button onClick={withdraw}>Withdraw 1 ETH</button>
        </div>
        <style jsx>{`
        .connectButton {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .connectButton:hover {
          background-color: #45a049;
        }
        .userDetails {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 500px;
          text-align: center;
        }
        .account {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        .balance {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #4caf50;
        }
        .transactionCount {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        button {
          padding: 12px 24px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
      </div>
    );
  };

  const connectAccount = async () => {
    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      getATMContract();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container">
      <header>
        <h1>METACRAFTERS ETH WALLET</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
        }
        header {
          margin-bottom: 20px;
        }
        h1 {
          color: #333;
        }
        .message {
          font-size: 18px;
          color: #888;
        }
        .connectButton {
          padding: 10px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .connectButton:hover {
          background-color: #45a049;
        }
        .userDetails {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 300px;
          text-align: center;
        }
        .account {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        .balance {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #4caf50;
        }
        .transactionCount {
          font-size: 18px;
          margin-bottom: 10px;
          color: #333;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        button {
          padding: 12px 24px;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </main>
  );
}
