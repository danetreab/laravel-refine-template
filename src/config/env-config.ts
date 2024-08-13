declare const importMeta: {
    readonly env: {
        readonly VITE_API_URL: string;
    };
};

export const API_URL = import.meta.env.VITE_API_URL;