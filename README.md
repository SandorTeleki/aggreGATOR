# aggreGATOR

RSS feed aggregator written in TypeScript that runs as a CLI tool.
Based on the Boot.dev course: [Build a Blog Aggregator in Typescript](https://www.boot.dev/courses/build-blog-aggregator-typescript).

## Prerequisites:

- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- [PostgreSQL](https://www.postgresql.org/) running locally

## Setup:

1. Clone the repo and set up Node:

   ```bash
   git clone https://github.com/SandorTeleki/aggreGATOR.git
   cd aggreGATOR
   nvm install
   nvm use
   npm install
   ```

   The `.nvmrc` file will ensure you're using the correct Node version (22.15.0).

2. Create the database. Open a Postgres shell:

   ```bash
   psql postgres
   ```

   Then run:

   ```sql
   CREATE DATABASE gator;
   \q
   ```

3. Create a config file at `~/.gatorconfig.json`:

   ```json
   {
     "db_url": "postgres://<username>:@localhost:5432/gator?sslmode=disable",
     "current_user_name": ""
   }
   ```

   Replace `<username>` with your Postgres username. If your Postgres requires a password, use `postgres://<username>:<password>@localhost:5432/gator?sslmode=disable`.

4. Run the database migrations:

   ```bash
   npm run generate
   npm run migrate
   ```

## Usage

Run commands with:

```bash
npm run start <command> [args...]
```

### Commands

| Command | Description |
|---------|-------------|
| `register <name>` | Create a new user and log in as them |
| `login <name>` | Switch to an existing user |
| `users` | List all registered users |
| `addfeed <name> <url>` | Add an RSS feed and auto-follow it |
| `feeds` | List all feeds in the database |
| `follow <url>` | Follow an existing feed by URL |
| `unfollow <url>` | Unfollow a feed by URL |
| `following` | List feeds the current user is following |
| `agg` | Fetch and aggregate RSS feeds |
| `browse` | Browse aggregated posts |
| `reset` | Reset the database (deletes all data) |

### Examples

```bash
# Register a new user
npm run start register bob

# Add a feed
npm run start addfeed "Hacker News" "https://hnrss.org/newest"

# Follow an existing feed
npm run start follow "https://www.wagslane.dev/index.xml"

# See what you're following
npm run start following

# Unfollow a feed
npm run start unfollow "https://hnrss.org/newest"

# Browse posts
npm run start browse
```
