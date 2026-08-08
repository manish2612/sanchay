'use client';

import React from 'react';
import { useFormWizardContext } from '../hooks/useFormWizard';
import { Check } from 'lucide-react';

export interface StepNavProps {
  /** Custom title string or ReactNode to display in the StepNav sidebar header */
  title?: React.ReactNode;
  /** Custom CSS classes for the sidebar container */
  className?: string;
}

export const StepNav = ({ title = 'Form Wizard', className = '' }: StepNavProps = {}) => {
  const { currentStep, steps, totalSteps, goToStep, rejectedStepIndex, setRejectedStepIndex } =
    useFormWizardContext();
  const [modifier, setModifier] = React.useState('Alt+');

  // Detect if the user is on macOS to display the native "⌥" symbol for the Option key.
  // Falls back to "Alt+" for Windows/Linux users.
  React.useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)) {
      setModifier('⌥');
    }
  }, []);

  // Automatically clear the rejected step error state after the CSS animation completes (500ms).
  // This allows the step to be shaken again if the user repeatedly tries to jump while invalid.
  React.useEffect(() => {
    if (rejectedStepIndex !== null) {
      const timer = setTimeout(() => {
        setRejectedStepIndex(null);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [rejectedStepIndex, setRejectedStepIndex]);

  if (totalSteps <= 1) {
    return null; // Don't render step nav for single step forms
  }

  return (
    <>
      <style>{`
        @keyframes headshake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          50% { transform: translateX(4px); }
          75% { transform: translateX(-4px); }
          100% { transform: translateX(0); }
        }
        .animate-headshake {
          animation: headshake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      {/* Mobile Header (Visible < 1024px) */}
      <div className="lg:hidden flex items-center justify-between gap-3 px-4 py-3 bg-surface-active border-b border-border min-h-[52px]">
        {/* Left Side: Main Form Title */}
        <div className="flex-1 min-w-0 pr-2">
          {typeof title === 'string' ? (
            <h1 className="font-head text-sm font-bold text-fg truncate">{title}</h1>
          ) : (
            title
          )}
        </div>

        {/* Right Side: Step Progress & Circle */}
        <div className="flex items-center gap-2.5 flex-shrink-0 text-right">
          <div className="flex flex-col items-end min-w-0">
            <span className="font-head text-[11px] font-semibold text-muted-fg uppercase tracking-wider leading-none">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-head text-xs font-medium text-fg truncate max-w-[120px] sm:max-w-[180px] leading-tight mt-0.5">
              {steps[currentStep - 1]?.title}
            </span>
          </div>

          <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-head font-bold bg-primary text-primary-fg border-2 border-primary ring-4 ring-primary/15">
            {currentStep}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (Visible >= 1024px) */}
      <aside
        className={`hidden lg:flex flex-col w-[344px] pr-11 flex-shrink-0 bg-surface-variant relative z-10 overflow-hidden ${className}`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Entity Zone */}
          <div className="px-6 pt-7 pb-4 relative flex-shrink-0">
            {typeof title === 'string' ? (
              <h2 className="font-head text-[17px] font-bold text-fg leading-tight">{title}</h2>
            ) : (
              title
            )}
          </div>
          <div className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />

          {/* Step List */}
          <div
            role="tablist"
            aria-orientation="vertical"
            className="flex flex-col gap-4 flex-1 p-4 pl-5"
          >
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isDone = currentStep > stepNumber;
              const isRejected = rejectedStepIndex === stepNumber;

              return (
                <div
                  key={step.id}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  title={`${step.title} (${modifier}${stepNumber})`}
                  onClick={() => goToStep(stepNumber)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      goToStep(stepNumber);
                    }
                  }}
                  className={`group relative flex items-start p-2.5 rounded-lg cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isRejected
                      ? 'bg-danger/10 text-danger shadow-md ring-1 ring-danger/30'
                      : isActive
                        ? 'bg-primary text-primary-foreground shadow-md ring-1 ring-primary-hover'
                        : isDone
                          ? ''
                          : 'hover:bg-primary/5'
                  }`}
                >
                  {/* Connecting Line (Absolute to parent, DOES NOT SHAKE) */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-[23px] top-[24px] -bottom-[40px] w-[2px] rounded-[1px] z-[1] ${
                        isDone ? 'bg-primary' : 'bg-outline'
                      }`}
                    />
                  )}

                  {/* Shaking Container (Dot + Info + Shortcut) */}
                  <div
                    className={`relative z-[2] flex items-start gap-3 w-full ${isRejected ? 'animate-headshake' : ''}`}
                  >
                    {/* Dot */}
                    <div
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-head font-bold border-2 transition-all ${
                        isRejected
                          ? 'bg-danger border-danger text-danger-foreground ring-4 ring-danger/20'
                          : isActive
                            ? 'bg-primary-foreground text-primary border-transparent'
                            : isDone
                              ? 'bg-primary border-primary text-primary-foreground ring-4 ring-primary/30'
                              : 'bg-surface border-outline text-muted-fg'
                      }`}
                    >
                      {isDone && !isRejected ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        stepNumber
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-[1px] pt-[2px] flex-1 min-w-0">
                      <span
                        className={`font-head text-sm leading-tight truncate ${
                          isRejected
                            ? 'text-danger font-bold'
                            : isActive
                              ? 'text-primary-foreground font-bold'
                              : 'text-muted-fg font-medium'
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.description && (
                        <span
                          className={`text-xs leading-snug mt-[1px] truncate ${
                            isRejected
                              ? 'text-danger/80'
                              : isActive
                                ? 'text-primary-foreground/80'
                                : 'text-muted-fg'
                          }`}
                        >
                          {step.description}
                        </span>
                      )}
                    </div>

                    {/* Shortcut Badge */}
                    <div
                      className={`hidden lg:flex items-center justify-center transition-opacity mt-1 flex-shrink-0 ${isDone && !isActive ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                    >
                      <kbd
                        className={`text-[10px] font-sans border rounded px-1.5 py-0.5 shadow-sm font-medium ${
                          isActive
                            ? 'border-primary-foreground/30 text-primary-foreground bg-primary/20'
                            : 'border-border text-muted-fg bg-surface group-hover:border-outline/80'
                        }`}
                      >
                        {modifier}
                        {stepNumber}
                      </kbd>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
