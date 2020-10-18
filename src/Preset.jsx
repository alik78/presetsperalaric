import React, { useContext, useState } from 'react';
import PresetGroupContext from './PresetGroupContext';

const Preset = ({ ids }) => {
  const { presetGroupState, presetGroupDispatch } = useContext(PresetGroupContext);
  const [preset, setPreset] = useState(() => {
    let currentPreset = presetGroupState;
    ids.forEach(id => {
      currentPreset = currentPreset.presets.find(item => item.id === id);
    });
    return currentPreset;
  });
  const [canUpdate, setCanUpdate] = useState(false);

  const handleDelete = () => {
    presetGroupDispatch({ type: 'remove_preset', payload: ids });
  };

  const handleUpdate = () => {
    presetGroupDispatch({ type: 'update_preset', payload: { preset, ids } });
    setCanUpdate(false);
  };

  const handleChange = e => {
    setPreset({ ...preset, name: e.target.value });
    setCanUpdate(true);
  };

  return (
    <div>
      <input type="text" value={preset?.name} onChange={handleChange} />
      {
        canUpdate && <button type="button" onClick={handleUpdate}>update</button>
      }
      {`(${preset?.id})`}
      <button type="button" onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Preset;
