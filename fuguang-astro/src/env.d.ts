/// <reference types="astro/client" />

interface Window {
    showActionModal?: (
        title: string,
        desc: string,
        btnText: string,
        onConfirm?: () => void,
        options?: {
            variant?: 'success' | 'error' | 'confirm';
            cancelText?: string;
            onCancel?: () => void;
        }
    ) => void;
}
