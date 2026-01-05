package com.benwyw.bot.controller.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

/**
 * Content Controller - Returns sample/mock data for dynamic content dashboard
 *
 * Copy this file to: src/main/java/com/benwyw/bot/controller/web/ContentController.java
 *
 * Endpoints:
 * - GET /content/daily-tip
 * - GET /content/discord-stats
 * - GET /content/changelog
 * - GET /content/quote
 * - GET /content/trending
 * - GET /content/activity
 */
@Slf4j
@RestController
@RequestMapping("content")
public class ContentController {

    // ══════════════════════════════════════════════════════════════════════════════
    // SAMPLE DATA - Tips (rotates daily based on day of year)
    // ══════════════════════════════════════════════════════════════════════════════
    private static final List<String> TIPS = Arrays.asList(
        "Use /help to see all available bot commands!",
        "You can mention the bot to get a quick response.",
        "Set up custom prefixes for different servers.",
        "Use reaction roles to let users self-assign roles.",
        "Enable logging to track server activity.",
        "Schedule messages with the reminder command.",
        "Create custom commands for frequently asked questions.",
        "Use the music commands to play music in voice channels.",
        "Set up welcome messages for new members.",
        "Configure auto-moderation to keep your server safe.",
        "Write code that is easy to read, not just easy to write.",
        "Test your code before deploying to production.",
        "Use version control (Git) for all your projects.",
        "Document your code - your future self will thank you.",
        "Break large problems into smaller, manageable pieces.",
        "Take regular breaks to avoid burnout.",
        "Stay hydrated while coding!",
        "Join our Discord server for support and updates.",
        "Check out the API documentation for integration options.",
        "Track your progress with the weight tracker feature.",
        "Use the Swagger UI to explore the API interactively.",
        "Real-time messaging is available in the Messenger tab.",
        "View detailed reports in the Report section.",
        "Enable notifications to stay updated on new features.",
        "Use keyboard shortcuts for faster navigation.",
        "Use the Pomodoro technique: 25 min work, 5 min break.",
        "Plan your tasks at the start of each day.",
        "Tackle the hardest task first thing in the morning.",
        "Set realistic goals and celebrate small wins.",
        "Automate repetitive tasks whenever possible."
    );

    // ══════════════════════════════════════════════════════════════════════════════
    // SAMPLE DATA - Quotes (rotates daily based on day of year)
    // ══════════════════════════════════════════════════════════════════════════════
    private static final List<Map<String, String>> QUOTES = Arrays.asList(
        createQuote("The best way to predict the future is to create it.", "Peter Drucker", null),
        createQuote("Code is like humor. When you have to explain it, it's bad.", "Cory House", null),
        createQuote("First, solve the problem. Then, write the code.", "John Johnson", null),
        createQuote("Simplicity is the soul of efficiency.", "Austin Freeman", null),
        createQuote("Make it work, make it right, make it fast.", "Kent Beck", null),
        createQuote("Talk is cheap. Show me the code.", "Linus Torvalds", null),
        createQuote("Programs must be written for people to read.", "Harold Abelson", "SICP"),
        createQuote("Innovation distinguishes between a leader and a follower.", "Steve Jobs", null),
        createQuote("The biggest risk is not taking any risk.", "Mark Zuckerberg", null),
        createQuote("Stay hungry, stay foolish.", "Steve Jobs", "Stanford Commencement"),
        createQuote("In the middle of difficulty lies opportunity.", "Albert Einstein", null),
        createQuote("Quality is not an act, it is a habit.", "Aristotle", null),
        createQuote("The journey of a thousand miles begins with one step.", "Lao Tzu", "Tao Te Ching"),
        createQuote("Be the change you wish to see in the world.", "Mahatma Gandhi", null),
        createQuote("Success is not final, failure is not fatal.", "Winston Churchill", null),
        createQuote("Believe you can and you're halfway there.", "Theodore Roosevelt", null),
        createQuote("Learning never exhausts the mind.", "Leonardo da Vinci", null),
        createQuote("Debugging is twice as hard as writing the code.", "Brian Kernighan", null),
        createQuote("A clever person solves a problem. A wise person avoids it.", "Albert Einstein", null),
        createQuote("Alone we can do so little; together we can do so much.", "Helen Keller", null),
        createQuote("I have not failed. I've found 10,000 ways that won't work.", "Thomas Edison", null),
        createQuote("The harder I work, the luckier I get.", "Gary Player", null),
        createQuote("Creativity is intelligence having fun.", "Albert Einstein", null),
        createQuote("Logic will get you from A to B. Imagination will take you everywhere.", "Albert Einstein", null)
    );

