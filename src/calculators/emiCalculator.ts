export function calculateEMI(loanAmount: number, annualInterestRate: number, tenureInMonths: number): number {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths)) / 
                (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
    return emi;
}