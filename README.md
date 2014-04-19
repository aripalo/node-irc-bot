IRCbot with node
================

**WORK IN PROGRESS!!!**

Built on top of [Node-IRC](https://github.com/martynsmith/node-irc)-module.


Features
--------
- Send commands to the bot with `!`-prefix
- Attach listeners that react to certain situations (such as specific keywords in conversations etc)
- Add new functionality (commands and listeners) on the fly without rebooting the bot!
- Bot can have 1 or many admins
- Auto-op bot admin(s). Requires the bot to have `+o` of course.
- Auto-op users defined in `./autoop.json`. **WARNING**: Auto-op is nick based so use cautiously (if at all)!
- Optional per channel greetings for newly joined user defined in `./greetings.json`


Core commands
-------------
- `!reload` - (admin only)
- `!quit` - (admin only)


Configurable/Example commands
-----------------------------
Found in `./commands`-folder.

- `!google` - returns links to top 3 google results
- `!wiki` - *TODO* search wikipedia
- `!so` -  returns links to top 3 stackoverflow results
- `!gif` - *TODO* search some gifs... (not sure if I can actually implement this in sane manner)


More TODO
---------

- take commands from master, such as:
  - join channel,
  - leave channel,
  - op a person on channel,
  - deop a person on channel
  - say something on a channel
- enable/disable "annoyances" (basically silly listeners)
