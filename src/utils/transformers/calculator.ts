import {
  ICalculatorValues,
  ILoanRepayment,
  RepaymentFrequency,
} from 'types/calculator';

const toCurrency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
}).format;

const getPaymentsPerYear = (type: RepaymentFrequency) => {
  switch (type) {
    case RepaymentFrequency.WEEKLY:
      return 52;
    case RepaymentFrequency.FORTNIGHTLY:
      return 26;
    case RepaymentFrequency.MONTHLY:
      return 12;
  }
};

export const calculateLoan = ({
  interestRate = 0,
  // loanLifetime = 0,
  principal = 0,
  repaymentAmount = 0,
  repaymentFrequency = RepaymentFrequency.WEEKLY,
}: Partial<ICalculatorValues> = {}): ILoanRepayment[] => {
  if (!interestRate || !principal || !repaymentAmount) {
    console.log("SOMETHING WASN'T RIGHT", {
      interestRate,
      principal,
      repaymentAmount,
    });
    return [];
  }

  const totalPayments = getPaymentsPerYear(repaymentFrequency);
  const rateAsPercent = interestRate / 100;
  const calculationUnit = rateAsPercent / totalPayments;

  let remainingLoan = principal;

  const repaymentPlan: ILoanRepayment[] = [];

  if (remainingLoan * calculationUnit > repaymentAmount) {
    throw 'This loan will not decrease!';
  }

  while (remainingLoan > 0) {
    const interestApplied =
      Math.ceil(remainingLoan * calculationUnit * 100) / 100;

    repaymentPlan.push({
      principal: toCurrency(remainingLoan),
      interestApplied: toCurrency(interestApplied),
    });

    remainingLoan = remainingLoan + interestApplied - repaymentAmount;
  }

  return repaymentPlan;
};

export const getLoanDuration = (
  totalPayments: number,
  repaymentFrequency: RepaymentFrequency,
) => {
  const paymentsPerYear = getPaymentsPerYear(repaymentFrequency);
  const years = Math.floor(totalPayments / paymentsPerYear);
  const months = Math.floor((totalPayments / paymentsPerYear - years) * 12);

  return { years, months };
};
