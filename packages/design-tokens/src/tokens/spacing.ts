const baseSpacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};

export const spacing = {
  comfortable: baseSpacing,
  // Compact: Tighten the scale significantly
  compact: {
    ...baseSpacing,
    1: '2px',
    2: '6px',
    3: '10px',
    4: '12px',
    5: '16px',
    6: '20px',
    8: '24px',
    10: '32px',
  },
  // Spacious: Loosen the scale
  spacious: {
    ...baseSpacing,
    1: '6px',
    2: '10px',
    3: '14px',
    4: '20px',
    5: '24px',
    6: '30px',
  },
};
