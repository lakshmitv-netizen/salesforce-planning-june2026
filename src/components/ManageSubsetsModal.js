import React, { useState } from 'react';
import Toast from './Toast';

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

const imgSearchIcon = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6.5' cy='6.5' r='4.5' stroke='%23666' stroke-width='1.5'/%3E%3Cpath d='M10 10l3.5 3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E";

const imgDownIcon = "data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 9L3 5h8L7 9z' fill='%23747474'/%3E%3C/svg%3E";

const imgSparkleIcon = "data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2695 15.4912L16.0808 17.5755C14.8224 18.2027 13.8045 19.2172 13.1753 20.4715L11.084 24.6463C10.7879 25.2427 9.93041 25.2427 9.6343 24.6463L7.54304 20.4715C6.91381 19.2172 5.89594 18.2027 4.63748 17.5755L0.448789 15.4912C-0.149596 15.196 -0.149596 14.3414 0.448789 14.0463L4.63748 11.9619C5.89594 11.3348 6.91381 10.3203 7.54304 9.06597L9.6343 4.89114C9.93041 4.29473 10.7879 4.29473 11.084 4.89114L13.1753 9.06597C13.8045 10.3203 14.8224 11.3348 16.0808 11.9619L20.2695 14.0463C20.8679 14.3414 20.8679 15.196 20.2695 15.4912ZM29.4057 24.7754L27.6105 23.8777C27.0677 23.6133 26.6358 23.1706 26.3644 22.6357L25.4637 20.8465C25.3404 20.5883 24.9702 20.5883 24.8407 20.8465L23.94 22.6357C23.6748 23.1768 23.2306 23.6072 22.6939 23.8777L20.8987 24.7754C20.6397 24.8984 20.6397 25.2673 20.8987 25.3964L22.6939 26.2941C23.2368 26.5585 23.6686 27.0012 23.94 27.5361L24.8407 29.3253C24.9641 29.5835 25.3342 29.5835 25.4637 29.3253L26.3644 27.5361C26.6297 26.995 27.0738 26.5646 27.6105 26.2941L29.4057 25.3964C29.6648 25.2734 29.6648 24.9045 29.4057 24.7754ZM29.4057 4.12257L27.6105 3.22489C27.0677 2.96051 26.6358 2.51781 26.3644 1.98289L25.4637 0.193678C25.3404 -0.0645593 24.9702 -0.0645593 24.8407 0.193678L23.94 1.98289C23.6748 2.52396 23.2306 2.95436 22.6939 3.22489L20.8987 4.12257C20.6397 4.24554 20.6397 4.61445 20.8987 4.74357L22.6939 5.64125C23.2368 5.90564 23.6686 6.34833 23.94 6.88325L24.8407 8.67247C24.9641 8.93071 25.3342 8.93071 25.4637 8.67247L26.3644 6.88325C26.6297 6.34218 27.0738 5.91179 27.6105 5.64125L29.4057 4.74357C29.6648 4.6206 29.6648 4.25169 29.4057 4.12257Z' fill='%230250D9'/%3E%3C/svg%3E";

