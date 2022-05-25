export const event = () => ({
    id: null,
    user_id: null,
    title: null,
    start: null,
    end: null,
    rrule: {
        freq: null,
        interval: null,
        dtstart: null,
    }
})

export const freq_opts = () => ([
    { value: null, text: 'Selecciona una opcion'},
    { value: 'daily', text: 'Dia' },
    { value: 'weekly', text: 'Semana' },
    { value: 'monthly', text: 'Mes' },
    { value: 'yearly', text: 'Año' }
])