function StepIndicator() {
    return (
        <div className="step-indicator">
          <div className="step done">
            <div className="circle"><span>✓</span></div>
            <span className="step-label">Мастер</span>
          </div>
          <div className="step done">
            <div className="circle"><span>✓</span></div>
            <span className="step-label">Услуга</span>
          </div>
          <div className="step current">
            <div className="circle"><span>3</span></div>
            <span className="step-label">Дата и время</span>
          </div>
          <div className="step">
            <div className="circle"><span>4</span></div>
            <span className="step-label">Контакты</span>
          </div>
          <div className="step">
            <div className="circle"><span>5</span></div>
            <span className="step-label">Подтверждение</span>
          </div>
        </div>
    );
}

export default StepIndicator;