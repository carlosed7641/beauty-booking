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