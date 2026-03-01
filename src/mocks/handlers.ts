import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

// ---------------------------------------------------------------------------
// Mock data generators
// ---------------------------------------------------------------------------

function generateInvestor() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    type: faker.helpers.arrayElement(["LP", "GP", "Co-Invest"]),
    commitment: faker.number.int({ min: 1_000_000, max: 100_000_000 }),
    funded: faker.number.int({ min: 500_000, max: 50_000_000 }),
    status: faker.helpers.arrayElement(["Active", "Pending", "Closed"]),
    joinDate: faker.date.past({ years: 5 }).toISOString(),
  };
}

function generateTransaction() {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      "Capital Call",
      "Distribution",
      "Management Fee",
      "Carried Interest",
    ]),
    amount: faker.number.int({ min: 100_000, max: 25_000_000 }),
    date: faker.date.recent({ days: 90 }).toISOString(),
    fund: faker.helpers.arrayElement(["Fund III", "Fund IV", "Fund V"]),
    status: faker.helpers.arrayElement(["Completed", "Pending", "Processing"]),
    investor: faker.company.name(),
  };
}

function generatePortfolioCompany() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    sector: faker.helpers.arrayElement([
      "Technology",
      "Healthcare",
      "Financial Services",
      "Consumer",
      "Industrials",
      "Energy",
    ]),
    investmentDate: faker.date.past({ years: 4 }).toISOString(),
    investedAmount: faker.number.int({ min: 5_000_000, max: 50_000_000 }),
    currentValue: faker.number.int({ min: 3_000_000, max: 100_000_000 }),
    moic: faker.number.float({ min: 0.5, max: 4.0, fractionDigits: 2 }),
    irr: faker.number.float({ min: -0.15, max: 0.45, fractionDigits: 4 }),
    status: faker.helpers.arrayElement(["Active", "Realized", "Write-off"]),
  };
}

// ---------------------------------------------------------------------------
// API handlers
// ---------------------------------------------------------------------------

export const handlers = [
  // Dashboard KPIs
  http.get("/api/dashboard/kpis", () => {
    return HttpResponse.json({
      totalAum: faker.number.int({ min: 1_000_000_000, max: 5_000_000_000 }),
      totalFunds: faker.number.int({ min: 3, max: 12 }),
      activeInvestors: faker.number.int({ min: 40, max: 200 }),
      netIrr: faker.number.float({ min: 0.08, max: 0.25, fractionDigits: 4 }),
      dpi: faker.number.float({ min: 0.3, max: 1.8, fractionDigits: 2 }),
      tvpi: faker.number.float({ min: 1.0, max: 2.5, fractionDigits: 2 }),
    });
  }),

  // Investors list
  http.get("/api/investors", () => {
    const investors = Array.from({ length: 25 }, generateInvestor);
    return HttpResponse.json(investors);
  }),

  // Transactions list
  http.get("/api/transactions", () => {
    const transactions = Array.from({ length: 50 }, generateTransaction);
    return HttpResponse.json(transactions);
  }),

  // Portfolio companies
  http.get("/api/portfolio", () => {
    const companies = Array.from({ length: 15 }, generatePortfolioCompany);
    return HttpResponse.json(companies);
  }),
];
