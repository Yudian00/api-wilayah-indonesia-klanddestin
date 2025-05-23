export type APIResponse<T> =
    | { success: boolean; message: string; data: T; error?: never }
    | { success: boolean; message: string; data?: never; error: string };
