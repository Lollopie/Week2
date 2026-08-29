import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 18400, collected: 14200 },
  { month: "Feb", revenue: 22100, collected: 19800 },
  { month: "Mar", revenue: 19700, collected: 17300 },
  { month: "Apr", revenue: 26300, collected: 24100 },
  { month: "May", revenue: 31200, collected: 27600 },
  { month: "Jun", revenue: 28900, collected: 26400 },
  { month: "Jul", revenue: 35700, collected: 31200 },
  { month: "Aug", revenue: 42100, collected: 38500 },
];

const invoices = [
  { id: "INV-2408", client: "Meridian Creative Co.", amount: "$8,400.00", issued: "Aug 12, 2026", due: "Aug 26, 2026", status: "paid" },
  { id: "INV-2407", client: "Stackhouse Labs", amount: "$3,200.00", issued: "Aug 10, 2026", due: "Aug 24, 2026", status: "paid" },
  { id: "INV-2406", client: "Novo Interiors", amount: "$5,750.00", issued: "Aug 6, 2026", due: "Aug 20, 2026", status: "pending" },
  { id: "INV-2405", client: "Orion Ventures", amount: "$12,000.00", issued: "Jul 29, 2026", due: "Aug 12, 2026", status: "overdue" },
  { id: "INV-2404", client: "Blue Sparrow Studio", amount: "$2,100.00", issued: "Jul 25, 2026", due: "Aug 8, 2026", status: "paid" },
  { id: "INV-2403", client: "Luminary Health", amount: "$6,800.00", issued: "Jul 18, 2026", due: "Aug 1, 2026", status: "overdue" },
];

