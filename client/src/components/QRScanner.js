import React, { useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import * as jsQR from 'jsqr';

const QRScanner = ({ onScan, isScanning, t }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [uploadedData, setUploadedData] = React.useState(null);
  const [uploadError, setUploadError] = React.useState(null);

  const handleScan = (data) => {
    if (data) {
      onScan(data);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError(null);
    setUploadedData(null);

    try {
      // Convert file to bitmap data
      const bitmap = await createImageBitmap(file);
      const width = bitmap.width;
      const height = bitmap.height;

      // Draw image on canvas to get image data
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(bitmap, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);

      // Decode QR code
      const code = jsQR(imageData.data, width, height);
      if (code) {
        onScan(code.data);
        setUploadedData(code.data);
      } else {
        setUploadError(t('noQRFound'));
      }
    } catch (err) {
      console.error(err);
      setUploadError(t('failedToProcessImage'));
    } finally {
      // Reset file input
      e.target.value = '';
    }
  };

  return (
    <div className="qr-scanner-container">
      <div className="scanner-instructions">
        <h3>{t('pointCameraAtQRCode')}</h3>
        <p>{t('orUploadImageContainingQRCode')}</p>
      </div>

      <div className="scanner-wrapper">
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
          {isScanning && (
            <QrReader
              onScan={handleScan}
              style={{ width: '100%', height: '100%' }}
              delay={300}
              ref={videoRef}
            />
          )}
          {!isScanning && uploadedData && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <div>{t('scanned')}: {uploadedData}</div>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>

        {isScanning && (
          <div className="scanning-overlay">
            <div className="scanning-spinner"></div>
            <p>{t('scanning')}</p>
          </div>
        )}
      </div>

      <div className="scanner-footer">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
            id="qr-upload-input"
          />
          <label
            htmlFor="qr-upload-input"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: '#4caf50',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            {t('uploadImage')}
          </label>
          {uploadError && (
            <span style={{ color: '#f44336', marginLeft: '10px' }}>
              {uploadError}
            </span>
          )}
        </div>
        <div>
          <p>{t('demoQRCodes')}:</p>
          <code>FTF-001-APPLE-20260919</code> |
          <code>FTF-002-EGGS-20260919</code> |
          <code>FTF-003-TOMATO-20260919</code>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;