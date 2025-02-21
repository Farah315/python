## 🚀 Project Overview  
The **Password Manager** is a secure and user-friendly command-line tool built using Python. It helps users generate, encrypt, store, and manage passwords securely, leveraging robust encryption techniques.  

---

## 🛠 Features  
- 🔑 **Secure Password Encryption:** Encrypts passwords using `cryptography.Fernet`.  
- 🎲 **Strong Password Generation:** Generates complex passwords with uppercase, lowercase, digits, and special characters.  
- 🗄️ **Database Storage:** Stores passwords securely in an SQLite database.  
- 🗑️ **Password Deletion:** Easily delete stored passwords.  
- 🖥️ **User-Friendly CLI:** Intuitive command-line interface for password operations.

---

## 🏗 Project Structure  

- **`project.py`:**  
  - The main application file containing core functions and the command-line interface.  
  - Key Functions:
    - `generate_key()`: Creates a secure encryption key.
    - `encrypt_password(password, key)`: Encrypts a given password.
    - `decrypt_password(encrypted_password, key)`: Decrypts an encrypted password.
    - `generate_strong_password(length)`: Generates strong, customizable-length passwords.
    - Database operations for saving, viewing, and deleting passwords.

- **`test_project.py`:**  
  - Comprehensive unit tests using `pytest`.  
  - Key test cases include:
    - `test_generate_key()`: Validates key generation.
    - `test_encrypt_decrypt_password()`: Ensures encryption and decryption accuracy.
    - `test_generate_strong_password()`: Verifies password complexity and length.

- **`requirements.txt`:**  
  - Dependencies required for the project:  
    ```
    cryptography
    pytest
    ```

---

## 💻 Usage  

### 1️⃣ Install Dependencies  
```bash
pip install -r requirements.txt
```

### 2️⃣ Run the Application  
```bash
python project.py
```

### 3️⃣ Available Options:  
1. Generate a new password  
2. View stored passwords (Decrypted)  
3. View stored passwords (Database)  
4. Delete a password  
5. Save a password  
6. Exit  

### 🧪 Run Tests  
```bash
pytest test_project.py
```

---

## 🔐 Security Note  
- Keep your `secret.key` file secure; it is essential for encrypting and decrypting your passwords.  
- Regularly update your passwords for better security.  
 
# 🔐 Password Manager  

#### Enjoy and stay secure with Farah 🐈
