IRC bot made with NodeJS
========================

**Word of warning:**
It should work, but I hacked this thing together on a friday night. The code is s**t. Needs some refactoring, but even more than that, I need to sleep.

Built on top of [Node-IRC](https://github.com/martynsmith/node-irc)-module.

Just for fun.


Features
--------
- Send commands to the bot with `!`-prefix (e.g. `!google NodeJS`)
- Attach observers that react to certain situations (such as specific keywords in conversations etc)
- Add new functionality (commands and observers) on the fly without rebooting the bot!
- Bot can have 1 or many admins
- Auto-op bot admin(s). Requires the bot to have `+o` of course.
- Auto-op users defined in `./autoop.json`. **WARNING**: Auto-op is nick based so use cautiously (if at all)!
- Optional per channel greetings for newly joined user defined in `./greetings.json`
- Admin can send basic IRC commands like `/mode`, `/join`, `/part` and make the bot say things


Core commands
-------------
- `!help` - prints list of available commands
- `!reload` - Reloads commands, observeres, greeting lists and auto-op lists *(admin only)*
- `!quit` - *(admin only)*

IRC commands
------------

*Admin only.*

The usage of the bot mostly requires the admin to be on the same IRC channel as the bot.

- `!join <channel>` or `!join <channel> <password>` if it has one
- `!part` if on a channel or `!part <channel>` if called elsewhere
- `!say <something>` if on a channel or `!say <channel> <something>` if called elsewhere
- `!ban <someone>`
- `!unban <someone>`
- `!kick <someone>`
- `!op <someone>`
- `!deop <someone>`
- `!mode <command>` or `!mode <command> <nick>`


Configurable/Example commands
-----------------------------
Found in `./commands`-folder.

- `!google` - returns links to top 3 google results
- `!wiki` - returns links to top 3 wikipedia results
- `!so` -  returns links to top 3 stackoverflow results



Install
-------

1. `git clone https://github.com/aripalo/node-irc-bot.git`
2. `node-irc-bot`
3. `npm install`
4. `cp example-configurations/example-config.json config-json`
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



TODO
----

- **Features**
  - Add "spam-protection", basically a timeout for non-bot-admin users
  - Error messages to IRC commands: such as "missing argument etc"
- **Refactor**
  - `!google`, `!so` and `!wiki`-commands share quite much logic, maybe refactor that logic into separate module etc?
  - Refactor the `commandHandler` module
  - There's quite many synchronous functions in the code, consider refactoring to asynchronous
  - After everything's cleaned up and so, consider bundling as npm module
  - Unit tests?
- **Docs/Examples**
  - Improve docs
  - Add another observer example



