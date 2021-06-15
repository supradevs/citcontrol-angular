
interface Employee {
    id: number,
    nombre: string,
    apellido: string
}

interface OverlapAssignation {
    id: number, 
    start: Date, 
    end: Date
}

export class Overlap {
    constructor(public employee: Employee, public overlapA: OverlapAssignation, public overlapB: OverlapAssignation){}
}