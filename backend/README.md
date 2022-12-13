## Database Schema

```mermaid
erDiagram
    user {
        serial id PK
        string name
    }

    game {
        serial game_id PK
        int score
        time playtime
        date date
        int user_id FK
    }

    user_scores {
        int user_id PK
        int highscore
        int total_score
        int total_playtime
        int average_score
        int games_played
    }
    
    lb_highscore {
        int rank
        int user_id
        int highscore
    }
    
    lb_total_playtime {
        int rank
        int user_id
        time total_playtime
    }
    
    user ||--O{ game : "played"
    user ||--|| user_scores : ""
```
`lb_highscore` and `lb_total_playtime` are views querying the `user_scores` table.

A trigger function on insert to the `user` table creates a new row in `user_scores`. Everytime a new `game` is inserted, the row is updated.