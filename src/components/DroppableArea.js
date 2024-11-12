import {useDroppable } from '@dnd-kit/core';
import { Label,InputBox,CheckBox,Button } from '.';
export const DroppableArea = ({ layout }) => {
    const { setNodeRef } = useDroppable({
      id: 'droppable-area',
    });

    const style = {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '10px',
      minHeight: '300px',
      width: '100%',
  };
  
  const renderComponent = (type) => {
    switch (type) {
      case 'Label':
        return <Label/>;
      case 'InputBox':
        return <InputBox />;
      case 'CheckBox':
        return <CheckBox />;
      case 'Button':
        return <Button />;
      default:
        return null;
    }
  };

    return (
      <div ref={setNodeRef} style={style} className="dynamic-layout">
        {layout.map((item, index) => (
          <div key={index} className="layout-item">
            {renderComponent(item.type)}
          </div>
        ))}
      </div>
    );
  };
