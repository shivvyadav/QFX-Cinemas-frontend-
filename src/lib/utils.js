export function YearExtract(date) {
  if (typeof date !== "string" || !date.includes("-")) {
    return null;
  }
  return date.split("-")[0];
}

export function ActualTime(time) {
  let hours = Math.floor(time / 60);
  let minutes = time % 60;
  return `${hours}hr ${minutes}min`;
}

export function ExtractGenre(genres) {
  let length = genres.length;
  if (length === 0) return "";
  if (length === 1) return genres[0];
  if (length === 2) return genres[0] + " & " + genres[1];
  if (length > 2) return genres[0] + ", " + genres[1] + " & More";
}

export function FormatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // "Oct"
  return { day, month };
}
export function FormatTime(timeString) {
  const [hour, minute] = timeString.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12; // convert 0 to 12
  return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export function TicketRate() {
  const data = [
    {
      day: "SUN",
      morningSofa: 300,
      morningRecliner: 250,
      afternoonSofa: 500,
      afternoonRecliner: 440,
    },
    {
      day: "MON",
      morningSofa: 250,
      morningRecliner: 200,
      afternoonSofa: 250,
      afternoonRecliner: 200,
    },
    {
      day: "TUE",
      morningSofa: 250,
      morningRecliner: 250,
      afternoonSofa: 350,
      afternoonRecliner: 250,
    },
    {
      day: "WED",
      morningSofa: 250,
      morningRecliner: 250,
      afternoonSofa: 350,
      afternoonRecliner: 250,
    },
    {
      day: "THU",
      morningSofa: 300,
      morningRecliner: 250,
      afternoonSofa: 350,
      afternoonRecliner: 300,
    },
    {
      day: "FRI",
      morningSofa: 300,
      morningRecliner: 250,
      afternoonSofa: 500,
      afternoonRecliner: 440,
    },
    {
      day: "SAT",
      morningSofa: 300,
      morningRecliner: 250,
      afternoonSofa: 500,
      afternoonRecliner: 440,
    },
  ];

  return data;
}
