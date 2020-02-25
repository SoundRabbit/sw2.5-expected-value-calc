//[能動側基準値]-[受動側気順値]+8
const p_table_cr = [69, 73, 85, 110, 154, 224, 320, 439, 575, 719, 855, 974, 1070, 1140, 1184, 1209, 1221, 1225];

export function success_rate(active: number, passive: number): number {
    const diff = active - passive + 8;
    if (diff < 0) {
        return p_table_cr[0] / 36 / 36;
    } else if (diff >= p_table_cr.length) {
        return p_table_cr[17] / 36 / 36;
    } else {
        return p_table_cr[diff] / 36 / 36;
    }
}