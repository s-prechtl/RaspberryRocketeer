CREATE TABLE "user" (
    username VARCHAR(32) PRIMARY KEY
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    playtime TIME NOT NULL,
    date DATE NOT NULL,
    username VARCHAR(32) NOT NULL,
    FOREIGN KEY (username) REFERENCES "user"
);

CREATE VIEW user_data AS (
    SELECT
        username,
        max(score) AS highscore,
        sum(score) AS total_score,
        sum(playtime) AS total_playtime,
        avg(score) AS average_score,
        count(*) AS games_played
    FROM game
    GROUP BY username
);

CREATE VIEW lb_highscore AS (
    SELECT row_number() OVER (ORDER BY max(score) DESC) AS rank, username, max(score) AS highscore FROM game GROUP BY username ORDER BY rank
);

CREATE VIEW lb_total_playtime AS (
    SELECT row_number() OVER (ORDER BY sum(playtime) DESC) AS rank, username, sum(playtime) AS total_playtime FROM game GROUP BY username ORDER BY rank
);
