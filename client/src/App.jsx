import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MovieCatalog from './components/movies/MovieCatalog';
import MovieDetails from './components/movies/MovieDetails';
import CreateMovie from './components/movies/CreateMovie';
import EditMovie from './components/movies/EditMovie';
import GuestGuard from './components/common/GuestGuard';
import AuthGuard from './components/common/AuthGuard';

function App() {
  return (
    <AuthProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<MovieCatalog />} />
            <Route path="/movies/:movieId" element={<MovieDetails />} />

            {/* Guest-only routes */}
            <Route element={<GuestGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Authenticated-only routes */}
            <Route element={<AuthGuard />}>
              <Route path="/movies/create" element={<CreateMovie />} />
              <Route path="/movies/:movieId/edit" element={<EditMovie />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;