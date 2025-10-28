-- Clear existing skills (optional - remove this if you want to keep existing skills)
-- DELETE FROM skills;

-- Clear existing skills (optional - remove this if you want to keep existing skills)
-- DELETE FROM skills;

-- Insert all skills in a single statement
INSERT INTO skills (name, category, proficiency_level, order_index) VALUES
-- Frontend & UI/UX Skills
('HTML5', 'Frontend & UI/UX', 5, 1),
('CSS', 'Frontend & UI/UX', 5, 2),
('JavaScript', 'Frontend & UI/UX', 5, 3),
('TypeScript', 'Frontend & UI/UX', 4, 4),
('React', 'Frontend & UI/UX', 5, 5),
('Redux', 'Frontend & UI/UX', 4, 6),
('Next.js', 'Frontend & UI/UX', 5, 7),
('React Native', 'Frontend & UI/UX', 4, 8),

-- Backend & Data Skills
('Google Apps Script', 'Backend & Data', 3, 9),
('PHP', 'Backend & Data', 4, 10),
('Laravel', 'Backend & Data', 4, 11),
('Node.js', 'Backend & Data', 5, 12),
('Express.js', 'Backend & Data', 4, 13),
('RESTful APIs', 'Backend & Data', 5, 14),
('PostgreSQL', 'Backend & Data', 4, 15),
('MySQL', 'Backend & Data', 4, 16),
('Supabase', 'Backend & Data', 5, 17),
('Firebase', 'Backend & Data', 4, 18),
('Git', 'Backend & Data', 5, 19),
('Python', 'Backend & Data', 4, 20),
('Java', 'Backend & Data', 3, 21),
('Spring Boot', 'Backend & Data', 3, 22),
('C', 'Backend & Data', 3, 23),
('C#', 'Backend & Data', 3, 24),
('Dart', 'Backend & Data', 3, 25),
('Kotlin', 'Backend & Data', 3, 26),
('VB (Visual Basic)', 'Backend & Data', 2, 27),

-- AI Integration & Automation
('Chatbot Integration', 'AI Integration & Automation', 4, 28),
('OpenAI API / GPT', 'AI Integration & Automation', 4, 29),

-- Educational & Visual Dev
('MIT App Inventor', 'Educational & Visual Dev', 4, 30),
('Scratch', 'Educational & Visual Dev', 4, 31),
('Tinkercad', 'Educational & Visual Dev', 3, 32),

-- Extra Services
('Deployment', 'Extra Services', 4, 33),
('APK Bundling / Packaging', 'Extra Services', 3, 34),
('ERD Diagrams', 'Extra Services', 4, 35);
