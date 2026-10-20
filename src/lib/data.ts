// ─────────────────────────────────────────────
//  Mock data for the I Cell Inventory prototype
// ─────────────────────────────────────────────

export type Role = "Member" | "Core" | "Head" | "OC" | "Faculty";

export type UserStatus = "Active" | "Pending" | "Inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  year: number;
  status: UserStatus;
  joinedAt: string;
}

export type ItemStatus = "Active" | "Retired";

export interface ItemLocation {
  location: string;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  totalQuantity: number;
  issuedQuantity: number;
  availableQuantity: number;
  locations: ItemLocation[];
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  active: boolean;
}

export type RequestStatus = "Pending" | "Approved" | "Rejected" | "Cancelled" | "Issued" | "Returned";

export interface RequestItem {
  itemId: string;
  itemName: string;
  requestedQty: number;
  approvedQty: number | null;
  status: "Pending" | "Approved" | "Rejected";
  rejectionReason?: string;
}

export interface Request {
  id: string;
  requesterId: string;
  requesterName: string;
  status: RequestStatus;
  purpose: string;
  items: RequestItem[];
  createdAt: string;
  updatedAt: string;
  approvedById?: string;
  approvedByName?: string;
  approvedAt?: string;
}

export type IssueStatus = "Active" | "PartiallyReturned" | "Returned";

export interface Issue {
  id: string;
  requestId: string;
  memberId: string;
  memberName: string;
  itemId: string;
  itemName: string;
  issuedQty: number;
  returnedQty: number;
  outstandingQty: number;
  status: IssueStatus;
  issuedById: string;
  issuedByName: string;
  issuedAt: string;
}

export type ReturnCondition = "Good" | "Damaged" | "Lost";

export interface Return {
  id: string;
  issueId: string;
  memberId: string;
  memberName: string;
  itemId: string;
  itemName: string;
  returnedQty: number;
  condition: ReturnCondition;
  processedById: string;
  processedByName: string;
  returnedAt: string;
  remarks?: string;
}

export type LiabilityStatus = "Pending" | "Resolved";
export type ResolutionType = "Paid" | "Replaced";

export interface Liability {
  id: string;
  memberId: string;
  memberName: string;
  itemId: string;
  itemName: string;
  quantity: number;
  type: "Damaged" | "Lost";
  status: LiabilityStatus;
  createdAt: string;
  resolvedAt?: string;
  resolutionType?: ResolutionType;
  remarks?: string;
}

export type AuditAction =
  | "USER_REGISTERED"
  | "USER_APPROVED"
  | "USER_DEACTIVATED"
  | "ROLE_CHANGED"
  | "ITEM_ADDED"
  | "ITEM_EDITED"
  | "ITEM_DELETED"
  | "QUANTITY_ADJUSTED"
  | "REQUEST_CREATED"
  | "REQUEST_APPROVED"
  | "REQUEST_REJECTED"
  | "REQUEST_CANCELLED"
  | "EQUIPMENT_ISSUED"
  | "EQUIPMENT_RETURNED"
  | "DAMAGE_RECORDED"
  | "LOSS_RECORDED"
  | "LIABILITY_RESOLVED"
  | "CATEGORY_CREATED"
  | "CATEGORY_EDITED";

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  detail: string;
  timestamp: string;
}

// ─── Seed Data ────────────────────────────────

export const CURRENT_USER: User = {
  id: "u1",
  name: "Aditya Sahu",
  email: "aditya.sahu@nitrraipur.ac.in",
  role: "OC",
  year: 4,
  status: "Active",
  joinedAt: "2023-08-01",
};

