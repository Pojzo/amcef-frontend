export interface ListType { 
    listId: number;
    title: string;
}

export interface GetListsResponse {
    lists: ListType[];
}