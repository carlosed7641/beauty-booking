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
import { View } from 'react-big-calendar'
import { IconType } from 'react-icons'
import { AiOutlineDollar } from 'react-icons/ai'
import { FaRegStar } from 'react-icons/fa'
import { FiMapPin, FiUsers } from 'react-icons/fi'
import { GiComb } from 'react-icons/gi'
import { GrFavorite, GrGallery } from 'react-icons/gr'
import { HiOutlineLockClosed } from 'react-icons/hi2'
import { IoHomeOutline, IoStorefrontOutline, IoCutOutline } from 'react-icons/io5'
import { LuCalendarCheck, LuCopyCheck, LuListTodo, LuNotebook } from 'react-icons/lu'
import { MdOutlineCalendarToday } from 'react-icons/md'
import { PiMedalLight } from 'react-icons/pi'
import { RiCalendarScheduleLine, RiUserSettingsLine } from 'react-icons/ri'
import { TbClockHour3, TbClockHour5, TbUserHeart, TbUsers } from 'react-icons/tb'
import { VscGraph } from 'react-icons/vsc'
import { Gender } from '@/generated/prisma/enums'

export const SERVICE_INITIAL_STATE = {
    selectedService: null,
    selectedProfessional: null,
    selectedDate: null,
    selectedHour: null
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

export const FLAGS: Record<string, ()=> React.JSX.Element> = {
  AR: ArgentinaFlag,
  BO: BoliviaFlag,
  CL: ChileFlag,
  CO: ColombiaFlag,
  CR: CostaRicaFlag,
  CU: CubaFlag,
  EC: ColombiaFlag,
  SL: ElSalvadorFlag,
  GT: GuatemalaFlag,
  HN: HondurasFlag,
  MX: MexicoFlag,
  NC: NicaraguaFlag,
  PN: PanamaFlag,
  PY: ParaguayFlag,
  PE: PeruFlag,
  RD: DominicanRepublicFlag,
  UY: UruguayFlag,
  VE: VenezuelaFlag,
};


export const GENDERS: Record<Gender, string> = {
  men: 'Hombre',
  women: 'Mujer',
  other: 'Otro'
}

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

export const DEFAULT_SERVICES_LIST = {
    'Cortes': ['Corte', 'Corte hombre', 'Corte con barba', 'Corte niño'],
    'Peinados': ['Peinados', 'Trenzas'],
    'Color': ['Diseño color', 'Mechas', 'Efecto raíz'],
    'Uñas': ['Manos', 'Pies', 'Manos y pies'],
    'Cejas': ['Laminado', 'Micropigmentación'],
    'Pestañas': ['Efecto natural', 'Efecto pestañina'],
    'Masajes': ['Relajante', 'Deportivo', 'Reductor'],
    'Maquillajes': ['Sencillo', 'Artístico']
}

export const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
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
            name: 'Seguidores',
            Icon: TbUserHeart,
            url: 'followers'
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
    "0-1",
    "1-3",
    "3-5",
    "5-10",
    "10+"
]

export const INITIAL_SKILL: Skill = { id: '', name: '', percentage: 0 }

export const INITAL_WS_FORM_DATA: WorkSample = {
    id: '',
    name: '',
    category: '',
    entityId: '',
    authorId: '',
    updatedAt: new Date(),
    images: []
}

export const ADDITIONAL_FUNCTIONS_CONFIG = [
    {
        id: 'cancelDateTime',
        title: 'Cancelación de citas',
        hint: 'Elige el tiempo que un usuario tiene para cancelar una cita antes de la hora de inicio',
        options: [
            { value: 5, label: '5m' }, { value: 10, label: '10m' }, { value: 15, label: '15m' }, { value: 20, label: '20m' },
            { value: 25, label: '25m' }, { value: 30, label: '30m' }, { value: 35, label: '35m' }, { value: 40, label: '40m' },
            { value: 45, label: '45m' }, { value: 50, label: '50m' }, { value: 55, label: '55m' }, { value: 60, label: '1h' },
            { value: 90, label: '1h30m' }
        ]
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
        url: '/admin/work-days',
        icon: TbClockHour5
    },
    {
        title: 'Vincular profesionales',
        url: '',
        icon: FiUsers
    },
    {
        title: 'Configurar profesionales',
        url: '/admin/professional/settings',
        icon: RiUserSettingsLine
    },
    {
        title: 'Usuarios bloqueados',
        url: '/admin/blocked-users',
        icon: HiOutlineLockClosed
    },
]

export const SHOP_TYPES = ['Barbería', 'Cejas & Pesteñas', 'Centro de Maquillaje', 'Cosmetología', 'Peluquería', 'Salón de Belleza', 'Spa Masajes', 'Tatuajes']

export const INITIAL_WORK_DAYS = [
    {
        name: 'Lunes',
        order: 1,
        from: '09:00',
        to: '21:00'
    },
    {
        name: 'Martes',
        order: 2,
        from: '09:00',
        to: '21:00'
    },
    {
        name: 'Miércoles',
        order: 3,
        from: '09:00',
        to: '21:00'
    },
    {
        name: 'Jueves',
        order: 4,
        from: '09:00',
        to: '21:00'
    },
    {
        name: 'Viernes',
        order: 5,
        from: '09:00',
        to: '23:00'
    },
    {
        name: 'Sábado',
        order: 6,
        from: '09:00',
        to: '21:00'
    },
    {
        name: 'Domingo',
        order: 7,
        from: '09:00',
        to: '21:00'
    }
]

export const PROFESSIONAL_SETTINGS_ERRORS = {
    to: 'La hora en la que sales no puede ser más temprano que la hora en la que empiezas',
    from: 'La hora en la que empiezas no pude ser más tarde que la hora en la que sales',
    outRange: 'No puedes colocar una hora fuera del horario de tu entidad',
}

export const PROFESSIONAL_SETTINGS_OPTIONS = [
    { title: 'Disponibilidad', icon: RiCalendarScheduleLine },
    { title: 'Asignar servicios', icon: LuCopyCheck },
    // { title: 'Asignar duración de servicios', icon: TbClockHour3 },
    // { title: 'Asignar precio de servicios', icon: AiOutlineDollar }
]

export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
}

export const CALENDAR_VIEWS: View[] = ['month', 'week', 'day']


export const SERVICE_INITIAL_DATA = {
    serviceId: '',
    name: '',
    category: '',
    gender: '' as Gender,
    description: '',
    hours: 0,
    minutes: 30,
    price: ''
}

export const DEFAULT_PROFESSIONAL = {
    id: '',
    name: '',
    entityId: '',
    resume: '',
    reviews: {
        points: 0,
        count: 0
    }
}

export const DEFAULT_REPORT_DATA_SUMMARY: ReportDataSummary = {
    totalSales: 0,
    averageServiceTime: 0,
    completedServices: 0,
    averageServiceValue: 0,
    bills: 0,
    bestSellingProfessional: {
        data: {
            id: '',
            name: '',
            photo: ''
        },
        count: 0
    },
    bestSellingService: {
        name: '',
        count: 0
    },
    manualScheduling: 0,
    adminScheduling: 0,
    abortedRate: 0,
    cancellationRate: 0,
    totalCustomers: 0,
    groupSales: []
}

export const ROLES = {
    admin: 'Administrador',
    user: 'Ususario',
    employee: 'Empleado'
}