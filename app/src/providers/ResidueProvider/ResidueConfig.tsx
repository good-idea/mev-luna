import * as React from 'react';
import { EventFlags, EventFlag } from './ResidueProvider';
import { DisplayMode } from './types';

interface ResidueConfigProps {
  events: Record<EventFlag, boolean>;
  toggleEvent: (flag: EventFlag) => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

export const ResidueConfig: React.FC<ResidueConfigProps> = (props) => {
  const { events, toggleEvent, displayMode, setDisplayMode } = props;
  const handleEventChange = (event: EventFlag) => () => toggleEvent(event);
  const handleSetDisplayMode = (mode: DisplayMode) => () =>
    setDisplayMode(mode);
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 300,
        padding: '8px',
        borderRadius: '3px',
        top: '18px',
        right: '18px',
        backgroundColor: 'white',
        border: '2px solid #c1c0c0',
        boxShadow: '0px 1px 2px #cac1c1',
      }}
    >
      <div style={{ marginBottom: '4px' }}>Residue Events</div>
      {Object.keys(EventFlags).map((key) => (
        <div key={key}>
          <label style={{ display: 'flex' }}>
            <input
              style={{ marginRight: '4px' }}
              type="checkbox"
              checked={events[key]}
              // @ts-ignore
              onChange={handleEventChange(key)}
            />
            {key}
          </label>
        </div>
      ))}

      <hr style={{ border: '0px solid #c1c0c0', borderBottomWidth: '1px' }} />
      <div style={{ marginTop: '12px', marginBottom: '4px' }}>Display Mode</div>
      <div>
        <label style={{ display: 'flex' }}>
          <input
            style={{ marginRight: '4px' }}
            type="radio"
            checked={displayMode === 'hidden'}
            // @ts-ignore
            onChange={handleSetDisplayMode('hidden')}
          />
          hidden
        </label>
      </div>

      <div>
        <label style={{ display: 'flex' }}>
          <input
            style={{ marginRight: '4px' }}
            type="radio"
            checked={displayMode === 'mini'}
            // @ts-ignore
            onChange={handleSetDisplayMode('mini')}
          />
          mini
        </label>
      </div>

      <div>
        <label style={{ display: 'flex' }}>
          <input
            style={{ marginRight: '4px' }}
            type="radio"
            checked={displayMode === 'background'}
            // @ts-ignore
            onChange={handleSetDisplayMode('background')}
          />
          background
        </label>
      </div>
    </div>
  );
};
