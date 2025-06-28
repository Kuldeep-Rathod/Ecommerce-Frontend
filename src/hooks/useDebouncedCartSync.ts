import { debounce } from 'lodash';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

type SyncArgs = {
    userId: string;
    productId: string;
    action: 'increment' | 'decrement';
};

type SyncFn = (args: SyncArgs) => Promise<any>;

export const useDebouncedCartSync = (updateItemQuantity: SyncFn) => {
    return useCallback(
        debounce(
            (
                args: SyncArgs,
                onSuccess: () => void,
                onError: (err: any) => void
            ) => {
                updateItemQuantity(args)
                    .then(() => {
                        toast.success('Cart synced with server');
                        onSuccess();
                    })
                    .catch((err) => {
                        console.error('Cart sync error:', err);
                        toast.error(
                            err?.data?.message ||
                                err?.error ||
                                'Failed to sync cart'
                        );
                        onError(err);
                    });
            },
            3000 // 3-second debounce
        ),
        [updateItemQuantity]
    );
};
