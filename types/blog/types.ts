export type Article = {
    created_at: string;
    desc:string;
    html: string | null;
    id: number;
    likes: number;
    notion_page_id: string;
    page_object:boolean;
    preview:string;
    slug:string;
    status: 'publish' | 'draft',
    title: string;
    updated_at: string;
    user_id:number;
}