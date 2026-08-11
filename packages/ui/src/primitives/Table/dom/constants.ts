export const TABLE_ROW_COMMIT_ACTIONS = {
  ADVANCE: 'ADVANCE',
  STAY: 'STAY',
  EXIT: 'EXIT',
} as const;

export type TableRowCommitAction = typeof TABLE_ROW_COMMIT_ACTIONS[keyof typeof TABLE_ROW_COMMIT_ACTIONS];
