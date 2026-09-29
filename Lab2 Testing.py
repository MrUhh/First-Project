#Program 1
def repeat(x,y,n):
    a = (x + ''+ y)*n
    return a

#Program 2
import math
def roots(a,b,c):
    if a > 0 or a < 0:
        delta = (b**2 - 4*a*c)
        if delta >= 0:
            answer1 = (-b + (math.sqrt(delta)))/2*a
            answer2 = (-b - (math.sqrt(delta)))/2*a
            print('the quadratics equation with coefficients a =', a , 'b =', b, 'c =', c, 'has the following solutions:', answer1, 'and', answer2)
        else:
            print('There is no real root for the quadratic function')
    else:
        print('this is not a quadratic equation')
#Program 3
def real_roots(a,b,c):
    delta = (b**2 - 4*a*c)
    r1 = delta >= 0
    print(r1)

#Program 4
def reverse(x):
    reverse = (((x%10)*10)+(x//10))
    return reverse
