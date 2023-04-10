CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE users (
	"id" serial NOT NULL,
	"email" varchar(30) NOT NULL UNIQUE,
	"password" varchar(100) NOT NULL,
	"is_admin" bool NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE points (
	"id" serial NOT NULL,
	"name" varchar(150) NOT NULL,
	"geom" geometry NOT NULL,
	CONSTRAINT "points_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE polygons (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"geom" geometry NOT NULL,
	CONSTRAINT "polygons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

INSERT INTO users (email, password, is_admin) VALUES ('admin@admin.com', '123456', true);
