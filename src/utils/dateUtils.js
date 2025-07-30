// utils/dateUtils.js

export const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // מחזיר תאריך בפורמט YYYY-MM-DD
  };
  
  export const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    return days[d.getDay()];
  };
  
  export const calculateWorkingDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
  
    for (let current = start; current <= end; current.setDate(current.getDate() + 1)) {
      if (current.getDay() !== 0 && current.getDay() !== 6) { // אם זה לא יום שבת או ראשון
        count++;
      }
    }
  
    return count;
  };
  