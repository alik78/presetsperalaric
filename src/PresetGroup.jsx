import React, { useState, useEffect, useCallback, useContext } from 'react';
import PresetGroupContext from './PresetGroupContext';
import Preset from './Preset';

const PresetGroup = ({ ids }) => {
  const { presetGroupState } = useContext(PresetGroupContext);

  const getCurrentGroup = useCallback(() => {
    let currentGroup = presetGroupState;
    ids.forEach(id => {
      currentGroup = currentGroup.presets.find(item => item.id === id);
    });
    return currentGroup;
  }, [ids, presetGroupState]);

  const [group, setGroup] = useState(getCurrentGroup());

  useEffect(() => {
    setGroup(getCurrentGroup());
  }, [setGroup, getCurrentGroup]);

  return (
    <div className="group">
      Group:
      {` ${group?.name} (${group?.id}) `}
      {
        group.presets?.map(item => item.presets?.length
          ? (
            <div key={[...ids, item.id, '-g'].toString()}>
              <PresetGroup ids={[...ids, item.id]} />
            </div>
          )
          : <Preset ids={[...ids, item.id]} key={[...ids, item.id, '-p'].toString()} />,
        )
      }
    </div>
  );
};

export default PresetGroup;
