import * as React from 'react';
import { EventFlags, EventFlag } from './ResidueProvider';
import { DisplayMode } from './types';
import styled from '@xstyled/styled-components';

const Wrapper = styled.divBox`
  position: fixed;
  z-index: 300;
  padding: 8px;
  border-radius: 3px;
  top: 18px;
  right: 18px;
  background-color: white;
  border: 2px solid #c1c0c0;
  box-shadow: 0px 1px 2px #cac1c1;

  display: none;
  @media screen and (min-width: 800px) {
    display: block;
  }
`;

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
    <Wrapper>
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
            onChange={handleSetDisplayMode('background')}
          />
          background
        </label>
      </div>

      <div>
        <label style={{ display: 'flex' }}>
          <input
            style={{ marginRight: '4px' }}
            type="radio"
            checked={displayMode === 'overlay'}
            onChange={handleSetDisplayMode('overlay')}
          />
          overlay
        </label>
      </div>
    </Wrapper>
  );
};
