import { RequestsStates } from 'src/app/shared/models';

export const PackingFilters = [
    {
        id: 0,
        state: 'Todas'
    },
    {
        id: RequestsStates.A_PROGRAMAR,
        state: 'A Programar' 
    },
    {
        id: RequestsStates.ASIGNADA,
        state: 'Asignadas'
    },
    {
        id: RequestsStates.ENVIADA,
        state: 'Enviadas'
    },
    {
        id: RequestsStates.COMPLETADA,
        state: 'Completadas'
    },
    {
        id: RequestsStates.CANCELADA_EN_TERMINO,
        state: 'Canceladas en termino'
    },
    {
        id: RequestsStates.CANCELADA_FUERA_DE_TERMINO,
        state: 'Canceladas fuera de termino'
    },
    {
        id: RequestsStates.CANCELADA_EN_EJECUCION,
        state: 'Canceladas en ejecución'
    },
    {
        id: RequestsStates.RECHAZADA,
        state: 'Rechazadas'
    },
    {
        id: 9,
        state: 'Sin pedido'
    }
]

