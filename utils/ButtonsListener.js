const EmbedBuilder = require("./Embed");
const Utils = require("./Utils");
const UserServices = require("../services/User/UserServices");
const Messages = require("./Messages");
const ActionListeners = require("./ActionListener");

// Fonction récursive pour créer les ActionListeners
const createNextPreviousListener = (messageId) => {
  ActionListeners.createNewListener(messageId, async (bot, isTrigger, inputs) => {
    if (inputs.action === "sl_previous") {
      const { previous, current, next } = await Utils.getMemberOrderedList();

      if (!previous) return bot.sendError("Il n'y a pas d'utilisateur précédent à affecter à la boîte commune !");

      await UserServices.setPointed(current.id, false);
      await UserServices.setPointed(previous.id, true);
    } else if (inputs.action === "sl_next") {
      const { previous, current, next } = await Utils.getMemberOrderedList();
      if (!next) return bot.sendError("Il n'y a pas d'utilisateur suivant à affecter à la boîte commune !");

      await UserServices.setPointed(current.id, false);
      await UserServices.setPointed(next.id, true);
    }

    // Récupérer les membres mis à jour après les changements
    const updatedMembers = await Utils.getMemberOrderedList();
    let user = inputs.action === "sl_next" ? updatedMembers.current : updatedMembers.current;

    // Edit the embed with the new user
    const newEmbed = new EmbedBuilder()
      .setTitle("📧 | Boite commune")
      .addDescription(
        `🔵 La personne s'occupant de la boite commune aujourd'hui est **${user.firstName} ${user.lastName}**`
      )
      .setFooter(`${isTrigger.person.firstName} a fait : ${inputs.action === "sl_next" ? "next" : "previous"}`);

    newEmbed.addSubmitButton("⏮️ Previous", { action: "sl_previous" });
    newEmbed.addSubmitButton("⏭️ Next", { action: "sl_next" });

    const newMsg = await bot.sendCard(newEmbed, "Boite commune Updated");

    // Delete the previous message
    bot.webex.messages.remove(messageId);

    // Créer récursivement un nouveau listener pour le nouveau message
    createNextPreviousListener(newMsg.id);

    const successMsg = await Messages.sendSuccess(
      bot,
      `**${user.firstName} ${user.lastName}** a bien été affecté à la boîte commune !`
    );
    setTimeout(() => {
      bot.webex.messages.remove(successMsg.id);
    }, 5000);
  });
};

module.exports.createNextPreviousListener = createNextPreviousListener;
