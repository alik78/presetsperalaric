export default (state, action) => {
  const actionTypes = {
    add_preset: () => ({ ...state, presets: [...state.presets, action.payload] }),
    remove_preset: () => {
      const tempState = JSON.parse(JSON.stringify(state.presets));
      const ids = action.payload;
      let currentPreset = tempState;
      ids.forEach((id, index) => {
        if (index < ids.length - 1) {
          currentPreset = currentPreset[currentPreset.findIndex(item => item.id === id)].presets;
        } else {
          currentPreset.splice(currentPreset.findIndex(i => i.id === id), 1);
        }
      });
      return ({ ...state, presets: tempState });
    },
    update_preset: () => {
      const tempState = JSON.parse(JSON.stringify(state.presets));
      const { ids } = action.payload;
      let currentPreset = tempState;
      ids.forEach((id, index) => {
        if (index < ids.length - 1) {
          currentPreset = currentPreset[currentPreset.findIndex(item => item.id === id)].presets;
        } else {
          currentPreset[currentPreset.findIndex(item => item.id === id)] = action.payload.preset;
        }
      });
      return ({ ...state, presets: tempState });
    },
  };

  if (actionTypes[action.type]) {
    return actionTypes[action.type]();
  }

  return state;
};
