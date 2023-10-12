type SERIAL = number;
type VARCHAR = string;
type CHAR = string;
type SMALLINT = 0 | 1;
type DATETIME = Date | string;

export interface User {
    id: SERIAL;
    name: VARCHAR; // UNIQUE
    email: VARCHAR; // UNIQUE
    email_verified: SMALLINT; // DEFAULT 0
    phone: VARCHAR;
    phone_verified: SMALLINT; // DEFAULT 0
    mfa_preference: "none" | "email" | "phone";
    password: CHAR; // 60
    created_at: DATETIME;
    image_url: VARCHAR;
}

export interface Event {
    id: SERIAL;
    user_id: User["id"];
    name: VARCHAR;
    description: VARCHAR;
    datetime: DATETIME;
}
