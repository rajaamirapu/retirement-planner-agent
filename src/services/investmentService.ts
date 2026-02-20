export class InvestmentService {
    private investmentOptions: Array<{ type: string; expectedReturn: number }> = [];

    constructor(investmentOptions: Array<{ type: string; expectedReturn: number }>) {
        this.investmentOptions = investmentOptions;
    }

    public analyzeInvestmentOptions(salary: number, loanEMI: number): Array<{ type: string; potentialReturn: number }> {
        const disposableIncome = this.calculateDisposableIncome(salary, loanEMI);
        return this.investmentOptions.map(option => ({
            type: option.type,
            potentialReturn: this.projectFutureReturns(disposableIncome, option.expectedReturn)
        }));
    }

    private calculateDisposableIncome(salary: number, loanEMI: number): number {
        return salary - loanEMI;
    }

    private projectFutureReturns(investmentAmount: number, expectedReturn: number): number {
        // Assuming a simple projection for demonstration purposes
        return investmentAmount * (1 + expectedReturn / 100);
    }
}