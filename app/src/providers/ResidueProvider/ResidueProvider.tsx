import * as React from 'react';
import html2canvas from 'html2canvas';
import { ResidueConfig } from './ResidueConfig';
import { Layer, DisplayMode } from './types';
import { CanvasContainer, CanvasLayerImage } from './styled';
import { useRouter } from 'next/router';
import { isEnabled } from 'src/config/featureFlags';

const { useCallback, useEffect, useMemo, useState, useRef } = React;

const DROPLET_SOURCES = Array.from({ length: 14 }, (_, index) => {
  const dropletNumber = String(index + 1).padStart(2, '0');
  return `/assets/droplets/drop${dropletNumber}.png`;
});

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
  const dropletIndexRef = useRef(0);
  const [canvasLayers, setCanvasLayers] = useState<Layer[]>([]);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('background');
  const [activeEvents, setActiveEvents] = useState(EventFlags);

  const addLayer = useCallback((layer: Omit<Layer, 'id'>) => {
    setCanvasLayers((previous) => [
      ...previous,
      {
        ...layer,
        id: `${layer.data}-${Date.now()}-${Math.random()}`,
      },
    ]);
  }, []);

  const addCanvasLayer = useCallback(
    (canvas: HTMLCanvasElement, blur = false) => {
      addLayer({
        width: canvas.width,
        height: canvas.height,
        data: canvas.toDataURL(),
        blur,
      });
    },
    [addLayer],
  );

  const drawDroplet = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const dropletSource = DROPLET_SOURCES[dropletIndexRef.current];
      dropletIndexRef.current =
        (dropletIndexRef.current + 1) % DROPLET_SOURCES.length;

      const image = new Image();
      image.onload = () => {
        ctx.drawImage(
          image,
          x - image.naturalWidth / 2,
          y - image.naturalHeight / 2,
        );
      };
      image.src = dropletSource;
    },
    [],
  );

  /* Config */

  const toggleEvent = useCallback(
    (event: EventFlag) =>
      setActiveEvents((events) => ({ ...events, [event]: !events[event] })),
    [],
  );

  const eventIsEnabled = useCallback(
    (event: EventFlag) => activeEvents[event],
    [activeEvents],
  );

  /* Adding layers */
  const captureElementTrace = useCallback(
    (originalElement: HTMLElement) => {
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
          addCanvasLayer(canvas);
        },
      );
    },
    [addCanvasLayer],
  );

  /* Tracking mouse movement */

  useEffect(() => {
    const movementCanvas = document.createElement('canvas');
    const dropletCanvas = document.createElement('canvas');
    movementCanvas.height = window.innerHeight;
    movementCanvas.width = window.innerWidth;
    dropletCanvas.height = window.innerHeight;
    dropletCanvas.width = window.innerWidth;
    const movementCtx = movementCanvas.getContext('2d');
    const dropletCtx = dropletCanvas.getContext('2d');

    [movementCanvas, dropletCanvas].forEach((canvas) => {
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.opacity = '1';
      canvas.style.zIndex = '-1';
      canvas.style.pointerEvents = 'none';
    });
    movementCanvas.style.filter = 'blur(30px)';

    const resizeCanvas = () => {
      movementCanvas.height = window.innerHeight;
      movementCanvas.width = window.innerWidth;
      dropletCanvas.height = window.innerHeight;
      dropletCanvas.width = window.innerWidth;
    };
    if (!movementCtx || !dropletCtx) return;
    movementCtx.beginPath();
    const trackMovement = (e: MouseEvent) => {
      if (activeEvents.mouseMove) {
        const { clientX, clientY } = e;
        movementCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
        movementCtx.lineWidth = 5;
        movementCtx.lineTo(clientX, clientY);
        movementCtx.stroke();
        movementCtx.moveTo(clientX, clientY);
      }
    };

    const trackClick = (e: MouseEvent) => {
      if (activeEvents.mouseClick) {
        const { clientX, clientY } = e;
        movementCtx.moveTo(clientX, clientY);
        drawDroplet(dropletCtx, clientX, clientY);
      }
    };

    document.addEventListener('mousedown', trackClick);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', trackMovement);
    document.body.appendChild(movementCanvas);
    document.body.appendChild(dropletCanvas);
    return () => {
      addCanvasLayer(movementCanvas, true);
      addCanvasLayer(dropletCanvas);
      movementCanvas.remove();
      dropletCanvas.remove();
      document.removeEventListener('mousedown', trackClick);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', trackMovement);
    };
  }, [
    activeEvents.mouseMove,
    activeEvents.mouseClick,
    // router.asPath,
    addCanvasLayer,
    drawDroplet,
  ]);

  const value = useMemo(
    () => ({
      captureElementTrace,
      eventIsEnabled,
    }),
    [captureElementTrace, eventIsEnabled],
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: '100%',
          height: '100%',
          width: '100%',
          pointerEvents: 'none',
          transformOrigin: '0 0',
        }}
        ref={imageContainerRef}
      />
      <CanvasContainer ref={canvasContainerRef} $displayMode={displayMode}>
        {canvasLayers.map((layer, index) => (
          <CanvasLayerImage
            key={layer.id}
            src={layer.data}
            width={layer.width}
            height={layer.height}
            $index={index}
            $left={layer.left}
            $top={layer.top}
            $blur={layer.blur}
          />
        ))}
      </CanvasContainer>
      {isEnabled('residueDebugger') ? (
        <ResidueConfig
          events={activeEvents}
          toggleEvent={toggleEvent}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      ) : null}
      <ResidueContext.Provider value={value}>
        {children}
      </ResidueContext.Provider>
    </>
  );
};
