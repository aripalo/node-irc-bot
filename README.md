IRCbot with node
================

**WORK IN PROGRESS!!!**




Built on top of [Node-IRC](https://github.com/martynsmith/node-irc)-module.


TODO
----

- take commands from master, such as:
  - join channel,
  - leave channel,
  - op a person on channel,
  - deop a person on channel
  - say something on a channel
- enable/disable "annoyances"
- reboot functionality (reads all configs etc again)
- save runtime configs to file


Features
--------
- Send commands to the bot with `!`-prefix
- Attach listeners that react to certain situations (such as keywords etc)
- Add new functionality (commands and listeners) on the fly without rebooting the bot!
- Bot can have 1 or many admins
- Auto-op bot admin (requires the bot to have `+o` of course)
- Auto-op users defined in `./autoop.json`. **WARNING**: Auto-op is nick based so use cautiously (if at all)!
- Optional per channel greetings for newly joined user defined in `./greetings.json`



Core commands
-------------
- `!reload` - (admin only)
- `!quit` - (admin only)

Configurable/Example commands
-----------------------------
Found in `./commands`-folder.

- `!google` - returns a google search link. *TODO*: return links to first N results
- `!wiki` - *TODO* search wikipedia
- `!so` - *TODO* search stackoverflow
- `!gif` - *TODO* search some gifs... (not sure if I can actually implement this in sane manner)
