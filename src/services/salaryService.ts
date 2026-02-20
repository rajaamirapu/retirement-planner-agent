export class SalaryService {
    private grossSalary: number;
    private deductions: number;

    constructor(grossSalary: number, deductions: number) {
        this.grossSalary = grossSalary;
        this.deductions = deductions;
    }

    public calculateNetSalary(): number {
        return this.grossSalary - this.deductions;
    }

    public calculateDisposableIncome(emi: number): number {
        const netSalary = this.calculateNetSalary();
        return netSalary - emi;
    }

    public getGrossSalary(): number {
        return this.grossSalary;
    }

    public getDeductions(): number {
        return this.deductions;
    }
}