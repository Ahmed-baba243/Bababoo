const axios = require('axios');

const Prefixes = [
  'ask',
  'heaven',
  'ai',
  'bot',
  'Heaven',
];

module.exports = {
  config: {
    name: "chatgpt",
    version: 1.0,
    author: "ArYAN",
    role: 0,
    shortDescription: "Ask question to ChatGPT",
    longDescription: "Interact as ChatGPT provided by OpenAi. This command allows users to interact with the AI, asking various questions and receiving detailed answers.",
    category: "ai",
    guide: {
      en: "{p}ai [ question ] - Replace '{p}' with your command prefix and 'question' with your actual query.",
    },
  },
  
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("🧘‍♀️𝙃𝙀𝘼𝙑𝙀𝙉🧘‍♀️(☞ ᐛ )☞╞═════𖠁𐂃𖠁═════╡\n\n𝙩𝙝𝙚 𝙤𝙣𝙡𝙮 𝙪𝙥𝙙𝙖𝙩𝙚𝙙 𝙗𝙤𝙩 𝙞𝙣 𝙩𝙝𝙚 𝙪𝙣𝙞𝙫𝙚𝙧𝙨𝙚 𝙖𝙨𝙠 𝙮𝙤𝙪𝙧 𝙦𝙪𝙚𝙨𝙩𝙞𝙤𝙣𝙨 𝙢𝙖 𝙛𝙧𝙞𝙚𝙣𝙙😁");
        return;
      }
      api.setMessageReaction("⏰", event.messageID, (err) => {}, true);
      const response = await axios.get(`https://himachalwale.onrender.com/api/chatgpt?prompt=${encodeURIComponent(prompt)}&apikey=©himachalwale`);
      const answer = `
🧘𝐇𝐄𝐀𝐕𝐄𝐍 𝐈𝐒 𝐌𝐘 𝐁𝐎𝐒𝐒 🧘
____________________________  
${response.data.fullResponse}

ℰ⋆‿⋆ℰ 🤸𝐇𝐄𝐀𝐕𝐄𝐍 𝐌𝐀𝐃𝐄🤸`;
      await message.reply(answer);
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } catch (error) {
      console.error("Error:", error.message, error.response?.data);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
