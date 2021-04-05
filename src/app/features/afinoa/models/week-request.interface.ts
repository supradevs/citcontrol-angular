export interface Employee {
    nombre: string,
    apellido: string
}

export interface WeekRequest {
    id: number,
    estado: string,
    estado_id: number,
    fecha_inicio: string,
    fecha_fin: string,
    servicio: string,
    empleados: Employee[],
}