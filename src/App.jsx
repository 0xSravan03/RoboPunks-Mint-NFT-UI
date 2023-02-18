import { useState } from 'react';
import NavBar from "./components/NavBar";
import MainMint from './components/MainMint';
import './App.css';

const App = () => {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className='overlay'>
      <div className='App'>
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />
      </div>
      <div className='moving-background'></div>
    </div>
  );
}

export default App;
