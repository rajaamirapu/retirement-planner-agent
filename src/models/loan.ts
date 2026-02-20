export interface Loan {
    amount: number;
    interestRate: number; // Annual interest rate in percentage
    tenure: number; // Tenure in months
    emi: number; // Equated Monthly Installment
}

export class LoanModel implements Loan {
    amount: number;
    interestRate: number;
    tenure: number;
    emi: number;

    constructor(amount: number, interestRate: number, tenure: number) {
        this.amount = amount;
        this.interestRate = interestRate;
        this.tenure = tenure;
        this.emi = this.calculateEMI();
    }

    private calculateEMI(): number {
        const monthlyInterestRate = this.interestRate / 12 / 100;
        const emi = (this.amount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.tenure)) /
                    (Math.pow(1 + monthlyInterestRate, this.tenure) - 1);
        return Number(emi.toFixed(2)); // Round to 2 decimal places
    }
}