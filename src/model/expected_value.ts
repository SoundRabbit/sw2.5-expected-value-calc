import { damage_table } from "./damage_table"

/**
 * @function
 * @param ev {number} 振り足しをしない場合の期待値
 * @param p {number} 振り足しが起こる確率
 */
export function expected_value(ev: number, p: number): number {
    if (p >= 1) {
        return Infinity;
    } else {
        return -ev / (p - 1);
    }
}

export function expected_value_with_2d6(dice_mapper: Array<number>, critical_numbers: Array<number>): number {
    const p_table = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

    let ev = 0;
    for (let dice_roll = 2; dice_roll <= 12; dice_roll++) {
        ev += dice_mapper[dice_roll] * p_table[dice_roll];
    }
    ev /= 36;

    let cp = 0;
    for (const critical_number of critical_numbers) {
        cp += p_table[critical_number];
    }
    cp /= 36;

    return expected_value(ev, cp);
}

export function expected_value_of_judge(std_value: number, critical_number: number): number {
    const p_table = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

    const dice_mapper_f = (new Array<number>(13)).fill(0);
    const dice_mapper_c = (new Array<number>(13)).fill(0);
    for (let dice_roll = 2; dice_roll <= 12; dice_roll++) {
        dice_mapper_c[dice_roll] = dice_roll;
        if (dice_roll == 2) {
            dice_mapper_f[dice_roll] = 0;
        } else if (dice_roll == 12) {
            dice_mapper_f[dice_roll] = std_value + dice_roll + 5;
        } else {
            dice_mapper_f[dice_roll] = std_value + dice_roll;
        }
    }

    const critical_numbers = [];
    let cp = 0;
    for (let c = critical_number; c <= 12; c++) {
        critical_numbers.push(c);
        cp += p_table[c];
    }
    cp /= 36;

    return expected_value_with_2d6(dice_mapper_c, critical_numbers) * cp + expected_value_with_2d6(dice_mapper_f, []);
}

export function expected_value_of_damage_table(damage: number, std_value: number, critical_number: number): number {
    const p_table = [0, 0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

    const dice_mapper_f = (new Array<number>(13)).fill(0);
    const dice_mapper_c = (new Array<number>(13)).fill(0);
    for (let dice_roll = 2; dice_roll <= 12; dice_roll++) {
        dice_mapper_c[dice_roll] = damage_table[damage][dice_roll];
        if (dice_roll == 2) {
            dice_mapper_f[dice_roll] = 0;
        } else {
            dice_mapper_f[dice_roll] = std_value + damage_table[damage][dice_roll];
        }
    }

    const critical_numbers = [];
    let cp = 0;
    for (let c = critical_number; c <= 12; c++) {
        critical_numbers.push(c);
        cp += p_table[c];
    }
    cp /= 36;

    return expected_value_with_2d6(dice_mapper_c, critical_numbers) * cp + expected_value_with_2d6(dice_mapper_f, []);
}