export interface Request {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_cancelacion: string;
    motivo_cancelacion: string;
    estado_validacion: null | string;
    estado_validacion_id: null | number,
    extraordinaria: number,
    semana_solicitada: number,
    reprogramada: string;
    created_at: string;
    servicio: string;
    estado: string;
    estado_id: number;
}
