import { RepaymentFrequency } from 'types/calculator';
import {
  CalculatorAction,
  CalculatorActionType,
  ICalculatorState,
} from './types';

export const calculateReducer = (
  prev: ICalculatorState,
  action: CalculatorAction,
): ICalculatorState => {
  switch (action.type) {
    case CalculatorActionType.SET_DATA:
      return { ...prev, data: action.data };

    case CalculatorActionType.SET_VALUE:
      return {
        ...prev,
        values: {
          ...prev.values,
          [action.field]: action.value,
        },
      };
  }
};

export const defaultCalculatorState: ICalculatorState = {
  data: [],
  values: {
    interestRate: 0,
    loanLifetime: 0,
    principal: 0,
    repaymentAmount: 0,
    repaymentFrequency: RepaymentFrequency.WEEKLY,
  },
};
