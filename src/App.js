
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';


function App() {



  return (
    <BrowserRouter>
    <div className="background">
      <Header/>
      <Routes>
      <Route exact path='/'Component={Homepage}/>
      <Route  path='/coins/:id'Component={Coinpage}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
