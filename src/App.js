import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import NewPost from './components/Posts';

import UserDetail from './components/userDetail';



function App() {



  return (
    <div className="App">
      <BrowserRouter>
      {/* <Home /> */}
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/users/:username" component={<UserDetail />} />
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;