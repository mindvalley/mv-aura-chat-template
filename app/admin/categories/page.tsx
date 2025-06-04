"use client"

import { useState, useRef, useEffect } from "react"
import {
  Settings,
  Briefcase,
  Megaphone,
  Cpu,
  Users,
  Box,
  BarChart2,
  GraduationCap,
  Globe,
  Info,
  X,
  Activity,
  AlertCircle,
  Archive,
  Bell,
  Bookmark,
  Calendar,
  Camera,
  Car,
  Check,
  Clipboard,
  Clock,
  Cloud,
  Code,
  Coffee,
  Command,
  Compass,
  Database,
  Eye,
  FileText,
  Filter,
  Flag,
  Folder,
  Gift,
  Headphones,
  Home,
  Image,
  Key,
  Layers,
  Link,
  Mail,
  Map,
  MessageCircle,
  Mic,
  Moon,
  Music,
  Phone,
  PieChart,
  Search,
  Send,
  Server,
  Share2,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Sun,
  Terminal,
  ThumbsUp,
  PenToolIcon as Tool,
  Trash2,
  Trophy,
  Tv,
  Upload,
  User,
  Video,
  Wallet,
  Wifi,
  Zap,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HexColorPicker } from "react-colorful"

// Map icon names to components for easy lookup
const iconMap = {
  Settings,
  Briefcase,
  Megaphone,
  Cpu,
  Users,
  Box,
  BarChart2,
  GraduationCap,
  Globe,
  Info,
  X,
  Activity,
  AlertCircle,
  Archive,
  Bell,
  Bookmark,
  Calendar,
  Camera,
  Car,
  Check,
  Clipboard,
  Clock,
  Cloud,
  Code,
  Coffee,
  Command,
  Compass,
  Database,
  Eye,
  FileText,
  Filter,
  Flag,
  Folder,
  Gift,
  Globe,
  GraduationCap,
  Headphones,
  Home,
  Image,
  Key,
  Layers,
  Link,
  Mail,
  Map,
  Megaphone,
  MessageCircle,
  Mic,
  Moon,
  Music,
  Phone,
  PieChart,
  Search,
  Send,
  Server,
  Settings,
  Share2,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  Sun,
  Terminal,
  ThumbsUp,
  Tool,
  Trash2,
  Trophy,
  Tv,
  Upload,
  User,
  Users,
  Video,
  Wallet,
  Wifi,
  Zap,
  HelpCircle,
}

interface Category {
  name: string
  priority: number
  iconName: keyof typeof iconMap
  color: string
}

const categories: Category[] = [
  {
    name: "Vishen Picks",
    priority: 1,
    iconName: "Settings",
    color: "#3B82F6", // Blue
  },
  {
    name: "Production",
    priority: 2,
    iconName: "Briefcase",
    color: "#10B981", // Green
  },
  {
    name: "Marketing",
    priority: 3,
    iconName: "Megaphone",
    color: "#F59E0B", // Yellow
  },
  {
    name: "Technology",
    priority: 4,
    iconName: "Cpu",
    color: "#6366F1", // Indigo
  },
  {
    name: "HR",
    priority: 5,
    iconName: "Users",
    color: "#EC4899", // Pink
  },
  {
    name: "Product",
    priority: 6,
    iconName: "Box",
    color: "#8B5CF6", // Purple
  },
  {
    name: "Operation",
    priority: 7,
    iconName: "Settings",
    color: "#14B8A6", // Teal
  },
  {
    name: "Data Analysis",
    priority: 8,
    iconName: "BarChart2",
    color: "#EF4444", // Red
  },
  {
    name: "Coaching & Learning",
    priority: 9,
    iconName: "GraduationCap",
    color: "#F97316", // Orange
  },
  {
    name: "General Purpose",
    priority: 10,
    iconName: "Globe",
    color: "#64748B", // Slate
  },
]

