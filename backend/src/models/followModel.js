const pool = require('../config/db');

const findFollower = async (followerId, followingId) => {
    const result = await pool.query(
        `select * from app_follow where follower_id = $1 and following_id = $2`,
        [followerId, followingId]
    );
    return result.rows[0];
};

const addFollwer = async (followerId, followingId) => {
    const result = await pool.query(
        `insert into app_follow(follower_id, following_id) values ($1, $2) returning *`,
        [followerId, followingId]
    );
    return result.rows[0];
};

const removeFollower = async (followerId, followingId) => {
    const result = await pool.query(
        `delete from app_follow where follower_id = $1 and following_id = $2`,
        [followerId, followingId]
    );
    return result.rows[0];
};

const countFollower = async (followingId) => {
    const result = await pool.query(
        `select Count(*)::int as count from app_follow where following_id = $1`,
        [followingId]
    );
    return result.rows[0].count;
};

const countFollowing = async (followerId) => {
    const result = await pool.query(
        `select Count(*)::int as count from app_follow where follower_id = $1`,
        [followerId]
    );
    return result.rows[0].count;
};

module.exports = {
    findFollower, addFollwer, removeFollower, countFollower, countFollowing
};
