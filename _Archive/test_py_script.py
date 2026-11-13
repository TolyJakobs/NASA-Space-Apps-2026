# Write a Python program that asks the user for two numbers, adds them together, and displays the result.

def getUserNum():
    user_input1 = int("Enter a number: ")
    user_input2 = int("Enter a number: ")
    result = (user_input1 + user_input2)
    return result

def main():
    result = getUserNum()
    print ("Result", result)

if __name__ == "__main__":
    main()
    
