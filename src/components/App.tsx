import * as React from "react"
import { expected_value_of_damage_table } from "model/expected_value"
import { Form, Button } from "react-bootstrap"

type Props = {}

type State = {
    std_value: number,
    damage: number,
    critical_number: number
}

export class App extends React.Component<Props, State> {
    state: State
    constructor(props: Props) {
        super(props)
        this.state = {
            std_value: 0,
            damage: 0,
            critical_number: 10
        }
    }

    onInputStdValue(maybe_std_value: string) {
        const std_value = Number(maybe_std_value);
        if (!isNaN(std_value)) {
            this.setState({
                std_value: std_value
            });
        }
    }

    onInputDamage(maybe_damage: string) {
        const damage = Number(maybe_damage);
        if (!isNaN(damage)) {
            this.setState({
                damage: damage
            });
        }
    }

    onInputCriticalNumber(maybe_critical_number: string) {
        const critical_number = Number(maybe_critical_number);
        if (!isNaN(critical_number)) {
            this.setState({
                critical_number: critical_number
            });
        }
    }

    render(): JSX.Element | null {
        return (
            <div id="app">
                <div className="input">
                    <span>基準値</span>
                    <Form.Control type="text" value={this.state.std_value.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputStdValue(e.currentTarget.value)} />
                </div>
                <div className="input">
                    <span>威力</span>
                    <Form.Control type="text" value={this.state.damage.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputDamage(e.currentTarget.value)} />
                </div>
                <div className="input">
                    <span>C値</span>
                    <Form.Control type="text" value={this.state.critical_number.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputCriticalNumber(e.currentTarget.value)} />
                </div>
                <div className="input">
                    <span>期待値</span>
                    <span>{expected_value_of_damage_table(this.state.damage, this.state.std_value, this.state.critical_number).toFixed(2)}</span>
                </div>
            </div>
        )
    }
}