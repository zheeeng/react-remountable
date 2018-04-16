# react-remountable

* provides an API `remount` as prop for re-mounting component;
* resets stateful component to initial state;
* just use it like using `ReactComponent::forceUpdate`;
* re-calls phases: `componentWillUnmount` -> `constructor` -> `static getDerivedStateFromProps(v16.3+)` -> `render` -> collect refs ->  `componentDidMount`;

## Installation

```
yarn add react-remountable
```

or

```
npm install -s react-remountable
```

## Example:

```jsx
import remountable from 'react-remountable'
import { StatefulForm1, StatefulForm2, StatefulForm3 } from './Forms'

@remountable  // decorator syntax
export default class Dashboard extends React.Component {
    state = { greeting: '', whatsUp: '' }

    focusRef = (ref) => ref && ref.focus()

    handleWhatsUpChange = (e) => {
        this.setState({ whatsUp: e.target.value })
    }

    handleReset = () => {
        // 1. send log
        // 2. re-render/refresh Dashboard component and its stateful children components
        // 3. auto focus on the text input
        // 4. fetch today's greeting and render it
        this.props.remount()
    }

    async componentDidMount () {
        const { greeting } = await fetch('api.example.com/greeting').then(response.json())
        this.setState({ greeting })
    }

    render () {
        return (
            <div>
                <h1>{this.state.greeting}</h1>
                <StatefulForm1 />
                <StatefulForm2 />
                <StatefulForm3 />
                <Input onChange={this.handleWhatsUpChange} ref={this.focusRef} />
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }

    componentWillUnmount () {
        fetch('api.example.com/log', { method: 'POST', body: JSON.stringify({ action: 'reset'}) })
    }
}
```

If the ESNext decorator syntax is not enabled:

```js
export default remountable(Dashboard)
```

## Enjoy it!
