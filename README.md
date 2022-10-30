# prhttp-react
React Component lifecycle binding for [prhttp](https://github.com/idleray/prhttp).

## Installation
```shell
npm install prhttp-react
```

## Usage
### Class Component
Use [HOC](https://reactjs.org/docs/higher-order-components.html) to bind Class Component.
```javascript
import { bindLifecycle } from 'prhttp-react'

// PrHttpClient instance
const httpClient = /.../

const withClient = bindLifecycle(httpClient)
const BoundComponent = withClient(WrappedComponent)

```

### Function Component
Use [Effect Hook](https://reactjs.org/docs/hooks-effect.html) to bind Function Component.
```javascript
import { useLifecycle } from 'prhttp-react'
import { CancelError } from 'prhttp'

function useRequest() {
  useEffect(() => {
    getExample().then( () => {
      // Handle response
    }).catch( e => {
      if(e instanceof CancelError) {
            console.log(`Request was cancelled`)
        } else {
            console.log(e)
        }
    })
  })
  
}

function Home() {
    // Call useLifecycle before request
    useLifecycle(httpClient)
    useRequest()
    
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}
```
