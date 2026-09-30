applications = []
def show_applications():
    Company_name = input('Company Name:')
    Position = input("Applied Position:")
    Location = input('Location:')
    Status = input('Status:')
    Salary = float(input('Hourly Salary:'))
    while True:
        Remote = input('Is this position remote: (Yes/No/Hybrid)').strip().lower()
        if Remote in ('yes','no','hybrid'):
            break
        print('Invalid Value, Please try again')
    application = {
        "Company": Company_name,
        "Position": Position,
        "Location": Location,
        "Status": Status,
        "Hourly Salary": Salary,
        "Remote:": Remote
    }
    applications.append(application)
def view_application():
    print('========Application Form=========')
    for application in applications:
        print('Company Name:', application['Company'])
        print('Position:', application['Position'])
        print('Location:', application['Location'])
        print('Status:', application['Status'])
        print('Salary:', application['Hourly Salary'], 'per hour')
        if application['Hourly Salary'] <= 23:
            print("Low Salaray")
        elif application['Hourly Salary'] > 23 and application['Hourly Salary'] < 25:
            print('Average Wage')
        else:
            print('High Salary')
        if application["Remote:"] == "yes":
            print('This Position is remote')
        elif application["Remote:"] == 'no':
            print('This position is in-person')
        elif application['Remote:'] ==  'hybrid':
            print('This position is both remote and in-person')
        else:
            print('Error...')
        print('=================================')
def show_menu():
    print('1.Add Application')
    print('2.View Application')
    print('3.Update Status')
    print('4.Search Company')
    print('5.Delete Application')
    print('6.View Status')
    print('7.Exit')
    Pick = int(input('Make a choice:'))
    return Pick
while True:
    User_choice = show_menu()
    if User_choice == 1:
        show_applications()
    elif User_choice== 2:
        view_application()
    elif User_choice == 7:
        break
    else:
        print('Invalid Input')
