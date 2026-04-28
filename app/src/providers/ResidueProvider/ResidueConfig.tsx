import * as React from 'react';
import { EventFlag, EventFlags } from './types';

const EVENT_FLAGS = Object.keys(EventFlags) as EventFlag[];

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 300,
  padding: 8,
  borderRadius: 3,
  top: 18,
  right: 18,
  backgroundColor: 'white',
  border: '2px solid #c1c0c0',
  boxShadow: '0px 1px 2px #cac1c1',
};

const labelStyle: React.CSSProperties = { display: 'flex' };
const inputStyle: React.CSSProperties = { marginRight: 4 };

interface ResidueConfigProps {
  events: Record<EventFlag, boolean>;
  toggleEvent: (flag: EventFlag) => void;
}

export const ResidueConfig: React.FC<ResidueConfigProps> = (props) => {
  const { events, toggleEvent } = props;
  const handleEventChange = (event: EventFlag) => () => toggleEvent(event);

  return (
    <div style={wrapperStyle}>
      <div style={{ marginBottom: 4 }}>Residue Events</div>
      {EVENT_FLAGS.map((event) => (
        <div key={event}>
          <label style={labelStyle}>
            <input
              style={inputStyle}
              type="checkbox"
              checked={events[event]}
              onChange={handleEventChange(event)}
            />
            {event}
          </label>
        </div>
      ))}
    </div>
  );
};
