import { ValueTransformer } from 'typeorm';

export const convertToDecimal: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (value: string) => parseFloat(value),
};
