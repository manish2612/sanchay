import { useState, useEffect, useRef, useCallback } from 'react';
import type { CostCenterAllocationRow } from '../components/CostCenterAllocationTable/columns';

export interface UseCostCenterAllocationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetAmount: number;
  initialAllocations?: CostCenterAllocationRow[];
  onSave: (allocations: CostCenterAllocationRow[]) => void;
}

const AUTO_CLOSE_PREF_KEY = 'erp_pref_auto_close_allocations';

export function useCostCenterAllocationSheet({
  open,
  onOpenChange,
  targetAmount,
  initialAllocations = [],
  onSave,
}: UseCostCenterAllocationSheetProps) {
  const [allocations, setAllocations] = useState<CostCenterAllocationRow[]>(initialAllocations);
  const [autoCloseEnabled, setAutoCloseEnabled] = useState(true);
  const [isAutoClosing, setIsAutoClosing] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');
  
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setAllocations(initialAllocations || []);
      setIsAutoClosing(false);
      setProgressWidth('0%');
      const pref = localStorage.getItem(AUTO_CLOSE_PREF_KEY);
      if (pref !== null) {
        setAutoCloseEnabled(pref === 'true');
      }
    } else {
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
    }
  }, [open]);

  const cancelAutoClose = useCallback(() => {
    setIsAutoClosing((prev) => {
      if (prev) {
        setProgressWidth('0%');
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
        if (progressTimerRef.current) clearTimeout(progressTimerRef.current);
      }
      return false;
    });
  }, []);

  const handleToggleAutoClose = (checked: boolean) => {
    setAutoCloseEnabled(checked);
    localStorage.setItem(AUTO_CLOSE_PREF_KEY, String(checked));
    if (!checked) {
      cancelAutoClose();
    }
  };

  const currentTotal = allocations.reduce((sum, row) => {
    const amt = parseFloat(row.amount.replace(/[^0-9.-]+/g, '')) || 0;
    return sum + amt;
  }, 0);

  const isBalanced = Math.abs(currentTotal - targetAmount) < 0.001 && targetAmount > 0;

  useEffect(() => {
    if (isBalanced && autoCloseEnabled && open && !isAutoClosing) {
      setIsAutoClosing(true);
      setProgressWidth('0%');
      
      progressTimerRef.current = setTimeout(() => {
        setProgressWidth('100%');
      }, 10);
      
      autoCloseTimerRef.current = setTimeout(() => {
        onSave(allocations);
        onOpenChange(false);
      }, 800);
    } else if (!isBalanced) {
      cancelAutoClose();
    }
    // Safely omitting cancelAutoClose and isAutoClosing to prevent redundant loop triggers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBalanced, autoCloseEnabled, open, allocations, onSave, onOpenChange]);

  const handleManualSave = () => {
    onSave(allocations);
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return {
    allocations,
    setAllocations,
    autoCloseEnabled,
    handleToggleAutoClose,
    isAutoClosing,
    progressWidth,
    isBalanced,
    handleManualSave,
    handleClose,
  };
}
