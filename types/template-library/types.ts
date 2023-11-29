export type Template = {
    id: number,
    title:string,
    desc: string,
    dbs: number,
    props: number,
    pages: number,
    ver: never | string,
    preview: string,
    html: never | string,
    page_object:boolean,
    price: number,
    slug: string,
    link: string,
    notion_page_id: string,
    likes: number,
    user_id: number,
    status: 'publish' | 'draft',
    created_at: string,
    updated_at: string
}

export type Category = {
    id: number,
    name: string,
    slug: string,
    created_at: string,
    updated_at: string
}

export type Tag = {
    id: number,
    name: string,
    slug: string,
    icon: string,
    likes: number,
    notion_page_id: string,
    category_id: number,
    tag_id: number | null,
    created_at: string,
    updated_at: string,
    templates_count: number,
    category: Category,
}