const navItems = [
  { label: "Dashboard", icon: GridIcon, active: true },
  { label: "Invoices", icon: FileTextIcon, active: false },
  { label: "Clients", icon: UsersIcon, active: false },
  { label: "Payments", icon: CreditCardIcon, active: false },
  { label: "Reports", icon: BarChartIcon, active: false },
  { label: "Settings", icon: SettingsIcon, active: false },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  paid: { label: "Paid", bg: "bg-emerald-500/15", text: "text-emerald-400", dot: "bg-emerald-400" },
  pending: { label: "Pending", bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-400" },
  overdue: { label: "Overdue", bg: "bg-rose-500/15", text: "text-rose-400", dot: "bg-rose-400" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium font-mono ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a2540] border border-[#1e2d44] rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-[#94a3b8] text-xs font-medium mb-2">{label} 2026</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name === "revenue" ? "Invoiced" : "Collected"}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex h-full bg-[#0c1220] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#0e1628] border-r border-[#1e2d44]">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#1e2d44]">
          <img src="/src/imports/logo.png" alt="Invoicely" className="h-8 w-auto object-contain" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-[#2dd4bf]/10 text-[#2dd4bf]"
                    : "text-[#4b5e78] hover:text-[#94a3b8] hover:bg-white/5"
                  }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-[#1e2d44]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#38bdf8] flex items-center justify-center text-[#0c1220] text-xs font-bold flex-shrink-0">
              JM
            </div>
            <div className="min-w-0">
              <p className="text-[#e2eaf5] text-sm font-medium truncate">Jordan Mercer</p>
              <p className="text-[#4b5e78] text-xs truncate">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-[#1e2d44] bg-[#0c1220]">
          <div>
            <h1 className="text-[#e2eaf5] text-xl font-semibold">Good morning, Jordan</h1>
            <p className="text-[#4b5e78] text-sm mt-0.5">Wednesday, August 27, 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#4b5e78] hover:text-[#94a3b8] hover:bg-white/5 transition-colors text-sm">
              <BellIcon size={16} />
              <span className="relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#2dd4bf] rounded-full" />
              </span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] text-[#0c1220] text-sm font-semibold shadow-lg shadow-[#2dd4bf]/20 hover:shadow-[#2dd4bf]/30 hover:scale-[1.02] transition-all duration-150">
              <PlusIcon size={15} />
              Create Invoice
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* KPI tiles */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", value: "$224,100", change: "+18.4%", up: true, sub: "vs last quarter" },
              { label: "Outstanding", value: "$18,550", change: "4 invoices", up: null, sub: "awaiting payment" },
              { label: "Paid This Month", value: "$42,100", change: "+12.1%", up: true, sub: "vs last month" },
              { label: "Overdue", value: "$18,800", change: "2 invoices", up: false, sub: "action needed" },
            ].map((tile) => (
              <div key={tile.label} className="bg-[#111827] border border-[#1e2d44] rounded-2xl px-5 py-4 hover:border-[#2d4060] transition-colors">
                <p className="text-[#4b5e78] text-xs font-medium uppercase tracking-wider">{tile.label}</p>
                <p className="text-[#e2eaf5] text-2xl font-semibold mt-2 mb-1">{tile.value}</p>
                <div className="flex items-center gap-1.5">
                  {tile.up === true && <ArrowUpIcon size={12} className="text-emerald-400" />}
                  {tile.up === false && <ArrowDownIcon size={12} className="text-rose-400" />}
                  <span className={`text-xs font-medium font-mono ${tile.up === true ? "text-emerald-400" : tile.up === false ? "text-rose-400" : "text-[#4b5e78]"}`}>
                    {tile.change}
                  </span>
                  <span className="text-[#4b5e78] text-xs">{tile.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart + quick stats row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Revenue chart — 2/3 width */}
            <div className="col-span-2 bg-[#111827] border border-[#1e2d44] rounded-2xl px-6 py-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[#e2eaf5] text-sm font-semibold">Revenue Overview</h2>
                  <p className="text-[#4b5e78] text-xs mt-0.5">Jan – Aug 2026</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5 text-[#94a3b8]">
                    <span className="w-2.5 h-0.5 rounded bg-[#2dd4bf] inline-block" />
                    Invoiced
                  </span>
                  <span className="flex items-center gap-1.5 text-[#94a3b8]">
                    <span className="w-2.5 h-0.5 rounded bg-[#38bdf8]/50 inline-block" />
                    Collected
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2d44" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: "#4b5e78", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#4b5e78", fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#2dd4bf" strokeWidth={2} fill="url(#gRevenue)" dot={false} activeDot={{ r: 4, fill: "#2dd4bf", strokeWidth: 0 }} />
                  <Area type="monotone" dataKey="collected" stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gCollected)" dot={false} activeDot={{ r: 3, fill: "#38bdf8", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick stats — 1/3 */}
            <div className="flex flex-col gap-4">
              <div className="bg-[#111827] border border-[#1e2d44] rounded-2xl px-5 py-4 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[#4b5e78] text-xs font-medium uppercase tracking-wider">Collection Rate</span>
                  <span className="text-[#2dd4bf] text-xs font-mono font-medium">↑ 3.2%</span>
                </div>
                <div className="mt-3">
                  <p className="text-[#e2eaf5] text-3xl font-semibold">91.5<span className="text-[#4b5e78] text-lg font-normal">%</span></p>
                  <div className="mt-3 h-1.5 bg-[#1e2d44] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] rounded-full" style={{ width: "91.5%" }} />
                  </div>
                  <p className="text-[#4b5e78] text-xs mt-2">of invoiced amount collected</p>
                </div>
              </div>

              <div className="bg-[#111827] border border-[#1e2d44] rounded-2xl px-5 py-4 flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[#4b5e78] text-xs font-medium uppercase tracking-wider">Avg. Pay Time</span>
                  <span className="text-emerald-400 text-xs font-mono font-medium">On track</span>
                </div>
                <div className="mt-3">
                  <p className="text-[#e2eaf5] text-3xl font-semibold">8.3<span className="text-[#4b5e78] text-lg font-normal"> days</span></p>
                  <p className="text-[#4b5e78] text-xs mt-1">avg. from issue to payment</p>
                  <div className="mt-3 flex gap-1">
                    {[5, 7, 6, 9, 8, 8, 8].map((v, i) => (
                      <div key={i} className="flex-1 bg-[#1e2d44] rounded-sm overflow-hidden" style={{ height: 24 }}>
                        <div className="bg-[#2dd4bf]/40 rounded-sm w-full" style={{ height: `${(v / 12) * 100}%`, marginTop: `${100 - (v / 12) * 100}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoices table */}
          <div className="bg-[#111827] border border-[#1e2d44] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2d44]">
              <div>
                <h2 className="text-[#e2eaf5] text-sm font-semibold">Recent Invoices</h2>
                <p className="text-[#4b5e78] text-xs mt-0.5">Latest billing activity</p>
              </div>
              <button className="text-[#2dd4bf] text-xs font-medium hover:underline transition-all">View all →</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1e2d44]">
                  {["Invoice", "Client", "Amount", "Issued", "Due Date", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-[#4b5e78] text-xs font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, i) => (
                  <tr key={inv.id} className={`group hover:bg-white/[0.02] transition-colors ${i < invoices.length - 1 ? "border-b border-[#1a2236]" : ""}`}>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-[#2dd4bf] text-sm font-medium">{inv.id}</span>
                    </td>
                    <td className="px-6 py-3.5 text-[#e2eaf5] text-sm">{inv.client}</td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono text-[#e2eaf5] text-sm font-medium">{inv.amount}</span>
                    </td>
                    <td className="px-6 py-3.5 text-[#94a3b8] text-sm">{inv.issued}</td>
                    <td className="px-6 py-3.5 text-[#94a3b8] text-sm">{inv.due}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={inv.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <button className="opacity-0 group-hover:opacity-100 text-[#4b5e78] hover:text-[#94a3b8] transition-all text-xs font-medium flex items-center gap-1">
                        View <span>→</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Inline icon components ──────────────────────────────────────────────────

function GridIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FileTextIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 2v6h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 17c0-3.314 2.91-6 6.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M19 17c0-2.761-2.239-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CreditCardIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 12h3M13 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BarChartIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 16V10M8 16V6M13 16V11M18 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.222 4.222l1.414 1.414M14.364 14.364l1.414 1.414M4.222 15.778l1.414-1.414M14.364 5.636l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 15a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlusIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 15V5M5 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowDownIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 5v10M5 10l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
