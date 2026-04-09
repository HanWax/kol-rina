export type EventType = "shabbat" | "chag" | "special" | "social" | "learning";

export interface BookingField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface EventBookingConfig {
  /** Google Apps Script web app URL for form submissions */
  googleAppsScriptUrl: string;
  /** Total capacity — omit if unlimited */
  capacity?: number;
  /** Approximate spots remaining (manually updated) — omit to hide */
  spotsRemaining?: number;
  /** Set to true when booking has closed */
  closed?: boolean;
  /** Form fields for this event */
  fields: BookingField[];
}

export interface BankTransferDetails {
  accountName: string;
  sortCode: string;
  accountNumber: string;
  /** Reference format, e.g. "SHAVUOT26-[SURNAME]" */
  reference: string;
}

export interface PaymentInfo {
  /** e.g. "£18 per person / £45 per family" */
  amount?: string;
  bankDetails: BankTransferDetails;
  /** e.g. "Please pay within 7 days of booking" */
  notes?: string;
}

export interface KolRinaEvent {
  /** URL-safe slug, e.g. "shavuot-2026" */
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  type: EventType;
  /** Short description for the listing card */
  summary: string;
  /** Longer description paragraphs for the detail page */
  description: string[];
  /** Programme / schedule items */
  schedule?: { time: string; activity: string }[];
  /** If present, event is bookable */
  booking?: EventBookingConfig;
  /** If present, shows bank transfer payment section */
  payment?: PaymentInfo;
}

/*
 * ─── Google Apps Script Setup ───────────────────────────────────────────
 *
 * To receive form submissions in a Google Sheet:
 *
 * 1. Create a Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code:
 *
 *   function doPost(e) {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data = JSON.parse(e.postData.contents);
 *     var timestamp = new Date().toISOString();
 *     var row = [timestamp];
 *     var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
 *     for (var i = 1; i < headers.length; i++) {
 *       row.push(data[headers[i]] || "");
 *     }
 *     sheet.appendRow(row);
 *     return ContentService.createTextOutput(
 *       JSON.stringify({ status: "success" })
 *     ).setMimeType(ContentService.MimeType.JSON);
 *   }
 *
 * 4. Set the first row as headers: Timestamp, fullName, email, phone,
 *    numberOfAttendees, dietaryRequirements, notes (+ any custom fields)
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the web app URL and paste it into the event's googleAppsScriptUrl
 * ────────────────────────────────────────────────────────────────────────
 */

/** Default booking fields used by most events */
const defaultBookingFields: BookingField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Your full name",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "you@example.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "07XXX XXXXXX",
  },
  {
    name: "numberOfAttendees",
    label: "Number of Attendees (including yourself)",
    type: "number",
    required: true,
    placeholder: "1",
  },
  {
    name: "dietaryRequirements",
    label: "Dietary Requirements",
    type: "textarea",
    placeholder: "Any allergies or dietary needs",
  },
  {
    name: "notes",
    label: "Additional Notes",
    type: "textarea",
    placeholder: "Anything else we should know",
  },
];

export const events: KolRinaEvent[] = [
  {
    id: "shabbat-shacharit-18-april",
    title: "Shabbat Shacharit Service",
    date: "18 April 2026",
    time: "9:15 AM",
    type: "shabbat",
    summary:
      "Regular Shabbat morning service with Parashat Tazria-Metzora. Followed by a communal kiddush.",
    description: [
      "Regular Shabbat morning service with Parashat Tazria-Metzora. Followed by a communal kiddush.",
    ],
  },
  {
    id: "shabbat-shacharit-2-may",
    title: "Shabbat Shacharit Service",
    date: "2 May 2026",
    time: "9:15 AM",
    type: "shabbat",
    summary:
      "Regular Shabbat morning service with Parashat Acharei Mot-Kedoshim. Followed by a communal kiddush.",
    description: [
      "Regular Shabbat morning service with Parashat Acharei Mot-Kedoshim. Followed by a communal kiddush.",
    ],
  },
  {
    id: "shavuot-2026",
    title: "Shavuot Learning & Services",
    date: "1 June 2026",
    endDate: "2 June 2026",
    time: "See programme below",
    type: "chag",
    summary:
      "Join us for a special Shavuot programme including Tikkun Leil Shavuot learning and festival services.",
    description: [
      "Join us for a special Shavuot programme including Tikkun Leil Shavuot learning and festival services.",
      "All are welcome to join for the full programme or individual sessions.",
    ],
    schedule: [
      { time: "9:00 PM", activity: "Tikkun Leil Shavuot — learning sessions" },
      { time: "6:30 AM", activity: "Sunrise Shacharit" },
      { time: "9:15 AM", activity: "Shavuot Shacharit & Musaf" },
      { time: "12:30 PM", activity: "Communal Kiddush Lunch" },
    ],
    booking: {
      googleAppsScriptUrl: "PLACEHOLDER_URL",
      capacity: 80,
      spotsRemaining: 80,
      fields: [
        ...defaultBookingFields,
        {
          name: "mealPreference",
          label: "Which meals will you be joining?",
          type: "select",
          options: [
            "Kiddush Lunch only",
            "All meals",
            "Not staying for meals",
          ],
        },
      ],
    },
    payment: {
      amount: "£18 per person / £45 per family",
      bankDetails: {
        accountName: "PLACEHOLDER_ACCOUNT_NAME",
        sortCode: "XX-XX-XX",
        accountNumber: "XXXXXXXX",
        reference: "SHAVUOT26-[SURNAME]",
      },
      notes:
        "Please pay within 7 days of booking to secure your place. Under-18s are free.",
    },
  },
  {
    id: "community-shabbaton-summer-2026",
    title: "Community Shabbaton",
    date: "Summer 2026 (TBC)",
    type: "special",
    summary:
      "An expanded Shabbat programme including Friday night dinner, Shabbat services, learning, and communal lunch.",
    description: [
      "An expanded Shabbat programme including Friday night dinner, Shabbat services, learning, and communal lunch.",
      "Details and booking will be announced closer to the date.",
    ],
  },
];

export function getEventById(id: string): KolRinaEvent | undefined {
  return events.find((e) => e.id === id);
}

export function getUpcomingEvents(): KolRinaEvent[] {
  return events;
}

export const typeStyles: Record<
  EventType,
  { dot: string; label: string }
> = {
  shabbat: { dot: "bg-kr-navy", label: "Shabbat" },
  chag: { dot: "bg-kr-gold", label: "Chag" },
  special: { dot: "bg-kr-teal", label: "Special Event" },
  social: { dot: "bg-kr-coral", label: "Social" },
  learning: { dot: "bg-kr-jade", label: "Learning" },
};
