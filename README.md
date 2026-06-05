# Salesforce Commercial Planning and Forecasting Setup Prototype

A fully interactive React prototype for Salesforce Commercial Planning and Forecasting setup experience.

## 🌐 Live Demo

**Live Prototype:** [https://lakshmitv-netizen.github.io/salesforce-planning-june2026/](https://lakshmitv-netizen.github.io/salesforce-planning-june2026/)

## 📋 Features

### Main Setup Flow
- **Step 1: Enable Data Cloud** - Toggle to enable with automatic sub-step completion
- **Step 2: Setup User & User Roles** - Manage user access and permission sets
- **Step 3: Master Data Setup**
  - 3.1 Setup Hierarchies (Account, Product, etc.)
  - 3.2 Review Measures and Measure Subsets
  - 3.3 Configure Time Granularity

### Interactive Modals
1. **Manage User Access Modal**
   - User table with filtering options
   - Permission assignment interface
   - Success notifications

2. **Manage Hierarchies Modal**
   - Create, edit, clone hierarchies
   - Dimension-based filtering (Account, Product, Customer, Channel)
   - Bulk sync to Data Cloud
   - AI-powered hierarchy creation

3. **Manage Measures Modal**
   - Create, edit, clone measures
   - Category-based organization
   - Source system integration
   - Searchable and filterable

4. **Manage Measure Subsets Modal**
   - Create, edit, clone measure subsets
   - Multi-measure selection
   - Persistent data across modals

5. **Time Granularity Modal**
   - Select time granularities (Weekly, Monthly, Quarterly, Yearly)
   - Dynamic filtering in planning grid configurations

6. **Planning Grid Config**
   - Create and configure planning grids
   - Dimension management (Row, Column, Page)
   - Hierarchy level customization
   - Measure subset assignment

### Additional Features
- Progress tracking with visual indicators
- Toast notifications for successful actions
- Collapsible sections for better organization
- Responsive design
- Data persistence across components

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/lakshmitv-netizen/salesforce-planning-june2026.git
cd salesforce-planning-june2026
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run deploy` - Deploys to GitHub Pages

## 🏗️ Project Structure

```
salesforce-planning-app/
├── public/
├── src/
│   ├── components/
│   │   ├── MainContent.js              # Main setup steps container
│   │   ├── ManageUserAccessModal.js    # User access management
│   │   ├── ManageHierarchiesModal.js   # Hierarchy management
│   │   ├── ManageMeasuresModal.js      # Measure management
│   │   ├── ManageSubsetsModal.js       # Measure subset management
│   │   ├── TimeGranularityModal.js     # Time granularity configuration
│   │   ├── PlanningGridConfig.js       # Planning grid configuration
│   │   ├── PlanningViewPage.js         # Planning view page
│   │   ├── Toast.js                    # Toast notification component
│   │   └── ProgressRing.js             # Progress indicator component
│   ├── App.js                          # Main app component
│   ├── App.css                         # Global styles
│   └── index.js                        # Entry point
├── package.json
└── README.md
```

## 💻 Technology Stack

- **React 18.x** - UI framework
- **Pure CSS** - No CSS frameworks, custom styling
- **SVG Icons** - Embedded as data URIs
- **GitHub Pages** - Deployment platform

## 🎨 Key Components

### State Management
- Centralized state in `App.js` for data sharing
- Props drilling for component communication
- Controlled components for form inputs

### Modals
- Reusable modal overlay system
- Multi-panel navigation (left panel, right panel)
- Dynamic content based on user interactions

### Data Flow
- Hierarchies, measures, and subsets data shared across modals
- Time granularities affect planning grid configurations
- Persistent selections across modal sessions

## 🔧 Customization

### Adding New Features
1. Create component in `src/components/`
2. Import and use in relevant parent component
3. Update state management in `App.js` if needed

### Styling
- All styles are in `src/App.css`
- Component-specific styles use class prefixes
- CSS variables for consistent theming

## 📦 Building for Production

```bash
npm run build
```

Creates optimized production build in the `build/` folder.

## 🌍 Deployment

The app is configured for GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the production version
2. Deploy to the `gh-pages` branch
3. Make it available at the GitHub Pages URL

## 📝 Recent Updates

- Time granularity modal for dynamic time dimension filtering
- Org Calendar review with notification banner
- Consistent Manage button styling across all steps
- Fixed measure subset count to show actual selected measures
- Updated modal headings and text
- Improved edit panel refresh in Manage Measures modal
- Enhanced user experience with compact modal designs

## 🐛 Known Limitations

- Data is not persisted between page refreshes (in-memory state only)
- No backend integration (pure frontend prototype)
- No actual API calls or data cloud integration

## 📄 License

This project is a prototype for demonstration purposes.

## 👥 Contact

For questions or feedback, please reach out to the development team.
