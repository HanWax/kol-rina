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
  /** Total capacity — omit if unlimited */
  capacity?: number;
  /** Spots remaining — auto-decremented on booking */
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
    id: "shabbat-behar-9-may-2026",
    title: "Shabbat Behar",
    date: "9 May 2026",
    time: "9:30 AM",
    location: "HBS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Behar. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Behar. Followed by a communal kiddush.",
    ],
  },
  {
    id: "shavuot-2026",
    title: "Shavuot",
    date: "23 May 2026",
    time: "9:30 AM",
    location: "HBS",
    type: "chag",
    summary:
      "Shavuot Yom Tov morning service followed by a community lunch.",
    description: [
      "Shavuot Yom Tov morning service followed by a community lunch.",
      "All are welcome to join us at HBS to celebrate Shavuot together.",
      "We are delighted that Gila Fine will be joining us to give a shiur after lunch. Gila Fine is an internationally acclaimed Talmud scholar and author of the book 'The Madwoman in the Rabbi's Attic'.",
    ],
    schedule: [
      { time: "9:30 AM", activity: "Shavuot Shacharit & Musaf" },
      { time: "12:30 PM", activity: "Community Lunch" },
    ],
    booking: {
      capacity: 80,
      spotsRemaining: 80,
      fields: [
        ...defaultBookingFields,
        {
          name: "mealPreference",
          label: "Will you be joining the community lunch?",
          type: "select",
          options: [
            "Yes, staying for lunch",
            "Service only",
          ],
        },
      ],
    },
    payment: {
      amount:
        "Members: £15 adult / £8 child / £54 family\nNon-members: £18 adult / £10 child / £66 family",
      bankDetails: {
        accountName: "PLACEHOLDER_ACCOUNT_NAME",
        sortCode: "XX-XX-XX",
        accountNumber: "XXXXXXXX",
        reference: "SHAVUOT26-[SURNAME]",
      },
      notes: "Please pay within 7 days of booking to secure your place.",
    },
  },
  {
    id: "shabbat-chukkat-balak-27-june-2026",
    title: "Shabbat Chukkat-Balak",
    date: "27 June 2026",
    time: "9:30 AM",
    location: "JVS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Chukkat-Balak. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Chukkat-Balak. Followed by a communal kiddush.",
    ],
  },
  {
    id: "tisha-bav-2026",
    title: "Tisha b'Av",
    date: "22 July 2026",
    time: "TBA",
    location: "TBA",
    type: "chag",
    summary: "Reading of Eicha for Tisha b'Av. Time and venue to be announced.",
    description: [
      "Reading of Eicha for Tisha b'Av. Time and venue to be announced.",
    ],
  },
  {
    id: "shabbat-vaetchanan-25-july-2026",
    title: "Shabbat Va'Etchanan",
    date: "25 July 2026",
    time: "9:30 AM",
    location: "HBS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Va'Etchanan. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Va'Etchanan. Followed by a communal kiddush.",
    ],
  },
  {
    id: "rosh-hashanah-2026",
    title: "Rosh Hashanah — 1st Day",
    date: "12 September 2026",
    time: "TBA",
    location: "TBA",
    type: "chag",
    summary:
      "Yom Tov morning service for the first day of Rosh Hashanah. Time and venue to be announced.",
    description: [
      "Yom Tov morning service for the first day of Rosh Hashanah. Time and venue to be announced.",
    ],
  },
  {
    id: "simchat-torah-2026",
    title: "Simchat Torah",
    date: "4 October 2026",
    time: "9:30 AM",
    location: "TBA",
    type: "chag",
    summary: "Yom Tov morning service for Simchat Torah. Venue to be announced.",
    description: [
      "Yom Tov morning service for Simchat Torah. Venue to be announced.",
    ],
  },
  {
    id: "shabbat-chayei-sarah-7-november-2026",
    title: "Shabbat Chayei Sarah",
    date: "7 November 2026",
    time: "9:30 AM",
    location: "HBS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Chayei Sarah. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Chayei Sarah. Followed by a communal kiddush.",
    ],
  },
  {
    id: "shabbat-vayeishev-5-december-2026",
    title: "Shabbat Vayeishev",
    date: "5 December 2026",
    time: "9:30 AM",
    location: "HBS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Vayeishev. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Vayeishev. Followed by a communal kiddush.",
    ],
  },
  {
    id: "shabbat-vayera-9-january-2027",
    title: "Shabbat Vayera",
    date: "9 January 2027",
    time: "9:30 AM",
    location: "HBS",
    type: "shabbat",
    summary:
      "Shabbat morning service for Parashat Vayera. Followed by a communal kiddush.",
    description: [
      "Shabbat morning service for Parashat Vayera. Followed by a communal kiddush.",
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
