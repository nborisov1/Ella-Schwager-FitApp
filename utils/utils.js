
export function formatDuration(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000); 
    const minutes = Math.floor(totalSeconds / 60); 
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
  }
  
export const translateDayToHebrew = (day) => {
  const daysMap = {
    Sunday: "ראשון",
    Monday: "שני",
    Tuesday: "שלישי",
    Wednesday: "רביעי",
    Thursday: "חמישי",
    Friday: "שישי",
    Saturday: "שבת",
  }  
  return daysMap[day] || day;
}