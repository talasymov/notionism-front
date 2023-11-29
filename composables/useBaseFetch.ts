export const useBaseFetch = (url: string, opts: any = {}):Promise<any> => {
    opts.credentials = 'include'

    const config = useRuntimeConfig()

    const token_dirty = useCookie('XSRF-TOKEN').value

    const token = decodeURIComponent(token_dirty === null ? '' : token_dirty) // <---- CHANGED

    if (!opts.headers) {
        opts.headers = {}
    }

    opts.headers['X-XSRF-TOKEN'] = token
    opts.headers['Accept'] = 'application/json, text/plain, */*'
    opts.headers['X-Requested-With'] = 'XMLHttpRequest'

    return $fetch(`${config.public.apiBase}api/${url}`, opts)
}