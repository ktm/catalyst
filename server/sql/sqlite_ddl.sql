create table IF NOT EXISTS change_agent (
    _id INTEGER PRIMARY KEY ASC,
    change_agent_id TEXT,
    change_agent_name TEXT
);

CREATE TABLE IF NOT EXISTS member_update (
    _id INTEGER PRIMARY KEY ASC,
    member_id INTEGER,
    display_name TEXT,
    location TEXT,
    picture TEXT,
    notes TEXT,
    treatment TEXT,
    condition_1 TEXT,
    condition_2 TEXT,
    condition_3 TEXT,
    change_agent_id TEXT,
    change_time INTEGER
);

CREATE TABLE member (_id INTEGER PRIMARY KEY ASC,display_name TEXT,location TEXT,picture TEXT,notes TEXT,treatement TEXT,condition_1 TEXT,condition_2 TEXT,condition_3 TEXT,next_step1 TEXT,next_step2 TEXT,next_step3 TEXT);

CREATE INDEX member_location ON member(location ASC);

CREATE TABLE location (_id INTEGER PRIMARY KEY ASC,code TEXT,display_name TEXT,lat INTEGER,long INTEGER);

CREATE TABLE IF NOT EXISTS odl (
    _id INTEGER PRIMARY KEY ASC,
    display_name TEXT,
    version INTEGER,
    form TEXT
);

CREATE TABLE IF NOT EXISTS member_odl (
    _id INTEGER PRIMARY KEY ASC,
    odl_id INTEGER,
    member_id INTEGER,
    odl TEXT,
    created_time INTEGER
);

CREATE TABLE IF NOT EXISTS new_member_odl (
    _id INTEGER PRIMARY KEY ASC,
    odl_id INTEGER,
    member_id INTEGER,
    odl TEXT,
    change_agent_id TEXT,
    change_time INTEGER
);
