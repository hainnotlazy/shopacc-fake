export interface BaseSchema {
	name: string;
	image: string;
}

export interface Champion extends BaseSchema {}

export interface Skin extends BaseSchema {}

export interface Emote extends BaseSchema {}

export interface Icon extends BaseSchema {
	id: number;
	description: string;
	releasedAt: number; // YYYY
}

export interface TFTArena extends BaseSchema {}

export interface TFTBoom extends BaseSchema {}
