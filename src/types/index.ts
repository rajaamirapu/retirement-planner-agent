export interface Loan {
    amount: number;
    interestRate: number;
    tenure: number; // in months
    emi: number; // calculated EMI
}

export interface Salary {
    grossSalary: number;
    deductions: number;
    netSalary: number; // calculated net salary after deductions
}

export interface InvestmentPlan {
    investmentType: string;
    amount: number;
    expectedReturns: number; // expected return percentage
    duration: number; // in years
}