import { RepaymentFrequency } from 'types/calculator';
import { IFieldOption } from 'types/form';

export const repaymentFrequencyOptions: IFieldOption[] = [
  {
    label: 'Weekly',
    value: RepaymentFrequency.WEEKLY,
  },
  {
    label: 'Fornightly',
    value: RepaymentFrequency.FORTNIGHTLY,
  },
  {
    label: 'Monthly',
    value: RepaymentFrequency.MONTHLY,
  },
];
