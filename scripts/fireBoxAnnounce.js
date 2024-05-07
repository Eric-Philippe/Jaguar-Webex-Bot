const configInstance = require("../config/CustomConfig");
const EmbedBuilder = require("../utils/Embed");
const Utils = require("../utils/Utils");
const UserServices = require("../services/User/UserServices");
const { MAIN_GROUPID } = require("../config/config");
const { BOX_ANNOUNCE_SCRIPT_ID } = require("./ScriptsId");

const getScriptBoxAnnouncement = () => {
  const time = configInstance.getAnnoucementTime();
  const [hour, minute] = time.split(":");

  /** @type {Script} */
  const fireBoxAnnounce = {
    id: BOX_ANNOUNCE_SCRIPT_ID,
    crontime: `0 ${minute} ${hour} * * MON-FRI`, // Every weekday at the specified time
    //crontime: "*/5 * * * * *", // Every second for testing purposes
    onTick: async (framework) => {
      if (Utils.isTodayABankHoliday()) return;

      const bot = framework.getBotByRoomId(MAIN_GROUPID);
      if (!bot) return;

      const { previous, current, next } = await Utils.getMemberOrderedList();
      if (!next) return;

      await UserServices.setPointed(current.id, false);
      await UserServices.setPointed(next.id, true);

      const embed = new EmbedBuilder()
        .setSubtitle("📧 | Annonce de la boîte commune :")
        .addDescription(`${next.firstName} ${next.lastName.toUpperCase()} s'occupe de la boîte commune aujourd'hui !`);

      bot.sendCard(embed, "Boîte Commune Card");
    },
  };

  return fireBoxAnnounce;
};

exports.getScriptBoxAnnouncement = getScriptBoxAnnouncement;
