-- Clear existing experiences (optional - remove this if you want to keep existing experiences)
-- DELETE FROM experiences;

-- Insert experience journey from 2018
INSERT INTO experiences (company, position, description, start_date, end_date, order_index) VALUES
('Self-Learning Journey', 'Programming Enthusiast', 
'Started my programming journey with HTML, CSS, and JavaScript. Built my first websites and learned the fundamentals of web development. Explored basic programming concepts and created simple interactive web pages.',
'2018-01-01', '2018-12-31', 1),

('Frontend Development', 'Web Developer', 
'Advanced my frontend skills with React and modern JavaScript. Learned component-based architecture, state management, and responsive design. Created dynamic web applications with interactive user interfaces.',
'2019-01-01', '2019-12-31', 2),

('Full-Stack Development', 'Full-Stack Developer', 
'Expanded into backend development with Node.js and Express.js. Learned database design with MySQL and PostgreSQL. Built complete web applications with RESTful APIs and database integration.',
'2020-01-01', '2020-12-31', 3),

('Mobile Development', 'Mobile App Developer', 
'Ventured into mobile development with React Native. Created cross-platform mobile applications and learned mobile-specific UI/UX patterns. Integrated Firebase for backend services.',
'2021-01-01', '2021-12-31', 4),

('Advanced Backend & Database', 'Backend Specialist', 
'Mastered advanced backend technologies including Supabase, Firebase, and complex database operations. Implemented authentication systems, real-time features, and scalable architecture patterns.',
'2022-01-01', '2022-12-31', 5),

('AI Integration & Automation', 'AI Integration Developer', 
'Integrated AI technologies including OpenAI API and GPT models. Built chatbot systems and automated solutions. Combined traditional development with cutting-edge AI capabilities.',
'2023-01-01', '2023-12-31', 6),

('Educational Technology', 'Educational Developer', 
'Developed educational tools and platforms using MIT App Inventor, Scratch, and Tinkercad. Created learning management systems and interactive educational content for students.',
'2024-01-01', '2024-06-30', 7),

('Modern Web Technologies', 'Senior Full-Stack Developer', 
'Mastered modern web technologies including Next.js, TypeScript, and advanced React patterns. Implemented complex state management with Redux and built scalable web applications with modern deployment practices.',
'2024-07-01', NULL, 8);

