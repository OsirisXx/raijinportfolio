-- Clear existing projects (optional - remove this if you want to keep existing projects)
-- DELETE FROM projects;

-- Insert all projects
INSERT INTO projects (title, description, tech_stack, featured, order_index) VALUES
('Student Attendance System', 
'A comprehensive attendance tracking system featuring auto-generated QR codes for students, real-time attendance status updates, admin scanner functionality, attendee list management, live count tracking, CSV export capabilities, and super admin controls for event management.',
ARRAY['PostgreSQL', 'Express.js', 'React', 'Node.js', 'Supabase'],
true, 1),

('Tourist Spot Management System', 
'A comprehensive system for managing tourist locations, bookings, and reviews. Features include user authentication, booking management, and review system.',
ARRAY['HTML', 'Cascading Style Sheets', 'JavaScript', 'MySQL'],
true, 2),

('Vendor App Management', 
'Mobile application for vendors to manage their inventory and sales',
ARRAY['HTML', 'Cascading Style Sheets', 'JavaScript', 'MySQL'],
false, 3),

('Movie Rating App', 
'Social platform for movie enthusiasts to rate and review films',
ARRAY['React Native', 'Cascading Style Sheets', 'JavaScript', 'HTML', 'Firebase'],
true, 4),

('LDCU Games Management System', 
'System for managing sports events and tournament schedules',
ARRAY['HTML', 'Cascading Style Sheets', 'JavaScript', 'MySQL'],
false, 5),

('LDCU Tabulation System', 
'Digital scoring and tabulation system for competitions and events',
ARRAY['HTML', 'Cascading Style Sheets', 'JavaScript', 'MySQL'],
false, 6);

