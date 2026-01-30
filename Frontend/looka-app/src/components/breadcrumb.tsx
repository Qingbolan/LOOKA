import { Link, useLocation, useSearchParams } from "react-router-dom"
import { Breadcrumb } from "antd"
import { useI18n } from "@/lib/i18n"
import { useProjectStore } from "@/store"
import { useTimezone } from "@/lib/timezone-context"
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"

export function BreadcrumbNav() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const pathname = location.pathname
  const { t } = useI18n()
  const { formatDateTime } = useTimezone()
  const currentProject = useProjectStore((state) => state.currentProject)
  const currentRun = useProjectStore((state) => state.currentRun)
  const benchmarks = useProjectStore((state) => state.benchmarks)

  // Get runId from query params for Run Center detail view
  const runId = searchParams.get("runId")

  // Get benchmark name and run time for breadcrumb
  const getBenchmarkName = () => {
    if (!currentRun || currentRun.id !== runId) return null
    const benchmark = benchmarks.find(b => b.id === currentRun.benchmark_id)
    return benchmark?.name || null
  }

  const getRunTime = () => {
    if (!currentRun || currentRun.id !== runId) return null
    return formatDateTime(currentRun.created_at)
  }

  // 使用品牌名，如果没有则使用 GEO-SCOPE
  const brandName = currentProject?.brand_name || "GEO-SCOPE"

  // Route name mapping
  const routeNames: Record<string, string> = {
    "/": t("nav.dashboard"),
    "/projects": t("nav.projects"),
    "/assets": t("nav.assets"),
    "/personas": t("nav.personas"),
    "/questions": t("nav.questions"),
    "/run-center": t("nav.runCenter"),
    "/citations": t("nav.citations"),
    "/optimize": t("nav.suggestions"),
    "/settings": t("nav.settings"),
    // Legacy routes
    "/products": t("nav.productVisibility"),
    "/sentiment": t("nav.sentiment"),
    "/pr-risk": t("nav.prRisk"),
    "/results": t("nav.results"),
    "/manage": t("nav.manage"),
  }

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)

  const items: BreadcrumbItemType[] = []

  // Add brand name (instead of Home)
  if (pathname === "/") {
    items.push({
      title: brandName,
    })
  } else {
    items.push({
      title: <Link to="/">{brandName}</Link>,
    })

    // Add path segments
    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLastSegment = index === pathSegments.length - 1
      const name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)

      // For run-center with runId, the page name is not the last item
      const hasRunDetail = currentPath === "/run-center" && runId
      const isLast = isLastSegment && !hasRunDetail

      items.push({
        title: isLast ? name : <Link to={currentPath}>{name}</Link>,
      })
    })

    // Add benchmark name and run time for run-center detail view
    if (pathname === "/run-center" && runId) {
      const benchmarkName = getBenchmarkName()
      const runTime = getRunTime()

      if (benchmarkName) {
        items.push({
          title: benchmarkName,
        })
      }

      if (runTime) {
        items.push({
          title: runTime,
        })
      } else if (!benchmarkName) {
        // Fallback if data not loaded yet
        items.push({
          title: `#${runId.slice(0, 8)}`,
        })
      }
    }
  }

  return (
    <Breadcrumb
      items={items}
      separator="/"
      style={{
        fontSize: '14px',
        color: '#888',
      }}
      className="[&_*]:!text-[#888] [&_a]:hover:!text-[#555]"
    />
  )
}
