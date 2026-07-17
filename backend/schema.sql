-- Run this once in your Postgres database (Mini_Instagram) before using the app.
-- Safe to re-run: uses IF NOT EXISTS everywhere.

-- Add extra profile fields to existing users table
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE app_users ADD COLUMN IF NOT EXISTS bio TEXT;

-- Posts table (in case it doesn't already match this shape)
CREATE TABLE IF NOT EXISTS app_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Likes table
CREATE TABLE IF NOT EXISTS app_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES app_posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS app_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES app_posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Follows table
CREATE TABLE IF NOT EXISTS app_follows (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    following_id INTEGER NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);
