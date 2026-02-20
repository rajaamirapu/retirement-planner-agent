import { RetirementAgent } from './agents/retirementAgent';
import { LoanModel } from './models/loan';
import { Salary, calculateNetSalary } from './models/salary';

// Example usage
const userInputs = {
    salary: 50000,
    deductions: 5000,
    loanDetails: {
        amount: 200000,
        interestRate: 7.5,
        tenure: 15 * 12
    },
    currentSavings: 100000,
    expectedExpenses: 30000,
    retirementAge: 65,
    currentAge: 30
};

const salary: Salary = {
    grossSalary: userInputs.salary,
    deductions: userInputs.deductions,
    netSalary: 0
};
salary.netSalary = calculateNetSalary(salary);

const loan = new LoanModel(
    userInputs.loanDetails.amount,
    userInputs.loanDetails.interestRate,
    userInputs.loanDetails.tenure
);

const retirementAgent = new RetirementAgent(salary, [loan]);
const retirementNeeds = retirementAgent.assessRetirementNeeds(
    userInputs.currentSavings,
    userInputs.expectedExpenses,
    userInputs.retirementAge,
    userInputs.currentAge
);
const run = async (): Promise<void> => {
    const investmentPlan = await retirementAgent.generateRetirementPlan();

    console.log('Retirement Needs:', retirementNeeds);
    console.log('Investment Plan:', investmentPlan);
};

run();
