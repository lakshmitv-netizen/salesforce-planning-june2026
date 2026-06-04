import React, { useState } from 'react';
import ManageHierarchiesModal from './ManageHierarchiesModal';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgFilterIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4h12M4 8h8M6 12h4' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgRefreshIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 8a6 6 0 11-12 0 6 6 0 0112 0z' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 6l2 2-2 2' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgSuccessIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='7' fill='%2306914d'/%3E%3Cpath d='M5 8l2 2 4-4' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function HierarchySetupPage({ onNavigateBack, hierarchies: propHierarchies, setHierarchies: propSetHierarchies }) {
  const [showManageModal, setShowManageModal] = useState(false);
  
  // Use the hierarchies from props, default to empty array
  const hierarchies = propHierarchies || [];

  return (
    <div className="hierarchy-setup-page">
      <div className="page-header">
        <div className="page-title-section">
          <button className="back-button" onClick={onNavigateBack}>← Back to Setup</button>
          <div>
            <h1 className="page-title">Hierarchy Setup</h1>
            <p className="page-subtitle">2 Dimensions • {hierarchies.length} Hierarchies Available</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="page-button page-button-secondary">
            Sync with Data Cloud
          </button>
          <button 
            className="page-button page-button-primary"
            onClick={() => setShowManageModal(true)}
          >
            Manage Hierarchies
          </button>
        </div>
      </div>

      <div className="page-card">
        <div className="page-card-header">
          <p className="page-card-description">
            Setup the dimensions and manage hierarchy configurations for your planning
          </p>
          <div className="page-search-controls">
            <div className="page-search">
              <img src={imgSearchIcon} alt="Search" />
              <input type="text" placeholder="Search hierarchies..." />
            </div>
            <button className="page-icon-button">
              <img src={imgFilterIcon} alt="Filter" />
            </button>
            <button className="page-icon-button">
              <img src={imgRefreshIcon} alt="Refresh" />
            </button>
          </div>
        </div>

        <div className="page-table-container">
          <table className="page-table">
            <thead>
              <tr>
                <th className="table-cell-checkbox">
                  <input type="checkbox" />
                </th>
                <th>Hierarchy</th>
                <th>Dimension</th>
                <th>Levels</th>
                <th>Data Status</th>
                <th>Last Sync</th>
                <th className="table-cell-actions"></th>
              </tr>
            </thead>
            <tbody>
              {hierarchies.map((hierarchy) => (
                <tr key={hierarchy.id} className={hierarchy.isActive ? 'row-active' : ''}>
                  <td className="table-cell-checkbox">
                    <input type="checkbox" />
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#0176d3', cursor: 'pointer', fontWeight: hierarchy.isActive ? '600' : '400' }}>
                        {hierarchy.name}
                      </span>
                      {hierarchy.isActive && (
                        <span className="active-badge">ACTIVE</span>
                      )}
                    </div>
                  </td>
                  <td>{hierarchy.dimension}</td>
                  <td>{hierarchy.numLevels} levels</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img src={imgSuccessIcon} alt="Synced" style={{ width: '16px', height: '16px' }} />
                      <span>{hierarchy.dataStatus}</span>
                    </div>
                  </td>
                  <td style={{ color: '#706e6b' }}>{hierarchy.lastSync}</td>
                  <td className="table-cell-actions">
                    <button className="table-row-dropdown">⋮</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showManageModal && (
        <ManageHierarchiesModal 
          isOpen={showManageModal}
          onClose={() => setShowManageModal(false)}
          hierarchies={propHierarchies}
          setHierarchies={propSetHierarchies}
        />
      )}
    </div>
  );
}
