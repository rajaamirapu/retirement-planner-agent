export class InvestmentAgent {
    private salary: number;
    private loanEMI: number;
    private investmentPlan: any;

    constructor(salary: number, loanEMI: number) {
        this.salary = salary;
        this.loanEMI = loanEMI;
        this.investmentPlan = {};
    }

    public createInvestmentPlan(): void {
        const disposableIncome = this.calculateDisposableIncome();
        this.investmentPlan = this.analyzeInvestmentOptions(disposableIncome);
    }

    private calculateDisposableIncome(): number {
        return this.salary - this.loanEMI;
    }

    private analyzeInvestmentOptions(disposableIncome: number): any {
        // Logic to analyze investment options based on disposable income
        // This is a placeholder for actual investment analysis logic
        return {
            investmentType: 'Mutual Funds',
            amount: disposableIncome * 0.3, // Example: invest 30% of disposable income
            expectedReturns: 0.08, // Example: 8% expected returns
            duration: 10 // Example: 10 years
        };
    }

    public getInvestmentPlan(): any {
        return this.investmentPlan;
    }
}