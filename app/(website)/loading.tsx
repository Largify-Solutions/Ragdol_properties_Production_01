export default function WebsiteLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#c5a76f] mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}