    private static Map<String, String> createQuote(String text, String author, String source) {
        Map<String, String> quote = new HashMap<>();
        quote.put("text", text);
        quote.put("author", author);
        quote.put("source", source);
        return quote;
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/daily-tip - Returns tip of the day (rotates daily)
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/daily-tip")
    public ResponseEntity<Map<String, String>> getDailyTip() {
        int dayOfYear = LocalDate.now().getDayOfYear();
        String tip = TIPS.get(dayOfYear % TIPS.size());

        Map<String, String> response = new HashMap<>();
        response.put("content", tip);
        return ResponseEntity.ok(response);
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/discord-stats - Returns Discord statistics
    // TODO: Replace with actual ShardManager stats when ready
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/discord-stats")
    public ResponseEntity<Map<String, Object>> getDiscordStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("serverCount", 42);
        stats.put("totalUsers", 12847);
        stats.put("commandsToday", 1523L);
        stats.put("uptime", "99.9%");

        // TODO: Replace with actual JDA stats:
        // stats.put("serverCount", shardManager.getGuilds().size());
        // stats.put("totalUsers", shardManager.getUsers().size());

        return ResponseEntity.ok(stats);
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/changelog - Returns recent changelog entries
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/changelog")
    public ResponseEntity<List<Map<String, String>>> getChangelog(
            @RequestParam(defaultValue = "5") int limit) {

        List<Map<String, String>> changelog = new ArrayList<>();

        changelog.add(createChangelogEntry("feature", "Dynamic Content Dashboard",
            "New home page with auto-generated content including tips, stats, and activity feed", "2026-01-05"));
        changelog.add(createChangelogEntry("feature", "Discord Stats Integration",
            "Live Discord statistics from JDA now displayed on dashboard", "2026-01-05"));
        changelog.add(createChangelogEntry("improvement", "WebSocket Performance",
            "Improved real-time messaging latency by 40%", "2026-01-03"));
        changelog.add(createChangelogEntry("fix", "Auth Token Refresh",
            "Fixed token refresh race condition in concurrent requests", "2026-01-02"));
        changelog.add(createChangelogEntry("feature", "Weight Tracking Charts",
            "Added beautiful chart visualizations for weight data", "2025-12-28"));
        changelog.add(createChangelogEntry("security", "Security Update",
            "Updated dependencies to patch known vulnerabilities", "2025-12-25"));
        changelog.add(createChangelogEntry("feature", "Trending Commands",
            "Dashboard now shows trending bot commands", "2025-12-20"));
        changelog.add(createChangelogEntry("improvement", "Mobile Responsiveness",
            "Improved layout for mobile devices", "2025-12-15"));
        changelog.add(createChangelogEntry("fix", "Timezone Handling",
            "Fixed timezone issues in activity timestamps", "2025-12-10"));
        changelog.add(createChangelogEntry("feature", "Activity Feed",
            "Real-time activity feed showing recent events", "2025-12-05"));

        return ResponseEntity.ok(changelog.subList(0, Math.min(limit, changelog.size())));
    }

    private Map<String, String> createChangelogEntry(String type, String title, String description, String date) {
        Map<String, String> entry = new HashMap<>();
        entry.put("type", type);
        entry.put("title", title);
        entry.put("description", description);
        entry.put("date", date);
        return entry;
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/quote - Returns quote of the day (rotates daily)
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/quote")
    public ResponseEntity<Map<String, String>> getQuoteOfDay() {
        int dayOfYear = LocalDate.now().getDayOfYear();
        Map<String, String> quote = QUOTES.get(dayOfYear % QUOTES.size());
        return ResponseEntity.ok(quote);
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/trending - Returns trending commands
    // TODO: Replace with actual command usage stats from database
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/trending")
    public ResponseEntity<List<Map<String, Object>>> getTrending() {
        List<Map<String, Object>> trending = new ArrayList<>();

        trending.add(createTrendingItem("/help", 2847L, "uses", "up", 15));
        trending.add(createTrendingItem("/play", 1923L, "uses", "up", 8));
        trending.add(createTrendingItem("/stats", 1456L, "uses", "down", -3));
        trending.add(createTrendingItem("/weight", 892L, "uses", "up", 22));
        trending.add(createTrendingItem("/remind", 567L, "uses", "neutral", 0));

        return ResponseEntity.ok(trending);
    }

    private Map<String, Object> createTrendingItem(String name, Long count, String unit, String trend, int change) {
        Map<String, Object> item = new HashMap<>();
        item.put("name", name);
        item.put("count", count);
        item.put("unit", unit);
        item.put("trend", trend);
        item.put("change", change);
        return item;
    }

    // ══════════════════════════════════════════════════════════════════════════════
    // GET /content/activity - Returns recent activity feed
    // TODO: Replace with actual activity logs from database
    // ══════════════════════════════════════════════════════════════════════════════
    @GetMapping("/activity")
    public ResponseEntity<List<Map<String, String>>> getActivityFeed(
            @RequestParam(defaultValue = "10") int limit) {

        List<Map<String, String>> activities = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

        activities.add(createActivity("command", "Command Executed",
            "User123 used /help in #general", now.minusMinutes(2).format(formatter)));
        activities.add(createActivity("user", "New Member",
            "JohnDoe joined the server", now.minusMinutes(5).format(formatter)));
        activities.add(createActivity("message", "Message Milestone",
            "Server reached 100,000 messages!", now.minusMinutes(10).format(formatter)));
        activities.add(createActivity("system", "Bot Restarted",
            "Scheduled maintenance completed", now.minusHours(1).format(formatter)));
        activities.add(createActivity("weight", "Weight Logged",
            "Whity logged new weight entry", now.minusHours(2).format(formatter)));
        activities.add(createActivity("command", "Command Executed",
            "Alice used /play in #music", now.minusHours(3).format(formatter)));
        activities.add(createActivity("user", "Member Left",
            "Bob left the server", now.minusHours(4).format(formatter)));
        activities.add(createActivity("command", "Command Executed",
            "Charlie used /stats in #bot-commands", now.minusHours(5).format(formatter)));
        activities.add(createActivity("system", "Daily Backup",
            "Automatic backup completed successfully", now.minusHours(8).format(formatter)));
        activities.add(createActivity("user", "New Member",
            "Diana joined the server", now.minusHours(12).format(formatter)));

        return ResponseEntity.ok(activities.subList(0, Math.min(limit, activities.size())));
    }

    private Map<String, String> createActivity(String type, String title, String description, String timestamp) {
        Map<String, String> activity = new HashMap<>();
        activity.put("type", type);
        activity.put("title", title);
        activity.put("description", description);
        activity.put("timestamp", timestamp);
        return activity;
    }
}

