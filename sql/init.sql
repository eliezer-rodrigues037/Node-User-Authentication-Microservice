CREATE EXTENSION IF NOT EXISTS "uudi-ossp"
CREATE EXTENSION IF NOT EXISTS "pgcrypto"

CREATE TABLE IF NOT EXISTS application_user (
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

INSERT INTO application_user ( username, password) VALUES ('admin', crypt('admin', '46c80be9e2805730fb9b1eb2f20d829cda256564'));