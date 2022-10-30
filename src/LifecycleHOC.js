import React from "react";
import hoistStatics from 'hoist-non-react-statics'
import { Lifecycle } from 'prhttp/lifecycle'

export function bindLifecycle(httpClient) {
    const wrapWithClient = (WrappedComponent) => {
         class WithLifecycle extends React.Component {
            constructor(props) {
                super(props)
                this.lifecycle = new Lifecycle()
                if(httpClient) {
                    httpClient.bindLifecycle(this.lifecycle)
                }
            }
            componentWillUnmount() {
                this.lifecycle.setState(Lifecycle.STATE.BEFORE_UNMOUNTED)
                if(httpClient) {
                    httpClient.unbindLifecycle(this.lifecycle)
                }
            }
            render() {
                return React.createElement(
                    WrappedComponent,
                    {...this.props}
                )
            }
        }

        const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'
        WithLifecycle.displayName = `Prhttp(${wrappedComponentName})`

        return hoistStatics(WithLifecycle, WrappedComponent)
    }

    return wrapWithClient
}