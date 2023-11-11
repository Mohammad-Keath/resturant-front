import './App.css';
import Auth from './pages/AuthPage';
import MainPage from './pages/mainPage';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
