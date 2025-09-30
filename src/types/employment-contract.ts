export interface EmploymentContract {
    id: string
    employeeId: string
    typeOfWorkTh: string
    typeOfWorkEn: string
    incomePerDay: number
    payIncomeDate: number
    periodOfEmployment: number
    workingHourLimit: number
    workingDayPerWeek: number
    daysOffWeeklyTh: string
    daysOffWeeklyEn: string
    daysOffHolidayTh: string
    daysOffHolidayEn: string
    daysAnnualLeaveTh: string
    daysAnnualLeaveEn: string
    overtimeRateTh: string
    overtimeRateEn: string
    holidayOvertimeRateTh: string
    holidayOvertimeRateEn: string
    createdAt: Date
}