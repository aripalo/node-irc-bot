IRCbot with node
================

**WORK IN PROGRESS!!!**

Built on top of [Node-IRC](https://github.com/martynsmith/node-irc)-module.


Features
--------
- Send commands to the bot with `!`-prefix
- Attach observers that react to certain situations (such as specific keywords in conversations etc)
- Add new functionality (commands and observers) on the fly without rebooting the bot!
- Bot can have 1 or many admins
- Auto-op bot admin(s). Requires the bot to have `+o` of course.
- Auto-op users defined in `./autoop.json`. **WARNING**: Auto-op is nick based so use cautiously (if at all)!
- Optional per channel greetings for newly joined user defined in `./greetings.json`


Core commands
-------------
- `!help` - prints list of available commands
- `!reload` - Reloads commands, observeres, greeting lists and auto-op lists (admin only)
- `!quit` - (admin only)


Configurable/Example commands
-----------------------------
Found in `./commands`-folder.

- `!google` - returns links to top 3 google results
- `!wiki` - returns links to top 3 wikipedia results
- `!so` -  returns links to top 3 stackoverflow results


More TODO
---------

- take commands from master, such as:
  - join channel,
  - leave channel,
  - op a person on channel,
  - deop a person on channel
  - say something on a channel
- enable/disable "annoyances" (basically silly observers)


Install
-------

1. `git clone https://github.com/aripalo/node-irc-bot.git`
2. `node-irc-bot`
3. `npm install`
4. `cp example-config.json config-json`
5. Edit the `config-json`
6. `node index.js`


Adding functionality
--------------------

### Commands

1. Add functionality wrapped into CommonJS module.exports funcion into JavaScript-file and place it to `./commands`-folder
2. Important: The filename will be the command, e.g. `foo.js` will become command `!foo`
3. Run `!reload`-command on as a bot admin
4. Profit...?

### Observers

... basically the same process as with commands, but observers aren't activated by `!command`, but instead they're meant for monitoring conversation and act on them.
