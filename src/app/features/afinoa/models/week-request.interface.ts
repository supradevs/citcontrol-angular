export interface Employee {
    nombre: string,
    apellido: string
}

export interface WeekRequest {
    id: number,
    estado: string,
    estado_id: number,
    estado_validacion: string,
    estado_validacion_id: number,
    motivo_cancelacion: null | string,
    fecha_inicio: string,
    fecha_fin: string,
    servicio: string,
    servicio_id: number,
    empleados: Employee[],
}