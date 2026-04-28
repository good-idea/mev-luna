import * as React from 'react';
import { EventFlag, EventFlags, ResidueSettings } from './types';

const EVENT_FLAGS = Object.keys(EventFlags) as EventFlag[];

const SETTING_CONTROLS: Array<{
  key: keyof ResidueSettings;
  label: string;
  min: number;
  max: number;
}> = [
  { key: 'blur', label: 'Blur', min: 0, max: 50 },
  { key: 'maxDarkness', label: 'Max Darkness', min: 0, max: 100 },
  { key: 'buildUpSpeed', label: 'Build Up Speed', min: 0, max: 100 },
  { key: 'strokeWidth', label: 'Stroke width', min: 0, max: 20 },
];

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
  minWidth: 220,
};

const labelStyle: React.CSSProperties = { display: 'flex' };
const inputStyle: React.CSSProperties = { marginRight: 4 };
const sectionTitleStyle: React.CSSProperties = { marginBottom: 4 };
const sliderLabelStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 8,
};
const sliderStyle: React.CSSProperties = { width: '100%' };
const resetButtonStyle: React.CSSProperties = {
  marginTop: 12,
  width: '100%',
};

interface ResidueConfigProps {
  events: Record<EventFlag, boolean>;
  settings: ResidueSettings;
  toggleEvent: (flag: EventFlag) => void;
  updateSetting: (setting: keyof ResidueSettings, value: number) => void;
  resetResidue: () => void;
}

export const ResidueConfig: React.FC<ResidueConfigProps> = (props) => {
  const { events, settings, toggleEvent, updateSetting, resetResidue } = props;
  const handleEventChange = (event: EventFlag) => () => toggleEvent(event);
  const handleSettingChange =
    (setting: keyof ResidueSettings) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      updateSetting(setting, Number(event.currentTarget.value));

  return (
    <div style={wrapperStyle}>
      <div style={sectionTitleStyle}>Residue Events</div>
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

      <hr style={{ border: '0px solid #c1c0c0', borderBottomWidth: 1 }} />
      <div style={sectionTitleStyle}>Residue Settings</div>
      {SETTING_CONTROLS.map(({ key, label, min, max }) => (
        <div key={key}>
          <label>
            <div style={sliderLabelStyle}>
              <span>{label}</span>
              <span>{settings[key]}</span>
            </div>
            <input
              style={sliderStyle}
              type="range"
              min={min}
              max={max}
              value={settings[key]}
              onChange={handleSettingChange(key)}
            />
          </label>
        </div>
      ))}

      <button style={resetButtonStyle} type="button" onClick={resetResidue}>
        Reset residue
      </button>
    </div>
  );
};
