-- Update profile table to remove github, linkedin, and twitter columns
-- and add missing columns to match the TypeScript interface

-- Add missing columns if they don't exist
ALTER TABLE profile 
ADD COLUMN IF NOT EXISTS facebook TEXT,
ADD COLUMN IF NOT EXISTS location TEXT;

-- Remove github, linkedin, and twitter columns
ALTER TABLE profile 
DROP COLUMN IF EXISTS github,
DROP COLUMN IF EXISTS linkedin,
DROP COLUMN IF EXISTS twitter;

-- Update the default profile data to match new schema
UPDATE profile SET 
  facebook = 'https://www.facebook.com/raijin.offi',
  location = 'Philippines'
WHERE id = (SELECT id FROM profile LIMIT 1);
