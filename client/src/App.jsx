import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './services/AuthContext.jsx';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MovieDetails from './components/movies/MovieDetails';
import CreateMovie from './components/movies/CreateMovie';
import EditMovie from './components/movies/EditMovie';
import MovieCatalog from './components/movies/MovieCatalog';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<MovieCatalog />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          
          {/* Auth routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/movies/create" element={user ? <CreateMovie /> : <Navigate to="/login" replace />} />
          <Route path="/movies/:movieId/edit" element={user ? <EditMovie /> : <Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;