import Link from 'next/link'
import { ADMIN_SECTIONS } from '@/util/const'

export const AdminSections = ({ role }: { role: string }) => {
    return (
        <>
            {
                Object.entries(ADMIN_SECTIONS).map(([title, items]) => (
                    <div key={title} className="flex flex-col gap-2">
                        <h3 className="text-green-700 font-bold">{title}</h3>
                        <div className="grid grid-cols-3 md:grid-cols-4 bg-white w-full rounded-md">
                            {
                                items.map(({ Icon, name, url, adminOnly }) => {

                                    if (adminOnly && role !== 'admin') return null

                                    return (
                                        <Link key={name} href={`/admin/${url}`} title={name} className="flex flex-col items-center justify-center py-4 px-1 md:py-10 hover:bg-[#e8f7ea] transition-all gap-2">
                                            <Icon className="text-green-700 text-[25px] md:text-3xl" />
                                            <span className="text-sm text-zinc-500 text-center min-h-10 md:min-h-0">{name}</span>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}
