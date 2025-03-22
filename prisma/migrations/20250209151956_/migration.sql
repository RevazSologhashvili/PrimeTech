-- DropIndex
DROP INDEX "Service_id_key";

-- AlterTable
CREATE SEQUENCE service_id_seq;
ALTER TABLE "Service" ALTER COLUMN "id" SET DEFAULT nextval('service_id_seq');
ALTER SEQUENCE service_id_seq OWNED BY "Service"."id";
