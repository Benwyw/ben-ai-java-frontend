# Content Controller with Sample Data

A single self-contained Spring Boot controller that returns sample/mock data for the dynamic content dashboard.

## Quick Start

1. **Copy the file** to your backend:
   ```
   ContentController.java → src/main/java/com/benwyw/bot/controller/web/
   ```

2. **Restart your Spring Boot app**

3. **Switch frontend to live mode** - In `src/composables/useDynamicContent.js`:
   ```javascript
   useMockData = false
   ```

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/content/daily-tip` | GET | Tip of the day (rotates daily) |
| `/content/discord-stats` | GET | Discord statistics (sample data) |
| `/content/changelog?limit=5` | GET | Recent changelog entries |
| `/content/quote` | GET | Quote of the day (rotates daily) |
| `/content/trending` | GET | Trending commands (sample data) |
| `/content/activity?limit=10` | GET | Activity feed (sample data) |

## Sample Responses

### Daily Tip
```json
{
  "content": "Use /help to see all available bot commands!"
}
```

### Discord Stats
```json
{
  "serverCount": 42,
  "totalUsers": 12847,
  "commandsToday": 1523,
  "uptime": "99.9%"
}
```

### Changelog
```json
[
  {
    "type": "feature",
    "title": "Dynamic Content Dashboard",
    "description": "New home page with auto-generated content",
    "date": "2026-01-05"
  }
]
```

### Quote
```json
{
  "text": "The best way to predict the future is to create it.",
  "author": "Peter Drucker",
  "source": null
}
```

### Trending
```json
[
  {
    "name": "/help",
    "count": 2847,
    "unit": "uses",
    "trend": "up",
    "change": 15
  }
]
```

### Activity
```json
[
  {
    "type": "command",
    "title": "Command Executed",
    "description": "User123 used /help in #general",
    "timestamp": "2026-01-05T10:30:00"
  }
]
```

## Future Improvements

The controller has `TODO` comments marking where to integrate real data:

- **Discord Stats**: Replace with `shardManager.getGuilds().size()` and `shardManager.getUsers().size()`
- **Trending**: Replace with actual command usage from database
- **Activity**: Replace with real activity logs from database

## Features

- ✅ Daily tip rotation (30 tips, rotates by day of year)
- ✅ Daily quote rotation (24 quotes, rotates by day of year)
- ✅ Sample changelog entries
- ✅ Sample trending commands with trend indicators
- ✅ Sample activity feed with relative timestamps
- ✅ No database required - works immediately

