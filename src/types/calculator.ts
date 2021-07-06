export interface ICalculatorValues {
  interestRate: number;
  loanLifetime: number;
  principal: number;
  repaymentAmount: number;
  repaymentFrequency: RepaymentFrequency;
}

export enum RepaymentFrequency {
  WEEKLY,
  FORTNIGHTLY,
  MONTHLY,
}

export interface ILoanRepayment {
  interestApplied: string;
  principal: string;
}
