import { Annotation, END, START, StateGraph } from '../ai/langgraph';
import { InvestmentPlan } from '../models/investmentPlan';

interface AdvisorInput {
  disposableIncome: number;
  netSalary: number;
  yearsToRetirement: number;
}

const AdvisorState = Annotation.Root({
  disposableIncome: 0,
  netSalary: 0,
  yearsToRetirement: 0,
  riskProfile: 'Balanced' as 'Conservative' | 'Balanced' | 'Growth',
  investmentType: '',
  expectedReturns: 0,
  duration: 0,
  aiSummary: '',
});

export class LangGraphInvestmentAdvisor {
  public async buildPlan(input: AdvisorInput): Promise<InvestmentPlan> {
    const graph = this.createGraph();
    const result = await graph.invoke({
      disposableIncome: input.disposableIncome,
      netSalary: input.netSalary,
      yearsToRetirement: input.yearsToRetirement,
    });

    return {
      investmentType: result.investmentType,
      amount: Math.max(input.disposableIncome * 0.3, 0),
      expectedReturns: result.expectedReturns,
      duration: result.duration,
      riskProfile: result.riskProfile,
      aiSummary: result.aiSummary,
    };
  }

  private createGraph() {
    return new StateGraph(AdvisorState)
      .addNode('profileRisk', (state) => {
        const savingsRatio = state.netSalary <= 0 ? 0 : state.disposableIncome / state.netSalary;

        if (state.yearsToRetirement > 20 && savingsRatio > 0.35) {
          return { riskProfile: 'Growth' as const };
        }

        if (state.yearsToRetirement < 10 || savingsRatio < 0.2) {
          return { riskProfile: 'Conservative' as const };
        }

        return { riskProfile: 'Balanced' as const };
      })
      .addNode('chooseAllocation', (state) => {
        if (state.riskProfile === 'Growth') {
          return {
            investmentType: 'Equity Index Funds',
            expectedReturns: 0.11,
            duration: Math.max(state.yearsToRetirement, 10),
          };
        }

        if (state.riskProfile === 'Conservative') {
          return {
            investmentType: 'Debt + Hybrid Funds',
            expectedReturns: 0.07,
            duration: Math.max(Math.min(state.yearsToRetirement, 10), 5),
          };
        }

        return {
          investmentType: 'Balanced Mutual Funds',
          expectedReturns: 0.09,
          duration: Math.max(state.yearsToRetirement, 8),
        };
      })
      .addNode('writeSummary', (state) => ({
        aiSummary: `LangGraph insight: A ${state.riskProfile.toLowerCase()} profile is recommended. Allocate roughly 30% of disposable income to ${state.investmentType} for ${state.duration} years with an estimated ${Math.round(state.expectedReturns * 100)}% annual return assumption.`,
      }))
      .addEdge(START, 'profileRisk')
      .addEdge('profileRisk', 'chooseAllocation')
      .addEdge('chooseAllocation', 'writeSummary')
      .addEdge('writeSummary', END)
      .compile();
  }
}
