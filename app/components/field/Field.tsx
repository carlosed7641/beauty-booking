export const Field = ({ label, children, colorLabel, error, hint, className }: {
    label: string
    children: React.ReactNode
    colorLabel?: string
    error?: string
    hint?: string
    className?: string
}) => (
    <label className={`${className ? className + ' flex flex-col' : 'flex flex-col'}`}>
        <span style={{ color: colorLabel }}>{label}</span>
        {hint && <span className="text-xs text-zinc-600">{hint}</span>}
        {children}
        {error && <span className="text-red-500">{error}</span>}
    </label>
)