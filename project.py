import sqlite3
import random
import string
import os
from cryptography.fernet import Fernet

# Function to generate and save encryption key
def generate_and_save_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

# Ensure the key file exists
if not os.path.exists("secret.key"):
    generate_and_save_key()

# Load encryption key
def load_key():
    return open("secret.key", "rb").read()

# Password encryption and decryption
def encrypt_password(password, key):
    f = Fernet(key)
    return f.encrypt(password.encode())

def decrypt_password(encrypted_password, key):
    f = Fernet(key)
    return f.decrypt(encrypted_password).decode()

# Generate a strong password
def generate_strong_password(length=16):
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))

# Database Management
def create_db():
    with sqlite3.connect("passwords.db") as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS passwords
                        (account TEXT PRIMARY KEY, password TEXT)''')

# Save password to database
def save_password_to_db(account, encrypted_password):
    with sqlite3.connect("passwords.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM passwords WHERE account = ?", (account,))
        if cursor.fetchone():
            print("This account already exists. Try again.")
        else:
            conn.execute("INSERT INTO passwords (account, password) VALUES (?, ?)", (account, encrypted_password))
            print(f"Password for account '{account}' has been saved.")

# Load all stored passwords
def load_passwords_from_db():
    with sqlite3.connect("passwords.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT account, password FROM passwords")
        return cursor.fetchall()

# Delete a password from the database
def delete_password(account):
    with sqlite3.connect("passwords.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM passwords WHERE account = ?", (account,))
        if cursor.rowcount > 0:
            print(f"Password for account '{account}' has been deleted.")
        else:
            print("Account not found.")


def main():
    key = load_key()
    create_db()

    while True:
        print("\n=== Password Manager ===")
        print("Generate new password")
        print("Show stored passwords")
        print(" Delete a password")
        print(" Save a password")
        print(" Exit")
        
        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            account = input("Enter account name: ")
            password = generate_strong_password()
            encrypted_password = encrypt_password(password, key)
            save_password_to_db(account, encrypted_password)
            print(f"Generated password for '{account}': {password}")

        elif choice == '2':
            print("\nStored Passwords:")
            passwords = load_passwords_from_db()
            if passwords:
                for account, encrypted_password in passwords:
                    decrypted_password = decrypt_password(encrypted_password, key)
                    print(f"🔹 {account}: {decrypted_password}")
            else:
                print("No passwords stored.")

        elif choice == '3':
            account = input("Enter the account name to delete: ")
            delete_password(account)

        elif choice == '4':
            account = input("Enter account name: ")
            password = input("Enter password to save: ")
            encrypted_password = encrypt_password(password, key)
            save_password_to_db(account, encrypted_password)

        elif choice == '5':
            print("Exiting... Goodbye!")
            break

        else:
            print("Invalid choice. Please enter a number between 1 and 5.")

if __name__ == "__main__":
    main()
