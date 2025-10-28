<!-- 518bc67b-16a9-47a8-8240-508a0f25faba 59e86469-e320-46d1-b31e-9c883ce1659a -->
# Make Admin Dashboard Fully Functional

## Overview

Implement modal-based forms for all edit and create operations in the admin dashboard, including profile image management.

## Implementation Strategy

### 1. Create Reusable Modal Component

Create `src/components/Modal.tsx` - a reusable modal wrapper with backdrop, animations, and close functionality.

### 2. Profile Management

Update `src/app/admin/dashboard/page.tsx` to add:

- **Profile Edit Modal**: Form with fields for name, title, bio, email, social links, and profile image URL
- State management for modal visibility and form data
- Update handler that calls Supabase to update profile
- Profile image URL input with preview

### 3. Projects Management

Add to dashboard:

- **Add Project Modal**: Form for title, description, image URL, tech stack (comma-separated), live URL, github URL, featured checkbox
- **Edit Project Modal**: Same form pre-populated with existing data
- Create and update handlers
- Tech stack field that converts comma-separated string to array

### 4. Skills Management

Add to dashboard:

- **Add Skill Modal**: Form for name, category, proficiency level (1-5 slider), icon URL
- **Edit Skill Modal**: Same form pre-populated with existing data
- Create and update handlers
- Proficiency level visualization

### 5. Experience Management

Add to dashboard:

- **Add Experience Modal**: Form for company, position, description, start date, end date (optional), checkbox for "Current Position"
- **Edit Experience Modal**: Same form pre-populated
- Create and update handlers
- Date picker inputs

## Key Files to Modify

- `src/app/admin/dashboard/page.tsx` - Main dashboard with all modal logic
- `src/components/Modal.tsx` - New reusable modal component

## Technical Details

- Use React state for modal visibility and form data
- Supabase insert/update operations for CRUD
- Form validation before submission
- Loading states during API calls
- Success/error feedback messages
- Framer Motion for modal animations

### To-dos

- [ ] Create reusable Modal component with backdrop and animations
- [ ] Add profile edit modal with all fields including profile image URL
- [ ] Add project create and edit modals with full form fields
- [ ] Add skill create and edit modals with proficiency slider
- [ ] Add experience create and edit modals with date pickers