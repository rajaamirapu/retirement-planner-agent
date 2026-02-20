export interface Salary {
    grossSalary: number;
    deductions: number;
    netSalary: number;
}

export function calculateNetSalary(salary: Salary): number {
    return salary.grossSalary - salary.deductions;
}