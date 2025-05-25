export const SERIVCE_INITIAL_STATE = {
    selectedService: null,
    selectedProfessional: null,
    selectedDate: null,
    selectedHour: null,
    isCompleted: false
}

export const SLIDER_SETTINGS = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false
            }
        }
    ]
}

export const COUNTRIES = [
    { name: 'Argentina', indicator: '+54' },
    { name: 'Bolivia', indicator: '+591' },
    { name: 'Chile', indicator: '+56' },
    { name: 'Colombia', indicator: '+57' },
    { name: 'Costa Rica', indicator: '+506' },
    { name: 'Cuba', indicator: '+53' },
    { name: 'Ecuador', indicator: '+593' },
    { name: 'El Salvador', indicator: '+503' },
    { name: 'Guatemala', indicator: '+502' },
    { name: 'Honduras', indicator: '+504' },
    { name: 'México', indicator: '+52' },
    { name: 'Nicaragua', indicator: '+505' },
    { name: 'Panamá', indicator: '+507' },
    { name: 'Paraguay', indicator: '+595' },
    { name: 'Perú', indicator: '+51' },
    { name: 'República Dominicana', indicator: '+1' },
    { name: 'Uruguay', indicator: '+598' },
    { name: 'Venezuela', indicator: '+58' }
];
export const GENDERS = [
    "Hombre",
    "Mujer",
    "Otro"
]

export const VIEWS = {
    list: {
        class: 'list-view',
        imageSize: {
            width: 150,
            height: 150
        },
        container: 'list-view-container',
        info: 'list-view-info'
    },
    grid: {
        class: 'grid-view',
        imageSize: {
            width: 250,
            height: 250
        },
        container: 'grid-view-container',
        info: 'grid-view-info'
    }
}

export const ORDER_OPTIONS = ['Precio mayor', 'Precio menor', 'Predeterminado'] //TODO: Más cerca de ti