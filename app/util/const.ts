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
import { FiMapPin, FiUsers } from 'react-icons/fi'
import { GiComb } from 'react-icons/gi'
import { GoGraph } from 'react-icons/go'
import { GrFavorite, GrGallery } from 'react-icons/gr'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { IoHomeOutline, IoStorefrontOutline, IoCutOutline } from 'react-icons/io5'
import { LuCalendarCheck, LuListTodo, LuNotebook } from 'react-icons/lu'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { PiMedalLight } from 'react-icons/pi'
import { RiUserSettingsLine } from 'react-icons/ri'
import { TbClockHour5, TbUsers } from 'react-icons/tb'
import { VscGraph } from 'react-icons/vsc'

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

export const SERVICES_LIST = {
    'Cortes': ['Corte', 'Corte hombre', 'Corte con barba', 'Corte niño'],
    'Peinados': ['Peinados', 'Trenzas'],
    'Color': ['Diseño color', 'Mechas', 'Efecto raíz'],
    'Uñas': ['Manos', 'Pies', 'Manos y pies'],
    'Cejas': ['Laminado', 'Micropigmentación'],
    'Pestañas': ['Efecto natural', 'Efecto pestañina'],
    'Masajes': ['Relajante', 'Deportivo', 'Reductor'],
    'Maquillajes': ['Sencillo', 'Artístico']
}

export const DAYS_OF_WEEK = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
export const MONTHS_OF_YEAR = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const ADMIN_SECTIONS = {
    "Mi negocio": [
        {
            name: 'Agenda',
            Icon: MdOutlineCalendarToday,
            url: 'schedule'
        },
        {
            name: 'Servicios',
            Icon: LuListTodo,
            url: 'services'
        },
        {
            name: 'Historial de agenda',
            Icon: LuCalendarCheck,
            url: 'schedule-history'
        },
        {
            name: 'Informes',
            Icon: VscGraph,
            url: 'reports'
        }
    ],
    "Marketing y ventas": [
        {
            name: 'Muestras de trabajo',
            Icon: GrGallery,
            url: 'work-samples'
        },
        {
            name: 'Clientes',
            Icon: TbUsers,
            url: 'customers'
        },
        {
            name: 'Estadísticas',
            Icon: GoGraph,
            url: 'statistics'
        }
    ]
}

export const AREAS_OF_EXPERIENCIES = [
    "Estilista",
    "Manicurista",
    "Masajista",
    "Barbero",
    "Lady Barber",
    "Maquillador/a",
    "Tatuador/a"
]

export const YEARS_OF_EXPERIENCIES = [
    "0 a 1",
    "1 a 3",
    "3 a 5",
    "5 a 10",
    "10+"
]

export const INITIAL_SKILL: Skill = { id: '', name: '', percentage: 0 }

export const INITAL_FORM_DATA: SampleForm = {
    id: '',
    name: '',
    category: '',
    images: []
}

export const ADDITIONAL_FUNCTIONS_CONFIG = [
    {
        id: 'cancelDateTime',
        title: 'Cancelación de citas',
        hint: 'Elige el tiempo que un usuario tiene para cancelar una cita antes de la hora de inicio',
        options: [
            { value: 5, label: '5m' }, { value: 10, label: '10m' }, { value: 15, label: '15m' }, { value: 20, label: '20m' },
            { value: 25, label: '25m' }, { value: 30, label: '35m' }, { value: 35, label: '35m' }, { value: 40, label: '40m' },
            { value: 45, label: '45m' }, { value: 50, label: '50m' }, { value: 55, label: '55m' }, { value: 60, label: '1h' },
            { value: 90, label: '1h30m' }
        ]
    },
    {
        id: 'customerInterval',
        title: 'Intervalo para clientes',
        hint: 'Escoge el intervalo de tiempo que tus clientes podrán escoger al momento de agendar, ej: si está cada 30m al momento de reservar las horas se verán así: 7:30 - 8:00 - 8:30 etc',
        options: [{ value: 'recommend', label: 'Recomendado' }, { value: '30', label: '30m' }, { value: '60', label: '1h' }]
    },
    {
        id: 'showAdminAgenda',
        title: 'Mostrar agenda del adminstrador',
        hint: 'Habilita esta opción para ver la agenda del administrador'
    },
    {
        id: 'advanceBookingControl',
        title: 'Control de antelación',
        hint: 'Ej: si pones 15min los clientes tendrán que agendar mínimo con 15min de antelación',
        options: [{ value: 0, label: '0m' }, { value: 15, label: '15m' }, { value: '30', label: '30m' }, { value: '60', label: '1h' }]
    }
]

export const SECTIONS_SETTINGS = [
    {
        title: 'Perfil de negocio',
        url: '/admin/shop-profile',
        icon: IoStorefrontOutline
    },
    {
        title: 'Disponibilidad del negocio',
        url: '',
        icon: TbClockHour5
    },
    {
        title: 'Vincular profesionales',
        url: '',
        icon: FiUsers
    },
    {
        title: 'Configurar profesionales',
        url: '',
        icon: RiUserSettingsLine
    },
    {
        title: 'Usuarios bloqueados',
        url: '',
        icon: HiOutlineLockClosed
    },
]

export const SHOP_TYPES = ['Barbería', 'Cejas & Pesteñas', 'Centro de Maquillaje', 'Cosmetología', 'Peluquería', 'Salón de Belleza', 'Spa Masajes', 'Tatuajes']