import React, { useState } from 'react';
import './App.css';
import GlobalHeader from './components/GlobalHeader';
import LeftSidebar from './components/LeftSidebar';
import HeroContainer from './components/HeroContainer';
import MainContent from './components/MainContent';
import RightColumn from './components/RightColumn';
import PlanningViewPage from './components/PlanningViewPage';
import PlanningGridConfig from './components/PlanningGridConfig';
import HierarchySetupPage from './components/HierarchySetupPage';
import MeasuresPage from './components/MeasuresPage';

function App() {
  const [currentPage, setCurrentPage] = useState('setup'); // 'setup', 'planning', 'gridconfig', 'hierarchies', or 'measures'
  const [showConfigSavedToast, setShowConfigSavedToast] = useState(false);
  
  // Shared plan configurations state
  const [planConfigs, setPlanConfigs] = useState([
    {
      id: 1,
      name: 'KAMPlanConfig',
      description: 'KAM planning grid configuration for account planning users',
      dimensions: '2 dimensions',
      measures: '0 measures',
      status: 'Draft',
      updatedBy: 'Admin',
    },
    {
      id: 2,
      name: 'RetailPlanConfig',
      description: 'Retail planning grid setup for product and store planning',
      dimensions: '3 dimensions',
      measures: '4 measures',
      status: 'Active',
      updatedBy: 'Admin',
    },
  ]);
  
  // Shared measures state
  const [measures, setMeasures] = useState([
    { id: 1, name: 'Sales Agreement Quantity', description: 'Sales Agreement Quantity', type: 'Read', sourceDmo: 'SalesAgreement', code: 'BASL1', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume', subsets: ['SalesAgreement', 'Revenue', 'Q1 Sales', 'Annual'], unit: 'volume', dataType: 'Number', sourceName: 'SalesAgreement', selected: false },
    { id: 2, name: 'Baseline Volume', description: 'Baseline Volume', type: 'Write', sourceDmo: 'OpportunityLineItem', code: 'BASL2', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume', subsets: ['Baseline', 'Forecast', 'Actuals'], unit: 'volume', dataType: 'Number', sourceName: 'OpportunityLineItem', selected: false },
    { id: 3, name: 'Promotional Lift', description: 'Promotional Lift', type: 'Write', sourceDmo: 'Trade Promotion', code: 'BASL3', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume', subsets: ['Promotions', 'Marketing', 'Campaigns'], unit: 'volume', dataType: 'Number', sourceName: 'Trade Promotion', selected: false },
    { id: 4, name: 'Trade ROI', description: 'Trade ROI', type: 'Read', sourceDmo: 'Trade Promotion', code: 'BASL4', aggregation: 'Average', disaggregation: 'Proportional', category: 'Operations', subsets: ['Trade', 'ROI', 'Performance', 'Analytics'], unit: '%', dataType: 'Percent', sourceName: 'Trade Promotion', selected: false },
    { id: 5, name: 'Net Sales Value (NSV)', description: 'Net Sales Value (NSV)', type: 'Read', sourceDmo: 'OpportunityLineItem', code: 'BASL5', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials', subsets: ['Revenue', 'Sales', 'Net Value'], unit: 'currency', dataType: 'Currency', sourceName: 'OpportunityLineItem', selected: false },
    { id: 6, name: 'Remaining Budget', description: 'Remaining Budget', type: 'Write', sourceDmo: 'Account Budget', code: 'BASL6', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials', subsets: ['Budget', 'Finance', 'Planning'], unit: 'currency', dataType: 'Currency', sourceName: 'Account Budget', selected: false },
    { id: 7, name: 'Fund Allocation', description: 'Fund Allocation', type: 'Write', sourceDmo: 'Trade Promotion', code: 'BASL7', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials', subsets: ['Fund', 'Allocation', 'Budget', 'Trade'], unit: 'currency', dataType: 'Currency', sourceName: 'Trade Promotion', selected: false },
    { id: 8, name: 'Deduction Amount', description: 'Deduction Amount', type: 'Read', sourceDmo: 'Deduction', code: 'BASL8', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials', subsets: ['Deductions', 'Adjustments'], unit: 'currency', dataType: 'Currency', sourceName: 'Deduction', selected: false },
    { id: 9, name: 'Forecasted Quantity', description: 'Forecasted Quantity', type: 'Write', sourceDmo: 'Opportunity', code: 'BASL9', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Volume', subsets: ['Forecast', 'Pipeline', 'Future'], unit: 'volume', dataType: 'Number', sourceName: 'Opportunity', selected: false },
    { id: 10, name: 'Weighted Pipeline', description: 'Weighted Pipeline', type: 'Read', sourceDmo: 'Opportunity', code: 'BASL10', aggregation: 'SUM', disaggregation: 'Proportional', category: 'Financials', subsets: ['Pipeline', 'Opportunities', 'Weighted'], unit: 'currency', dataType: 'Currency', sourceName: 'Opportunity', selected: false },
    { id: 11, name: 'Quota Attainment %', description: 'Quota Attainment %', type: 'Read', sourceDmo: 'Territory', code: 'BASL11', aggregation: 'Average', disaggregation: 'Proportional', category: 'Operations', subsets: ['Quota', 'Goals', 'Targets', 'Attainment'], unit: '%', dataType: 'Percent', sourceName: 'Territory', selected: false },
    { id: 12, name: 'Win Rate', description: 'Win Rate', type: 'Read', sourceDmo: 'Opportunity', code: 'BASL12', aggregation: 'Average', disaggregation: 'Proportional', category: 'Operations', subsets: ['Performance', 'Win Rate', 'Success'], unit: '%', dataType: 'Percent', sourceName: 'Opportunity', selected: false },
    { id: 13, name: 'Performance', description: 'Performance', type: 'Write', sourceDmo: 'Goal', code: 'BASL13', aggregation: 'Average', disaggregation: 'Proportional', category: 'Operations', subsets: ['Performance', 'Metrics', 'KPI'], unit: 'score', dataType: 'Number', sourceName: 'Goal', selected: false },
  ]);
  
  // Shared measure subsets state
  const [measureSubsets, setMeasureSubsets] = useState([
    { id: 1, name: 'Revenue', description: 'Revenue and sales related measures', measureCount: 15, selected: false, lastModified: '2 days ago', 
      measures: ['Net Sales Value (NSV)', 'Revenue Growth', 'Sales Agreement Quantity'] },
    { id: 2, name: 'Budget', description: 'Budget and financial planning measures', measureCount: 8, selected: false, lastModified: '5 days ago',
      measures: ['Remaining Budget', 'Fund Allocation', 'Deduction Amount'] },
    { id: 3, name: 'Trade', description: 'Trade promotion and marketing measures', measureCount: 12, selected: false, lastModified: '1 week ago',
      measures: ['Trade ROI', 'Promotional Lift'] },
    { id: 4, name: 'Performance', description: 'Performance and KPI tracking measures', measureCount: 20, selected: false, lastModified: '3 days ago',
      measures: ['Quota Attainment %', 'Market Share', 'Customer Lifetime Value', 'Churn Rate'] },
    { id: 5, name: 'Sales', description: 'Sales metrics and quotas', measureCount: 18, selected: false, lastModified: '4 days ago',
      measures: ['Sales Agreement Quantity', 'Baseline Volume', 'Average Order Value'] },
    { id: 6, name: 'Operations', description: 'Operational efficiency measures', measureCount: 10, selected: false, lastModified: '1 day ago',
      measures: ['Baseline Volume', 'Forecasted Quantity'] },
    { id: 7, name: 'Net Value', description: 'Net value calculations', measureCount: 6, selected: false, lastModified: '6 days ago',
      measures: ['Net Sales Value (NSV)'] },
    { id: 8, name: 'Forecast', description: 'Forecasting and prediction measures', measureCount: 14, selected: false, lastModified: '2 weeks ago',
      measures: ['Forecasted Quantity', 'Revenue Growth'] },
  ]);
  
  // Time granularity configuration state
  const [timeGranularities, setTimeGranularities] = useState({
    Weekly: false,
    Monthly: true,  // Default selection
    Quarterly: false,
    Yearly: false
  });
  
  // Shared hierarchies state
  const [hierarchies, setHierarchies] = useState([
    { 
      id: 'hier-1',
      name: 'FY 26 Accounts', 
      dimension: 'Account', 
      dataStatus: 'Sync Successful', 
      lastSync: '12/05/2026, 10:30 AM', 
      selected: false, 
      isActive: true,
      numLevels: 4,
      levels: [
        { id: 0, level: 0, name: 'Global', isEditable: false },
        { id: 1, level: 1, name: 'Region', isEditable: false },
        { id: 2, level: 2, name: 'Territory', isEditable: true },
        { id: 3, level: 3, name: 'Account', isEditable: true }
      ]
    },
    { 
      id: 'hier-2',
      name: 'FY 25 Accounts', 
      dimension: 'Account', 
      dataStatus: 'Sync Successful', 
      lastSync: '12/05/2026, 10:30 AM', 
      selected: false, 
      isActive: false,
      numLevels: 3,
      levels: [
        { id: 0, level: 0, name: 'Division', isEditable: false },
        { id: 1, level: 1, name: 'Branch', isEditable: false },
        { id: 2, level: 2, name: 'Account', isEditable: true }
      ]
    },
    { 
      id: 'hier-3',
      name: 'FY 24 Accounts', 
      dimension: 'Account', 
      dataStatus: 'Sync Successful', 
      lastSync: '12/05/2026, 9:15 AM', 
      selected: false, 
      isActive: false,
      numLevels: 5,
      levels: [
        { id: 0, level: 0, name: 'Corporate', isEditable: false },
        { id: 1, level: 1, name: 'Region', isEditable: false },
        { id: 2, level: 2, name: 'District', isEditable: true },
        { id: 3, level: 3, name: 'Area', isEditable: true },
        { id: 4, level: 4, name: 'Account', isEditable: true }
      ]
    },
    { 
      id: 'hier-4',
      name: 'FY 25 Products', 
      dimension: 'Product', 
      dataStatus: 'Sync Successful', 
      lastSync: '12/05/2026, 8:45 AM', 
      selected: false, 
      isActive: false,
      numLevels: 3,
      levels: [
        { id: 0, level: 0, name: 'Category', isEditable: false },
        { id: 1, level: 1, name: 'Brand', isEditable: false },
        { id: 2, level: 2, name: 'Sub-Brand', isEditable: true }
      ]
    },
    { 
      id: 'hier-5',
      name: 'FY 24 Products', 
      dimension: 'Product', 
      dataStatus: 'Data Requested', 
      lastSync: '12/05/2026, 8:00 AM', 
      selected: false, 
      isActive: false,
      numLevels: 4,
      levels: [
        { id: 0, level: 0, name: 'Product Family', isEditable: false },
        { id: 1, level: 1, name: 'Product Line', isEditable: false },
        { id: 2, level: 2, name: 'Product Category', isEditable: true },
        { id: 3, level: 3, name: 'SKU', isEditable: true }
      ]
    },
    { 
      id: 'hier-6',
      name: 'Sales Accounts', 
      dimension: 'Account', 
      dataStatus: 'Sync Successful', 
      lastSync: '11/05/2026, 5:30 PM', 
      selected: false, 
      isActive: false,
      numLevels: 6,
      levels: [
        { id: 0, level: 0, name: 'Enterprise', isEditable: false },
        { id: 1, level: 1, name: 'Zone', isEditable: false },
        { id: 2, level: 2, name: 'Region', isEditable: true },
        { id: 3, level: 3, name: 'Territory', isEditable: true },
        { id: 4, level: 4, name: 'District', isEditable: true },
        { id: 5, level: 5, name: 'Account', isEditable: true }
      ]
    },
    { 
      id: 'hier-7',
      name: 'Financial Accounts', 
      dimension: 'Account', 
      dataStatus: 'Sync Successful', 
      lastSync: '11/05/2026, 5:30 PM', 
      selected: false, 
      isActive: false,
      numLevels: 4,
      levels: [
        { id: 0, level: 0, name: 'Business Unit', isEditable: false },
        { id: 1, level: 1, name: 'Department', isEditable: false },
        { id: 2, level: 2, name: 'Cost Center', isEditable: true },
        { id: 3, level: 3, name: 'Account', isEditable: true }
      ]
    }
  ]);

  const handleNavigateToPlanningView = () => {
    setCurrentPage('planning');
  };

  const handleNavigateToSetup = () => {
    setCurrentPage('setup');
  };

  const handleNavigateToGridConfig = () => {
    setCurrentPage('gridconfig');
  };

  const handleNavigateToHierarchies = () => {
    setCurrentPage('hierarchies');
  };

  const handleNavigateToMeasures = () => {
    setCurrentPage('measures');
  };

  const handleNavigateToPlanConfig = () => {
    setCurrentPage('planning');
  };

  const handleGridConfigSaved = (newConfig) => {
    if (newConfig) {
      // Add the new configuration to the list
      setPlanConfigs(prev => [{
        id: Date.now(), // Generate a unique ID
        name: newConfig.name,
        description: newConfig.description || '',
        dimensions: '0 dimensions', // Can be calculated based on selected dimensions
        measures: '0 measures', // Can be calculated based on selected measures
        status: 'Draft',
        updatedBy: 'Admin',
      }, ...prev]);
    }
    setShowConfigSavedToast(true);
    setCurrentPage('planning');
  };

  return (
    <div className="app-container">
      <GlobalHeader />
      <div className="main-layout">
        {(currentPage === 'planning' || currentPage === 'gridconfig') ? null : (
          <LeftSidebar 
            onNavigateToHierarchies={handleNavigateToHierarchies}
            onNavigateToMeasures={handleNavigateToMeasures}
            onNavigateToPlanConfig={handleNavigateToPlanConfig}
            currentPage={currentPage}
          />
        )}
        {currentPage === 'setup' ? (
          <div className="content-wrapper">
            <HeroContainer />
            <div className="content-body-wrapper">
              <div className="main-content-column">
                <MainContent 
                  onNavigateToPlanningView={handleNavigateToPlanningView}
                  onNavigateToHierarchies={handleNavigateToHierarchies}
                  hierarchies={hierarchies}
                  setHierarchies={setHierarchies}
                  measures={measures}
                  setMeasures={setMeasures}
                  measureSubsets={measureSubsets}
                  setMeasureSubsets={setMeasureSubsets}
                  timeGranularities={timeGranularities}
                  setTimeGranularities={setTimeGranularities}
                />
              </div>
              <RightColumn />
            </div>
          </div>
        ) : currentPage === 'planning' ? (
          <PlanningViewPage 
            onNavigateToGridConfig={handleNavigateToGridConfig}
            onNavigateToMeasures={handleNavigateToMeasures}
            onNavigateToHierarchies={handleNavigateToHierarchies}
            showConfigSavedToast={showConfigSavedToast}
            onCloseConfigSavedToast={() => setShowConfigSavedToast(false)}
            planConfigs={planConfigs}
          />
        ) : currentPage === 'gridconfig' ? (
          <PlanningGridConfig 
            onBack={handleGridConfigSaved}
            hierarchies={hierarchies}
            measures={measures}
            setMeasures={setMeasures}
            measureSubsets={measureSubsets}
            setMeasureSubsets={setMeasureSubsets}
            timeGranularities={timeGranularities}
          />
        ) : currentPage === 'hierarchies' ? (
          <div className="content-wrapper" style={{ marginLeft: '326px', width: 'calc(100% - 326px)' }}>
            <HierarchySetupPage 
              onNavigateBack={handleNavigateToSetup}
              hierarchies={hierarchies}
              setHierarchies={setHierarchies}
            />
          </div>
        ) : (
          <div className="content-wrapper" style={{ marginLeft: '326px', width: 'calc(100% - 326px)' }}>
            <MeasuresPage 
              onNavigateBack={handleNavigateToSetup}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
