// Tile.js
import React from 'react';
import './Tile.css';

export function FilledTile({index, value, dragStart}) {
    return (
        <div
            id={`place-${index + 1}`}
            className={`filled-tile ${index === value - 1 ? 'gradient-bg' : ''}`}
        >
            <p
                id={`tile-${value}`}
                draggable="true"
                onDragStart={dragStart}
                className="text-styling"
            >
                {value}
            </p>
        </div>
    );
}

export function EmptyTile({dragOver, dropped, index}) {
    return (
        <div
            onDragOver={dragOver}
            onDrop={dropped}
            id={`place-${index + 1}`}
            className="empty-tile"
        ></div>
    );
}
