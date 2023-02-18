import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigBar from './components/NavigBar';
import FrontPage from './pages/FrontPage';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import AddCar from './pages/AddCar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigBar/>
          <Routes>
            <Route index element={<FrontPage/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/CreateAccount" element={<CreateAccount/>}/>
            <Route path="*" element={<FrontPage/>}/>
            <Route path="/AddCar" element={<AddCar/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
