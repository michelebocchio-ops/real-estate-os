export default function Home() {
  const stats = [
    { label: "Total Properties", value: "124", change: "+12 this month" },
    { label: "Active Listings", value: "38", change: "Currently available" },
    { label: "Applications", value: "56", change: "18 awaiting review" },
    { label: "Visits Scheduled", value: "12", change: "Next 7 days" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          REAL ESTATE OS
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Agency Management
        </p>

        <nav className="mt-12 space-y-4 text-sm">
          <p className="rounded-lg bg-gray-100 p-3 font-semibold">
            Dashboard
          </p>
          <p className="p-3 text-gray-500">Properties</p>
          <p className="p-3 text-gray-500">Applications</p>
          <p className="p-3 text-gray-500">Tenants</p>
          <p className="p-3 text-gray-500">Owners</p>
          <p className="p-3 text-gray-500">Settings</p>
        </nav>
      </aside>

      <section className="ml-64 p-10">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="mt-2 text-gray-500">
              Welcome back to your agency workspace.
            </p>
          </div>

          <button className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white">
            + Add Property
          </button>
        </header>

        <div className="grid grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
              <p className="mt-2 text-xs text-gray-400">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border bg-white p-6">
          <h3 className="text-lg font-semibold">Recent Properties</h3>
          <p className="mt-2 text-sm text-gray-500">
            Your latest managed properties will appear here.
          </p>
        </div>
      </section>
    </main>
  );
}