export const USERS: User[] = [
  CURRENT_USER,
  { id: "u2", name: "Priya Sharma", email: "priya.sharma@nitrraipur.ac.in", role: "Member", year: 2, status: "Active", joinedAt: "2024-08-01" },
  { id: "u3", name: "Rohan Gupta", email: "rohan.gupta@nitrraipur.ac.in", role: "Core", year: 3, status: "Active", joinedAt: "2023-08-01" },
  { id: "u4", name: "Sneha Patel", email: "sneha.patel@nitrraipur.ac.in", role: "Head", year: 4, status: "Active", joinedAt: "2022-08-01" },
  { id: "u5", name: "Dr. Kavita Verma", email: "kavita.verma@nitrraipur.ac.in", role: "Faculty", year: 0, status: "Active", joinedAt: "2020-01-01" },
  { id: "u6", name: "Arjun Mehta", email: "arjun.mehta@nitrraipur.ac.in", role: "Member", year: 2, status: "Pending", joinedAt: "2026-10-10" },
  { id: "u7", name: "Neha Singh", email: "neha.singh@nitrraipur.ac.in", role: "Member", year: 2, status: "Inactive", joinedAt: "2023-08-01" },
];

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Microcontrollers", description: "Arduino, ESP32, STM32 and similar boards", itemCount: 4, active: true },
  { id: "c2", name: "Sensors", description: "Environmental, motion, and proximity sensors", itemCount: 6, active: true },
  { id: "c3", name: "Power Electronics", description: "Regulators, converters, motor drivers", itemCount: 3, active: true },
  { id: "c4", name: "Communication Modules", description: "WiFi, Bluetooth, RF, LoRa modules", itemCount: 3, active: true },
  { id: "c5", name: "Displays", description: "OLED, LCD, TFT screens", itemCount: 2, active: true },
  { id: "c6", name: "Tools", description: "Soldering irons, multimeters, oscilloscopes", itemCount: 4, active: true },
  { id: "c7", name: "Legacy Components", description: "Deprecated items kept for record", itemCount: 1, active: false },
];

export const ITEMS: Item[] = [
  {
    id: "i1", name: "Arduino Uno R3", category: "Microcontrollers",
    description: "ATmega328P based development board. 14 digital I/O pins, 6 analog inputs, 16 MHz clock.",
    totalQuantity: 20, issuedQuantity: 8, availableQuantity: 12,
    locations: [{ location: "Lab A - Shelf 1", quantity: 15 }, { location: "Lab B - Cabinet", quantity: 5 }],
    status: "Active", createdAt: "2024-01-10", updatedAt: "2026-10-01",
  },
  {
    id: "i2", name: "ESP32 DevKit v1", category: "Microcontrollers",
    description: "Dual-core 240 MHz Xtensa LX6, integrated Wi-Fi & Bluetooth, 38 pins.",
    totalQuantity: 15, issuedQuantity: 5, availableQuantity: 10,
    locations: [{ location: "Lab A - Shelf 1", quantity: 15 }],
    status: "Active", createdAt: "2024-02-15", updatedAt: "2026-09-20",
  },
  {
    id: "i3", name: "DHT22 Temperature & Humidity Sensor", category: "Sensors",
    description: "Capacitive humidity & temperature sensor. Range: -40~80°C, 0~100% RH.",
    totalQuantity: 30, issuedQuantity: 10, availableQuantity: 20,
    locations: [{ location: "Lab A - Drawer 3", quantity: 30 }],
    status: "Active", createdAt: "2024-01-10", updatedAt: "2026-10-05",
  },
  {
    id: "i4", name: "HC-SR04 Ultrasonic Sensor", category: "Sensors",
    description: "Ultrasonic distance sensor. Range: 2cm–400cm, 5V operating voltage.",
    totalQuantity: 25, issuedQuantity: 3, availableQuantity: 22,
    locations: [{ location: "Lab A - Drawer 3", quantity: 25 }],
    status: "Active", createdAt: "2024-01-10", updatedAt: "2026-08-15",
  },
  {
    id: "i5", name: "L298N Motor Driver", category: "Power Electronics",
    description: "Dual H-bridge motor driver. Supports 2 DC motors or 1 stepper motor, 5–35V.",
    totalQuantity: 12, issuedQuantity: 4, availableQuantity: 8,
    locations: [{ location: "Lab B - Cabinet", quantity: 12 }],
    status: "Active", createdAt: "2024-03-01", updatedAt: "2026-10-01",
  },
  {
    id: "i6", name: "HC-05 Bluetooth Module", category: "Communication Modules",
    description: "Bluetooth 2.0 serial module. Default baud: 9600, range ~10m.",
    totalQuantity: 18, issuedQuantity: 6, availableQuantity: 12,
    locations: [{ location: "Lab A - Shelf 2", quantity: 18 }],
    status: "Active", createdAt: "2024-02-01", updatedAt: "2026-09-10",
  },
  {
    id: "i7", name: "0.96\" OLED Display (I2C)", category: "Displays",
    description: "128×64 pixel monochrome OLED. I2C interface, 3.3V–5V compatible.",
    totalQuantity: 20, issuedQuantity: 7, availableQuantity: 13,
    locations: [{ location: "Lab A - Drawer 4", quantity: 20 }],
    status: "Active", createdAt: "2024-04-01", updatedAt: "2026-10-01",
  },
  {
    id: "i8", name: "Digital Multimeter (Mastech)", category: "Tools",
    description: "Auto-ranging DMM with AC/DC voltage, current, resistance, continuity.",
    totalQuantity: 6, issuedQuantity: 2, availableQuantity: 4,
    locations: [{ location: "Lab A - Tool Cabinet", quantity: 4 }, { location: "Lab B - Cabinet", quantity: 2 }],
    status: "Active", createdAt: "2023-09-01", updatedAt: "2026-09-15",
  },
  {
    id: "i9", name: "Raspberry Pi 3B+", category: "Microcontrollers",
    description: "1.4 GHz 64-bit quad-core ARM, 1GB RAM, dual-band WiFi, Gigabit Ethernet.",
    totalQuantity: 5, issuedQuantity: 3, availableQuantity: 2,
    locations: [{ location: "Lab A - Shelf 1", quantity: 5 }],
    status: "Active", createdAt: "2024-01-20", updatedAt: "2026-10-01",
  },
  {
    id: "i10", name: "PIR Motion Sensor", category: "Sensors",
    description: "Passive infrared sensor for motion detection. 3–7m range, 120° angle.",
    totalQuantity: 20, issuedQuantity: 0, availableQuantity: 20,
    locations: [{ location: "Lab A - Drawer 3", quantity: 20 }],
    status: "Active", createdAt: "2024-05-10", updatedAt: "2026-07-20",
  },
];

