CREATE TABLE IF NOT EXISTS "member" (
    id INTEGER PRIMARY KEY ASC,
    displayName TEXT,
    location TEXT,
    picture TEXT,
    notes TEXT,
    new_notes TEXT,
    treatment TEXT,
    new_treatment TEXT,
    condition_1 TEXT,
    condition_2 TEXT,
    condition_3 TEXT,
    next_step1 TEXT,
    next_step2 TEXT,
    next_step3 TEXT,
    lastStat INTEGER,
    lastStateTimeUTC INTEGER
);

CREATE TABLE IF NOT EXISTS "location" (
    id INTEGER PRIMARY KEY ASC,
    displayName TEXT,
    lat REAL,
    long REAL,
    lastStat INTEGER,
    lastStateTimeUTC INTEGER
);

CREATE TABLE IF NOT EXISTS "odl" (
    id INTEGER PRIMARY KEY ASC,
    displayName TEXT,
    version INTEGER,
    form TEXT,
    lastStat INTEGER,
    lastStateTimeUTC INTEGER
);

CREATE TABLE IF NOT EXISTS "member_odl" (
    id INTEGER PRIMARY KEY ASC,
    odl_id INTEGER,
    member_id INTEGER,
    odl TEXT,
    lastStat INTEGER,
    lastStateTimeUTC INTEGER
);



