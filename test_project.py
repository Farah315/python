import pytest
from project import encrypt_password, decrypt_password, generate_strong_password
from cryptography.fernet import Fernet

# Test that generate_strong_password generates a password with correct properties
def test_generate_strong_password():
    password = generate_strong_password(16)
    assert len(password) == 16, "Generated password should be the specified length"
    assert any(char.isdigit() for char in password), "Password should contain at least one digit"
    assert any(char.isupper() for char in password), "Password should contain at least one uppercase letter"
    assert any(char.islower() for char in password), "Password should contain at least one lowercase letter"
    assert any(char in '!@#$%^&*()-_=+[{]}|;:,<.>/?' for char in password), "Password should contain at least one special character"

# Test that encrypt_password and decrypt_password work correctly
def test_encrypt_decrypt_password():
    key = Fernet.generate_key()
    password = "SecurePassword123!"
    encrypted_password = encrypt_password(password, key)
    decrypted_password = decrypt_password(encrypted_password, key)
    assert password == decrypted_password, "Decrypted password should match the original"

# Test decrypting with a wrong key raises an exception
def test_decrypt_with_wrong_key():
    key = Fernet.generate_key()
    wrong_key = Fernet.generate_key()
    password = "SecurePassword123!"
    encrypted_password = encrypt_password(password, key)
    
    with pytest.raises(Exception):
        decrypt_password(encrypted_password, wrong_key)
