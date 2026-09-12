import { authHandlers } from './domains/auth/index';
import { globalHandlers } from './domains/global/index';

export const handlers = [
  ...authHandlers,
  ...globalHandlers,
];
