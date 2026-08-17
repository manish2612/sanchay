import * as React from 'react';
import { useState, useEffect } from 'react';
import { cn } from '../../utils';
import { AnimatedNumberProps } from './types';
import { useAnimatedNumber } from './useAnimatedNumber';

function OdometerDigit({
  char,
  delay,
  duration,
  skipAnimation,
}: {
  char: string;
  delay: number;
  duration: number;
  skipAnimation: boolean;
}) {
  const targetNum = parseInt(char, 10);
  const [num, setNum] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (skipAnimation) {
      setNum(targetNum);
      setOpacity(1);
      return;
    }
    const t = setTimeout(() => {
      setNum(targetNum);
      setOpacity(1);
    }, 10);
    return () => clearTimeout(t);
  }, [targetNum, skipAnimation]);

  return (
    <span className="relative inline-grid overflow-hidden">
      {/* Ghost text ensures perfect layout size based on the current font */}
      <span className="invisible">{char}</span>
      <span
        className="absolute top-0 left-0 flex flex-col"
        style={{
          transform: `translateY(-${num * 10}%)`,
          opacity,
          transition: skipAnimation
            ? 'none'
            : `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${Math.min(duration, 300)}ms ease-out ${delay}ms`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex-shrink-0 flex items-center justify-center">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

function FadeDigit({
  char,
  delay,
  duration,
  skipAnimation,
}: {
  char: string;
  delay: number;
  duration: number;
  skipAnimation: boolean;
}) {
  return (
    <span className="relative inline-grid overflow-hidden">
      <span className="invisible">{char}</span>
      <span
        key={char}
        className={cn(
          'absolute top-0 left-0 flex items-center justify-center h-full w-full',
          !skipAnimation && 'animate-num-fade-in',
        )}
        style={{
          animationDuration: `${duration}ms`,
          animationDelay: `${delay}ms`,
          animationFillMode: 'both',
        }}
      >
        {char}
      </span>
    </span>
  );
}

function StaticChar({ char, delay, duration, skipAnimation }: { char: string, delay: number, duration: number, skipAnimation: boolean }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (skipAnimation) {
      setIsReady(true);
      return;
    }
    const t = setTimeout(() => {
      setIsReady(true);
    }, 10);
    return () => clearTimeout(t);
  }, [skipAnimation]);

  return (
    <span
      className="inline-grid items-center justify-center"
      style={{
        gridTemplateColumns: isReady ? '1fr' : '0fr',
        opacity: isReady ? 1 : 0,
        transform: `scale(${isReady ? 1 : 0.5})`,
        transition: skipAnimation
          ? 'none'
          : `all ${Math.min(duration, 300)}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <span className="overflow-hidden">
        {char === ' ' ? '\u00A0' : char}
      </span>
    </span>
  );
}

export function AnimatedNumber({
  value,
  mode = 'slide',
  formatOptions,
  locale,
  duration = 500,
  delay = 0,
  className,
}: AnimatedNumberProps) {
  const { chars, formattedValue, skipAnimation } = useAnimatedNumber({
    value,
    mode,
    duration,
    delay,
    locale,
    formatOptions,
  });

  return (
    <span className={cn('relative inline-block tabular-nums leading-none', className)}>
      <span className="sr-only">{formattedValue}</span>

      <span aria-hidden="true" className="flex items-center">
        {chars.map(({ char, key, animationDelay, isNumeric, isGrouping }) => {
          if (!isNumeric) {
            if (isGrouping) {
              if (mode === 'fade') {
                return (
                  <FadeDigit
                    key={key}
                    char={char}
                    delay={parseInt(animationDelay, 10)}
                    duration={duration * 0.5}
                    skipAnimation={skipAnimation}
                  />
                );
              }
              return (
                <StaticChar
                  key={key}
                  char={char}
                  // Bug fixed: parseInt of animationDelay first, then add if needed.
                  // But wait, delay is ALREADY added inside useAnimatedNumber.ts!
                  // So we only need parseInt(animationDelay, 10)
                  delay={parseInt(animationDelay, 10)}
                  duration={duration * 0.5}
                  skipAnimation={skipAnimation}
                />
              );
            }
            // External prefixes/suffixes (e.g. US$, -, €) do not animate
            return (
              <span key={key} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          }

          if (mode === 'fade') {
            return (
              <FadeDigit
                key={key}
                char={char}
                delay={parseInt(animationDelay, 10)}
                duration={duration * 0.5}
                skipAnimation={skipAnimation}
              />
            );
          }

          return (
            <OdometerDigit
              key={key}
              char={char}
              delay={parseInt(animationDelay, 10)}
              duration={duration * 0.5}
              skipAnimation={skipAnimation}
            />
          );
        })}
      </span>
    </span>
  );
}
