export interface InvestmentPlan {
    investmentType: string;
    amount: number;
    expectedReturns: number; // in percentage
    duration: number; // in years
    riskProfile?: 'Conservative' | 'Balanced' | 'Growth';
    aiSummary?: string;
}
