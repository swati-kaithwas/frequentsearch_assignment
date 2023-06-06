import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import AllData from './components/AllData';
import Registration from './components/Registration';

function App() {
  return (
    <div >
     
      <Routes>
      <Route path="/" element={ <Registration/>}/>
        <Route path='/all' element={<AllData/>}/>
      </Routes>
    </div>
  );
}

export default App;
