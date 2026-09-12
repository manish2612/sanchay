import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Settings, X, Activity } from 'lucide-react';
import { getMockConfig, setMockConfig, isAnyMockEnabled, MockRegistry } from '../store/mockConfig';

export default function MockDevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<MockRegistry>(getMockConfig());
  const bubbleRef = useRef<HTMLDivElement>(null);
  const hasDragged = useRef(false);

  // Sync state across tabs or manual storage changes
  useEffect(() => {
    const handleStorage = () => setConfig(getMockConfig());
    window.addEventListener('mock_config_changed', handleStorage);
    return () => window.removeEventListener('mock_config_changed', handleStorage);
  }, []);

  const anyActive = isAnyMockEnabled();

  // High-Performance Dragging & Corner Snapping
  useEffect(() => {
    const bubble = bubbleRef.current;
    if (!bubble || isOpen) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = bubble.getBoundingClientRect().left;
    let initialTop = bubble.getBoundingClientRect().top;
    let currentX = 0;
    let currentY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only drag on left click
      if (e.button !== 0) return;
      isDragging = true;
      hasDragged.current = false;
      startX = e.clientX;
      startY = e.clientY;
      const rect = bubble.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;
      
      bubble.setPointerCapture(e.pointerId);
      bubble.style.transition = 'none';
      bubble.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      
      if (Math.abs(currentX) > 5 || Math.abs(currentY) > 5) {
        hasDragged.current = true;
      }
      
      bubble.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      bubble.releasePointerCapture(e.pointerId);
      bubble.style.cursor = 'grab';
      
      // If we didn't drag, it was a click!
      if (!hasDragged.current) {
        setIsOpen(true);
        return; // Skip snapping logic since it's opening
      }

      // Calculate final absolute position
      const finalLeft = initialLeft + currentX;
      const finalTop = initialTop + currentY;
      
      // Snap to closest corner (with 24px padding)
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const padding = 24;
      const bubbleSize = 48; // w-12 h-12 = 48px
      
      const snapLeft = finalLeft < winW / 2 ? padding : winW - bubbleSize - padding;
      const snapTop = finalTop < winH / 2 ? padding : winH - bubbleSize - padding;

      // Reset transform and apply absolute position with smooth transition
      bubble.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      bubble.style.transform = 'translate3d(0, 0, 0)';
      bubble.style.left = `${snapLeft}px`;
      bubble.style.top = `${snapTop}px`;
      // Clear bottom/right defaults to prevent conflicting constraints
      bubble.style.bottom = 'auto'; 
      bubble.style.right = 'auto';
    };

    bubble.addEventListener('pointerdown', onPointerDown);
    bubble.addEventListener('pointermove', onPointerMove);
    bubble.addEventListener('pointerup', onPointerUp);
    
    return () => {
      bubble.removeEventListener('pointerdown', onPointerDown);
      bubble.removeEventListener('pointermove', onPointerMove);
      bubble.removeEventListener('pointerup', onPointerUp);
    };
  }, [isOpen]);

  const toggleEndpoint = (module: keyof MockRegistry, endpoint: string) => {
    const newConfig = { ...config };
    newConfig[module] = {
      ...newConfig[module],
      [endpoint]: !(newConfig[module] as any)[endpoint],
    };
    setConfig(newConfig);
    setMockConfig(newConfig);
  };

  const toggleModule = (module: keyof MockRegistry, value: boolean) => {
    const newConfig = { ...config };
    const endpoints = Object.keys(newConfig[module]);
    newConfig[module] = endpoints.reduce((acc, ep) => {
      acc[ep] = value;
      return acc;
    }, {} as any);
    setConfig(newConfig);
    setMockConfig(newConfig);
  };

  const disableAll = () => {
    const newConfig = { ...config };
    Object.keys(newConfig).forEach((mod) => {
      Object.keys(newConfig[mod as keyof MockRegistry]).forEach((ep) => {
        (newConfig[mod as keyof MockRegistry] as any)[ep] = false;
      });
    });
    setConfig(newConfig);
    setMockConfig(newConfig);
  };

  const renderPanel = () => (
    <div className="fixed inset-y-0 right-0 w-80 bg-surface border-l border-border shadow-2xl z-[9999] flex flex-col font-sans transition-colors">
      <div className="flex items-center justify-between p-4 border-b border-border bg-surfaceVariant">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <Activity className="w-5 h-5 text-primary" />
          API Mocks
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1 hover:bg-surfaceHover rounded-md transition-colors"
        >
          <X className="w-5 h-5 text-mutedForeground" />
        </button>
      </div>

      <div className="p-4 border-b border-border">
        <button
          onClick={disableAll}
          disabled={!anyActive}
          className="w-full py-2 bg-surfaceVariant hover:bg-surfaceHover disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium text-foreground transition-colors"
        >
          Disable All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(config).map(([modName, endpoints]) => {
          const allModActive = Object.values(endpoints).every(Boolean);
          const someModActive = Object.values(endpoints).some(Boolean);
          
          return (
            <div key={modName} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground capitalize">{modName}</h3>
                <button
                  onClick={() => toggleModule(modName as any, !allModActive)}
                  className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                    allModActive 
                      ? 'bg-primary text-primaryForeground hover:bg-primaryHover' 
                      : 'bg-surfaceVariant text-mutedForeground hover:bg-surfaceHover'
                  }`}
                >
                  {allModActive ? 'ALL ON' : someModActive ? 'PARTIAL' : 'ALL OFF'}
                </button>
              </div>
              
              <div className="space-y-2 bg-surfaceVariant rounded-lg p-3 border border-border">
                {Object.entries(endpoints).map(([epName, isActive]) => (
                  <div key={epName} className="flex items-center justify-between">
                    <span className="text-sm text-foreground capitalize font-medium">{epName}</span>
                    <button
                      onClick={() => toggleEndpoint(modName as any, epName)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        isActive ? 'bg-primary' : 'bg-input'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform shadow-sm ${
                          isActive ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render via portal to ensure it stays above everything and ignores parent positioning
  return createPortal(
    <>
      {isOpen && renderPanel()}
      <div
        ref={bubbleRef}
        className="fixed bottom-6 right-6 z-[9999] touch-none"
        style={{ visibility: isOpen ? 'hidden' : 'visible' }}
      >
        <button
          className="relative flex items-center justify-center w-12 h-12 bg-surface text-foreground rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-border hover:shadow-xl hover:bg-surfaceHover transition-colors cursor-grab"
        >
          <Settings className="w-6 h-6 text-mutedForeground" />
          {anyActive && (
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-danger border-2 border-surface"></span>
            </span>
          )}
        </button>
      </div>
    </>,
    document.body
  );
}
