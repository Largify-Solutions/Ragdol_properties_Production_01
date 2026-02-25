export default function CustomerLoading() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-400 mx-auto mb-4"></div>
        <p className="text-slate-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  )
}
