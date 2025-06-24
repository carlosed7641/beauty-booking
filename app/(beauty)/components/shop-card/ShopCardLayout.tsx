interface Props {
  cols?: number,
  children: React.ReactNode | React.ReactNode[]
}

export const ShopCardLayout = ({ cols = 5, children }: Props) => {
  return (
    <ul className={`flex md:grid gap-3 overflow-x-scroll md:overflow-hidden scroll-none mb-8 -mr-2 md:mr-0`}
      style={{ scrollbarWidth: 'none', gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {children}
    </ul>
  )
}