import { useEffect, useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Clock,
  RotateCcw,
  ListTodo,
  XCircle,
  Calendar,
  User,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { toast } from "sonner"
import { runApi, type ActiveRunsResponse, type ActiveRunItem } from "@/lib/api"
import type { AIEngine } from "@/lib/api"

// Engine configurations
const ENGINES: { id: AIEngine; name: string; icon: string }[] = [
  { id: "chatgpt", name: "ChatGPT", icon: "/platforms/ChatGPT-Logo.png" },
  { id: "deepseek", name: "DeepSeek", icon: "/platforms/deepseek.png" },
  { id: "claude", name: "Claude", icon: "/platforms/claude.png" },
  { id: "doubao", name: "Doubao", icon: "/platforms/doubao.png" },
]

interface TaskQueueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
}

export function TaskQueueDialog({
  open,
  onOpenChange,
  projectId,
}: TaskQueueDialogProps) {
  const { t } = useI18n()
  const [activeRuns, setActiveRuns] = useState<ActiveRunsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [cancelingId, setCancelingId] = useState<string | null>(null)

  const fetchActiveRuns = useCallback(async () => {
    if (!projectId) return
    try {
      const data = await runApi.getActiveRuns(projectId)
      setActiveRuns(data)
    } catch (error) {
      console.error("Failed to fetch active runs:", error)
    }
  }, [projectId])

  // Fetch on open and auto-refresh every 3 seconds
  useEffect(() => {
    if (!open || !projectId) return

    setLoading(true)
    fetchActiveRuns().finally(() => setLoading(false))

    const interval = setInterval(() => {
      fetchActiveRuns()
    }, 3000)

    return () => clearInterval(interval)
  }, [open, projectId, fetchActiveRuns])

  const handleCancelTask = async (taskId: string) => {
    try {
      setCancelingId(taskId)
      await runApi.cancel(projectId, taskId)
      toast.success(t("taskQueue.cancelSuccess"))
      fetchActiveRuns()
    } catch (error) {
      console.error("Failed to cancel task:", error)
      toast.error(t("taskQueue.cancelFailed"))
    } finally {
      setCancelingId(null)
    }
  }

  const runningCount = activeRuns?.running.length || 0
  const pendingCount = activeRuns?.pending.length || 0
  const totalCount = runningCount + pendingCount

  const renderTaskCard = (task: ActiveRunItem, isRunning: boolean) => {
    const progressText = task.progress
      ? `${task.progress.completed}/${task.progress.total}`
      : ""
    const isCanceling = cancelingId === task.id

    return (
      <Card
        key={task.id}
        className={isRunning ? "border-blue-500/50 bg-blue-500/5" : "border-amber-500/50 bg-amber-500/5"}
        disableBackdrop
        disableSpotlight
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Badge
                variant={isRunning ? "solid-info" : "outline"}
                className={`text-xs shrink-0 mt-0.5 ${!isRunning ? "border-amber-500 text-amber-600" : ""}`}
              >
                {isRunning ? (
                  <RotateCcw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {isRunning ? t("taskQueue.running") : t("taskQueue.waiting")}
              </Badge>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{task.name}</p>
                  {task.source === "scheduled" ? (
                    <span title={t("taskQueue.scheduled")}><Calendar className="h-3 w-3 text-muted-foreground shrink-0" /></span>
                  ) : (
                    <span title={t("taskQueue.manual")}><User className="h-3 w-3 text-muted-foreground shrink-0" /></span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-xs">
                    {task.benchmark_name}
                  </Badge>
                  {progressText && (
                    <span className="text-xs text-muted-foreground">{progressText}</span>
                  )}
                  {task.status === "evaluating" && (
                    <span className="text-xs text-muted-foreground">{t("taskQueue.evaluating")}</span>
                  )}
                </div>
                <div className="flex gap-1 mt-2">
                  {task.engines.map((engine) => {
                    const config = ENGINES.find((e) => e.id === engine)
                    return (
                      <div key={engine} className="h-5 w-5 rounded-full bg-white flex items-center justify-center border shadow-sm">
                        <img src={config?.icon} alt={config?.name} className="h-4 w-4 object-contain" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
              onClick={() => handleCancelTask(task.id)}
              disabled={isCanceling}
              title={t("taskQueue.cancel")}
            >
              {isCanceling ? (
                <RotateCcw className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[85vh] max-h-[85vh] overflow-hidden flex flex-col sm:max-w-[600px]">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'color-mix(in oklch, var(--secondary-accent, var(--primary)) 15%, transparent)' }}
            >
              <ListTodo className="h-5 w-5 text-primary" />
            </div>
            <span>{t("taskQueue.title")}</span>
          </DialogTitle>
          <DialogDescription>
            {t("taskQueue.descriptionAll")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 pb-2">
          <div className="space-y-4 py-4">
            {/* Running Tasks */}
            {runningCount > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t("taskQueue.runningTasks")}</Label>
                <div className="space-y-2">
                  {activeRuns?.running.map((task) => renderTaskCard(task, true))}
                </div>
              </div>
            )}

            {/* Pending Tasks */}
            {pendingCount > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">{t("taskQueue.pendingTasks")}</Label>
                <div className="space-y-2">
                  {activeRuns?.pending.map((task) => renderTaskCard(task, false))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {totalCount === 0 && !loading && (
              <div className="text-center py-8">
                <ListTodo className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-sm">
                  {t("taskQueue.empty")}
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && totalCount === 0 && (
              <div className="text-center py-8">
                <RotateCcw className="h-8 w-8 mx-auto text-muted-foreground/50 mb-4 animate-spin" />
                <p className="text-muted-foreground text-sm">
                  {t("common.loading")}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
