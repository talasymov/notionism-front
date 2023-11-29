export type Paginator<T> = {
    data: T[],
    links: {
        first: string | null,
        last: string | null,
        prev: string | null,
        next: string | null,
    },
    meta: {
        total: number
    }
}