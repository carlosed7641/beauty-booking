export const Title = ({ title }: { title: string }) => {
  return <h2 className="relative text-2xl flex gap-2 items-center mb-8 before:content-[''] before:h-6 before:w-1.5 before:bg-green-700 before:block">{title}</h2>
}