export const REQUESTS: Request[] = [
  {
    id: "r1", requesterId: "u2", requesterName: "Priya Sharma",
    status: "Pending", purpose: "Line following robot for Technozion competition",
    items: [
      { itemId: "i1", itemName: "Arduino Uno R3", requestedQty: 2, approvedQty: null, status: "Pending" },
      { itemId: "i5", itemName: "L298N Motor Driver", requestedQty: 2, approvedQty: null, status: "Pending" },
    ],
    createdAt: "2026-10-18T10:30:00Z", updatedAt: "2026-10-18T10:30:00Z",
  },
  {
    id: "r2", requesterId: "u3", requesterName: "Rohan Gupta",
    status: "Approved", purpose: "IoT weather station project",
    items: [
      { itemId: "i2", itemName: "ESP32 DevKit v1", requestedQty: 3, approvedQty: 2, status: "Approved" },
      { itemId: "i3", itemName: "DHT22 Sensor", requestedQty: 3, approvedQty: 3, status: "Approved" },
      { itemId: "i6", itemName: "HC-05 Bluetooth Module", requestedQty: 5, approvedQty: 0, status: "Rejected", rejectionReason: "Insufficient stock for current demand" },
    ],
    createdAt: "2026-10-15T09:00:00Z", updatedAt: "2026-10-16T11:00:00Z",
    approvedById: "u1", approvedByName: "Aditya Sahu", approvedAt: "2026-10-16T11:00:00Z",
  },
  {
    id: "r3", requesterId: "u2", requesterName: "Priya Sharma",
    status: "Issued", purpose: "Smart irrigation controller",
    items: [
      { itemId: "i3", itemName: "DHT22 Sensor", requestedQty: 2, approvedQty: 2, status: "Approved" },
      { itemId: "i4", itemName: "HC-SR04 Sensor", requestedQty: 1, approvedQty: 1, status: "Approved" },
    ],
    createdAt: "2026-10-05T14:00:00Z", updatedAt: "2026-10-07T10:00:00Z",
    approvedById: "u1", approvedByName: "Aditya Sahu", approvedAt: "2026-10-07T10:00:00Z",
  },
  {
    id: "r4", requesterId: "u3", requesterName: "Rohan Gupta",
    status: "Cancelled", purpose: "Display testing",
    items: [
      { itemId: "i7", itemName: "OLED Display", requestedQty: 3, approvedQty: null, status: "Pending" },
    ],
    createdAt: "2026-10-12T16:00:00Z", updatedAt: "2026-10-13T08:00:00Z",
  },
  {
    id: "r5", requesterId: "u4", requesterName: "Sneha Patel",
    status: "Pending", purpose: "Robot arm prototype – servo testing",
    items: [
      { itemId: "i9", itemName: "Raspberry Pi 3B+", requestedQty: 1, approvedQty: null, status: "Pending" },
      { itemId: "i8", itemName: "Digital Multimeter", requestedQty: 1, approvedQty: null, status: "Pending" },
    ],
    createdAt: "2026-10-19T11:00:00Z", updatedAt: "2026-10-19T11:00:00Z",
  },
];

