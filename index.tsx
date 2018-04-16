import React from 'react'

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export interface RemountableProps {
  remount: () => void
}

export interface RemountableState {
  count: number,
}

function remountable <P extends RemountableProps> (WrappedComponent: React.ComponentType<P>) {
  return class Remountable extends React.Component<Omit<P, 'remount'>> {
    static displayName: string = `remountable(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`

    static get keyPrefix () { return '@remountable-key@' }

    state = { count: 0 }

    handleRemount = () => {
      this.setState({ count: this.state.count + 1 })
    }

    render () {
      const key = Remountable.keyPrefix + this.state.count

      return <WrappedComponent {...this.props} key={key} remount={this.handleRemount} />
    }
  }
}

export default remountable