const imgSendIcon = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 10L18 2L10 18L8 11L2 10Z' fill='%230176d3' stroke='%230176d3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function ManageSubsetsModal({ isOpen, onClose, measureSubsets: propMeasureSubsets, setMeasureSubsets: propSetMeasureSubsets }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [clonePanelOpen, setClonePanelOpen] = useState(false);
  const [deletePanelOpen, setDeletePanelOpen] = useState(false);
  const [createPanelOpen, setCreatePanelOpen] = useState(false);
  const [selectedSubset, setSelectedSubset] = useState(null);
  const [measureSearchTerm, setMeasureSearchTerm] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [generatedSubset, setGeneratedSubset] = useState(null);
  const [showFormFromChat, setShowFormFromChat] = useState(false);
  const [hoveredMeasureCount, setHoveredMeasureCount] = useState(null);
  
  // Use measure subsets from props
  const subsets = propMeasureSubsets || [];
  const setSubsets = propSetMeasureSubsets || (() => {
    console.warn('setMeasureSubsets function not provided');
  });
  
  const [newSubsetForm, setNewSubsetForm] = useState({ name: '', description: '' });
  const [editSubsetForm, setEditSubsetForm] = useState({ name: '', description: '' });
  const [cloneSubsetForm, setCloneSubsetForm] = useState({ name: '', description: '' });
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  // Available measures to select from
  const availableMeasures = [
    'Sales Agreement Quantity',
    'Baseline Volume',
    'Promotional Lift',
    'Trade ROI',
    'Net Sales Value (NSV)',
    'Remaining Budget',
    'Fund Allocation',
    'Deduction Amount',
    'Forecasted Quantity',
    'Quota Attainment %',
    'Revenue Growth',
    'Market Share',
    'Customer Lifetime Value',
    'Churn Rate',
    'Average Order Value'
  ];

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleMenuAction = (action, subset) => {
    setSelectedSubset(subset);
    setOpenMenuIndex(null);
    
    if (action === 'edit') {
      setEditPanelOpen(true);
      setClonePanelOpen(false);
      setDeletePanelOpen(false);
      setCreatePanelOpen(false);
      // Load the subset's measures and form data
      setSelectedMeasures(subset.measures || []);
      setEditSubsetForm({ name: subset.name, description: subset.description });
    } else if (action === 'clone') {
      setClonePanelOpen(true);
      setEditPanelOpen(false);
      setDeletePanelOpen(false);
      setCreatePanelOpen(false);
      // Load the subset's measures for cloning
      setSelectedMeasures(subset.measures || []);
      setCloneSubsetForm({ name: `${subset.name} (Copy)`, description: subset.description });
    } else if (action === 'delete') {
      setDeletePanelOpen(true);
      setEditPanelOpen(false);
      setClonePanelOpen(false);
      setCreatePanelOpen(false);
    }
  };

  const closeEditPanel = () => {
    setEditPanelOpen(false);
    setSelectedSubset(null);
  };

  const handleViewAllMeasures = (subset) => {
    setSelectedSubset(subset);
    setEditPanelOpen(true);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
    setCreatePanelOpen(false);
    setHoveredMeasureCount(null);
    if (subset.measures) {
      setSelectedMeasures(subset.measures);
    }
  };

  const closeClonePanel = () => {
    setClonePanelOpen(false);
    setSelectedSubset(null);
  };

  const closeDeletePanel = () => {
    setDeletePanelOpen(false);
    setSelectedSubset(null);
  };

  const openCreatePanel = () => {
    setCreatePanelOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
    setSelectedMeasures([]);
    setNewSubsetForm({ name: '', description: '' });
  };

  const closeCreatePanel = () => {
    setCreatePanelOpen(false);
    setGeneratedSubset(null);
    setShowFormFromChat(false);
  };

  const handleSaveNewSubset = () => {
    if (!newSubsetForm.name.trim()) {
      return;
    }

    const newSubset = {
      id: Date.now(),
      name: newSubsetForm.name.trim(),
      description: newSubsetForm.description.trim() || '',
      measureCount: selectedMeasures.length,
      selected: false,
      lastModified: 'Just now',
      measures: selectedMeasures
    };

    setSubsets(prev => {
      const newArray = [newSubset, ...prev];
      return newArray;
    });

    closeCreatePanel();
    setShowToast(true);
  };

  const handleSaveEditSubset = () => {
    if (!editSubsetForm.name.trim()) {
      return;
    }

    const updatedSubset = {
      ...selectedSubset,
      name: editSubsetForm.name.trim(),
      description: editSubsetForm.description.trim() || '',
      measureCount: selectedMeasures.length,
      lastModified: 'Just now',
      measures: selectedMeasures
    };

    setSubsets(prev => prev.map(s => s.id === selectedSubset.id ? updatedSubset : s));

    closeEditPanel();
    setShowToast(true);
  };

  const handleSaveCloneSubset = () => {
    if (!cloneSubsetForm.name.trim()) {
      return;
    }

    const clonedSubset = {
      id: Date.now(),
      name: cloneSubsetForm.name.trim(),
      description: cloneSubsetForm.description.trim() || '',
      measureCount: selectedMeasures.length,
      selected: false,
      lastModified: 'Just now',
      measures: selectedMeasures
    };

    setSubsets(prev => [clonedSubset, ...prev]);

    closeClonePanel();
    setShowToast(true);
  };

  const toggleMeasure = (measureName) => {
    setSelectedMeasures(prev => 
      prev.includes(measureName)
        ? prev.filter(m => m !== measureName)
        : [...prev, measureName]
    );
  };

  const toggleSubsetSelection = (subsetId) => {
    setSubsets(prev => prev.map(s => 
      s.id === subsetId ? { ...s, selected: !s.selected } : s
    ));
  };

  const toggleAllSubsets = () => {
    const allSelected = subsets.every(s => s.selected);
    setSubsets(prev => prev.map(s => ({ ...s, selected: !allSelected })));
  };

  const openAiChat = () => {
    setAiChatOpen(true);
    setEditPanelOpen(false);
    setClonePanelOpen(false);
    setDeletePanelOpen(false);
    setCreatePanelOpen(false);
  };

  const closeAiChat = () => {
    setAiChatOpen(false);
    setChatMessages([]);
    setChatInput('');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      processAiResponse(userMessage);
    }, 1000);
  };

  const processAiResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    let subsetData = null;

    if (lowerInput.includes('revenue') || lowerInput.includes('sales')) {
      response = 'Created a **Revenue & Sales** subset.\n\nThis subset groups all measures related to revenue tracking, sales performance, and financial outcomes.\n\nI\'ve included measures like Net Sales Value, Revenue Growth, and Sales Agreement Quantity.';
      subsetData = {
        name: 'Revenue & Sales',
        description: 'Track revenue, sales performance, and financial outcomes',
        measures: ['Net Sales Value (NSV)', 'Revenue Growth', 'Sales Agreement Quantity', 'Average Order Value']
      };
    } else if (lowerInput.includes('budget') || lowerInput.includes('financial')) {
      response = 'Created a **Financial Planning** subset.\n\nThis subset includes measures for budget tracking, allocation, and financial planning activities.\n\nMeasures include Remaining Budget, Fund Allocation, and related financial metrics.';
      subsetData = {
        name: 'Financial Planning',
        description: 'Budget tracking and financial planning measures',
        measures: ['Remaining Budget', 'Fund Allocation', 'Deduction Amount']
      };
    } else if (lowerInput.includes('performance') || lowerInput.includes('kpi')) {
      response = 'Created a **Performance KPIs** subset.\n\nThis subset tracks key performance indicators and operational metrics.\n\nIncludes Quota Attainment, Trade ROI, Market Share, and Customer Lifetime Value.';
      subsetData = {
        name: 'Performance KPIs',
        description: 'Key performance indicators and operational metrics',
        measures: ['Quota Attainment %', 'Trade ROI', 'Market Share', 'Customer Lifetime Value']
      };
    } else {
      response = 'I can help you create measure subsets! Try describing what you want to group:\n\n• "Create a subset for revenue tracking"\n• "I need a subset for budget measures"\n• "Group performance KPIs together"';
    }

    setChatMessages(prev => [...prev, { role: 'ai', content: response }]);
    setIsAiTyping(false);

    if (subsetData) {
      setGeneratedSubset(subsetData);
    }
  };

  const handleStarterPrompt = (prompt) => {
    setChatInput(prompt);
    handleSendMessage();
  };

  const handleViewSubset = () => {
    setShowFormFromChat(true);
    setCreatePanelOpen(true);
    setAiChatOpen(false);
    if (generatedSubset?.measures) {
      setSelectedMeasures(generatedSubset.measures);
    }
  };

  const handleBackToChat = () => {
    setCreatePanelOpen(false);
    setShowFormFromChat(false);
    setAiChatOpen(true);
  };

  const filteredMeasures = availableMeasures.filter(measure => {
    const matchesSearch = measure.toLowerCase().includes(measureSearchTerm.toLowerCase());
    const matchesFilter = !showSelectedOnly || selectedMeasures.includes(measure);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-container modal-measures ${(editPanelOpen || clonePanelOpen || deletePanelOpen || createPanelOpen || aiChatOpen) ? 'with-panel' : ''}`} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Review Available Measure Subsets</h2>
          <button className="modal-close-button" onClick={onClose}>
            <img src={imgCloseIcon} alt="Close" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-simple measures-content-wrapper">
          <div className="measures-main-content">
            {/* Header Info and Buttons */}
            <div className="measures-header">
            <div className="measures-info">
              <p className="measures-title">Review Available Measure Subsets</p>
              <p className="measures-count">{subsets.length} Subsets • 100+ Measures</p>
            </div>
            <div className="measures-button-group">
              <button className="measures-sparkle-button" onClick={openAiChat}>
                <img src={imgSparkleIcon} alt="AI" />
              </button>
              <button className="measures-sync-button">Sync with Data Cloud</button>
              <button className="measures-create-button" onClick={openCreatePanel}>Create New</button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="measures-filters">
            <div className="filter-field">
              <label className="filter-label">Search</label>
              <div className="filter-search">
                <img src={imgSearchIcon} alt="Search" />
                <input type="text" placeholder="" />
              </div>
            </div>
          </div>

          {/* Subsets Table */}
          <div className="measures-table-container">
            <table className="measures-table">
              <thead>
                <tr>
                  <th className="table-cell-checkbox">
                    <input 
                      type="checkbox" 
                      checked={subsets.length > 0 && subsets.every(s => s.selected)}
                      onChange={toggleAllSubsets}
                    />
                  </th>
                  <th>Subset Name</th>
                  <th>Description</th>
                  <th>Measures</th>
                  <th>Last Modified</th>
                  <th className="table-cell-actions"></th>
                </tr>
              </thead>
              <tbody>
                {subsets.map((subset, index) => (
                  <tr 
                    key={subset.id}
                    className={(editPanelOpen || clonePanelOpen || deletePanelOpen || createPanelOpen) && selectedSubset?.id === subset.id ? 'row-selected' : ''}
                  >
                    <td className="table-cell-checkbox">
                      <input 
                        type="checkbox" 
                        checked={subset.selected} 
                        onChange={() => toggleSubsetSelection(subset.id)} 
                      />
                    </td>
                    <td style={{ cursor: 'pointer', color: '#0176d3' }} onClick={() => handleMenuAction('edit', subset)}>{subset.name}</td>
                    <td>{subset.description}</td>
                    <td 
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setHoveredMeasureCount(index)}
                      onMouseLeave={() => setHoveredMeasureCount(null)}
                    >
                      <span style={{ cursor: 'pointer', color: '#0176d3' }}>
                        {subset.measures?.length || 0} measures
                      </span>
                      {hoveredMeasureCount === index && (
                        <div className="measures-preview-popover">
                          <div className="measures-preview-list">
                            {subset.measures.slice(0, 3).map((measure, idx) => (
                              <div key={idx} className="measures-preview-item">
                                {measure}
                              </div>
                            ))}
                            {(subset.measures?.length || 0) > 3 && (
                              <div className="measures-preview-more">
                                +{(subset.measures?.length || 0) - 3} more
                              </div>
                            )}
                          </div>
                          <button 
                            className="measures-preview-view-all"
                            onClick={() => handleViewAllMeasures(subset)}
                          >
                            View All
                          </button>
                        </div>
                      )}
                    </td>
                    <td>{subset.lastModified}</td>
                    <td className="table-cell-actions">
                      <div className="table-dropdown-wrapper">
                        <button 
                          className="table-dropdown-trigger"
                          onClick={() => toggleMenu(index)}
                        >
                          <img src={imgDownIcon} alt="Actions" />
                        </button>
                        {openMenuIndex === index && (
                          <div className="table-dropdown-menu">
                            <button className="dropdown-menu-item" onClick={() => handleMenuAction('edit', subset)}>
                              Edit
                            </button>
                            <button className="dropdown-menu-item" onClick={() => handleMenuAction('clone', subset)}>
                              Clone
                            </button>
                            <button className="dropdown-menu-item" onClick={() => handleMenuAction('sync', subset)}>
                              Sync to Data Cloud
                            </button>
                            <button className="dropdown-menu-item" onClick={() => handleMenuAction('delete', subset)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Subset Panel */}
        {editPanelOpen && selectedSubset && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Edit Subset</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-cancel-button" onClick={closeEditPanel}>
                  Cancel
                </button>
                <button 
                  className="edit-panel-text-button edit-panel-save-button"
                  onClick={handleSaveEditSubset}
                  disabled={!editSubsetForm.name.trim()}
                  style={{ opacity: editSubsetForm.name.trim() ? 1 : 0.5 }}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="edit-panel-body">
              <div className="edit-form-group">
                <label className="edit-form-label">Subset Name</label>
                <input 
                  type="text" 
                  className="edit-form-input" 
                  value={editSubsetForm.name}
                  onChange={(e) => setEditSubsetForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="edit-form-group">
                <label className="edit-form-label">Description</label>
                <textarea 
                  className="edit-form-textarea" 
                  rows="3" 
                  value={editSubsetForm.description}
                  onChange={(e) => setEditSubsetForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="measure-section" style={{ marginTop: '24px' }}>
                <h4 className="measure-section-title">Measures</h4>
                <div className="subsets-controls">
                  <div className="subsets-search">
                    <img src={imgSearchIcon} alt="Search" />
                    <input 
                      type="text" 
                      placeholder="Search measures..."
                      value={measureSearchTerm}
                      onChange={(e) => setMeasureSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="subsets-toggle">
                    <label className="toggle-label">
                      <input 
                        type="checkbox" 
                        className="toggle-checkbox"
                        checked={showSelectedOnly}
                        onChange={(e) => setShowSelectedOnly(e.target.checked)}
                      />
                      <span className="toggle-text">Show selected only</span>
                    </label>
                  </div>
                </div>
                <p className="subsets-selected-count">{selectedMeasures.length} measure(s) selected</p>
                <div className="subsets-list">
                  {filteredMeasures.map((measure, idx) => (
                    <div key={idx} className="subset-item">
                      <label className="subset-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="subset-checkbox"
                          checked={selectedMeasures.includes(measure)}
                          onChange={() => toggleMeasure(measure)}
                        />
                        <span className="subset-name">{measure}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clone Subset Panel */}
        {clonePanelOpen && selectedSubset && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Clone Subset</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-cancel-button" onClick={closeClonePanel}>
                  Cancel
                </button>
                <button 
                  className="edit-panel-text-button edit-panel-save-button"
                  onClick={handleSaveCloneSubset}
                  disabled={!cloneSubsetForm.name.trim()}
                  style={{ opacity: cloneSubsetForm.name.trim() ? 1 : 0.5 }}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="edit-panel-body">
              <div className="edit-form-group">
                <label className="edit-form-label">Subset Name</label>
                <input 
                  type="text" 
                  className="edit-form-input" 
                  value={cloneSubsetForm.name}
                  onChange={(e) => setCloneSubsetForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="edit-form-group">
                <label className="edit-form-label">Description</label>
                <textarea 
                  className="edit-form-textarea" 
                  rows="3" 
                  value={cloneSubsetForm.description}
                  onChange={(e) => setCloneSubsetForm(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="measure-section" style={{ marginTop: '24px' }}>
                <h4 className="measure-section-title">Measures</h4>
                <div className="subsets-controls">
                  <div className="subsets-search">
                    <img src={imgSearchIcon} alt="Search" />
                    <input 
                      type="text" 
                      placeholder="Search measures..."
                      value={measureSearchTerm}
                      onChange={(e) => setMeasureSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="subsets-toggle">
                    <label className="toggle-label">
                      <input 
                        type="checkbox" 
                        className="toggle-checkbox"
                        checked={showSelectedOnly}
                        onChange={(e) => setShowSelectedOnly(e.target.checked)}
                      />
                      <span className="toggle-text">Show selected only</span>
                    </label>
                  </div>
                </div>
                <p className="subsets-selected-count">{selectedMeasures.length} measure(s) selected</p>
                <div className="subsets-list">
                  {filteredMeasures.map((measure, idx) => (
                    <div key={idx} className="subset-item">
                      <label className="subset-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="subset-checkbox"
                          checked={selectedMeasures.includes(measure)}
                          onChange={() => toggleMeasure(measure)}
                        />
                        <span className="subset-name">{measure}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Subset Panel */}
        {deletePanelOpen && selectedSubset && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              <h3 className="edit-panel-title">Delete Subset</h3>
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-cancel-button" onClick={closeDeletePanel}>
                  Cancel
                </button>
                <button className="edit-panel-text-button edit-panel-delete-button">
                  Delete
                </button>
              </div>
            </div>
            <div className="edit-panel-body">
              <p style={{ marginBottom: '16px', color: '#444' }}>
                Are you sure you want to delete the subset <strong>"{selectedSubset.name}"</strong>?
              </p>
              <p style={{ color: '#666', fontSize: '14px' }}>
                This action cannot be undone. The measures will not be deleted, only the subset grouping will be removed.
              </p>
            </div>
          </div>
        )}

        {/* Create New Subset Panel */}
        {createPanelOpen && (
          <div className="edit-panel">
            <div className="edit-panel-header">
              {showFormFromChat && (
                <button className="ai-breadcrumb" onClick={handleBackToChat}>
                  ← Back to Chat
                </button>
              )}
              {!showFormFromChat && (
                <h3 className="edit-panel-title">Create New Subset</h3>
              )}
              <div className="edit-panel-header-actions">
                <button className="edit-panel-text-button edit-panel-cancel-button" onClick={closeCreatePanel}>
                  Cancel
                </button>
                <button 
                  className="edit-panel-text-button edit-panel-save-button" 
                  onClick={handleSaveNewSubset}
                  disabled={!newSubsetForm.name.trim()}
                  style={{ opacity: newSubsetForm.name.trim() ? 1 : 0.5 }}
                >
                  Save
                </button>
              </div>
            </div>

            <div className="edit-panel-body">
              <div className="edit-form-group">
                <label className="edit-form-label">Subset Name</label>
                <input 
                  type="text" 
                  className="edit-form-input" 
                  value={newSubsetForm.name}
                  onChange={(e) => setNewSubsetForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter subset name"
                />
              </div>
              <div className="edit-form-group">
                <label className="edit-form-label">Description</label>
                <textarea 
                  className="edit-form-textarea" 
                  rows="3" 
                  value={newSubsetForm.description}
                  onChange={(e) => setNewSubsetForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description (optional)"
                />
              </div>

              <div className="measure-section" style={{ marginTop: '24px' }}>
                <h4 className="measure-section-title">Measures</h4>
                <div className="subsets-controls">
                  <div className="subsets-search">
                    <img src={imgSearchIcon} alt="Search" />
                    <input 
                      type="text" 
                      placeholder="Search measures..."
                      value={measureSearchTerm}
                      onChange={(e) => setMeasureSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="subsets-toggle">
                    <label className="toggle-label">
                      <input 
                        type="checkbox" 
                        className="toggle-checkbox"
                        checked={showSelectedOnly}
                        onChange={(e) => setShowSelectedOnly(e.target.checked)}
                      />
                      <span className="toggle-text">Show selected only</span>
                    </label>
                  </div>
                </div>
                <p className="subsets-selected-count">{selectedMeasures.length} measure(s) selected</p>
                <div className="subsets-list">
                  {filteredMeasures.map((measure, idx) => (
                    <div key={idx} className="subset-item">
                      <label className="subset-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="subset-checkbox"
                          checked={selectedMeasures.includes(measure)}
                          onChange={() => toggleMeasure(measure)}
                        />
                        <span className="subset-name">{measure}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Chat Panel */}
        {aiChatOpen && (
          <div className="edit-panel ai-chat-panel">
            <div className="edit-panel-header ai-chat-header">
              <h3 className="ai-chat-title">Agentforce</h3>
              <button className="ai-chat-close" onClick={closeAiChat}>
                <img src={imgCloseIcon} alt="Close" />
              </button>
            </div>
            <div className="ai-chat-body">
              <div className="ai-chat-messages">
                {chatMessages.length === 0 && (
                  <div className="ai-starter-prompts">
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('Create a subset for revenue and sales tracking')}
                    >
                      Create a subset for revenue and sales tracking
                    </button>
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('Group all budget-related measures together')}
                    >
                      Group all budget-related measures together
                    </button>
                    <button 
                      className="ai-starter-prompt"
                      onClick={() => handleStarterPrompt('I need a subset for performance KPIs')}
                    >
                      I need a subset for performance KPIs
                    </button>
                  </div>
                )}

                {chatMessages.map((message, idx) => (
                  <div key={idx} className={`ai-chat-message ${message.role}`}>
                    <div className="ai-message-bubble">
                      {message.content}
                      {message.role === 'ai' && generatedSubset && idx === chatMessages.length - 1 && (
                        <button className="ai-view-button" onClick={handleViewSubset}>
                          View
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isAiTyping && (
                  <div className="ai-chat-message ai">
                    <div className="ai-message-bubble">
                      <div className="ai-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ai-chat-input-container">
                <input
                  type="text"
                  className="ai-chat-input"
                  placeholder="Describe what measures you want to group..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button className="ai-chat-send-button" onClick={handleSendMessage}>
                  <img src={imgSendIcon} alt="Send" />
                </button>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button 
            className="modal-done-button" 
            onClick={onClose}
            disabled={editPanelOpen || clonePanelOpen || deletePanelOpen || createPanelOpen || aiChatOpen}
          >
            Done
          </button>
        </div>
      </div>
      
      {showToast && (
        <Toast 
          message="Subset created successfully" 
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
