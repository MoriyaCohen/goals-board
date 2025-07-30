// utils/salaryCalculator.js

export const calculateSalary = (baseSalary, hoursWorked, bonus, overtimeHours) => {
    const overtimeRate = 1.5; // שיעור שעות נוספות
    const overtimePay = overtimeHours * (baseSalary / 160) * overtimeRate; // נחשב את תוספת השעות הנוספות
    const totalSalary = baseSalary + bonus + overtimePay;
  
    return {
      baseSalary,
      hoursWorked,
      bonus,
      overtimeHours,
      overtimePay,
      totalSalary
    };
  };
  