import { ICalculatorValues, ILoanRepayment } from 'types/calculator';

export enum CalculatorActionType {
  SET_DATA,
  SET_VALUE,
}

export enum CalculatorKey {
  INTEREST_RATE = 'interestRate',
  LOAN_LIFETIME = 'loanLifetime',
  PRINCIPAL_AMOUNT = 'principal',
  REPAYMENT_AMOUNT = 'repaymentAmount',
  REPAYMENT_FREQUENCY = 'repaymentFrequency',
}

export interface ICalculatorState {
  data: ILoanRepayment[];
  values: ICalculatorValues;
}

export type CalculatorAction =
  | {
      field: CalculatorKey;
      value: number;
      type: CalculatorActionType.SET_VALUE;
    }
  | {
      data: any;
      type: CalculatorActionType.SET_DATA;
    };
