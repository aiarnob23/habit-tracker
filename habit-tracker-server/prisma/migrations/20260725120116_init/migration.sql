/*
  Warnings:

  - The values [PHONE_VERIFICATION,PHONE_CHANGE,TWO_FACTOR] on the enum `OTPType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OTPType_new" AS ENUM ('EMAIL_VERIFICATION', 'EMAIL_CHANGE', 'PASSWORD_RESET');
ALTER TABLE "OTP" ALTER COLUMN "type" TYPE "OTPType_new" USING ("type"::text::"OTPType_new");
ALTER TYPE "OTPType" RENAME TO "OTPType_old";
ALTER TYPE "OTPType_new" RENAME TO "OTPType";
DROP TYPE "public"."OTPType_old";
COMMIT;
