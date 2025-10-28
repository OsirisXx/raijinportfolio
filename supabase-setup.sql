-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profile table (single row)
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  profile_image_url TEXT,
  resume_url TEXT,
  email TEXT,
  github TEXT,
  linkedin TEXT,
  twitter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level INTEGER CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  icon_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profile: Public read, authenticated write
CREATE POLICY "Profile is viewable by everyone" ON profile FOR SELECT USING (true);
CREATE POLICY "Profile is editable by authenticated users" ON profile FOR ALL USING (auth.role() = 'authenticated');

-- Projects: Public read, authenticated write
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Projects are editable by authenticated users" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Skills: Public read, authenticated write
CREATE POLICY "Skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Skills are editable by authenticated users" ON skills FOR ALL USING (auth.role() = 'authenticated');

-- Experiences: Public read, authenticated write
CREATE POLICY "Experiences are viewable by everyone" ON experiences FOR SELECT USING (true);
CREATE POLICY "Experiences are editable by authenticated users" ON experiences FOR ALL USING (auth.role() = 'authenticated');

-- Contact submissions: Public insert, authenticated read
CREATE POLICY "Contact submissions are insertable by everyone" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact submissions are readable by authenticated users" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');

-- Insert default profile data
INSERT INTO profile (name, title, bio, email, github, linkedin) VALUES 
('Your Name', 'Software Developer', 'Passionate software developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.', 'your.email@example.com', 'https://github.com/yourusername', 'https://linkedin.com/in/yourusername')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, tech_stack, featured, order_index) VALUES 
('Portfolio Website', 'A modern, responsive portfolio website built with Next.js and Supabase', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'], true, 1),
('E-commerce Platform', 'Full-stack e-commerce solution with payment integration', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], true, 2),
('Task Management App', 'Collaborative task management application with real-time updates', ARRAY['Vue.js', 'Express', 'Socket.io', 'MongoDB'], false, 3)
ON CONFLICT DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, proficiency_level, order_index) VALUES 
('JavaScript', 'Programming Languages', 5, 1),
('TypeScript', 'Programming Languages', 4, 2),
('React', 'Frontend', 5, 3),
('Next.js', 'Frontend', 4, 4),
('Node.js', 'Backend', 4, 5),
('PostgreSQL', 'Database', 4, 6),
('Git', 'Tools', 5, 7),
('Docker', 'DevOps', 3, 8)
ON CONFLICT DO NOTHING;

-- Insert sample experiences
INSERT INTO experiences (company, position, description, start_date, end_date, order_index) VALUES 
('Tech Company', 'Senior Software Developer', 'Led development of multiple web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.', '2022-01-01', '2024-01-01', 1),
('Startup Inc', 'Full Stack Developer', 'Built and maintained web applications from scratch. Worked closely with design team to implement pixel-perfect UIs.', '2020-06-01', '2021-12-31', 2)
ON CONFLICT DO NOTHING;

