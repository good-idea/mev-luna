import * as React from 'react';
import html2canvas from 'html2canvas';
import { ResidueConfig } from './ResidueConfig';
import { Layer, DisplayMode } from './types';
import { CanvasContainer, CanvasLayerImage } from './styled';
import { useRouter } from 'next/router';

const { useEffect, useState, useRef } = React;

interface ResidueContextValue {
  captureElementTrace: (element: HTMLElement) => void;
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
  linkClick: false,
  mouseMove: true,
  mouseClick: true,
  subtitles: true,
};

export type EventFlag = keyof typeof EventFlags;

export const ResidueProvider = ({ children }: ResidueProps) => {
  const router = useRouter();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasLayers, setCanvasLayers] = useState<Map<string, Layer>>(
    new Map(),
  );
  const [displayMode, setDisplayMode] = useState<DisplayMode>('background');
  const [activeEvents, setActiveEvents] = useState(EventFlags);

  const addLayer = (canvas: HTMLCanvasElement) => {
    const data = canvas.toDataURL();
    const layerData = {
      width: canvas.width,
      height: canvas.height,
      data,
    };

    setCanvasLayers((previous) => new Map(previous).set(data, layerData));
  };

  /* Config */

  const toggleEvent = (event: EventFlag) =>
    setActiveEvents((events) => ({ ...events, [event]: !events[event] }));

  const eventIsEnabled = (event: EventFlag) => activeEvents[event];

  /* Adding layers */
  const captureElementTrace = (originalElement: HTMLElement) => {
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
    const canvas = document.createElement('canvas');
    canvas.setAttribute('style', '2px solid green');
    imageContainer.appendChild(canvas);
    html2canvas(imageContainer, { scale: 2, backgroundColor: null }).then(
      (canvas) => {
        canvas.setAttribute('style', 'position: absolute;');
        addLayer(canvas);
      },
    );
  };

  /* Tracking mouse movement */

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '0.5';
    canvas.style.pointerEvents = 'none';
    canvas.style.filter = 'blur(30px)';
    const resizeCanvas = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    };
    if (!ctx) return;
    ctx.beginPath();
    const trackMovement = (e: MouseEvent) => {
      if (activeEvents.mouseMove) {
        const { clientX, clientY } = e;
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.1)';
        ctx.lineWidth = 5;
        ctx.lineTo(clientX, clientY);
        ctx.stroke();
        ctx.moveTo(clientX, clientY);
      }
    };

    const trackClick = (e: MouseEvent) => {
      if (activeEvents.mouseClick) {
        const { clientX, clientY } = e;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(100, 100, 100, 1)';
        ctx.arc(clientX, clientY, 10, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.moveTo(clientX, clientY);
      }
    };

    document.addEventListener('mousedown', trackClick);
    document.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', trackMovement);
    document.body.appendChild(canvas);
    return () => {
      addLayer(canvas);
      document.removeEventListener('mousedown', trackClick);
      document.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', trackMovement);
    };
  }, [
    Array.from(canvasLayers).length,
    activeEvents.mouseMove,
    activeEvents.mouseClick,
    router.asPath,
  ]);

  const value = {
    captureElementTrace,
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
        {Array.from(canvasLayers).map(([data, layer], index) => (
          <CanvasLayerImage key={data} src={layer.data} index={index} />
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
