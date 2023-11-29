export type NotifyMessage = {
    id: string,
    type: 'warning' | 'success' | 'error',
    message: string,
    time: NodeJS.Timeout,
}