import type { Booking } from "./api";

export function bookingsToCSV(bookings: Booking[], eventTitle: string): string {
  if (bookings.length === 0) {
    return "Full Name,Email,Phone,Attendees,Dietary Requirements,Notes\n";
  }

  // Collect all custom field keys to ensure all columns are present
  const customFieldKeys = new Set<string>();
  bookings.forEach((b) => {
    if (b.custom_fields) {
      Object.keys(b.custom_fields).forEach((key) => customFieldKeys.add(key));
    }
  });

  const customFieldsArray = Array.from(customFieldKeys).sort();

  // Header row
  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Attendees",
    "Dietary Requirements",
    "Notes",
    ...customFieldsArray,
  ];

  // Escape CSV values - wrap in quotes if contains comma, newline, or quote
  const escapeCSV = (value: string | null | undefined): string => {
    if (!value) return "";
    const str = String(value);
    if (str.includes(",") || str.includes("\n") || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows: string[] = [headers.join(",")];

  bookings.forEach((booking) => {
    const row = [
      escapeCSV(booking.full_name),
      escapeCSV(booking.email),
      escapeCSV(booking.phone),
      String(booking.number_of_attendees),
      escapeCSV(booking.dietary_requirements),
      escapeCSV(booking.notes),
      ...customFieldsArray.map((field) =>
        escapeCSV(booking.custom_fields?.[field]),
      ),
    ];
    rows.push(row.join(","));
  });

  return rows.join("\n");
}

export function downloadCSV(
  csvContent: string,
  filename: string,
): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the object URL to free memory
  URL.revokeObjectURL(url);
}
