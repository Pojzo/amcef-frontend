export enum ItemFlag {
	Active = "active",
	Finished = "finished",
	Aborted = "aborted",
}

export interface ItemBaseType {
	title: string;
	description: string;
	deadline: string;
	flag: ItemFlag;
}

export interface ItemType extends ItemBaseType {
	listId: number;
	itemId: number;
	createdBy: number;
}

export interface ItemCreateType extends ItemBaseType {
	listId?: number;
}

export interface ItemUpdateType extends ItemBaseType {
	listId: number;
	itemId: number;
}

export interface ListType {
	creatorEmail: string;
	isCreator: boolean;
	listId: number;
	title: string;
	items: ItemType[];
	users: string[];
}

export interface GetListsResponse {
	lists: ListType[];
}
