-- Insert queries for portfolio projects
-- Based on project descriptions and images

INSERT INTO projects (title, description, image_url, tech_stack, live_url, github_url, featured, order_index) VALUES
(
  'The Garden Journey',
  'A beginner-friendly gardening website featuring guides, plant types, tools, seasonal tips, and resources. The landing page includes an engaging hero section with a call-to-action to help users start their gardening journey.',
  '/images/projects/garden-journey.jpg',
  ARRAY['HTML', 'CSS', 'JavaScript'],
  NULL,
  NULL,
  false,
  0
),
(
  'Growbster',
  'An underwater-themed game developed in Scratch featuring a playful lobster character navigating through coral reefs. Players embark on an aquatic adventure with colorful graphics and engaging gameplay.',
  '/images/projects/growbster.jpg',
  ARRAY['Scratch'],
  NULL,
  NULL,
  false,
  1
),
(
  'Menu Management System',
  'A comprehensive restaurant menu management dashboard built with PHP and MySQL. Features include order tracking, user management, revenue analytics, and real-time order updates for efficient restaurant operations.',
  '/images/projects/menu-management.jpg',
  ARRAY['PHP', 'MySQL', 'CSS'],
  NULL,
  NULL,
  false,
  2
),
(
  'The Vanguard',
  'A news and article platform showcasing campus journalism. Features breaking news, opinion pieces, sports coverage, and editorial content with a modern design focused on student journalism.',
  '/images/projects/the-vanguard.jpg',
  ARRAY['HTML', 'CSS', 'JavaScript'],
  NULL,
  NULL,
  false,
  3
),
(
  'Scholarium',
  'FCA Scholarship Management System - A complete platform for managing scholarship applications, tracking student records, and handling administrative processes. Built with CodeIgniter framework and features secure login functionality.',
  '/images/projects/scholarium.jpg',
  ARRAY['PHP', 'CodeIgniter', 'Tailwind CSS'],
  NULL,
  NULL,
  true,
  4
),
(
  'Flashcard Generator',
  'An interactive flashcard creation tool that helps students and learners create, manage, and study with custom flashcards. Features user authentication and flashcard generation to enhance learning experiences.',
  '/images/projects/flashcard-generator.jpg',
  ARRAY['Next.js', 'Tailwind CSS', 'MongoDB'],
  NULL,
  NULL,
  false,
  5
),
(
  'LakbayViahero',
  'A traveling agency website showcasing tropical destinations and travel services. Features a beautiful hero section with beach imagery, service listings, and booking functionality for travel enthusiasts.',
  '/images/projects/lakbayviahero.jpg',
  ARRAY['TypeScript', 'Vite', 'Supabase', 'Resend API'],
  NULL,
  NULL,
  true,
  6
),
(
  'SIAP Document View',
  'A document management viewer built with Google App Script. Enables staff to access, search, and view documents with folder organization, file browsing, and secure access control functionality.',
  '/images/projects/siap-document.jpg',
  ARRAY['Google App Script'],
  NULL,
  NULL,
  false,
  7
);

