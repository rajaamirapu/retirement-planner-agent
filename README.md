# Retirement Planner Agent

## Overview
The Retirement Planner Agent is a comprehensive tool designed to help users plan for their retirement by assessing their financial situation, managing loan documents, and creating personalized investment plans. This project now includes a browser-based UI for entering inputs and viewing calculated retirement and investment guidance.

## Features
- **Retirement Assessment**: Evaluate retirement needs based on user inputs and generate a tailored retirement plan.
- **Loan Management**: Manage loan documents, calculate Equated Monthly Installments (EMIs), and assess loan eligibility.
- **Salary Management**: Handle salary data and calculate disposable income after loan payments.
- **Investment Planning**: Analyze investment options and project future returns based on user inputs.
- **Web UI**: Use a responsive form-driven interface to generate your plan in the browser.

## Project Structure
```
retirement-planner-agent
├── public
│   ├── index.html              # Browser UI
│   ├── styles.css              # UI styling
│   └── app.js                  # Front-end behavior
├── src
│   ├── main.ts                 # CLI-style example entry point
│   ├── uiServer.ts             # HTTP server for UI + planning API
│   ├── agents
│   │   ├── retirementAgent.ts
│   │   └── investmentAgent.ts
│   ├── services
│   │   ├── loanService.ts
│   │   ├── salaryService.ts
│   │   └── investmentService.ts
│   ├── parsers
│   │   └── documentParser.ts
│   ├── calculators
│   │   ├── emiCalculator.ts
│   │   └── retirementCalculator.ts
│   ├── models
│   │   ├── loan.ts
│   │   ├── salary.ts
│   │   └── investmentPlan.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd retirement-planner-agent
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
### Run the UI (default)
```bash
npm start
```
Then open `http://localhost:3000` in your browser.

### Run the CLI sample output
```bash
npm run build
npm run start:cli
```

### Run the TypeScript build only
```bash
npm run build
```

### Run tests
```bash
npm test
```

## License
This project is licensed under the MIT License.
