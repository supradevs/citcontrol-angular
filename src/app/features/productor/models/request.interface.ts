export interface Request {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    fecha_cancelacion: string;
    motivo_cancelacion: string;
    aceptacion: number;
    reprogramada: string;
    created_at: string;
    servicio: string;
    estado: string;
}