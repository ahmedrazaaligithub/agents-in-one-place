import {
  PenLine,
  Code2,
  Image,
  Video,
  AudioLines,
  Zap,
  MessageCircle,
  Search,
  NotebookPen,
  Palette,
  Megaphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  PenLine,
  Code2,
  Image,
  Video,
  AudioLines,
  Zap,
  MessageCircle,
  Search,
  NotebookPen,
  Palette,
  Megaphone,
};

export function getCategoryIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
