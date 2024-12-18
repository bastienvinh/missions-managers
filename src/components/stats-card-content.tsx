export default function  StatsCardContent({ value, label }: { value: string, label: string }) {
  return (
    <div className="p-0">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}