IRCbot with node
================

Based on
- https://github.com/martynsmith/node-irc
- http://fahad19.tumblr.com/post/39920378753/running-an-irc-bot-with-nodejs-locally


TODO
----

- take commands from master, such as:
  - join channel,
  - leave channel,
  - op a person on channel,
  - deop a person on channel
  - say something on a channel
- auto-op master
- separate configuration to a config.json file (which needs to be in gitignore)
- reboot functionality (reads all configs etc again)
- reload actions
- enable/disable "annoyances"
- remove hardcoded values from the source (such as master name, bot's nick etc)
- add nice helpers, such as:
  - google search [return links to first N resuls]
  - search wikipedia
  - search stackoverflow
  - search a funny developer gif
  - search fron bukkit


FEATURES
--------
- Actions: Send commands to the bot with `!`-prefix
- Listeners: Attach listeners that react to certain situations (such as keywords etc)
- Bot can have 1 or many admins
- Add new functionality (actions and listeners) on the fly without rebooting the bot!





BASE ACTIONS
------------
- `!reload` - (admin only)
- `!quit` - (admin only)
