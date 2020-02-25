import * as React from "react"
import { expected_value_of_damage_table } from "model/expected_value"
import { success_rate } from "model/counter_role"
import { Form, Button } from "react-bootstrap"

type Props = {}

type State = {
    std_value: number,
    damage: number,
    critical_number: number,
    accuracy: number,
    evasion: number,
}

export class App extends React.Component<Props, State> {
    state: State
    constructor(props: Props) {
        super(props)
        this.state = {
            std_value: 0,
            damage: 0,
            critical_number: 10,
            accuracy: 0,
            evasion: 0
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

    onInputAccuracy(maybe_accuracy: string) {
        const accuracy = Number(maybe_accuracy);
        if (!isNaN(accuracy)) {
            this.setState({
                accuracy
            });
        }
    }

    onInputEvasion(maybe_evasion: string) {
        const evasion = Number(maybe_evasion);
        if (!isNaN(evasion)) {
            this.setState({
                evasion
            });
        }
    }

    render(): JSX.Element | null {
        const expected_damage = expected_value_of_damage_table(this.state.damage, this.state.std_value, this.state.critical_number);
        const acc_rate = success_rate(this.state.accuracy, this.state.evasion);
        return (
            <div id="app">
                <span>基準値</span>
                <Form.Control type="text" value={this.state.std_value.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputStdValue(e.currentTarget.value)} />
                <span>威力</span>
                <Form.Control type="text" value={this.state.damage.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputDamage(e.currentTarget.value)} />
                <span>C値</span>
                <Form.Control type="text" value={this.state.critical_number.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputCriticalNumber(e.currentTarget.value)} />

                <span>命中時与ダメージの期待値</span>
                <span>{expected_damage.toFixed(2)}</span>

                <span>命中力</span>
                <Form.Control type="text" value={this.state.accuracy.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputAccuracy(e.currentTarget.value)} />
                <span>回避力</span>
                <Form.Control type="text" value={this.state.evasion.toString()} onInput={(e: React.FormEvent<HTMLInputElement>) => this.onInputEvasion(e.currentTarget.value)} />

                <span>命中率</span>
                <span>{(acc_rate * 100).toFixed(2)}%</span>

                <span>DPSの期待値</span>
                <span>{(acc_rate * expected_damage).toFixed(2)}</span>
            </div>
        );
    }
}