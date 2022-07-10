CREATE TABLE users (
    user_id       SERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    active        BOOL NOT NULL DEFAULT TRUE
);

CREATE INDEX users_email_index ON users (email);
