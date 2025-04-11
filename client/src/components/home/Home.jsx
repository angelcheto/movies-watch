import { Link } from 'react-router-dom';
import '@styles/home.css'; 

const Home = () => {
  return (
    <main className="home-container">
      <section className="welcome-banner">
        <div className="welcome-text">
          <h2>Discover the Latest Cinematic Masterpieces</h2>
          <h3>Exclusively on MovieHub</h3>
        </div>
        <img 
          src="/images/cinema_banner.jpg" 
          alt="Cinema audience watching a movie" 
          className="welcome-image"
          onError={(e) => e.target.src = '/images/default_banner.jpg'}
        />
      </section>

      <section className="cta-section">
        <h2>Start Exploring Now</h2>
        <div className="cta-buttons">
          <Link to="/catalog" className="cta-button">
            Browse All Movies
          </Link>
          <Link to="/login" className="cta-button">
            Join Our Community
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;