# Database Structure Documentation

## Overview
This document outlines the database structure for the Visa Points Calculator application using Supabase (PostgreSQL).

## Tables

### 1. users
Primary table for user management.
```sql
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
email VARCHAR(255) UNIQUE NOT NULL,
full_name VARCHAR(255),
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
last_login TIMESTAMP WITH TIME ZONE,
avatar_url VARCHAR(255),
preferred_language VARCHAR(10) DEFAULT 'en',
is_email_verified BOOLEAN DEFAULT FALSE
);
```

## 2. visa_results
Stores individual visa point calculation results.

```sql
CREATE TABLE visa_results (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID REFERENCES users(id) ON DELETE CASCADE,
visa_type VARCHAR(50) NOT NULL, -- '189', '190', '491'
scenario_name VARCHAR(255) NOT NULL, -- User-given name for this calculation
total_points INTEGER NOT NULL,
answers JSONB NOT NULL, -- Stores all question answers
points_breakdown JSONB NOT NULL, -- Detailed points breakdown
created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
notes TEXT,
is_favorite BOOLEAN DEFAULT FALSE
);
-- Index for faster queries
CREATE INDEX idx_visa_results_user_id ON visa_results(user_id);
CREATE INDEX idx_visa_results_visa_type ON visa_results(visa_type);

### 3. blog_posts
Stores blog articles and related content.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'archived'
  featured_image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title VARCHAR(255),
  meta_description TEXT,
  view_count INTEGER DEFAULT 0
);

-- Index for faster queries
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
```

### 4. blog_categories
Manages blog post categories.

```sql
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

### 5. blog_posts_categories
Junction table for many-to-many relationship between posts and categories.

```sql
CREATE TABLE blog_posts_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);
```

## Row Level Security (RLS) Policies

### Users Table
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY users_update_own ON users
  FOR UPDATE USING (auth.uid() = id);
```

### Visa Results Table
```sql
-- Enable RLS
ALTER TABLE visa_results ENABLE ROW LEVEL SECURITY;

-- Users can CRUD their own results
CREATE POLICY results_select_own ON visa_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY results_insert_own ON visa_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY results_update_own ON visa_results
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY results_delete_own ON visa_results
  FOR DELETE USING (auth.uid() = user_id);
```

### Blog Posts Table
```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY posts_select_published ON blog_posts
  FOR SELECT USING (status = 'published');

-- Authors can CRUD their own posts
CREATE POLICY posts_crud_own ON blog_posts
  USING (auth.uid() = author_id);
```

## Notes
1. All tables include created_at and updated_at timestamps for tracking
2. JSONB type is used for flexible storage of answers and points breakdown
3. RLS policies ensure data security at the database level
4. Indexes are added for commonly queried fields
5. UUID is used as primary key type for better distribution and security
```

This structure allows for:
1. User management with authentication
2. Multiple visa calculation scenarios per user
3. Comprehensive blog system with categories
4. Secure data access through RLS policies
5. Efficient querying through appropriate indexes

The structure aligns with your current frontend implementation (referencing AustraliaPointsCalculator.tsx, lines 162-390) and can be easily extended for future features.


## database Conection  
Direct connection
DATABASE_URL=postgresql://postgres:9UYnFE9tckgF4UBU@db.wwgyighrkkpqagebvrnt.supabase.co:5432/postgres
Passwword: 9UYnFE9tckgF4UBU

Transaction pooler
DATABASE_URL=postgresql://postgres.wwgyighrkkpqagebvrnt:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres