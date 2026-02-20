import { InvestmentPlan } from '../models/investmentPlan';
import { LangGraphInvestmentAdvisor } from './langGraphInvestmentAdvisor';

export class InvestmentAgent {
    private advisor: LangGraphInvestmentAdvisor;

    constructor() {
        this.advisor = new LangGraphInvestmentAdvisor();
    }

    public async createInvestmentPlan(disposableIncome: number, netSalary: number, yearsToRetirement: number): Promise<InvestmentPlan> {
        return this.advisor.buildPlan({
            disposableIncome,
            netSalary,
            yearsToRetirement,
        });
    }
}
