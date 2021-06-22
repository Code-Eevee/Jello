# job-tracker
hi this is job tracker =)
pls like and subscribe

CREATE TABLE user_table(
_id SERIAL UNIQUE PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL
)


CREATE TABLE company_table(
_id SERIAL UNIQUE PRIMARY KEY,
user_id int REFERENCES user_table(_id) NOT NULL,
company_name VARCHAR(50) NOT NULL,
status VARCHAR(50) NOT NULL,
contact_name VARCHAR(50) NOT NULL,
contact_email VARCHAR(100) NOT NULL,
application_type VARCHAR(50) NOT NULL,
application_date DATE NOT NULL,
outcomes VARCHAR(50) NOT NULL,
notes VARCHAR(2000) NOT NULL
)

CREATE TABLE events_table(
_id SERIAL UNIQUE PRIMARY KEY,
company_id int REFERENCES company_table(_id) NOT NULL,
event_type VARCHAR(150) NOT NULL,
position_type VARCHAR(150) NOT NULL,
date DATE NOT NULL,
interviewer_name VARCHAR(100) NOT NULL,
interviewer_email VARCHAR(100) NOT NULL,
notes VARCHAR(2000) NOT NULL
)