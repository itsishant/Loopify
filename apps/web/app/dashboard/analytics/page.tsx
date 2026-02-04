"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbLogout, TbBell, TbX, TbCheck } from "react-icons/tb";
import { GetSubscription } from "../../api/get/[...subscriptionApi]/subscription.api";

interface SubscriptionData {
  _id: string;
  subscriptionDetails: {
    appName: string;
    category: string;
    planType: string;
  };
  billingDetails: {
    amount: number;
    currency: string;
    paymentMethod: string;
    autoRenew: boolean;
  };
  datesDetails: {
    startDate: string;
    nextBillingDate: string;
  };
  status: string;
  remindaerDaysBefore: number;
  userId: string;
  isdeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  appName: string;
  category: string;
  planType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  autoRenew: boolean;
  startDate: string;
  nextBillingDate: string;
  status: string;
}

export default function Analytics() {
  const route = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);

  const generateChartData = (subs: Subscription[]) => {
    if (!subs.length) return [];

    const totalSpend = subs.reduce((sum, s) => sum + (s?.amount ?? 0), 0);
    const avgSpend = totalSpend / subs.length;
    const maxSpend = Math.max(...subs.map((s) => s?.amount ?? 0));
    const minSpend = Math.min(...subs.map((s) => s?.amount ?? 0));

    const maxY = 240;
    const minY = 85;
    const range = maxY - minY;
    const spendRange = maxSpend - minSpend || 1;

    return subs.map((sub, index) => {
      const xStep = 830 / Math.max(subs.length - 1, 1);
      const x = 110 + index * xStep;
      const normalizedValue = (sub?.amount ?? 0 - minSpend) / spendRange;
      const y = maxY - normalizedValue * range;
      return {
        x: Math.round(x),
        y: Math.round(y),
        value: `$${(sub?.amount ?? 0).toFixed(0)}`,
        appName: sub?.appName ?? "N/A",
      };
    });
  };

  const chartData = generateChartData(subscriptions);
  const chartDataPoints =
    chartData.length > 0
      ? chartData
      : [{ x: 110, y: 240, value: "$0", appName: "No Data" }];

  const generatePathD = (points: typeof chartData) => {
    if (points.length === 0) return "M 0 0";
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  };

  const generateClipPath = (points: typeof chartData) => {
    if (points.length === 0) return "M 0 0 L 0 0 L 0 0 Z";
    const pathPoints = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const lastX = points[points.length - 1].x;
    return `${pathPoints} L ${lastX} 290 L 110 290 Z`;
  };

  const navItems = [
    "Subscriptions",
    "Payments",
    "Analytics",
    "Settings",
    "Support",
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await GetSubscription();
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((item: SubscriptionData) => ({
            id: item._id,
            appName: item.subscriptionDetails?.appName ?? "N/A",
            category: item.subscriptionDetails?.category ?? "N/A",
            planType: item.subscriptionDetails?.planType ?? "N/A",
            amount: item.billingDetails?.amount ?? 0,
            currency: item.billingDetails?.currency ?? "USD",
            paymentMethod: item.billingDetails?.paymentMethod ?? "N/A",
            autoRenew: item.billingDetails?.autoRenew ?? false,
            startDate: item.datesDetails?.startDate ?? "",
            nextBillingDate: item.datesDetails?.nextBillingDate ?? "",
            status: item.status ?? "Unknown",
          }));

          const sorted = [...mapped].sort(
            (a: Subscription, b: Subscription) => {
              const dateA = new Date(a.nextBillingDate).getTime();
              const dateB = new Date(b.nextBillingDate).getTime();
              return dateA - dateB;
            },
          );
          setSubscriptions(sorted);
        } else {
          setSubscriptions([]);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-gray-900 bg-black backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-black font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-white">
                  My Subscriptions
                </h1>
                <p className="text-xs text-gray-500">Personal</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    item === "Payments"
                      ? route.push("/dashboard/payments")
                      : null;
                    item === "Subscriptions" ? route.push("/dashboard") : null;
                    item === "Analytics"
                      ? route.push("/dashboard/analytics")
                      : null;
                    item === "Settings"
                      ? route.push("/dashboard/settings")
                      : null;
                    item === "Support"
                      ? route.push("/dashboard/support")
                      : null;
                  }}
                  className="px-3 py-2 text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 rounded-md transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 ml-auto">
              <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-900/50 rounded-lg transition-colors duration-200 relative">
                <TbBell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                {(localStorage.getItem("email") || "U").charAt(0).toUpperCase()}
              </div>

              <motion.button
                whileHover="hover"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userId");
                  route.push("/");
                }}
                className="p-2 text-gray-400 hover:text-rose-400 hover:bg-gray-900/50 rounded-lg transition-colors duration-200"
              >
                <TbLogout className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="pt-8 bg-black min-h-screen">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-12">
              <h1 className="text-3xl font-semibold text-white mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400">
                Track your spending patterns and subscription trends
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-400 text-sm mb-3 font-medium">
                  Active Subscriptions
                </p>
                <h3 className="text-4xl font-bold text-white mb-2">
                  {subscriptions?.filter((s) => s?.status === "Active")
                    ?.length ?? 0}
                </h3>
                <p className="text-xs text-gray-500">Currently active plans</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-400 text-sm mb-3 font-medium">
                  Total Monthly Spend
                </p>
                <h3 className="text-4xl font-bold text-blue-300 mb-2">
                  $
                  {(
                    subscriptions
                      ?.filter((s) => s?.status === "Active")
                      ?.reduce((sum, s) => sum + (s?.amount ?? 0), 0) ?? 0
                  ).toFixed(2)}
                </h3>
                <p className="text-xs text-gray-500">
                  All active subscriptions
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-400 text-sm mb-3 font-medium">
                  Next Billing Date
                </p>
                <h3 className="text-2xl font-bold text-cyan-300 mb-2">
                  {subscriptions &&
                  subscriptions.length > 0 &&
                  subscriptions[0]?.nextBillingDate
                    ? new Date(
                        subscriptions[0].nextBillingDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </h3>
                <p className="text-xs text-gray-500">
                  Earliest upcoming billing
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black border border-gray-700 rounded-xl p-8 mb-8"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Monthly Spend Over Time
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Your spending trend across the last 12 months
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      <span className="text-sm text-gray-400">
                        Actual Spend
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="relative w-full bg-black rounded-lg p-4 overflow-visible border border-gray-700"
                style={{ height: "500px" }}
              >
                <svg
                  viewBox="0 0 1000 350"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id="spendGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="50%" stopColor="rgba(59, 130, 246, 0.25)" />
                      <stop
                        offset="100%"
                        stopColor="rgba(59, 130, 246, 0.02)"
                      />
                    </linearGradient>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                    <filter
                      id="glow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter
                      id="shadow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="2"
                        stdDeviation="3"
                        floodOpacity="0.3"
                      />
                    </filter>
                  </defs>

                  <rect
                    x="60"
                    y="30"
                    width="880"
                    height="260"
                    fill="rgba(15, 23, 42, 0.2)"
                    rx="8"
                  />

                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`grid-${i}`}
                      x1="60"
                      y1={30 + i * 65}
                      x2="940"
                      y2={30 + i * 65}
                      stroke="rgba(107, 114, 128, 0.15)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  ))}

                  <line
                    x1="60"
                    y1="290"
                    x2="940"
                    y2="290"
                    stroke="rgba(107, 114, 128, 0.6)"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="60"
                    y1="30"
                    x2="60"
                    y2="290"
                    stroke="rgba(107, 114, 128, 0.6)"
                    strokeWidth="2.5"
                  />

                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={`y-label-${i}`}>
                      <text
                        x="50"
                        y={290 - i * 65 + 5}
                        textAnchor="end"
                        fontSize="14"
                        fontWeight="600"
                        fill="rgba(209, 213, 219, 0.9)"
                        fontFamily="system-ui, -apple-system, sans-serif"
                      >
                        ${i * 500}
                      </text>
                      <line
                        x1="55"
                        y1={290 - i * 65}
                        x2="60"
                        y2={290 - i * 65}
                        stroke="rgba(156, 163, 175, 0.5)"
                        strokeWidth="2"
                      />
                    </g>
                  ))}

                  <motion.path
                    d={generatePathD(chartDataPoints)}
                    stroke="url(#lineGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    filter="url(#glow)"
                  />

                  <defs>
                    <clipPath id="clipPath">
                      <path d={generateClipPath(chartDataPoints)} />
                    </clipPath>
                  </defs>
                  <rect
                    x="60"
                    y="30"
                    width="880"
                    height="260"
                    fill="url(#spendGradient)"
                    clipPath="url(#clipPath)"
                  />

                  {chartDataPoints.map((point, index) => (
                    <motion.g key={`point-${index}`}>
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="8"
                        fill="rgba(59, 130, 246, 0.15)"
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: 8, opacity: 1 }}
                        transition={{
                          delay: 1.8 + index * 0.12,
                          duration: 0.5,
                        }}
                      />
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="6"
                        fill="rgba(59, 130, 246, 0.4)"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: 6, opacity: 1 }}
                        transition={{
                          delay: 1.8 + index * 0.12,
                          duration: 0.5,
                        }}
                      />
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r="2.5"
                        fill="#06b6d4"
                        initial={{ r: 0, opacity: 0 }}
                        animate={{ r: 2.5, opacity: 1 }}
                        transition={{
                          delay: 1.8 + index * 0.12,
                          duration: 0.5,
                        }}
                      />
                      <motion.g
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 2.8 + index * 0.12,
                          duration: 0.4,
                        }}
                      >
                        <rect
                          x={point.x - 28}
                          y={point.y - 32}
                          width="56"
                          height="24"
                          rx="4"
                          fill="rgba(30, 41, 59, 0.95)"
                          stroke="rgba(59, 130, 246, 0.5)"
                          strokeWidth="1"
                          filter="url(#shadow)"
                        />
                        <text
                          x={point.x}
                          y={point.y - 14}
                          textAnchor="middle"
                          fontSize="11"
                          fontWeight="700"
                          fill="#06b6d4"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          {point.value}
                        </text>
                      </motion.g>
                      {index < chartDataPoints.length - 1 && (
                        <motion.g
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 3 + index * 0.12,
                            duration: 0.5,
                          }}
                        >
                          {point.y < chartDataPoints[index + 1].y ? (
                            <>
                              <line
                                x1={point.x}
                                y1={point.y + 18}
                                x2={point.x}
                                y2={point.y + 28}
                                stroke="#ef4444"
                                strokeWidth="2"
                                opacity="0.8"
                                strokeLinecap="round"
                              />
                              <polygon
                                points={`${point.x},${point.y + 32} ${point.x - 3},${point.y + 26} ${point.x + 3},${point.y + 26}`}
                                fill="#ef4444"
                                opacity="0.8"
                              />
                            </>
                          ) : (
                            <>
                              <line
                                x1={point.x}
                                y1={point.y - 18}
                                x2={point.x}
                                y2={point.y - 28}
                                stroke="#10b981"
                                strokeWidth="2"
                                opacity="0.8"
                                strokeLinecap="round"
                              />
                              <polygon
                                points={`${point.x},${point.y - 32} ${point.x - 3},${point.y - 26} ${point.x + 3},${point.y - 26}`}
                                fill="#10b981"
                                opacity="0.8"
                              />
                            </>
                          )}
                        </motion.g>
                      )}
                    </motion.g>
                  ))}

                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                  ].map((month, index) => (
                    <g key={`x-label-${index}`}>
                      <text
                        x={110 + index * 110}
                        y="320"
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="600"
                        fill="rgba(209, 213, 219, 0.9)"
                        fontFamily="system-ui, -apple-system, sans-serif"
                      >
                        {month}
                      </text>
                      <line
                        x1={110 + index * 110}
                        y1="290"
                        x2={110 + index * 110}
                        y2="295"
                        stroke="rgba(156, 163, 175, 0.5)"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2 font-medium">
                    Highest Spend
                  </p>
                  <p className="text-white font-bold text-lg">
                    $
                    {subscriptions.length > 0
                      ? Math.max(
                          ...subscriptions.map((s) => s?.amount ?? 0),
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-black rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2 font-medium">
                    Lowest Spend
                  </p>
                  <p className="text-white font-bold text-lg">
                    $
                    {subscriptions.length > 0
                      ? Math.min(
                          ...subscriptions.map((s) => s?.amount ?? 0),
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-black rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2 font-medium">
                    Average
                  </p>
                  <p className="text-white font-bold text-lg">
                    $
                    {subscriptions.length > 0
                      ? (
                          subscriptions.reduce(
                            (sum, s) => sum + (s?.amount ?? 0),
                            0,
                          ) / subscriptions.length
                        ).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
                <div className="bg-black rounded-lg p-4 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-2 font-medium">
                    Total Spent
                  </p>
                  <p className="text-white font-bold text-lg">
                    $
                    {subscriptions
                      .reduce((sum, s) => sum + (s?.amount ?? 0), 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-black border border-gray-700 rounded-xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-gray-700 bg-black/30">
                <h3 className="text-lg font-semibold text-white">
                  Active Subscriptions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 bg-black/40">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        App Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Plan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                          </div>
                        </td>
                      </tr>
                    ) : subscriptions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-6 py-8 text-center text-gray-400"
                        >
                          No subscriptions found
                        </td>
                      </tr>
                    ) : (
                      subscriptions.map((sub, index) => (
                        <motion.tr
                          key={sub.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-700 hover:bg-gray-800/40 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <span className="text-white font-medium">
                              {sub?.appName ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-400 text-sm">
                              {sub?.category ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">
                              {sub?.planType ?? "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-white font-medium">
                              {sub?.currency ?? ""}{" "}
                              {(sub?.amount ?? 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                sub?.status === "Active"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : sub?.status === "Paused"
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {sub?.status ?? "Unknown"}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedSubscription ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedSubscription(null)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          selectedSubscription ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: selectedSubscription ? 1 : 0,
            scale: selectedSubscription ? 1 : 0.95,
            y: selectedSubscription ? 0 : 20,
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          {selectedSubscription && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-white">
                      {selectedSubscription?.appName
                        ?.charAt(0)
                        ?.toUpperCase() ?? "?"}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {selectedSubscription?.appName ?? "Subscription"}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <TbX className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        selectedSubscription?.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : selectedSubscription?.status === "Paused"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {selectedSubscription?.status ?? "Unknown"}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Category</p>
                    <p className="text-white font-medium">
                      {selectedSubscription?.category ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Plan Type</p>
                    <p className="text-white font-medium">
                      {selectedSubscription?.planType ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Amount</p>
                    <p className="text-white font-bold text-lg">
                      {selectedSubscription?.currency ?? ""}{" "}
                      {(selectedSubscription?.amount ?? 0).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Start Date</p>
                    <p className="text-white">
                      {selectedSubscription?.startDate
                        ? new Date(
                            selectedSubscription.startDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Next Billing Date
                    </p>
                    <p className="text-white font-semibold text-lg">
                      {selectedSubscription?.nextBillingDate
                        ? new Date(
                            selectedSubscription.nextBillingDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                ]
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Payment Method</p>
                    <p className="text-white font-medium">
                      {selectedSubscription?.paymentMethod ?? "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Auto Renew</p>
                    <p
                      className={`font-medium ${
                        selectedSubscription?.autoRenew
                          ? "text-green-300"
                          : "text-yellow-300"
                      }`}
                    >
                      {selectedSubscription?.autoRenew ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Manage
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 rounded-lg transition-colors"
                    onClick={() => setSelectedSubscription(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
