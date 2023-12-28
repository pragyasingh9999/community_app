
CREATE DATABASE community_app;
USE community_app;


CREATE TABLE User (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(64) DEFAULT NULL,
  email VARCHAR(128) UNIQUE,
  password VARCHAR(64),
  created_at DATETIME
);


CREATE TABLE Community (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(64),
  slug VARCHAR(255) UNIQUE,
  owner VARCHAR(64),
  created_at DATETIME,
  updated_at DATETIME,
  FOREIGN KEY (owner) REFERENCES User(id)
);

CREATE TABLE Role(
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(64) UNIQUE,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE Member(
  id VARCHAR(64) PRIMARY KEY,
  community VARCHAR(64),
  user VARCHAR(64),
  role VARCHAR(64),
  created_at DATETIME,
  FOREIGN KEY (community) REFERENCES Community(id),
  FOREIGN KEY (user) REFERENCES User(id),
  FOREIGN KEY (role) REFERENCES Role(id)
);