export const ISSUES: Issue[] = [
  {
    id: "iss1", requestId: "r3", memberId: "u2", memberName: "Priya Sharma",
    itemId: "i3", itemName: "DHT22 Sensor",
    issuedQty: 2, returnedQty: 0, outstandingQty: 2,
    status: "Active",
    issuedById: "u1", issuedByName: "Aditya Sahu", issuedAt: "2026-10-07T11:00:00Z",
  },
  {
    id: "iss2", requestId: "r3", memberId: "u2", memberName: "Priya Sharma",
    itemId: "i4", itemName: "HC-SR04 Sensor",
    issuedQty: 1, returnedQty: 0, outstandingQty: 1,
    status: "Active",
    issuedById: "u1", issuedByName: "Aditya Sahu", issuedAt: "2026-10-07T11:00:00Z",
  },
  {
    id: "iss3", requestId: "r2", memberId: "u3", memberName: "Rohan Gupta",
    itemId: "i2", itemName: "ESP32 DevKit v1",
    issuedQty: 2, returnedQty: 1, outstandingQty: 1,
    status: "PartiallyReturned",
    issuedById: "u1", issuedByName: "Aditya Sahu", issuedAt: "2026-10-16T14:00:00Z",
  },
  {
    id: "iss4", requestId: "r2", memberId: "u3", memberName: "Rohan Gupta",
    itemId: "i3", itemName: "DHT22 Sensor",
    issuedQty: 3, returnedQty: 3, outstandingQty: 0,
    status: "Returned",
    issuedById: "u1", issuedByName: "Aditya Sahu", issuedAt: "2026-10-16T14:00:00Z",
  },
];

export const RETURNS: Return[] = [
  {
    id: "ret1", issueId: "iss3", memberId: "u3", memberName: "Rohan Gupta",
    itemId: "i2", itemName: "ESP32 DevKit v1",
    returnedQty: 1, condition: "Good",
    processedById: "u1", processedByName: "Aditya Sahu",
    returnedAt: "2026-10-18T10:00:00Z", remarks: "In perfect condition.",
  },
  {
    id: "ret2", issueId: "iss4", memberId: "u3", memberName: "Rohan Gupta",
    itemId: "i3", itemName: "DHT22 Sensor",
    returnedQty: 3, condition: "Good",
    processedById: "u1", processedByName: "Aditya Sahu",
    returnedAt: "2026-10-18T10:05:00Z",
  },
];

