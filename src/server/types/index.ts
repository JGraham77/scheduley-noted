type SERIAL = number;
type VARCHAR = string;
type CHAR = string;
type SMALLINT = 0 | 1;
type DATETIME = Date | string;

export interface User {
    id: SERIAL;
    name: VARCHAR; // UNIQUE
    email: VARCHAR; // UNIQUE
    emailVerified: SMALLINT; // DEFAULT 0
    phone: VARCHAR;
    phoneVerified: SMALLINT; // DEFAULT 0
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

export interface Payload {
    id: User["id"];
}
