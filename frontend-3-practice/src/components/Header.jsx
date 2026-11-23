function Header() {
    return (
        <header className="header">
          <div className="logo">
            <span className="logo-text">LA MODE</span>
          </div>
          <div className="navigation">
            <div className="back-button">
            <span className="back-button-text">← На главную</span>
          </div>
          <div className="location">
            <span className="location-text">Онлайн-запись</span>
          </div>
          </div>
      </header>
    );
}

export default Header;