const availableIcons = [
  { icon: X, label: "X" },
  { icon: Activity, label: "Activity" },
  { icon: AlertCircle, label: "Alert" },
  { icon: Archive, label: "Archive" },
  { icon: BarChart2, label: "BarChart" },
  { icon: Bell, label: "Bell" },
  { icon: Bookmark, label: "Bookmark" },
  { icon: Box, label: "Box" },
  { icon: Calendar, label: "Calendar" },
  { icon: Camera, label: "Camera" },
  { icon: Car, label: "Car" },
  { icon: Check, label: "Check" },
  { icon: Clipboard, label: "Clipboard" },
  { icon: Clock, label: "Clock" },
  { icon: Cloud, label: "Cloud" },
  { icon: Code, label: "Code" },
  { icon: Coffee, label: "Coffee" },
  { icon: Command, label: "Command" },
  { icon: Compass, label: "Compass" },
  { icon: Cpu, label: "Cpu" },
  { icon: Database, label: "Database" },
  { icon: Eye, label: "Eye" },
  { icon: FileText, label: "FileText" },
  { icon: Filter, label: "Filter" },
  { icon: Flag, label: "Flag" },
  { icon: Folder, label: "Folder" },
  { icon: Gift, label: "Gift" },
  { icon: Globe, label: "Globe" },
  { icon: GraduationCap, label: "GraduationCap" },
  { icon: Headphones, label: "Headphones" },
  { icon: Home, label: "Home" },
  { icon: Image, label: "Image" },
  { icon: Key, label: "Key" },
  { icon: Layers, label: "Layers" },
  { icon: Link, label: "Link" },
  { icon: Mail, label: "Mail" },
  { icon: Map, label: "Map" },
  { icon: Megaphone, label: "Megaphone" },
  { icon: MessageCircle, label: "Message" },
  { icon: Mic, label: "Mic" },
  { icon: Moon, label: "Moon" },
  { icon: Music, label: "Music" },
  { icon: Phone, label: "Phone" },
  { icon: PieChart, label: "PieChart" },
  { icon: Search, label: "Search" },
  { icon: Send, label: "Send" },
  { icon: Server, label: "Server" },
  { icon: Settings, label: "Settings" },
  { icon: Share2, label: "Share" },
  { icon: Shield, label: "Shield" },
  { icon: ShoppingCart, label: "ShoppingCart" },
  { icon: Smartphone, label: "Smartphone" },
  { icon: Star, label: "Star" },
  { icon: Sun, label: "Sun" },
  { icon: Terminal, label: "Terminal" },
  { icon: ThumbsUp, label: "ThumbsUp" },
  { icon: Tool, label: "Tool" },
  { icon: Trash2, label: "Trash" },
  { icon: Trophy, label: "Trophy" },
  { icon: Tv, label: "TV" },
  { icon: Upload, label: "Upload" },
  { icon: User, label: "User" },
  { icon: Users, label: "Users" },
  { icon: Video, label: "Video" },
  { icon: Wallet, label: "Wallet" },
  { icon: Wifi, label: "Wifi" },
  { icon: Zap, label: "Zap" },
  { icon: HelpCircle, label: "HelpCircle" },
]

