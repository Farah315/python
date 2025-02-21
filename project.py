import sqlite3
import random
import string
from cryptography.fernet import Fernet

# Generate a strong password
def generate_strong_password(length=16):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(random.choice(characters) for i in range(length))
    return password

# Encryption and Decryption
def load_key():
    return open("secret.key", "rb").read()

def encrypt_password(password, key):
    f = Fernet(key)
    encrypted_password = f.encrypt(password.encode())
    return encrypted_password

def decrypt_password(encrypted_password, key):
    f = Fernet(key)
    decrypted_password = f.decrypt(encrypted_password).decode()
    return decrypted_password

# Database Management
def create_db():
    with sqlite3.connect("passwords.db") as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS passwords
                        (account TEXT PRIMARY KEY, password TEXT)''')

def save_password_to_db(account, password):
    try:
        with sqlite3.connect("passwords.db") as conn:
            # Check if the account already exists
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM passwords WHERE account = ?", (account,))
            existing_account = cursor.fetchone()
            
            if existing_account:
                print("This account already exists. Try again.")
            else:
                conn.execute("INSERT INTO passwords (account, password) VALUES (?, ?)", (account, password))
                print(f"Password for account {account} has been saved to the database.")
    except sqlite3.Error as e:
        print(f"Database error: {e}")

def load_passwords_from_db():
    with sqlite3.connect("passwords.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT account, password FROM passwords")
        return cursor.fetchall()

def delete_password(account):
    with sqlite3.connect("passwords.db") as conn:
        conn.execute("DELETE FROM passwords WHERE account = ?", (account,))
        print(f"Password for account {account} has been deleted from the database.")

# Main Program
def main():
    key = load_key()
    create_db()

    while True:
        print("\nPlease choose an option:")
        print("1. Generate new password")
        print("2. Show stored passwords (JSON)")
        print("3. Show stored passwords (Database)")
        print("4. Delete a password")
        print("5. Save password to database")
        print("6. Exit")

        choice = input("Enter your choice (1-6): ")

        if choice == '1':
            account = input("Enter the account name: ")
            password = generate_strong_password()
            encrypted_password = encrypt_password(password, key)
            save_password_to_db(account, encrypted_password)
            print(f"A new password has been generated for account: {account}")

        elif choice == '2':
            print("Showing all stored passwords (JSON):")
            passwords = load_passwords_from_db()
            for account, encrypted_password in passwords:
                decrypted_password = decrypt_password(encrypted_password, key)
                print(f"Account: {account} - Password: {decrypted_password}")

        elif choice == '3':
            print("Showing all stored passwords (Database):")
            passwords = load_passwords_from_db()
            for account, encrypted_password in passwords:
                decrypted_password = decrypt_password(encrypted_password, key)
                print(f"Account: {account} - Password: {decrypted_password}")

        elif choice == '4':
            account = input("Enter the account name to delete: ")
            delete_password(account)

        elif choice == '5':
            account = input("Enter the account name: ")
            password = input("Enter the password to save: ")
            encrypted_password = encrypt_password(password, key)
            save_password_to_db(account, encrypted_password)  # Check if the account exists
            print(f"Password for {account} has been saved to the database.")

        elif choice == '6':
            print("Exiting program...")
            break

        else:
            print("Invalid choice. Please enter a number between 1 and 6.")

if __name__ == "__main__":
    main()
