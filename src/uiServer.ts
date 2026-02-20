import { createServer, IncomingMessage, ServerResponse } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';
import { LoanModel } from './models/loan';
import { RetirementAgent } from './agents/retirementAgent';
import { Salary, calculateNetSalary } from './models/salary';

interface PlannerInput {
  salary: number;
  deductions: number;
  loanAmount: number;
  loanInterestRate: number;
  loanTenureMonths: number;
  currentSavings: number;
  expectedExpenses: number;
  retirementAge: number;
  currentAge: number;
}

const publicDir = path.resolve(__dirname, '../public');
const port = Number(process.env.PORT || 3000);

const parseRequestBody = async (req: IncomingMessage): Promise<PlannerInput> => {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  return JSON.parse(body) as PlannerInput;
};

const sendJson = (res: ServerResponse, statusCode: number, payload: unknown): void => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const handlePlanRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const input = await parseRequestBody(req);

    const salary: Salary = {
      grossSalary: input.salary,
      deductions: input.deductions,
      netSalary: 0,
    };
    salary.netSalary = calculateNetSalary(salary);

    const loan = new LoanModel(input.loanAmount, input.loanInterestRate, input.loanTenureMonths);
    const retirementAgent = new RetirementAgent(salary, [loan]);

    const retirementNeeds = retirementAgent.assessRetirementNeeds(
      input.currentSavings,
      input.expectedExpenses,
      input.retirementAge,
      input.currentAge,
    );
    const investmentPlan = retirementAgent.generateRetirementPlan();

    sendJson(res, 200, {
      retirementNeeds,
      investmentPlan,
      netSalary: salary.netSalary,
      monthlyEmi: loan.emi,
      monthlyDisposableIncome: salary.netSalary - loan.emi,
    });
  } catch (error) {
    sendJson(res, 400, {
      message: 'Unable to generate retirement plan. Check your input values.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
};

const serveStaticFile = async (filePath: string, res: ServerResponse): Promise<void> => {
  try {
    const extension = path.extname(filePath);
    const fileContent = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentTypes[extension] || 'text/plain; charset=utf-8' });
    res.end(fileContent);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
};

const server = createServer(async (req, res) => {
  const url = req.url || '/';
  const method = req.method || 'GET';

  if (url === '/api/plan' && method === 'POST') {
    await handlePlanRequest(req, res);
    return;
  }

  if (method === 'GET') {
    const requestedFile = url === '/' ? 'index.html' : url.replace(/^\//, '');
    const safePath = path.normalize(requestedFile).replace(/^([.][.][/\\])+/, '');
    await serveStaticFile(path.join(publicDir, safePath), res);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method Not Allowed');
});

server.listen(port, () => {
  console.log(`Retirement Planner UI running at http://localhost:${port}`);
});
