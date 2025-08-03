export const Field = ({ label, children, error, hint }: {
    label: string
    children: React.ReactNode
    error?: string
    hint?: string
}) => (
    <label className="flex flex-col">
        {label}
        {hint && <span className="text-xs text-zinc-600">{hint}</span>}
        {children}
        {error && <span className="text-red-500">{error}</span>}
    </label>
)