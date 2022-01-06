import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import Categories from './pages/Categories';
import Game from './pages/Game';
import CategoryDetails from './pages/CategoryDetails';
import EditPage from './pages/EditPagee';
import CreationPagee from './pages/CreationPagee';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/game/:id" element={<Game />} />
        <Route exact path="/nouveau" element={<CreationPagee />} />
        <Route exact path="/edit/:id" element={<EditPage />} />
        <Route exact path="/categories/:category" element={<CategoryDetails />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
