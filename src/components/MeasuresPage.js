import React, { useState } from 'react';
import ManageMeasuresModal from './ManageMeasuresModal';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgFilterIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4h12M4 8h8M6 12h4' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgRefreshIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 8a6 6 0 11-12 0 6 6 0 0112 0z' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 6l2 2-2 2' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgSparkleIcon = "data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2695 15.4912L16.0808 17.5755C14.8224 18.2027 13.8045 19.2172 13.1753 20.4715L11.084 24.6463C10.7879 25.2427 9.93041 25.2427 9.6343 24.6463L7.54304 20.4715C6.91381 19.2172 5.89594 18.2027 4.63748 17.5755L0.448789 15.4912C-0.149596 15.196 -0.149596 14.3414 0.448789 14.0463L4.63748 11.9619C5.89594 11.3348 6.91381 10.3203 7.54304 9.06597L9.6343 4.89114C9.93041 4.29473 10.7879 4.29473 11.084 4.89114L13.1753 9.06597C13.8045 10.3203 14.8224 11.3348 16.0808 11.9619L20.2695 14.0463C20.8679 14.3414 20.8679 15.196 20.2695 15.4912ZM29.4057 24.7754L27.6105 23.8777C27.0677 23.6133 26.6358 23.1706 26.3644 22.6357L25.4637 20.8465C25.3404 20.5883 24.9702 20.5883 24.8407 20.8465L23.94 22.6357C23.6748 23.1768 23.2306 23.6072 22.6939 23.8777L20.8987 24.7754C20.6397 24.8984 20.6397 25.2673 20.8987 25.3964L22.6939 26.2941C23.2368 26.5585 23.6686 27.0012 23.94 27.5361L24.8407 29.3253C24.9641 29.5835 25.3342 29.5835 25.4637 29.3253L26.3644 27.5361C26.6297 26.995 27.0738 26.5646 27.6105 26.2941L29.4057 25.3964C29.6648 25.2734 29.6648 24.9045 29.4057 24.7754ZM29.4057 4.12257L27.6105 3.22489C27.0677 2.96051 26.6358 2.51781 26.3644 1.98289L25.4637 0.193678C25.3404 -0.0645593 24.9702 -0.0645593 24.8407 0.193678L23.94 1.98289C23.6748 2.52396 23.2306 2.95436 22.6939 3.22489L20.8987 4.12257C20.6397 4.24554 20.6397 4.61445 20.8987 4.74357L22.6939 5.64125C23.2368 5.90564 23.6686 6.34833 23.94 6.88325L24.8407 8.67247C24.9641 8.93071 25.3342 8.93071 25.4637 8.67247L26.3644 6.88325C26.6297 6.34218 27.0738 5.91179 27.6105 5.64125L29.4057 4.74357C29.6648 4.6206 29.6648 4.25169 29.4057 4.12257Z' fill='%230250D9'/%3E%3C/svg%3E";

export default function MeasuresPage({ onNavigateBack }) {
  const [showManageModal, setShowManageModal] = useState(false);
  const [measures] = useState([
    { id: 1, name: 'Sales Agreement Quantity', subsets: 'SalesAgreement +3 more', unit: 'volume', dataType: 'Number', aggregation: 'Sum', type: 'Read' },
    { id: 2, name: 'Baseline Volume', subsets: 'Baseline +2 more', unit: 'volume', dataType: 'Number', aggregation: 'Sum', type: 'Write' },
    { id: 3, name: 'Promotional Lift', subsets: 'Promotions +2 more', unit: 'volume', dataType: 'Number', aggregation: 'Sum', type: 'Write' },
    { id: 4, name: 'Trade ROI', subsets: 'Trade +3 more', unit: '%', dataType: 'Percent', aggregation: 'Average', type: 'Read' },
    { id: 5, name: 'Net Sales Value (NSV)', subsets: 'Revenue +2 more', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', type: 'Read' },
    { id: 6, name: 'Remaining Budget', subsets: 'Budget +2 more', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', type: 'Write' },
    { id: 7, name: 'Fund Allocation', subsets: 'Fund +3 more', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', type: 'Write' },
    { id: 8, name: 'Deduction Amount', subsets: 'Deductions +1 more', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', type: 'Read' },
    { id: 9, name: 'Forecasted Quantity', subsets: 'Forecast +2 more', unit: 'volume', dataType: 'Number', aggregation: 'Sum', type: 'Write' },
    { id: 10, name: 'Weighted Pipeline', subsets: 'Pipeline +2 more', unit: 'currency', dataType: 'Currency', aggregation: 'Sum', type: 'Read' },
    { id: 11, name: 'Quota Attainment %', subsets: 'Quota +3 more', unit: '%', dataType: 'Percent', aggregation: 'Average', type: 'Read' },
    { id: 12, name: 'Win Rate', subsets: 'Performance +2 more', unit: '%', dataType: 'Percent', aggregation: 'Average', type: 'Read' },
    { id: 13, name: 'Performance', subsets: 'Performance +2 more', unit: 'score', dataType: 'Number', aggregation: 'Average', type: 'Write' },
  ]);

  return (
    <div className="measures-page">
      <div className="page-header">
        <div className="page-title-section">
          <button className="back-button" onClick={onNavigateBack}>← Back to Setup</button>
          <div>
            <h1 className="page-title">Measures Configuration</h1>
            <p className="page-subtitle">100+ Measures • 10+ Subsets</p>
          </div>
        </div>
        <div className="page-actions">
          <button className="page-button page-button-icon">
            <img src={imgSparkleIcon} alt="AI" style={{ width: '24px', height: '24px' }} />
          </button>
          <button className="page-button page-button-secondary">
            Sync with Data Cloud
          </button>
          <button className="page-button page-button-secondary">
            Assign to Subset
          </button>
          <button 
            className="page-button page-button-primary"
            onClick={() => setShowManageModal(true)}
          >
            Review Available Measures
          </button>
        </div>
      </div>

      <div className="page-card">
        <div className="page-card-header">
          <p className="page-card-description">
            Configure and manage measures for your planning and forecasting needs
          </p>
          <div className="page-search-controls">
            <div className="page-search">
              <img src={imgSearchIcon} alt="Search" />
              <input type="text" placeholder="Search measures..." />
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
                <th>Measure Name</th>
                <th>Measure Subsets</th>
                <th>Unit</th>
                <th>Data Type</th>
                <th>Aggregation</th>
                <th>Type</th>
                <th className="table-cell-actions"></th>
              </tr>
            </thead>
            <tbody>
              {measures.map((measure) => (
                <tr key={measure.id}>
                  <td className="table-cell-checkbox">
                    <input type="checkbox" />
                  </td>
                  <td style={{ color: '#0176d3', cursor: 'pointer' }}>{measure.name}</td>
                  <td style={{ color: '#706e6b' }}>{measure.subsets}</td>
                  <td>{measure.unit}</td>
                  <td>{measure.dataType}</td>
                  <td>{measure.aggregation}</td>
                  <td>
                    <span className={`type-badge type-${measure.type.toLowerCase()}`}>
                      {measure.type}
                    </span>
                  </td>
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
        <ManageMeasuresModal 
          isOpen={showManageModal}
          onClose={() => setShowManageModal(false)}
        />
      )}
    </div>
  );
}
