import React from 'react';

const ProductDisplay = ({ product, t }) => {
  // Handle undefined product gracefully
  if (!product) {
    return <div className="product-card">{t('productDetails')}...</div>;
  }

  const farmerSharePercentage = product.farmerPrice && product.retailPrice
    ? (product.farmerPrice / product.retailPrice * 100).toFixed(0)
    : '0';

  return (
    <div className="product-card">
      <div className="product-header">
        <h2>{product.name ?? t('unknownProduct')}</h2>
        <div className="product-meta">
          <span className="farm-badge">🌾 {product.farm ?? t('unknownFarm')}</span>
          <span className="location-badge">📍 {product.location ?? t('unknownLocation')}</span>
          <span className="date-badge">📅 {product.harvestDate ?? t('unknownDate')}</span>
        </div>
      </div>

      <div className="product-details">
        <h3>{t('productDetails')}</h3>
        <div className="detail-row">
          <span className="detail-label">{t('farmerPrice')}:</span>
          <span className="detail-value">${product.farmerPrice ?? '0'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('retailPrice')}:</span>
          <span className="detail-value">${product.retailPrice ?? '0'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('farmersShare')}:</span>
          <span className="detail-value">{farmerSharePercentage}%</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('organic')}:</span>
          <span className="detail-value">
            {(product?.farmingPractices?.organic) === true ? t('yes') :
             (product?.farmingPractices?.organic) === false ? t('no') : t('unknown')}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('pesticideUse')}:</span>
          <span className="detail-value">
            {product?.farmingPractices?.pesticideUse ?? t('unknown')}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('waterSource')}:</span>
          <span className="detail-value">
            {product?.farmingPractices?.waterSource ?? t('unknown')}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{t('certifications')}:</span>
          <span className="detail-value">
            {Array.isArray(product?.certifications)
              ? product.certifications.join(', ')
              : t('none')}
          </span>
        </div>
      </div>

      {Array.isArray(product?.journey) && product.journey.length > 0 ? (
        <div className="journey-section">
          <h3>{t('productJourney')}</h3>
          <div className="journey-timeline">
            {product.journey.map((stage, index) => (
              <div key={index} className="journey-step">
                <div className="step-circle">
                  {index + 1}
                </div>
                <div className="step-content">
                  <h4>{stage.stage ?? t('unknownStage')}</h4>
                  <p><strong>{t('location')}:</strong> {stage.location ?? t('unknownLocation')}</p>
                  <p><strong>{t('time')}:</strong> {stage.timestamp ? new Date(stage.timestamp).toLocaleString() : t('unknownTime')}</p>
                  <p><em>{stage.details ?? t('noDetailsAvailable')}</em></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="journey-section">
          <h3>{t('productJourney')}</h3>
          <p>{t('noJourneyData')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;