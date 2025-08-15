export type Pagination = {
	limit: number;
	count: number;
	pagesCount: number;
	page: number;
	prev: number | null;
	next: number | null;
};
