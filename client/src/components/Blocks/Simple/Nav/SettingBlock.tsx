import React from 'react';
import TestCard from '../../TestCard';

export default function SettingBlock() {
    return (
        <TestCard
            title="title"
            icon="icon"
            movableIcon="move"
            trashCan="trashIcon"
            dropdown="dropdown"
        >
            <div>hi</div>
        </TestCard>
    );
}
