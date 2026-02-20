import { RetirementAgent } from './agents/retirementAgent';
import { InvestmentAgent } from './agents/investmentAgent';
import { LoanService } from './services/loanService';
import { SalaryService } from './services/salaryService';
import { InvestmentService } from './services/investmentService';
import { DocumentParser } from './parsers/documentParser';

const loanService = new LoanService();
const salaryService = new SalaryService();
const investmentService = new InvestmentService();
const documentParser = new DocumentParser();

const retirementAgent = new RetirementAgent(loanService, salaryService, investmentService);
const investmentAgent = new InvestmentAgent(salaryService, loanService, investmentService);

// Example usage
const userInputs = {
    salary: 50000,
    loanDetails: {
        amount: 200000,
        interestRate: 7.5,
        tenure: 15
    },
    currentSavings: 100000,
    expectedExpenses: 30000,
    retirementAge: 65
};

const retirementPlan = retirementAgent.assessRetirementNeeds(userInputs);
const investmentPlan = investmentAgent.createInvestmentPlan(userInputs.salary, userInputs.loanDetails);

console.log('Retirement Plan:', retirementPlan);
console.log('Investment Plan:', investmentPlan);