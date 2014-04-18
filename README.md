IRCbot with node
================

Built on top of [Node-IRC](https://github.com/martynsmith/node-irc)-module.


TODO
----

- take commands from master, such as:
  - join channel,
  - leave channel,
  - op a person on channel,
  - deop a person on channel
  - say something on a channel
- auto-op master
- reboot functionality (reads all configs etc again)
- enable/disable "annoyances"



FEATURES
--------
- Send commands to the bot with `!`-prefix
- Attach listeners that react to certain situations (such as keywords etc)
- Add new functionality (commands and listeners) on the fly without rebooting the bot!
- Bot can have 1 or many admins
- Auto-op bot admin (requires the bot to have `+o` of course)
- Auto-op users defined in `./autoop.json`. **WARNING**: Auto-op is nick based so use cautiously!




BASE ACTIONS
------------
- `!reload` - (admin only)
- `!quit` - (admin only)

Example configurable actions
----------------------------
- `!google` - returns a google search link. *TODO*: return links to first N results
- `!wiki` - *TODO* search wikipedia
- `!so` - *TODO* search stackoverflow
- `!gif` - *TODO* search some gifs... (not sure if I can actually implement this in sane manner)
