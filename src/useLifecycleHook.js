import { useEffect } from 'react';
import { Lifecycle } from 'prhttp/lifecycle'

export function useLifecycle(httpClient) {
    useEffect( () => {
        const lifecycle = new Lifecycle()
        if(httpClient) {
            httpClient.bindLifecycle(lifecycle)
        }

        return () => {
            lifecycle.setState(Lifecycle.STATE.BEFORE_UNMOUNTED)
            if(httpClient) {
                httpClient.unbindLifecycle(lifecycle)
            }
        }

    }, [])
}