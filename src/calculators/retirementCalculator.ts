export function calculateRetirementNeeds(currentSavings: number, expectedExpenses: number, retirementAge: number, currentAge: number): number {
    const yearsToRetirement = retirementAge - currentAge;
    const totalExpensesDuringRetirement = expectedExpenses * yearsToRetirement * 12; // Monthly expenses multiplied by years in months
    return totalExpensesDuringRetirement - currentSavings; // Total needed minus current savings
}