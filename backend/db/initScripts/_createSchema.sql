CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) UNIQUE NOT NULL
);

CREATE TABLE user_scores (
    user_id INT PRIMARY KEY,
    highscore INT NOT NULL DEFAULT 0,
    total_score INT NOT NULL DEFAULT 0,
    total_playtime TIME NOT NULL DEFAULT '00:00:00',
    average_score INT NOT NULL DEFAULT 0,
    games_played INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES "user"
);

CREATE TABLE game (
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    playtime TIME NOT NULL,
    date DATE NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"
);

CREATE VIEW lb_highscore AS (
    SELECT row_number() OVER (ORDER BY highscore DESC) AS rank, user_id, highscore FROM user_scores ORDER BY rank
);

CREATE VIEW lb_total_playtime AS (
    SELECT row_number() OVER (ORDER BY total_playtime DESC) AS rank, user_id, total_playtime AS total_playtime FROM user_scores ORDER BY rank
);

CREATE OR REPLACE FUNCTION insert_new_user_scores()
    RETURNS TRIGGER
    LANGUAGE plpgsql AS
$$
    BEGIN
        INSERT INTO user_scores (user_id) VALUES (NEW.id);
        RETURN NEW;
    END;
$$;

CREATE TRIGGER user_added
    AFTER INSERT ON "user"
    FOR EACH ROW
EXECUTE FUNCTION insert_new_user_scores();

CREATE OR REPLACE FUNCTION update_user_scores()
    RETURNS TRIGGER
    LANGUAGE plpgsql AS
$$
DECLARE
    row user_scores%ROWTYPE;
BEGIN
    SELECT
        user_id,
        max(score) AS highscore,
        sum(score) AS total_score,
        sum(playtime) AS total_playtime,
        avg(score) AS average_score,
        count(*) AS games_played
    INTO row
    FROM game
    WHERE user_id = NEW.user_id
    GROUP BY user_id;

    UPDATE user_scores SET
       highscore = row.highscore,
       total_score = row.total_score,
       total_playtime = row.total_playtime,
       average_score = row.average_score,
       games_played = row.games_played
    WHERE user_id = row.user_id;
    RETURN NEW;
END
$$;

CREATE TRIGGER game_played
    AFTER INSERT ON game
    FOR EACH ROW
EXECUTE FUNCTION update_user_scores();
