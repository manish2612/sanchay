import { getLedgersHandler } from './getLedgers';
import { getVoucherTypesHandler } from './getVoucherTypes';

export const accountingHandlers = [getLedgersHandler, getVoucherTypesHandler];
