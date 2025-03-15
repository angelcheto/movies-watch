<section id="welcome-world">
    <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
        <h1>Latest Games</h1>

        {/* Display games if available */}
        <div className="game">
            <div className="image-wrap">
                <img src="./images/CoverFire.png" alt="Cover Fire" />
            </div>
            <h3>Cover Fire</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <a href="#" className="btn details-btn">Details</a>
            </div>
        </div>

        <div className="game">
            <div className="image-wrap">
                <img src="./images/ZombieLang.png" alt="Zombie Lang" />
            </div>
            <h3>Zombie Lang</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <a href="#" className="btn details-btn">Details</a>
            </div>
        </div>

        <div className="game">
            <div className="image-wrap">
                <img src="./images/MineCraft.png" alt="Minecraft" />
            </div>
            <h3>MineCraft</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <a href="#" className="btn details-btn">Details</a>
            </div>
        </div>

        {/* Display message if no games */}
        <p className="no-articles">No games yet</p>
    </div>
</section>