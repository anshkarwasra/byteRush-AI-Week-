def fibunacchi(n):
    return fibunacchi(n) + fibunacchi(n-1)


def factorial(n):
    if n==1:
        return 1
    return n * factorial(n-1)

