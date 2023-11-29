export type Widget = {
    id: number,
    title:string,
    desc: string,
    preview: string,
    html: never | string,
    page_object:boolean,
    slug: string,
    notion_page_id: string,
    status: 'publish' | 'draft',
    created_at: string,
    updated_at: string
}