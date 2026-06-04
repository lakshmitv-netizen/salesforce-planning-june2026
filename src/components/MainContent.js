import React, { useState } from 'react';
import ManageUserAccessModal from './ManageUserAccessModal';
import ManageHierarchiesModal from './ManageHierarchiesModal';
import ManageMeasuresModal from './ManageMeasuresModal';
import ManageSubsetsModal from './ManageSubsetsModal';

const imgCheckIcon = "data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 7.5l3 3 6-6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgCustomAppsIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='3' height='3' fill='%230b5cab'/%3E%3Crect x='7' y='2' width='3' height='3' fill='%230b5cab'/%3E%3Crect x='2' y='7' width='3' height='3' fill='%230b5cab'/%3E%3Crect x='7' y='7' width='3' height='3' fill='%230b5cab'/%3E%3C/svg%3E";

const imgSettingsIcon = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='6' cy='6' r='2' stroke='%230b5cab' stroke-width='1.5'/%3E%3Cpath d='M4.5 2l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1zM7.5 7l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z' fill='%230b5cab'/%3E%3C/svg%3E";

const imgChevronDown = "data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23181818' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

const imgCloseIcon = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='%23666' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";

export default function MainContent({ onNavigateToPlanningView, onNavigateToHierarchies, hierarchies, setHierarchies, measures, setMeasures, measureSubsets, setMeasureSubsets }) {
  // State for nested step checkboxes
  const [checkboxStates, setCheckboxStates] = useState({
    'step-2': false,
    '3.1.1': false,
    'hierarchy-across': false,
    '3.2.1': false,
    '3.2.2': false,
    '3.2.3': false,
    '3.3.1': false,
    'step-time': false,
  });

  // Calculate progress for step 1 (based on automatic steps 1-3)
  const getStep1Progress = () => {
    if (!dataCloudEnabled) return 0;
    const totalSteps = 3;
    const completedCount = completedAutoSteps.length;
    return (completedCount / totalSteps) * 100;
  };

  // Calculate progress for step 3.1 (3.1.1 checkbox + 3.1.2 checkbox)
  const getStep31Progress = () => {
    const childSteps = ['3.1.1', 'hierarchy-across'];
    const completed = childSteps.filter(step => checkboxStates[step]).length;
    return (completed / childSteps.length) * 100;
  };

  // Calculate progress for step 3.2 (only direct children: 3.2.1, 3.2.2, 3.2.3)
  const getStep32Progress = () => {
    const childSteps = ['3.2.1', '3.2.2', '3.2.3'];
    const completed = childSteps.filter(step => checkboxStates[step]).length;
    return (completed / childSteps.length) * 100;
  };

  // Calculate progress for step 3.3 (time granularity - both 3.3.1 and step-time)
  const getStep33Progress = () => {
    const childSteps = ['3.3.1', 'step-time'];
    const completed = childSteps.filter(step => checkboxStates[step]).length;
    return (completed / childSteps.length) * 100;
  };

  // Calculate progress for step 3 (Master Data Setup) based on 3.1, 3.2, and 3.3
  const getStep3Progress = () => {
    const step31Progress = getStep31Progress();
    const step32Progress = getStep32Progress();
    const step33Progress = getStep33Progress();
    return (step31Progress + step32Progress + step33Progress) / 3;
  };

  // State for section expand/collapse
  const [expandedSections, setExpandedSections] = useState({
    'required-steps': true,
    'advanced-functionality': false,
    'section-1': true,
    'section-2': true,
    'section-3': true,
    'section-4': true,
  });

  // State for Data Cloud toggle and automatic steps
  const [dataCloudEnabled, setDataCloudEnabled] = useState(false);
  const [completedAutoSteps, setCompletedAutoSteps] = useState([]);

  // State for modals
  const [isUserAccessModalOpen, setIsUserAccessModalOpen] = useState(false);
  const [isHierarchiesModalOpen, setIsHierarchiesModalOpen] = useState(false);
  const [isMeasuresModalOpen, setIsMeasuresModalOpen] = useState(false);
  const [isSubsetsModalOpen, setIsSubsetsModalOpen] = useState(false);
  const [isFlowPromptOpen, setIsFlowPromptOpen] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState(null);
  const [isPlanningHorizonModalOpen, setIsPlanningHorizonModalOpen] = useState(false);

  const toggleCheckbox = (id) => {
    setCheckboxStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDataCloudToggle = (e) => {
    const isChecked = e.target.checked;
    setDataCloudEnabled(isChecked);
    
    if (isChecked) {
      // Animate steps appearing one by one
      setCompletedAutoSteps([]);
      setTimeout(() => setCompletedAutoSteps([1]), 300);
      setTimeout(() => setCompletedAutoSteps([1, 2]), 600);
      setTimeout(() => setCompletedAutoSteps([1, 2, 3]), 900);
    } else {
      setCompletedAutoSteps([]);
    }
  };

  const openUserAccessModal = () => setIsUserAccessModalOpen(true);
  const closeUserAccessModal = () => setIsUserAccessModalOpen(false);

  const openHierarchiesModal = () => setIsHierarchiesModalOpen(true);
  const closeHierarchiesModal = () => setIsHierarchiesModalOpen(false);

  const openMeasuresModal = () => setIsMeasuresModalOpen(true);
  const closeMeasuresModal = () => setIsMeasuresModalOpen(false);

  const openSubsetsModal = () => setIsSubsetsModalOpen(true);
  const closeSubsetsModal = () => setIsSubsetsModalOpen(false);

  const openPlanningHorizonModal = () => setIsPlanningHorizonModalOpen(true);
  const closePlanningHorizonModal = () => setIsPlanningHorizonModalOpen(false);

  const openFlowPrompt = (flowId) => {
    setCurrentFlowId(flowId);
    setIsFlowPromptOpen(true);
  };
  
  const closeFlowPrompt = () => {
    if (currentFlowId) {
      setCheckboxStates(prev => ({
        ...prev,
        [currentFlowId]: true
      }));
    }
    setIsFlowPromptOpen(false);
    setCurrentFlowId(null);
  };

  // Progress Ring Component
  const ProgressRing = ({ progress }) => {
    const radius = 9;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    // If 100% complete, show green filled circle with white checkmark
    if (progress === 100) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" className="progress-ring">
          <circle
            cx="12"
            cy="12"
            r="12"
            fill="#2e844a"
          />
          <image href={imgCheckIcon} x="4.5" y="4.5" width="15" height="15" />
        </svg>
      );
    }
    
    // Otherwise show progress ring
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" className="progress-ring">
        {/* Background circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#0176d3"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 12 12)"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
    );
  };

  return (
    <div className="main-content-area">
      {/* Turn On Card */}
      <div className="turn-on-card">
        <div className="turn-on-content">
          <div className="turn-on-text">
            <h2 className="turn-on-title">Turn On Commercial Planning and Forecasting</h2>
            <div className="turn-on-links">
              <a href="#" className="setup-link">
                <img src={imgCustomAppsIcon} alt="" />
                <span>Preview Default Settings</span>
              </a>
              <a href="#" className="setup-link">
                <img src={imgSettingsIcon} alt="" />
                <span>See Considerations</span>
              </a>
              <a href="#" className="setup-link">
                <img src={imgSettingsIcon} alt="" />
                <span>Setup Help</span>
              </a>
            </div>
          </div>
          <button className="turn-on-button">Turn On</button>
        </div>
      </div>

      {/* Setup Section */}
      <div className="setup-section">
        <div className="setup-section-header" onClick={() => toggleSection('required-steps')} style={{ cursor: 'pointer' }}>
          <img 
            src={imgChevronDown} 
            alt="" 
            className={`chevron-icon ${expandedSections['required-steps'] ? 'expanded' : 'collapsed'}`}
          />
          <div className="setup-section-content">
            <div className="setup-section-title-area">
              <h3 className="setup-section-title">Complete the Required Steps</h3>
            </div>
            <p className="setup-section-description">
              Complete the basics, Invoke the pre-built DPEs via salesforce flows and review the out of the box settings
            </p>
          </div>
        </div>

        {/* Steps List */}
        {expandedSections['required-steps'] && (
        <div className="setup-steps">
          {/* Step 1: Enable Data Cloud */}
          <div className="setup-step">
            <div className="step-indicator">
              <div className="step-icon-progress">
                <ProgressRing progress={getStep1Progress()} />
              </div>
            </div>
            <div className="step-content">
              <div className="step-header-row">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, cursor: 'pointer' }} onClick={() => toggleSection('section-1')}>
                  <img 
                    src={imgChevronDown} 
                    alt="" 
                    className={`step-chevron ${expandedSections['section-1'] ? 'expanded' : 'collapsed'}`}
                  />
                  <div className="step-header-text">
                    <h4 className="step-title">1. Enable Data Cloud</h4>
                    <p className="step-description">
                      Enable Data cloud to ingest, harmonize and unify data across different places
                    </p>
                  </div>
                </div>
                <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={dataCloudEnabled}
                    onChange={handleDataCloudToggle}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              {expandedSections['section-1'] && (
                <>
                  <a href="#" className="step-link">Learn More in Help</a>

                  {/* Sub-steps */}
                  <div className="sub-step">
                    <div className="sub-step-indicator">
                      <div className={`sub-step-icon ${completedAutoSteps.includes(1) ? 'sub-step-icon-blue-completed' : 'sub-step-icon-empty'}`}>
                        {completedAutoSteps.includes(1) && <img src={imgCheckIcon} alt="Completed" />}
                      </div>
                    </div>
                    <div className="sub-step-content">
                      <div className="sub-step-title-row">
                        <h5 className="sub-step-title">Install Data Kits</h5>
                        <button className="step-button">Review</button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Step 2: Manage User Access */}
          <div className="setup-step">
            <div className="step-indicator">
              <div 
                className={`nested-step-checkbox ${checkboxStates['step-2'] ? 'checked' : ''}`}
                onClick={() => toggleCheckbox('step-2')}
                style={{ cursor: 'pointer' }}
              >
                {checkboxStates['step-2'] && <img src={imgCheckIcon} alt="Checked" />}
              </div>
            </div>
            <div className="step-content">
              <div className="step-header-row" onClick={() => toggleSection('section-2')}>
                <div style={{ width: '12px' }} />
                <div className="step-header-text">
                  <h4 className="step-title">2. Manage User Profile</h4>
                  <p className="step-description">
                    Manage Commercial Planning and Forecasting permissions for all users.
                  </p>
                </div>
                <button className="step-button step-button-outlined" onClick={(e) => {
                  e.stopPropagation();
                  openUserAccessModal();
                }}>Manage</button>
              </div>
              {expandedSections['section-2'] && (
                <p className="step-progress-text">1 out of 100 assigned</p>
              )}
            </div>
          </div>

          {/* Step 3: Master Data Setup */}
          <div className="setup-step">
            <div className="step-indicator">
              <div className="step-icon-progress">
                <ProgressRing progress={getStep3Progress()} />
              </div>
            </div>
            <div className="step-content">
              <div className="step-header-row" onClick={() => toggleSection('section-3')}>
                <img 
                  src={imgChevronDown} 
                  alt="" 
                  className={`step-chevron ${expandedSections['section-3'] ? 'expanded' : 'collapsed'}`}
                />
                <div className="step-header-text">
                  <h4 className="step-title">3. Master Data Setup</h4>
                  <p className="step-description">
                    Review and make any changes if required to out of the box settings
                  </p>
                </div>
              </div>

              {expandedSections['section-3'] && (
                <>
              {/* Sub-step 3.1 */}
              <div className="sub-step">
                <div className="sub-step-indicator">
                  <div className="sub-step-icon-progress">
                    <ProgressRing progress={getStep31Progress()} />
                  </div>
                </div>
                <div className="sub-step-content">
                  <h5 className="sub-step-title">3.1 Setup the Hierarchy</h5>
                  <p className="step-description">Setup the dimensions and invoke the DPEs</p>

                  {/* Nested sub-steps */}
                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div 
                        className={`nested-step-checkbox ${checkboxStates['3.1.1'] ? 'checked' : ''}`}
                        onClick={() => toggleCheckbox('3.1.1')}
                      >
                        {checkboxStates['3.1.1'] && <img src={imgCheckIcon} alt="Checked" />}
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.1.1 Setup Hierarchies</h6>
                          <p className="nested-step-status">2 Dimensions Available • 10 Hierarchies Available</p>
                        </div>
                        <button className="step-button step-button-outlined" onClick={openHierarchiesModal}>Manage</button>
                      </div>
                    </div>
                  </div>

                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div className="nested-step-icon-progress">
                        <ProgressRing progress={checkboxStates['hierarchy-across'] ? 100 : 0} />
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.1.2 Establish data connections between hierarchies across dimensions</h6>
                          <p className="nested-step-status">Attached to flow XYZ</p>
                        </div>
                        <div className="nested-step-buttons">
                          <button className="step-button step-button-outlined" onClick={() => openFlowPrompt('hierarchy-across')}>Invoke Flow</button>
                          <button className="step-button step-button-outlined" onClick={onNavigateToPlanningView}>Go To Setup</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-step 3.2 */}
              <div className="sub-step">
                <div className="sub-step-indicator">
                  <div className="sub-step-icon-progress">
                    <ProgressRing progress={getStep32Progress()} />
                  </div>
                </div>
                <div className="sub-step-content">
                  <h5 className="sub-step-title">3.2 Review the Measures and Measure Subsets</h5>
                  <p className="step-description">View or create existing measures, add them into measure subsets</p>

                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div 
                        className={`nested-step-checkbox ${checkboxStates['3.2.1'] ? 'checked' : ''}`}
                        onClick={() => toggleCheckbox('3.2.1')}
                      >
                        {checkboxStates['3.2.1'] && <img src={imgCheckIcon} alt="Checked" />}
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.2.1 Review the Measures</h6>
                          <p className="nested-step-status">100+ Measures Available</p>
                        </div>
                        <button className="step-button step-button-outlined" onClick={openMeasuresModal}>Manage</button>
                      </div>
                    </div>
                  </div>

                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div 
                        className={`nested-step-checkbox ${checkboxStates['3.2.2'] ? 'checked' : ''}`}
                        onClick={() => toggleCheckbox('3.2.2')}
                      >
                        {checkboxStates['3.2.2'] && <img src={imgCheckIcon} alt="Checked" />}
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.2.2 Review the Measure subsets</h6>
                          <p className="nested-step-status">10+ Measure Subsets Available</p>
                        </div>
                        <button className="step-button step-button-outlined" onClick={openSubsetsModal}>Manage</button>
                      </div>
                    </div>
                  </div>

                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div className="nested-step-icon-progress">
                        <ProgressRing progress={checkboxStates['3.2.3'] ? 100 : 0} />
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.2.3 Run first time Calculations</h6>
                          <p className="nested-step-status">Attached to flow XYZ</p>
                        </div>
                        <div className="nested-step-buttons">
                          <button className="step-button step-button-outlined" onClick={() => openFlowPrompt('3.2.3')}>Invoke Flow</button>
                          <button className="step-button step-button-outlined">Go to Setup</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-step 3.3 */}
              <div className="sub-step">
                <div className="sub-step-indicator">
                  <div className="sub-step-icon-progress">
                    <ProgressRing progress={getStep33Progress()} />
                  </div>
                </div>
                <div className="sub-step-content">
                  <h5 className="sub-step-title">3.3 Configure Time Granularity</h5>

                  {/* Nested sub-steps */}
                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div 
                        className={`nested-step-checkbox ${checkboxStates['3.3.1'] ? 'checked' : ''}`}
                        onClick={() => toggleCheckbox('3.3.1')}
                      >
                        {checkboxStates['3.3.1'] && <img src={imgCheckIcon} alt="Checked" />}
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.3.1 Configure Org Calendar</h6>
                          <p className="nested-step-status">Fiscal Calendar selected by default</p>
                        </div>
                        <button className="step-button step-action-link" onClick={openPlanningHorizonModal}>Go to Org Calendar</button>
                      </div>
                    </div>
                  </div>

                  <div className="nested-step">
                    <div className="nested-step-indicator">
                      <div 
                        className={`nested-step-checkbox ${checkboxStates['step-time'] ? 'checked' : ''}`}
                        onClick={() => toggleCheckbox('step-time')}
                      >
                        {checkboxStates['step-time'] && <img src={imgCheckIcon} alt="Checked" />}
                      </div>
                    </div>
                    <div className="nested-step-content">
                      <div className="nested-step-main">
                        <div className="nested-step-text">
                          <h6 className="nested-step-title">3.3.2 Setup time granularity</h6>
                        </div>
                        <button className="step-button step-action-link" onClick={openPlanningHorizonModal}>Manage</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          </div>

          {/* Step 4: Review Plan Configurations */}
          <div className="setup-step">
            <div className="step-indicator">
              <div className="step-icon-progress">
                <ProgressRing progress={0} />
              </div>
            </div>
            <div className="step-content">
              <div className="step-header-row" onClick={() => toggleSection('section-4')}>
                <img 
                  src={imgChevronDown} 
                  alt="" 
                  className={`step-chevron ${expandedSections['section-4'] ? 'expanded' : 'collapsed'}`}
                />
                <div className="step-header-text">
                  <h4 className="step-title">4. Review Plan Configurations</h4>
                  <p className="step-description">
                    Review or make any minor changes to reuse out of the box plan configuration
                  </p>
                </div>
                <button className="step-button step-button-outlined" onClick={(e) => { e.stopPropagation(); onNavigateToPlanningView(); }}>Go To Setup</button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Unlock Advanced Functionality Section */}
      <div className="setup-section">
        <div className="setup-section-header" onClick={() => toggleSection('advanced-functionality')} style={{ cursor: 'pointer' }}>
          <img 
            src={imgChevronDown} 
            alt="" 
            className={`chevron-icon ${expandedSections['advanced-functionality'] ? 'expanded' : 'collapsed'}`}
          />
          <div className="setup-section-content">
            <div className="setup-section-title-area">
              <h3 className="setup-section-title">Unlock advanced Functionality</h3>
            </div>
            <p className="setup-section-description">
              Configure advanced features to enhance your planning and forecasting capabilities
            </p>
          </div>
        </div>

        {/* Steps List for Advanced Functionality */}
        {expandedSections['advanced-functionality'] && (
        <div className="setup-steps">
          {/* Placeholder for advanced functionality steps */}
          <div className="setup-step">
            <div className="step-indicator">
              <div className="step-icon step-icon-empty" />
            </div>
            <div className="step-content">
              <h4 className="step-title">Advanced features coming soon...</h4>
              <p className="step-description">
                Additional configuration options will be available here
              </p>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Modals */}
      <ManageUserAccessModal isOpen={isUserAccessModalOpen} onClose={closeUserAccessModal} />
      <ManageHierarchiesModal 
        isOpen={isHierarchiesModalOpen} 
        onClose={closeHierarchiesModal}
        onNavigateToHierarchyPage={onNavigateToHierarchies}
        hierarchies={hierarchies}
        setHierarchies={setHierarchies}
      />
      <ManageMeasuresModal 
        isOpen={isMeasuresModalOpen} 
        onClose={closeMeasuresModal}
        measures={measures}
        setMeasures={setMeasures}
      />
      <ManageSubsetsModal 
        isOpen={isSubsetsModalOpen} 
        onClose={closeSubsetsModal}
        measureSubsets={measureSubsets}
        setMeasureSubsets={setMeasureSubsets}
      />

      {/* Flow Prompt Modal */}
      {isFlowPromptOpen && (
        <div className="modal-overlay" onClick={closeFlowPrompt}>
          <div className="flow-prompt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="flow-prompt-content">
              <div className="flow-prompt-item">
                <div className="flow-prompt-checkmark">
                  <img src={imgCheckIcon} alt="Success" />
                </div>
                <p className="flow-prompt-text">Presence of Flow definition is validated</p>
              </div>
              <div className="flow-prompt-item">
                <div className="flow-prompt-checkmark">
                  <img src={imgCheckIcon} alt="Success" />
                </div>
                <p className="flow-prompt-text">DPE has been run successfully</p>
              </div>
            </div>
            <button className="flow-prompt-button" onClick={closeFlowPrompt}>OK</button>
          </div>
        </div>
      )}

      {/* Planning Horizon Modal */}
      {isPlanningHorizonModalOpen && (
        <div className="modal-overlay" onClick={closePlanningHorizonModal}>
          <div className="modal-container modal-container-compact" onClick={(e) => e.stopPropagation()} style={{ width: '680px', maxWidth: '95vw' }}>
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">Org Calendar</h2>
              </div>
              <button className="modal-close-button" onClick={closePlanningHorizonModal}>
                <img src={imgCloseIcon} alt="Close" />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-content" style={{ padding: '24px' }}>
                <div className="org-calendar-form">
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Calendar Name</label>
                    <div className="org-calendar-value">salesforce</div>
                  </div>
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Fiscal Year Start Month</label>
                    <div className="org-calendar-value">January</div>
                  </div>
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Fiscal Year Based On</label>
                    <div className="org-calendar-value">The ending month</div>
                  </div>
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Calendar Type</label>
                    <div className="org-calendar-value">Standard</div>
                  </div>
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Org Id</label>
                    <div className="org-calendar-value">00DB0000000L9JF</div>
                  </div>
                  <div className="org-calendar-field">
                    <label className="org-calendar-label">Status</label>
                    <div className="org-calendar-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#2e844a', fontSize: '16px' }}>✓</span>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer-buttons" style={{ padding: '0 24px 24px 24px', marginTop: 0, justifyContent: 'flex-end' }}>
              <button className="modal-save-button" onClick={closePlanningHorizonModal}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
