import { toast } from "sonner"

type NotificationType = "default" | "success" | "error" | "info" | "warning"

interface NotificationOptions {
  type?: NotificationType
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function showNotification(title: string, options: NotificationOptions = {}) {
  const { type = "default", description, duration = 5000, action } = options

  const toastOptions = {
    description,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  }

  switch (type) {
    case "success":
      toast.success(title, toastOptions)
      break
    case "error":
      toast.error(title, toastOptions)
      break
    case "info":
      toast.info(title, toastOptions)
      break
    case "warning":
      toast.warning(title, toastOptions)
      break
    default:
      toast(title, toastOptions)
  }
}
