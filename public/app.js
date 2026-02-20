const form = document.getElementById('planner-form');
const results = document.getElementById('results');

const currency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  for (const key of Object.keys(payload)) {
    payload[key] = Number(payload[key]);
  }

  if (payload.retirementAge <= payload.currentAge) {
    results.classList.remove('hidden');
    results.innerHTML = '<p>Retirement age must be greater than current age.</p>';
    return;
  }

  const response = await fetch('/api/plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  results.classList.remove('hidden');

  if (!response.ok) {
    results.innerHTML = `<p>${data.message}</p>`;
    return;
  }

  results.innerHTML = `
    <h2>Your Plan</h2>
    <p class="kpi"><strong>Net Salary:</strong> ${currency(data.netSalary)}</p>
    <p class="kpi"><strong>Monthly EMI:</strong> ${currency(data.monthlyEmi)}</p>
    <p class="kpi"><strong>Monthly Disposable Income:</strong> ${currency(data.monthlyDisposableIncome)}</p>
    <p class="kpi"><strong>Retirement Corpus Needed:</strong> ${currency(data.retirementNeeds)}</p>
    <h3>Suggested Investment Plan</h3>
    <p class="kpi"><strong>Type:</strong> ${data.investmentPlan.investmentType}</p>
    <p class="kpi"><strong>Monthly Investment:</strong> ${currency(data.investmentPlan.amount)}</p>
    <p class="kpi"><strong>Expected Returns:</strong> ${(data.investmentPlan.expectedReturns * 100).toFixed(2)}%</p>
    <p class="kpi"><strong>Duration:</strong> ${data.investmentPlan.duration} years</p>
  `;
});
