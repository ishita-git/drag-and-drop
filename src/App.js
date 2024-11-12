import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { Label, InputBox, CheckBox, Button } from './components';
import { saveLayoutToDB, loadLayoutFromDB } from './firebase/firebaseHelpers';
import './App.css';
import { DroppableArea } from './components/DroppableArea';

const App = () => {
    const [layout, setLayout] = useState([]);
    const [search, setSearch] = useState('');

    const controls = [
        { id: 'Label', type: 'Label', label: 'Enter Your Name', component: <Label /> },
        { id: 'InputBox', type: 'InputBox', label: 'Age', component: <InputBox /> },
        { id: 'CheckBox', type: 'CheckBox', label: 'I agree', component: <CheckBox /> },
        { id: 'Button', type: 'Button', label: 'Submit', component: <Button /> },
    ];

    const DraggableItem = ({ control }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: control.id,
        });

        const style = {
            transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
            cursor: 'grab',
            marginBottom: '8px',
        };

        return (
            <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable-item">
                {control.component}
            </div>
        );
    };

    const handleDragEnd = (event) => {
        const { active } = event;
        const control = controls.find((control) => control.id === active.id);
        if (control) {
            setLayout((prev) => [...prev, control]);
        }
    };

    const saveLayout = () => {
        if (search.trim()) {
            saveLayoutToDB(search, layout);
        } else {
            alert("Please enter a layout name before saving.");
        }
    };

    const loadLayout = async () => {
        if (search.trim()) {
            const savedLayout = await loadLayoutFromDB(search);
            setLayout(savedLayout || []);
        } else {
            alert("Please enter a layout name to load.");
        }
    };

    const publishLayout = () => {
        const newWindow = window.open();
        newWindow.document.write('<h1>Published Page</h1>');
        layout.forEach((item) => {
            newWindow.document.write(`<div>${item.id}</div>`);
        });
    };

    return (
        <div className="app-container">
            <div className="controls-container">
                <h2>Controls</h2>
                <DndContext onDragEnd={handleDragEnd}>
                    {controls.map((control) => (
                        <DraggableItem key={control.id} control={control} />
                    ))}
                </DndContext>
            </div>

            <div className="dynamic-layout-container">
                <div className="top-controls">
                    <input
                        type="text"
                        placeholder="Enter Layout"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-box"
                    />
                    <button onClick={saveLayout}>Save Layout</button>
                    <button onClick={loadLayout}>Load Layout</button>
                    <button onClick={publishLayout}>Publish</button>
                </div>

                <DndContext onDragEnd={handleDragEnd}>
                    <DroppableArea layout={layout} />
                </DndContext>
            </div>
        </div>
    );
};

export default App;
