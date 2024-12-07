
export type ObjectSettings = {
    maxDepth: number;
    maxObjects: number;
}

export type ObjectProps = {
    z: number;
    y?: number;
    x?: number;
    children?: React.ReactNode;
}

export type containerProps = {
    close?: ()=>void;
}