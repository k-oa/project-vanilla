export const TileType = {
    AIR: 0,
    GRASS: 1,
} as const;

export type TileType = (typeof TileType)[keyof typeof TileType];
