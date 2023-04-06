function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(employeeArray => createEmployeeRecord(employeeArray))
  }
  
  // Function to add a timeIn event to an employee's record of timeInEvents
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ')
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    })
  
    return employeeRecord
  }
  
  // Function to add a timeOut event to an employee's record of timeOutEvents
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ')
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    })
  
    return employeeRecord
  }
  
  // Function to calculate hours worked between a timeIn and timeOut event
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
  
    return hoursWorked
  }
  
  // Function to calculate wages earned by an employee on a given date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const wagesEarned = hoursWorked * employeeRecord.payPerHour
  
    return wagesEarned
  }
  
  // Function to calculate all wages an employee earned
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date)
  
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date)
    }, 0)
  
    return totalWages
  }
  
  // Function to calculate all wages for all employees
  function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord)
    }, 0)
  
    return totalWages
  }
