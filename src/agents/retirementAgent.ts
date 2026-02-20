import { Loan } from '../models/loan';
import { Salary } from '../models/salary';
import { InvestmentPlan } from '../models/investmentPlan';
import { calculateRetirementNeeds } from '../calculators/retirementCalculator';
import { InvestmentAgent } from './investmentAgent';

export class RetirementAgent {
    private salary: Salary;
    private loans: Loan[];
    private investmentAgent: InvestmentAgent;
    private yearsToRetirement: number;

    constructor(salary: Salary, loans: Loan[]) {
        this.salary = salary;
        this.loans = loans;
        this.investmentAgent = new InvestmentAgent();
        this.yearsToRetirement = 10;
    }

    assessRetirementNeeds(currentSavings: number, expectedExpenses: number, retirementAge: number, currentAge: number): number {
        this.yearsToRetirement = Math.max(retirementAge - currentAge, 0);
        return calculateRetirementNeeds(currentSavings, expectedExpenses, retirementAge, currentAge);
    }

    async generateRetirementPlan(): Promise<InvestmentPlan> {
        const disposableIncome = this.calculateDisposableIncome();
        return this.investmentAgent.createInvestmentPlan(disposableIncome, this.salary.netSalary, this.yearsToRetirement);
    }

    private calculateDisposableIncome(): number {
        const totalEMI = this.loans.reduce((acc, loan) => acc + loan.emi, 0);
        return this.salary.netSalary - totalEMI;
    }
}
