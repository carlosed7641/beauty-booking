interface Props {
    cols?: number,
    children: React.ReactNode | React.ReactNode[]
}

export const ShopCardLayout = ({ cols = 5, children }: Props) => {
    return (
      <ul className={`flex md:grid md:grid-cols-${cols} gap-3 overflow-x-scroll md:overflow-hidden scroll-none mb-8 -mr-2 md:mr-0`} style={{ scrollbarWidth: 'none' }}>
        {children}
      </ul>
    )
}
  