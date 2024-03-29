CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'sam1234';
GRANT SELECT, INSERT, UPDATE ON nipa_test.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;

-- DB_USER= test_user
-- DB_PASSWORD= sam1234
-- DB_NAME= nipa_test