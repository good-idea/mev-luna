import * as React from 'react';
import html2canvas from 'html2canvas';
import { ResidueConfig } from './ResidueConfig';
import {
  EventFlag,
  EventFlags,
  EventState,
  Layer,
  ResidueSettings,
} from './types';
import { isEnabled } from 'src/config/featureFlags';

const { useCallback, useEffect, useMemo, useRef, useState } = React;

const DROPLET_SOURCES = Array.from({ length: 14 }, (_, index) => {
  const dropletNumber = String(index + 1).padStart(2, '0');
  return `/assets/droplets/drop${dropletNumber}.png`;
});

const DEFAULT_SETTINGS: ResidueSettings = {
  blur: 15,
  maxDarkness: 100,
  buildUpSpeed: 100,
  strokeWidth: 5,
};

const canvasContainerStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: -1,
  pointerEvents: 'none',
  transformOrigin: '100% 100%',
  width: '200%',
  height: '200%',
  bottom: 0,
  right: 0,
  transform: 'scale(0.5)',
};

const canvasLayerStyle = (layer: Layer): React.CSSProperties => ({
  position: 'absolute',
  top: layer.top ?? 0,
  left: layer.left ?? 0,
  filter: layer.blur ? 'blur(50px)' : 'none',
  transition: '2s',
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

export { EventFlags } from './types';
export type { EventFlag } from './types';

const createFullScreenCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.opacity = '1';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  return canvas;
};

const resizeCanvasToViewport = (canvas: HTMLCanvasElement) => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

export const ResidueProvider = ({ children }: ResidueProps) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const dropletIndexRef = useRef(0);
  const layerIdRef = useRef(0);
  const activeEventsRef = useRef<EventState>(EventFlags);
  const settingsRef = useRef<ResidueSettings>(DEFAULT_SETTINGS);
  const movementCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropletCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const movementCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const hasMovementResidueRef = useRef(false);
  const hasDropletResidueRef = useRef(false);
  const dropletImagesRef = useRef<HTMLImageElement[]>([]);
  const [canvasLayers, setCanvasLayers] = useState<Layer[]>([]);
  const [activeEvents, setActiveEvents] = useState<EventState>(EventFlags);
  const [settings, setSettings] = useState<ResidueSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    activeEventsRef.current = activeEvents;
  }, [activeEvents]);

  useEffect(() => {
    settingsRef.current = settings;

    const movementCanvas = movementCanvasRef.current;
    const movementCtx = movementCtxRef.current;
    if (!movementCanvas || !movementCtx) return;

    movementCanvas.style.filter = `blur(${settings.blur}px)`;
    movementCanvas.style.opacity = String(settings.maxDarkness / 100);
    movementCtx.strokeStyle = `rgba(0, 0, 0, ${settings.buildUpSpeed / 100})`;
    movementCtx.lineWidth = settings.strokeWidth;
  }, [settings]);

  useEffect(() => {
    dropletImagesRef.current = DROPLET_SOURCES.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
  }, []);

  const addLayer = useCallback((layer: Omit<Layer, 'id'>) => {
    layerIdRef.current += 1;
    setCanvasLayers((previous) => [
      ...previous,
      {
        ...layer,
        id: `residue-layer-${layerIdRef.current}`,
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
      const dropletIndex = dropletIndexRef.current;
      const image = dropletImagesRef.current[dropletIndex];
      dropletIndexRef.current = (dropletIndex + 1) % DROPLET_SOURCES.length;
      if (!image) return;

      const drawImage = () => {
        ctx.drawImage(
          image,
          x - image.naturalWidth / 2,
          y - image.naturalHeight / 2,
        );
      };

      if (image.complete && image.naturalWidth) {
        drawImage();
      } else {
        image.addEventListener('load', drawImage, { once: true });
      }
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

  const updateSetting = useCallback(
    (setting: keyof ResidueSettings, value: number) => {
      setSettings((currentSettings) => ({
        ...currentSettings,
        [setting]: value,
      }));
    },
    [],
  );

  const resetResidue = useCallback(() => {
    setCanvasLayers([]);

    const movementCanvas = movementCanvasRef.current;
    const dropletCanvas = dropletCanvasRef.current;
    const movementCtx = movementCtxRef.current;

    if (movementCanvas && movementCtx) {
      movementCtx.clearRect(0, 0, movementCanvas.width, movementCanvas.height);
      movementCtx.beginPath();
    }

    const dropletCtx = dropletCanvas?.getContext('2d');
    if (dropletCanvas && dropletCtx) {
      dropletCtx.clearRect(0, 0, dropletCanvas.width, dropletCanvas.height);
    }

    hasMovementResidueRef.current = false;
    hasDropletResidueRef.current = false;
  }, []);

  /* Adding layers */
  const captureElementTrace = useCallback(
    (originalElement: HTMLElement) => {
      const imageContainer = imageContainerRef.current;
      if (!imageContainer) return;

      const clonedElement = originalElement.cloneNode(true) as HTMLElement;
      clonedElement.classList.add('hover');

      const rect = originalElement.getBoundingClientRect();
      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.top = `${rect.y}px`;
      wrapper.style.padding = '0 18px';

      const spacer = document.createElement('div');
      spacer.style.paddingLeft = `${Math.max(originalElement.offsetLeft - 18, 0)}px`;
      spacer.style.display = 'inline';

      const content = document.createElement('div');
      content.style.display = 'inline';
      content.appendChild(clonedElement);

      wrapper.append(spacer, content);
      imageContainer.replaceChildren(wrapper);

      html2canvas(imageContainer, { scale: 2, backgroundColor: null })
        .then((canvas) => addCanvasLayer(canvas))
        .finally(() => imageContainer.replaceChildren());
    },
    [addCanvasLayer],
  );

  /* Tracking mouse movement */

  useEffect(() => {
    const movementCanvas = createFullScreenCanvas();
    const dropletCanvas = createFullScreenCanvas();
    const movementCtx = movementCanvas.getContext('2d');
    const dropletCtx = dropletCanvas.getContext('2d');

    if (!movementCtx || !dropletCtx) return;

    movementCanvasRef.current = movementCanvas;
    dropletCanvasRef.current = dropletCanvas;
    movementCtxRef.current = movementCtx;
    hasMovementResidueRef.current = false;
    hasDropletResidueRef.current = false;

    const currentSettings = settingsRef.current;
    movementCanvas.style.filter = `blur(${currentSettings.blur}px)`;
    movementCanvas.style.opacity = String(currentSettings.maxDarkness / 100);
    movementCtx.beginPath();
    movementCtx.strokeStyle = `rgba(0, 0, 0, ${currentSettings.buildUpSpeed / 100})`;
    movementCtx.lineWidth = currentSettings.strokeWidth;

    const resizeCanvas = () => {
      resizeCanvasToViewport(movementCanvas);
      resizeCanvasToViewport(dropletCanvas);
      movementCtx.beginPath();
    };

    const trackMovement = (e: MouseEvent) => {
      if (!activeEventsRef.current.mouseMove) return;

      const { clientX, clientY } = e;
      movementCtx.lineTo(clientX, clientY);
      movementCtx.stroke();
      movementCtx.moveTo(clientX, clientY);
      hasMovementResidueRef.current = true;
    };

    const trackClick = (e: MouseEvent) => {
      if (!activeEventsRef.current.mouseClick) return;

      const { clientX, clientY } = e;
      movementCtx.moveTo(clientX, clientY);
      drawDroplet(dropletCtx, clientX, clientY);
      hasDropletResidueRef.current = true;
    };

    document.addEventListener('mousedown', trackClick);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', trackMovement);
    document.body.appendChild(movementCanvas);
    document.body.appendChild(dropletCanvas);

    return () => {
      if (hasMovementResidueRef.current) addCanvasLayer(movementCanvas, true);
      if (hasDropletResidueRef.current) addCanvasLayer(dropletCanvas);
      movementCanvas.remove();
      dropletCanvas.remove();
      document.removeEventListener('mousedown', trackClick);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', trackMovement);
      movementCanvasRef.current = null;
      dropletCanvasRef.current = null;
      movementCtxRef.current = null;
    };
  }, [addCanvasLayer, drawDroplet]);

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
      <div style={canvasContainerStyle}>
        {canvasLayers.map((layer) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={layer.id}
            src={layer.data}
            width={layer.width}
            height={layer.height}
            style={canvasLayerStyle(layer)}
            alt=""
          />
        ))}
      </div>
      {isEnabled('residueDebugger') ? (
        <ResidueConfig
          events={activeEvents}
          settings={settings}
          toggleEvent={toggleEvent}
          updateSetting={updateSetting}
          resetResidue={resetResidue}
        />
      ) : null}
      <ResidueContext.Provider value={value}>
        {children}
      </ResidueContext.Provider>
    </>
  );
};
