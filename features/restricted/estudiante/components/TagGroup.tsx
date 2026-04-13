"use client"
import React from 'react'
import { Tag } from './Tag';

interface TagProps {
    tags: string[];
    selection: string | null;
    onToggle: (tag: string) => void;
    variant?: 'day' | 'jornada'
}

export const TagGroup = ({tags, selection, onToggle, variant}: TagProps) => {
    return (
        <div className='flex flex-wrap gap-2 lg:gap-3'>
            {tags.map((tag) => (
                <Tag
                    key={tag}
                    label={tag}
                    selected={selection === tag}
                    variant={variant}
                    onClick={() => onToggle(tag)}
                />
            ))}
        </div>
    )
}
