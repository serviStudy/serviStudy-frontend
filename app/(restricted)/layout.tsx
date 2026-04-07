export default function RestrictedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
        <header className="border-b backdrop-blur sticky top-0 z-50"/>
      <main className="flex-1">{children}</main>
    </div>
  )
}