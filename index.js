// Your code here
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }


}

function createEmployeeRecords(employeeData){
    return employeeData.map(function(row){
        return createEmployeeRecord(row)

    })

}


function createTimeInEvent(employee, dateStamp){
    let [date, hour ] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10 ),
        date
    })

    return employee

}

function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })

    return employee

}

function hoursWorkedOnDate(employee, date){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === date

    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date

    })

    return(outEvent.hour - inEvent.hour)/ 100
    

        
}

function wagesEarnedOnDate(employee, earnedDate){
    let rawWage = hoursWorkedOnDate(employee, earnedDate) * employee.payPerHour

    return parseFloat(rawWage.toString())



}

function allWagesFor(employee){
    let workedDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = workedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable

}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(record){
        return record.firstName === firstName

    })

}

function calculatePayroll(records){
    return records.reduce(function(memo, rec){
        return memo + allWagesFor(rec)

    }, 0)

}