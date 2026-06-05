import React from 'react';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

export default function TimeGranularityModal({ isOpen, onClose, timeGranularities, setTimeGranularities }) {
  if (!isOpen) return null;

  const handleToggle = (granularity) => {
    setTimeGranularities(prev => ({
      ...prev,
      [granularity]: !prev[granularity]
    }));
  };

  const granularityOptions = [
    { key: 'Weekly', label: 'Weekly' },
    { key: 'Monthly', label: 'Monthly' },
    { key: 'Quarterly', label: 'Quarterly' },
    { key: 'Yearly', label: 'Yearly' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container modal-container-compact" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', width: '500px' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Setup Time Granularity</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ padding: '20px 24px' }}>
          <p style={{ 
            fontSize: '14px', 
            color: '#666', 
            marginBottom: '16px',
            lineHeight: '1.4',
            margin: '0 0 16px 0'
          }}>
            Select the time granularities that will be available in your planning grid configurations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {granularityOptions.map(option => (
              <label 
                key={option.key}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#333'
                }}
              >
                <input
                  type="checkbox"
                  checked={timeGranularities[option.key]}
                  onChange={() => handleToggle(option.key)}
                  style={{ 
                    marginRight: '10px',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ padding: '12px 24px', gap: '8px' }}>
          <button 
            className="modal-button modal-button-secondary" 
            onClick={onClose}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              border: '1px solid #d0d0d0',
              backgroundColor: '#fff',
              color: '#333',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            className="modal-button modal-button-primary" 
            onClick={onClose}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              border: 'none',
              backgroundColor: '#0176d3',
              color: '#fff',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
