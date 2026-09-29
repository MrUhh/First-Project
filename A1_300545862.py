#First Name: Huy Vu
#Family Name: Nguyen
#Student Number: 300545862
#Course: ITI 1120
# Assignment: 1
#year: 2026

#Section 1:
#1 Km/h = m/s times 1.60934
import math
def mh2kh(s):
    mh2kh = s*1.60934
    return mh2kh
#2 The Pythagorean Pair mean c = intergers
import math
def pythagorean_pair(a,b):
    c = math.sqrt(a**2 + b**2)
    return c == int(c)
#3 Inside the square = between xs and xs + side or x initial and x final
def in_out(xs,ys,side):
    x = float(input('enter x coordinate'))
    y = float(input('enter y coordinate'))
    print(bool(xs <= x <= xs + side and ys <= y <= ys + side))
#4
def safe(n):
    if 0 <= n <= 100:
        if n%10 != 9 or n//10 != 9:
            print(bool(n))
    else:
        print('invalid number')
#5
def quote_maker(quote,name,year):
    print('in', year,',a person called',name,'said',quote)

#6
def quote_displayer():
    def quote_maker(quote,name,year):
        print('in', year,',a person called',name,'said:',quote)
    quote = input('Give me a quote')
    name = input('Who said that?')
    year = int(input('What year did the person say that?'))
    return quote_maker(quote,name,year)

#7
def rps_winner():
    print('What choices did player 1 make?')
    p1 = input('Pick one between rock, paper, scissors:')
    print('What choices did player 2 make?')
    p2 = input('Pick one between rock, paper, scisoors:')
    if p1 and p2 in ('rock','paper','scissors'):
        if p1 == p2:
            print('Draw')
        elif ((p1 == 'rock' and p2 == 'scissors' or p1 =='paper' and p2 =='rock' or p1 == 'scissors' and p2 == 'paper')):
            print('Player 1 Win')
        else:
            print('Player 2 Win')

#8 
import math
def fun(x):
    y = (math.log10(x+3))/4
    return y
#9
def ascii_name_plaque(name):
    print('*' * (len(name) + 10))
    print('*', ' ' * (len(name) + 5), ' *')
    print('* __', name ,'__ *')
    print('*', ' ' * (len(name) + 5), ' *')
    print('*' * (len(name) + 10))

#10
import turtle
def draw_house():
    t=turtle.Turtle()

    #body
    t.forward(200)
    t.backward(400)
    t.left(90)
    t.forward(200)
    t.left(90)
    t.forward(50)
    t.right(135)
    t.forward(200)
    t.right(90)
    t.forward(200)
    t.left(45)
    t.forward(165)
    t.left(135)
    t.forward(200)
    t.left(45)
    t.forward(165)

    #move
    t.up()
    t.goto(175,0)
    t.pendown()
    t.setheading(90)
    t.forward(200)

    #move2
    t.up()
    t.goto(50,0)
    t.pendown()
    t.setheading(90)
    t.forward(200)

    #door
    t.up()
    t.goto(-50,0)
    t.pendown()
    t.fillcolor('brown')
    t.begin_fill()
    t.setheading(90)
    t.forward(150)
    t.left(90)
    t.forward(75)
    t.left(90)
    t.forward(150)
    t.end_fill()
    
    #window
    t.up()
    t.goto(-125,200)
    t.pendown()
    t.fillcolor('lightblue')
    t.begin_fill()
    t.circle(30)
    t.end_fill()

#11
import math
def alogical(n):
    alogical = math.ceil(math.log2(n))
    return alogical
#12
import math
def cad_cashier(price,payment):
    if payment >= price:
        changes = payment - price
        return round(round(changes * 20)/20,2)
    else:
        print('not enough money')

#13
def min_CAD_coins(price,payment):
    changes = cad_cashier(price,payment)
    cents = changes * 100
    
    toonies = cents // 200
    cents = cents - toonies*200
    loonies = cents // 100
    cents = cents - loonies*100
    quaters = cents // 25
    cents = cents - quaters*25
    Dime = cents // 10
    cents = cents - Dime*10
    Nickel = cents // 5
    cents = cents - Nickel*5
    return (toonies,loonies,quaters,Dime,Nickel)
    
    
            
            
    
    
    

    
    
