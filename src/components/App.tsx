import * as React from "react"

type Props = {}

type State = {}

export class App extends React.Component<Props, State> {
    state: State
    constructor(props: Props) {
        super(props)
        this.state = {}
    }


    render(): JSX.Element | null {
        return (<div />)
    }
}