const TransactionType = {
  IN: 'IN',
  OUT: 'OUT',
} as const;

type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export { TransactionType };
