interface Estado {
    id: number,
    estado: string
}
export interface Packing {
    id: number,
    codigo_empaque: string,
    empaque: string,
    estados: Estado[],
    horas_solicitadas: number,
}