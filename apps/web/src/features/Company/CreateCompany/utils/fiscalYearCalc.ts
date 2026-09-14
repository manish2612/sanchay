import { NepaliDate } from '@prime/ui';

export const calculateFiscalYear = (booksStartDate: Date, isNepali: boolean): { fyStartDateEnglish: Date, fyEndDateEnglish: Date } => {
  if (isNepali) {
    // 1. Convert English JS Date to NepaliDate
    const bs = new NepaliDate(booksStartDate);
    let bsYear = bs.getYear();
    const bsMonth = bs.getMonth(); // 0-indexed (0 = Baisakh, 3 = Shrawan)

    // 2. If the current month is before Shrawan (Month 3), the fiscal year started in the previous BS year.
    if (bsMonth < 3) {
      bsYear -= 1;
    }

    // 3. Shrawan 1st of the calculated BS year
    const startBs = new NepaliDate(bsYear, 3, 1);
    const fyStartDateEnglish = startBs.getDateObject(); // Standard JS Date (English)

    // 4. Shrawan 1st of the NEXT BS year, minus 1 day (JS Time)
    const nextStartBs = new NepaliDate(bsYear + 1, 3, 1);
    const fyEndDateEnglish = new Date(nextStartBs.getDateObject().getTime() - 86400000); // Subtract 24 hours

    return { fyStartDateEnglish, fyEndDateEnglish };
  } else {
    // English/Gregorian Logic
    let year = booksStartDate.getFullYear();
    const month = booksStartDate.getMonth(); // 0-indexed (0 = Jan, 3 = Apr)

    // If before April, the fiscal year started in the previous Gregorian year.
    if (month < 4) {
      year -= 1;
    }

    // April 1st of the calculated year
    const fyStartDateEnglish = new Date(year, 4, 1);
    // March 31st of the next year
    const fyEndDateEnglish = new Date(year + 1, 3, 31);

    return { fyStartDateEnglish, fyEndDateEnglish };
  }
};
