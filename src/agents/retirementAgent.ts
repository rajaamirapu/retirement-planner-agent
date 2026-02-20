import { Loan } from '../models/loan';
import { Salary } from '../models/salary';
import { InvestmentPlan } from '../models/investmentPlan';
import { calculateRetirementNeeds } from '../calculators/retirementCalculator';
import { InvestmentAgent } from './investmentAgent';

export class RetirementAgent {
    private salary: Salary;
    private loans: Loan[];
    private investmentAgent: InvestmentAgent;

    constructor(salary: Salary, loans: Loan[]) {
        this.salary = salary;
        this.loans = loans;
        this.investmentAgent = new InvestmentAgent();
    }

    assessRetirementNeeds(currentSavings: number, expectedExpenses: number, retirementAge: number): number {
        return calculateRetirementNeeds(currentSavings, expectedExpenses, retirementAge);
    }

    generateRetirementPlan(): InvestmentPlan {
        const disposableIncome = this.calculateDisposableIncome();
        return this.investmentAgent.createInvestmentPlan(disposableIncome);
    }

    private calculateDisposableIncome(): number {
        const totalEMI = this.loans.reduce((acc, loan) => acc + loan.emi, 0);
        return this.salary.netSalary - totalEMI;
    }
}