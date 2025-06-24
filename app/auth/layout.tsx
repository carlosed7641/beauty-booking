export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#eaf1eb] flex justify-center pt-24 md:items-center px-4 md:pt-0 h-screen">
      <div className="bg-white p-5 rounded-md shadow-md sm:w-[400px] w-full h-fit">
        {children}
      </div>
    </div>
  )
}