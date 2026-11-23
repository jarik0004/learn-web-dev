function Footer() {
    return (
        <footer className="footer">
        <div className="footer-cols">
          <div className="company">
            <div className="logo">
              <span className="logo-text">LA MODE</span>
            </div>
            <div className="slogan">
              <span className="slogan-text">Ваш образ. Ваше настроение.<br/>С заботой о вас и ваших волосах.</span>
            </div>
          </div>
          <div className="contacts">
            <div className="heading">
              <span className="heading-text">КОНТАКТЫ</span>
            </div>
            <div className="under-heading">
              <div className="adress">
                <span className="adress-text">ул. Садовая, 15, Москва</span>
              </div>
              <div className="phone">
                <span className="phone-text">+7 (495) 123-45-67</span>
              </div>
            </div>
          </div>
          <div className="work-mode">
            <div className="heading">
              <span className="heading-text">РЕЖИМ РАБОТЫ</span>
            </div>
            <div className="under-heading">
              <div className="weekdays">
                <span className="weekdays-text">Пн–Пт: 9:00 – 21:00</span>
              </div>
              <div className="weekend">
                <span className="weekend-text">Сб–Вс: 10:00 – 19:00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="rights">
            <span className="rights-text">© 2026 LA MODE. Все права защищены.</span>
          </div>
          <button className="policy">Политика конфиденциальности</button>
        </div>
      </footer>
    );
}

export default Footer;