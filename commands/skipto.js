const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "jump",
  aliases: ["j"],
  description: "```Lewati lagu dengan memasukkan nomor antrian lagu selanjuynya```",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Nomor Antrian>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Nomor Antrian>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`Antrian hanya ${queue.songs.length} banyak lagu!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Lewati lagu berikutnya ${args[0] - 1} songs`).catch(console.error);
  }
};