export const LIABILITIES: Liability[] = [
  {
    id: "l1", memberId: "u2", memberName: "Priya Sharma",
    itemId: "i6", itemName: "HC-05 Bluetooth Module",
    quantity: 1, type: "Damaged",
    status: "Pending",
    createdAt: "2026-09-20T09:00:00Z",
    remarks: "Module short-circuited during breadboarding.",
  },
  {
    id: "l2", memberId: "u3", memberName: "Rohan Gupta",
    itemId: "i7", itemName: "OLED Display (I2C)",
    quantity: 1, type: "Lost",
    status: "Resolved",
    createdAt: "2026-08-15T11:00:00Z",
    resolvedAt: "2026-09-01T15:00:00Z",
    resolutionType: "Replaced",
    remarks: "Member replaced with equivalent display.",
  },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: "a1", actorId: "u1", actorName: "Aditya Sahu", action: "REQUEST_APPROVED", entity: "Request", entityId: "r2", detail: "Approved request r2 from Rohan Gupta (partial)", timestamp: "2026-10-16T11:00:00Z" },
  { id: "a2", actorId: "u1", actorName: "Aditya Sahu", action: "EQUIPMENT_ISSUED", entity: "Issue", entityId: "iss3", detail: "Issued 2× ESP32 DevKit v1 to Rohan Gupta", timestamp: "2026-10-16T14:00:00Z" },
  { id: "a3", actorId: "u1", actorName: "Aditya Sahu", action: "EQUIPMENT_ISSUED", entity: "Issue", entityId: "iss4", detail: "Issued 3× DHT22 Sensor to Rohan Gupta", timestamp: "2026-10-16T14:01:00Z" },
  { id: "a4", actorId: "u2", actorName: "Priya Sharma", action: "REQUEST_CREATED", entity: "Request", entityId: "r1", detail: "Created request for Arduino Uno ×2, L298N ×2", timestamp: "2026-10-18T10:30:00Z" },
  { id: "a5", actorId: "u1", actorName: "Aditya Sahu", action: "EQUIPMENT_RETURNED", entity: "Return", entityId: "ret1", detail: "Rohan Gupta returned 1× ESP32 DevKit v1 – Good condition", timestamp: "2026-10-18T10:00:00Z" },
  { id: "a6", actorId: "u1", actorName: "Aditya Sahu", action: "EQUIPMENT_RETURNED", entity: "Return", entityId: "ret2", detail: "Rohan Gupta returned 3× DHT22 Sensor – Good condition", timestamp: "2026-10-18T10:05:00Z" },
  { id: "a7", actorId: "u5", actorName: "Dr. Kavita Verma", action: "USER_APPROVED", entity: "User", entityId: "u3", detail: "Approved registration for Rohan Gupta", timestamp: "2023-08-05T09:00:00Z" },
  { id: "a8", actorId: "u1", actorName: "Aditya Sahu", action: "LIABILITY_RESOLVED", entity: "Liability", entityId: "l2", detail: "Rohan Gupta liability resolved – Replaced OLED Display", timestamp: "2026-09-01T15:00:00Z" },
  { id: "a9", actorId: "u1", actorName: "Aditya Sahu", action: "ITEM_ADDED", entity: "Item", entityId: "i10", detail: "Added PIR Motion Sensor ×20 to inventory", timestamp: "2024-05-10T12:00:00Z" },
  { id: "a10", actorId: "u4", actorName: "Sneha Patel", action: "REQUEST_CREATED", entity: "Request", entityId: "r5", detail: "Created request for RPi 3B+ ×1, Multimeter ×1", timestamp: "2026-10-19T11:00:00Z" },
];

// ─── Helpers ──────────────────────────────────

export const ROLE_COLORS: Record<Role, string> = {
  Member: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Core: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Head: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  OC: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Faculty: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Approved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Rejected: "bg-red-500/20 text-red-300 border-red-500/30",
  Cancelled: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Issued: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Returned: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  PartiallyReturned: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Resolved: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Retired: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Good: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Damaged: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Lost: "bg-red-500/20 text-red-300 border-red-500/30",
};

export function canManage(role: Role): boolean {
  return role === "OC" || role === "Faculty";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}
