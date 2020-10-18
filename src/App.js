import React, { useReducer } from 'react';

import PresetGroupContext from './PresetGroupContext';
import PresetGroup from './PresetGroup';
import Preset from './Preset';
import reducer from './reducer';
import './App.css';

const pg = {
  id: '1',
  object_type: 'preset_group',
  name: 'Affect',
  text: 'Client’s affect is',
  presets: [
    { id: 'id-H', object_type: 'preset', name: 'Labile', text: 'labile' },
    { id: 'id-I', object_type: 'preset', name: 'Blunted', text: 'blunted' },
    { id: 'id-J', object_type: 'preset', name: 'Flat', text: 'flat' },
    {
      id: 'id-A',
      object_type: 'preset',
      name: 'Appro',
      text: 'appro',
      radio_group_id: 1,
      preset_type: ['radio'],
      presets: [
        {
          id: 'id-B',
          object_type: 'preset',
          name: 'Suba',
          text: 'suba',
          radio_group_id: 1,
          preset_type: ['radio'],
          presets: [
            { id: 'id-C', object_type: 'preset', name: 'Subsu', text: 'subsu', radio_group_id: 2, preset_type: ['radio'] },
            { id: 'id-D', object_type: 'preset', name: 'Subsu II', text: 'subsu II', radio_group_id: 2, preset_type: ['radio'] },
          ],
        },
      ],
    },
    { id: 'id-E', object_type: 'preset', name: 'Inapp', text: 'inapp', radio_group_id: 1, preset_type: ['radio'] },
    { id: 'id-F', object_type: 'preset', name: 'Restr', text: 'restr' },
    { id: 'id-G', object_type: 'preset', name: 'Not ass', text: 'not ass', preset_type: ['single_option'] },
  ],
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, pg);

  const handleAdd = () => {
    dispatch({
      type: 'add_preset',
      payload: { id: Date.now().toString(), object_type: 'preset', name: 'Zzz', text: 'zZz' },
    });
  };

  return (
    <PresetGroupContext.Provider value={{ presetGroupState: state, presetGroupDispatch: dispatch }}>
      <div className="App group">
        {
          state.presets?.map(item => item.presets?.length
            ? <PresetGroup ids={[item.id]} key={item.id} />
            : <Preset ids={[item.id]} key={item.id} />,
          )
        }
        <button onClick={handleAdd} type="button">add</button>
      </div>
    </PresetGroupContext.Provider>
  );
};

export default App;
