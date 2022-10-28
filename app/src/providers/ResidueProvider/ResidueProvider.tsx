import * as React from 'react';
import html2canvas from 'html2canvas';
import { ResidueConfig } from './ResidueConfig';
import { DisplayMode } from './types';
import { CanvasContainer, CanvasLayerImage } from './styled';

const { useState, useRef } = React;

interface ResidueContextValue {
  addLayer: (element: HTMLElement) => void;
  eventIsEnabled: (event: EventFlag) => boolean;
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

export const EventFlags = {
  linkClick: true,
  mouseMove: true,
  mouseClick: true,
  subtitles: true,
};

export type EventFlag = keyof typeof EventFlags;

export const ResidueProvider = ({ children }: ResidueProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasLayers, setCanvasLayers] = useState<string[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('mini');
  const [activeEvents, setActiveEvents] = useState(EventFlags);

  /* Config */

  const toggleEvent = (event: EventFlag) =>
    setActiveEvents((events) => ({ ...events, [event]: !events[event] }));

  const eventIsEnabled = (event: EventFlag) => activeEvents[event];

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
        const newLayer = newCanvas.toDataURL();
        setCanvasLayers((layers) => [newLayer, ...layers]);
        // canvasContainer.appendChild(newCanvas);
      },
    );
  };

  const value = {
    addLayer,
    eventIsEnabled,
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
      <CanvasContainer ref={canvasContainerRef} displayMode={displayMode}>
        {canvasLayers.map((layer, index) => (
          <CanvasLayerImage key={layer} src={layer} index={index} />
        ))}
      </CanvasContainer>
      <ResidueConfig
        events={activeEvents}
        toggleEvent={toggleEvent}
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />
      <ResidueContext.Provider value={value}>
        {children}
      </ResidueContext.Provider>
    </>
  );
};
