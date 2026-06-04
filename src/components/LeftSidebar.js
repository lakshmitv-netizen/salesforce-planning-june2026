import React from 'react';

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='5.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M12 12l4 4' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgChevronRight = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 2l4 4-4 4' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function LeftSidebar({ onNavigateToHierarchies, onNavigateToMeasures, onNavigateToPlanConfig, currentPage }) {
  return (
    <div className="left-sidebar">
      {/* Search */}
      <div className="sidebar-search">
        <div className="search-field">
          <img src={imgSearchIcon} alt="Search" className="search-icon" />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="nav-item">
        <p>Setup Home</p>
      </div>

      <div className={`nav-item ${currentPage === 'setup' ? 'nav-item-selected' : ''}`}>
        <p>Salesforce Go</p>
      </div>

      <div className="nav-item">
        <p className="nav-section-header">PLANNING SETUP</p>
      </div>

      <div 
        className={`nav-item nav-item-clickable ${currentPage === 'hierarchies' ? 'nav-item-selected' : ''}`}
        onClick={onNavigateToHierarchies}
      >
        <p>Hierarchies</p>
      </div>

      <div 
        className={`nav-item nav-item-clickable ${currentPage === 'measures' ? 'nav-item-selected' : ''}`}
        onClick={onNavigateToMeasures}
      >
        <p>Measures</p>
      </div>

      <div 
        className={`nav-item nav-item-clickable ${currentPage === 'planning' ? 'nav-item-selected' : ''}`}
        onClick={onNavigateToPlanConfig}
      >
        <p>Plan Configuration</p>
      </div>

      <div className="nav-item">
        <p className="nav-section-header">ADMINISTRATION</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Users</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Data</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Email</p>
      </div>

      <div className="nav-item">
        <p className="nav-section-header">PLATFORM TOOLS</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Apps</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Feature Settings</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Slack</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Heroku</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>MuleSoft</p>
      </div>

      <div className="nav-item nav-item-expandable">
        <img src={imgChevronRight} alt="" className="chevron-icon" />
        <p>Einstein</p>
      </div>
    </div>
  );
}
