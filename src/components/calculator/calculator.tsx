import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { FieldInput } from 'components/input';
import { repaymentFrequencyOptions } from 'constants/picklists';
import React, { useCallback, useEffect, useReducer } from 'react';
import { ICalculatorValues } from 'types/calculator';
import { calculateLoan, getLoanDuration } from 'utils/transformers/calculator';
import { useDebounce } from 'utils/use-debounce';
import { calculateReducer, defaultCalculatorState } from './reducer';
import { CalculatorActionType, CalculatorKey } from './types';

export const Calculator: React.FC = () => {
  const [state, dispatch] = useReducer(
    calculateReducer,
    defaultCalculatorState,
  );

  const onChange = useCallback((field: CalculatorKey, value: number) => {
    dispatch({
      type: CalculatorActionType.SET_VALUE,
      field,
      value,
    });
  }, []);

  const handleData = useDebounce((values: ICalculatorValues) => {
    const nextLoan = calculateLoan(values);
    console.log(nextLoan);

    dispatch({
      data: nextLoan,
      type: CalculatorActionType.SET_DATA,
    });
  }, 1000);

  useEffect(() => {
    handleData(state.values);
  }, [
    state.values.interestRate,
    state.values.repaymentAmount,
    state.values.principal,
    state.values.repaymentFrequency,
  ]);

  const duration = getLoanDuration(
    state.data?.length || 0,
    state.values?.repaymentFrequency || 0,
  );

  return (
    <Card style={{ padding: 24 }}>
      <Grid container alignItems="center">
        <FieldInput
          label="Interest Rate"
          name={CalculatorKey.INTEREST_RATE}
          onChange={onChange}
          type="number"
          value={state.values.interestRate}
        />
        <FieldInput
          label="Repayment Amount"
          name={CalculatorKey.REPAYMENT_AMOUNT}
          onChange={onChange}
          type="number"
          value={state.values.repaymentAmount}
        />
        <FieldInput
          label="Principal Amount"
          name={CalculatorKey.PRINCIPAL_AMOUNT}
          onChange={onChange}
          type="number"
          value={state.values.principal}
        />
        <FieldInput
          label="Repayment Frequency"
          name={CalculatorKey.REPAYMENT_FREQUENCY}
          onChange={onChange}
          options={repaymentFrequencyOptions}
          type="number-select"
          value={state.values.repaymentFrequency}
        />
      </Grid>
      {state.data?.length && (
        <Grid container>
          <Grid item xs={12}>
            Payment Plan ({duration.years} Years {duration.months} Months)
          </Grid>
          {state.data.map((repayment) => (
            <React.Fragment key={repayment.interestApplied}>
              <Grid item xs={6}>
                {repayment.principal}
              </Grid>
              <Grid item xs={6}>
                {repayment.interestApplied}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </Card>
  );
};
