import { 
    ArgentinaFlag,
    BoliviaFlag,
    ChileFlag,
    ColombiaFlag,
    CostaRicaFlag,
    CubaFlag,
    DominicanRepublicFlag, 
    ElSalvadorFlag,
    GuatemalaFlag,
    HondurasFlag,
    MexicoFlag,
    NicaraguaFlag,
    PanamaFlag,
    ParaguayFlag,
    PeruFlag,
    UruguayFlag,
    VenezuelaFlag,
} from '@/components/flags'
import { IconType } from 'react-icons'
import { FaRegStar } from 'react-icons/fa'
import { FiMapPin } from 'react-icons/fi'
import { GiComb } from 'react-icons/gi'
import { GrFavorite } from 'react-icons/gr'
import { IoHomeOutline, IoStorefrontOutline, IoCutOutline } from 'react-icons/io5'
import { LuNotebook } from 'react-icons/lu'
import { PiMedalLight } from 'react-icons/pi'

export const SERVICE_INITIAL_STATE = {
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

export const COUNTRIES: Country[] = [
    { id: 'AR', name: 'Argentina', indicator: '+54', Flag: ArgentinaFlag },
    { id: 'BO', name: 'Bolivia', indicator: '+591', Flag: BoliviaFlag },
    { id: 'CL', name: 'Chile', indicator: '+56', Flag: ChileFlag },
    { id: 'CO', name: 'Colombia', indicator: '+57', Flag: ColombiaFlag },
    { id: 'CR', name: 'Costa Rica', indicator: '+506', Flag: CostaRicaFlag },
    { id: 'CU', name: 'Cuba', indicator: '+53', Flag: CubaFlag },
    { id: 'EC', name: 'Ecuador', indicator: '+593', Flag: ColombiaFlag },
    { id: 'SL', name: 'El Salvador', indicator: '+503', Flag: ElSalvadorFlag },
    { id: 'GT', name: 'Guatemala', indicator: '+502', Flag: GuatemalaFlag },
    { id: 'HN', name: 'Honduras', indicator: '+504', Flag: HondurasFlag },
    { id: 'MX', name: 'México', indicator: '+52', Flag: MexicoFlag },
    { id: 'NC', name: 'Nicaragua', indicator: '+505', Flag: NicaraguaFlag },
    { id: 'PN', name: 'Panamá', indicator: '+507', Flag: PanamaFlag },
    { id: 'PY', name: 'Paraguay', indicator: '+595', Flag: ParaguayFlag },
    { id: 'PE', name: 'Perú', indicator: '+51', Flag: PeruFlag },
    { id: 'RD', name: 'Rep. Dominicana', indicator: '+1', Flag: DominicanRepublicFlag },
    { id: 'UY', name: 'Uruguay', indicator: '+598', Flag: UruguayFlag },
    { id: 'VE', name: 'Venezuela', indicator: '+58', Flag: VenezuelaFlag }
]

export const GENDERS = [
    "Hombre",
    "Mujer",
    "Otro"
]

export const ORDER_OPTIONS = ['Precio mayor', 'Precio menor', 'Predeterminado'] //TODO: Más cerca de ti

export const MONTHS = [
    { month: 'ene', days: 31 },
    { month: 'feb', days: 28 },
    { month: 'mar', days: 31 },
    { month: 'abr', days: 30 },
    { month: 'may', days: 31 },
    { month: 'jun', days: 30 },
    { month: 'jul', days: 31 },
    { month: 'ago', days: 31 },
    { month: 'sep', days: 30 },
    { month: 'oct', days: 31 },
    { month: 'nov', days: 30 },
    { month: 'dic', days: 31 },
]

export const MENU_OPTIONS = [
    {
        label: 'Inicio',
        Icon: IoHomeOutline,
        href: '/',
        onBotton: {
            is: true,
            only: false
        }
    },
    {
        label: 'Mis Reservas',
        Icon: LuNotebook,
        href: '/my-reservations'
    },
    {
        label: 'Negocios Seguidos',
        Icon: IoStorefrontOutline,
        href: 'favorite-entities'
    },
    {
        label: 'Mis Reseñas',
        Icon: FaRegStar,
        href: '/my-reviews'
    },
    {
        label: 'Mi Reputación',
        Icon: PiMedalLight,
        href: '/my-reputation'
    },
    {
        label: 'Favoritos',
        Icon: GrFavorite,
        href: '/favorite-work-samples'
    },
    {
        label: 'Mapa',
        Icon: FiMapPin,
        href: '/map',
        onBotton: {
            is: true,
            only: false
        }
    },
    {
        label: 'Negocios',
        Icon: IoStorefrontOutline,
        href: '/entities',
        onBotton: {
            is: true,
            only: true
        }
    }
]

export const SERVICE_ICONS: { [key: string]: IconType } = {
    'cortes': IoCutOutline,
    'peinados': GiComb
    // uñas, impieza facial
}