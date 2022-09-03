import * as React from 'react';
import html2canvas from 'html2canvas';

const { useState, useRef } = React;

interface ResidueContextValue {
  addLayer: (element: HTMLElement) => void;
}

const ResidueContext = React.createContext<ResidueContextValue | undefined>(
  undefined,
);

export const ResidueConsumer = ResidueContext.Consumer;

export const useResidue = () => {
  const ctx = React.useContext(ResidueContext);
  if (!ctx)
    throw new Error('useResidueContext must be used within a ResidueProvider');
  return ctx;
};

interface ResidueProps {
  children: React.ReactNode;
}

export const ResidueProvider = ({ children }: ResidueProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const toggleVisible = () =>
    setVisible((currentVisibility) => !currentVisibility);

  /* Adding layers */
  const addLayer = (originalElement: HTMLElement) => {
    const imageContainer = imageContainerRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!imageContainer || !canvasContainer) return;
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    clonedElement.classList.add('hover');
    const { outerHTML } = clonedElement;
    const { offsetLeft } = originalElement;
    const rect = originalElement.getBoundingClientRect();
    const left = offsetLeft;
    const top = rect.y;

    const html =
      `<div style="position: absolute; top: ${top}px; padding: 0 18px">` +
      `<div style="padding-left: ${left - 18}px; display: inline"></div>` +
      '<div style="display: inline">' +
      outerHTML +
      '</div>' +
      '</div>';
    imageContainer.innerHTML = html;
    const newCanvas = document.createElement('canvas');
    newCanvas.setAttribute('style', '2px solid green');
    imageContainer.appendChild(newCanvas);
    html2canvas(imageContainer, { scale: 2, backgroundColor: null }).then(
      (newCanvas) => {
        newCanvas.setAttribute('style', 'position: absolute;');
        canvasContainer.appendChild(newCanvas);
      },
    );
  };

  const value = {
    addLayer,
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          zIndex: 200,
          top: 0,
          left: '100%',
          height: '100%',
          width: '100%',
          pointerEvents: 'none',
          transformOrigin: '0 0',
        }}
        ref={imageContainerRef}
      />

      <div
        style={{
          position: 'fixed',
          zIndex: 200,
          bottom: 18,
          right: 18,
          opacity: visible ? 1 : 0,
          border: '3px solid gray',
          height: '200%',
          width: '200%',
          pointerEvents: 'none',
          transform: 'scale(0.1)',
          transformOrigin: '100% 100%',
          outline: '2px solid red',
        }}
        ref={canvasContainerRef}
      />
      <button
        style={{ position: 'fixed', zIndex: 300, top: '18px', right: '18px' }}
        type="button"
        onClick={toggleVisible}
      >
        {visible ? 'hide' : 'show'}
      </button>
      <ResidueContext.Provider value={value}>
        {children}
      </ResidueContext.Provider>
    </>
  );
};
