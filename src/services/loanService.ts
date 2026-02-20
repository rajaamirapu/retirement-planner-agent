export class LoanService {
    private loanDocuments: any[] = [];

    addLoanDocument(document: any): void {
        this.loanDocuments.push(document);
    }

    calculateEMI(loanAmount: number, interestRate: number, tenure: number): number {
        const monthlyInterestRate = interestRate / (12 * 100);
        const numberOfMonths = tenure * 12;
        const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / 
                    (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
        return emi;
    }

    assessLoanEligibility(income: number, emi: number): boolean {
        const maxEmi = income * 0.4; // Assuming 40% of income can be used for EMI
        return emi <= maxEmi;
    }

    getLoanDocuments(): any[] {
        return this.loanDocuments;
    }
}