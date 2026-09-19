import React from 'react';

const ImpactStats = ({ product, t }) => {
  // Handle undefined product gracefully
  if (!product) {
    return <div className="impact-card">{t('loadingImpactData')}...</div>;
  }

  // Calculate impact metrics (simplified for demo)
  const typicalFarmerShare = 18; // % from presentation
  const actualFarmerShare = product.farmerPrice && product.retailPrice
    ? (product.farmerPrice / product.retailPrice * 100).toFixed(0)
    : '0';
  const improvement = actualFarmerShare !== '0'
    ? ((parseFloat(actualFarmerShare) - typicalFarmerShare) / typicalFarmerShare * 100).toFixed(0)
    : '0';

  return (
    <div className="impact-card">
      <h3>{t('impactMetrics')}</h3>
      <div className="impact-grid">
        <div className="impact-metric">
          <div className="metric-value">30%</div>
          <div className="metric-label">{t('globalFoodFraudRate')}</div>
          <div className="metric-description">{t('globalFoodFraudDescription')}</div>
        </div>

        <div className="impact-metric">
          <div className="metric-value">${product.farmerPrice ?? '0'}</div>
          <div className="metric-label">{t('farmerEarningsPerUnit')}</div>
          <div className="metric-label-secondary">{t('vsTypical')} ${(parseFloat(product.retailPrice) * 0.18).toFixed(2)}</div>
        </div>

        <div className="impact-metric">
          <div className="metric-value">{actualFarmerShare}%</div>
          <div className="metric-label">{t('farmersShareOfRetailPrice')}</div>
          <div className="metric-label-secondary">{parseFloat(actualFarmerShare) >= 0 ? '+' : ''}{improvement}% {t('vsIndustryAvg')}</div>
        </div>

        <div className="impact-metric">
          <div className="metric-value">0</div>
          <div className="metric-label">{t('paperRecordsUsed')}</div>
          <div className="metric-description">{t('paperRecordsDescription')}</div>
        </div>
      </div>

      <div className="impact-footer">
        <p><strong>{t('blockchainSecurity')}:</strong> {t('blockchainSecurityDescription')}</p>
        <p><em>{t('simulatedHash')}: {product.blockchainHash ?? '0x0000...0000'}</em></p>
      </div>
    </div>
  );
};

export default ImpactStats;