export default function CategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string>("")
  const [isIconPickerVisible, setIsIconPickerVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    priority: 0,
    iconName: "HelpCircle",
    color: "#000000",
  })
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false)
  const iconPickerRef = useRef<HTMLDivElement>(null)
  const iconButtonRef = useRef<HTMLDivElement>(null)

  const handleAdd = () => {
    setIsAddingCategory(true)
    setSelectedIcon("HelpCircle")
    setFormState({
      name: "",
      priority: categories.length + 1,
      iconName: "HelpCircle",
      color: "#000000",
    })
    setIsIconPickerVisible(false)
    setIsColorPickerVisible(false)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setSelectedIcon(category.iconName)
    setFormState({
      name: category.name,
      priority: category.priority,
      iconName: category.iconName,
      color: category.color,
    })
    setIsIconPickerVisible(false)
    setIsColorPickerVisible(false)
  }

  const handleSave = () => {
    // Handle save logic here
    setEditingCategory(null)
  }

  const handleAddSave = () => {
    // Handle add logic here
    setIsAddingCategory(false)
  }

  const toggleIconPicker = () => {
    setIsIconPickerVisible(!isIconPickerVisible)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        iconPickerRef.current &&
        !iconPickerRef.current.contains(event.target as Node) &&
        iconButtonRef.current &&
        !iconButtonRef.current.contains(event.target as Node)
      ) {
        setIsIconPickerVisible(false)
        setIsColorPickerVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const renderIcon = (iconName: string, color: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent ? <IconComponent className="w-5 h-5" style={{ color }} /> : null
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Button onClick={handleAdd}>Add Category</Button>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6">Name</TableHead>
                <TableHead className="px-6">Priority</TableHead>
                <TableHead className="px-6 text-center">Icon</TableHead>
                <TableHead className="px-6 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell className="px-6 font-medium">{category.name}</TableCell>
                  <TableCell className="px-6">{category.priority}</TableCell>
                  <TableCell className="px-6">
                    <div className="flex justify-center">{renderIcon(category.iconName, category.color)}</div>
                  </TableCell>
                  <TableCell className="px-6 text-center">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Category Dialog */}
      <Dialog
        open={isAddingCategory || !!editingCategory}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingCategory(false)
            setEditingCategory(null)
            setFormState({ name: "", priority: 0, iconName: "HelpCircle", color: "#000000" })
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isAddingCategory ? "Add Category" : "Edit Category"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor={isAddingCategory ? "add-name" : "name"}>Name</Label>
              <Input
                id={isAddingCategory ? "add-name" : "name"}
                value={formState.name}
                onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={isAddingCategory ? "add-priority" : "priority"}>Priority</Label>
              <Input
                id={isAddingCategory ? "add-priority" : "priority"}
                type="number"
                value={formState.priority}
                onChange={(e) => setFormState((prev) => ({ ...prev, priority: Number.parseInt(e.target.value) || 0 }))}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label>Icon and Color</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div
                    ref={iconButtonRef}
                    className="p-2 border rounded-md inline-flex items-center justify-center w-10 h-10 bg-gray-50 cursor-pointer"
                    onClick={toggleIconPicker}
                  >
                    {renderIcon(formState.iconName, formState.color)}
                  </div>
                  {isIconPickerVisible && (
                    <div
                      ref={iconPickerRef}
                      className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-2"
                      style={{
                        width: "320px",
                        maxHeight: "320px",
                        overflowY: "auto",
                      }}
                    >
                      <div className="grid grid-cols-8 gap-1">
                        {availableIcons.map(({ icon: Icon, label }) => (
                          <button
                            key={label}
                            className={`p-1.5 rounded-md hover:bg-gray-100 ${
                              selectedIcon === label ? "bg-gray-100" : ""
                            }`}
                            onClick={() => {
                              setSelectedIcon(label)
                              setFormState((prev) => ({ ...prev, iconName: label }))
                              setIsIconPickerVisible(false)
                            }}
                          >
                            <Icon className="w-4 h-4" style={{ color: formState.color }} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-md border cursor-pointer"
                    style={{ backgroundColor: formState.color }}
                    onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
                  />
                  {isColorPickerVisible && (
                    <div className="absolute z-10 mt-1">
                      <HexColorPicker
                        color={formState.color}
                        onChange={(color) => setFormState((prev) => ({ ...prev, color }))}
                      />
                      <div className="mt-2">
                        <Input
                          value={formState.color}
                          onChange={(e) => {
                            const color = e.target.value
                            if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
                              setFormState((prev) => ({ ...prev, color }))
                            }
                          }}
                          className="w-full"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={isAddingCategory ? handleAddSave : handleSave}>
              {isAddingCategory ? "Add Category" : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
