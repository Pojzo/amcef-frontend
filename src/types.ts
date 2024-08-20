export enum ItemFlag {
	Active = "active",
	Finished = "finished",
	Aborted = "aborted",
}

export interface ItemType {
	itemId: number;
	listId: number;
	createdBy: number;
	title: string;
	description: string;
	deadline: string;
	flag: ItemFlag;
}

export interface CreateItemType {
	title: string;
	description: string;
	deadline: string;
	flag: ItemFlag;
}

export interface ListType {
	createdBy: number;
	listId: number;
	title: string;
	items: ItemType[];
}

export interface GetListsResponse {
	lists: ListType[];
}
