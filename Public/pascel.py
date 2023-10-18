n=int(input("enter Any number"))
c=1
for i in range (1,n+1):
    for j in range (1,(n-i)+1):
        print(" ",end="")
    for j in range(0,i):
        if j==0 or i==0:
            c=1
        else:
            c=c*(i-j)//j
        print(' ',c,sep=" ",end="")
    print()  