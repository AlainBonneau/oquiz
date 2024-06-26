-- Script de migration pour modifier la table user et ajouter le champ role !

BEGIN;

DROP TABLE IF EXISTS role_name;
CREATE TYPE role_name AS ENUM ('member', 'admin');

ALTER TABLE "user" ADD COLUMN "role" role_name NOT NULL DEFAULT 'member';

COMMIT;