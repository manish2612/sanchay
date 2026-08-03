"use client";

import React from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";
import { Check } from "lucide-react";

export const StepNav = () => {
  const { currentStep, steps, totalSteps, goToStep } = useFormWizardContext();

  if (totalSteps <= 1) {
    return null; // Don't render step nav for single step forms
  }

  return (
    <>
      {/* Mobile Header (Visible < 1024px) */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-surface-active border-b border-border">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-primary bg-primary text-primary-fg shadow-[0_0_0_4px_rgba(0,128,76,0.2)]">
          {currentStep}
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-head text-sm font-bold uppercase tracking-wider text-primary truncate">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="truncate text-base font-bold text-fg font-head leading-tight">
            {steps[currentStep - 1]?.title}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar (Visible >= 1024px) */}
      <aside className="hidden lg:flex flex-col w-[344px] pr-11 flex-shrink-0 bg-surface-variant relative z-10 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Entity Zone (Optional - could be passed as children, but keeping it simple for now) */}
          <div className="px-6 pt-7 pb-4 relative flex-shrink-0">
            <h2 className="font-head text-[17px] font-bold text-fg leading-tight">
              Form Wizard
            </h2>
          </div>
          <div className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />

          {/* Step List */}
          <div className="flex flex-col gap-4 flex-1 p-4 pl-5">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isDone = currentStep > stepNumber;

              return (
                <div
                  key={step.id}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                  onClick={() => goToStep(stepNumber)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goToStep(stepNumber);
                    }
                  }}
                  className={`relative flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md ring-1 ring-primary-hover"
                      : isDone
                        ? ""
                        : "hover:bg-primary/5"
                  }`}
                >
                  {/* Connecting Line */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute left-[23px] top-[24px] -bottom-[40px] w-[2px] rounded-[1px] z-[1] ${
                        isDone ? "bg-primary" : "bg-outline"
                      }`}
                    />
                  )}

                  {/* Dot */}
                  <div
                    className={`relative z-[2] w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-head font-bold border-2 transition-all ${
                      isActive
                        ? "bg-primary-foreground text-primary border-transparent"
                        : isDone
                          ? "bg-primary border-primary text-primary-foreground ring-4 ring-primary/30"
                          : "bg-surface border-outline text-muted-fg"
                    }`}
                  >
                    {isDone ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    ) : (
                      stepNumber
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-[1px] pt-[2px]">
                    <span
                      className={`font-head text-sm leading-tight ${
                        isActive
                          ? "text-primary-foreground font-bold"
                          : isDone
                            ? "text-muted-fg font-medium"
                            : "text-muted-fg font-medium"
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.description && (
                      <span
                        className={`text-xs leading-snug mt-[1px] ${isActive ? "text-primary-foreground/80" : "text-muted-fg"}`}
                      >
                        {step.description}
                      </span>
                    )}
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
