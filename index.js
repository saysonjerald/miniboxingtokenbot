const { Composer } = require("micro-bot");
const axios = require("axios");

const bot = new Composer();

const tokenCA = "0x6bf7b196174d40ca3648ddc8b5901f5d12b34c2b";
const website = "http://MiniboxingToken.com";
const poocoin = `https://poocoin.app/tokens/${tokenCA}`;
const pancakeswap = `https://exchange.pancakeswap.finance/#/swap?inputCurrency=${tokenCA}`;
const bscscan = `https://bscscan.com/address/${tokenCA}`;

//Social Media
const reddit = "https://www.reddit.com/user/miniboxingtoken";
const youtube = "https://www.youtube.com/channel/UChh-SoS6z_gODpiAVR1ZIgA";
const twitter = "https://twitter.com/MiniboxingToken";
const email = "info@miniboxingtoken.com";

//Whitepaper
const whitepaper =
  "https://www.miniboxingtoken.com/wp-content/uploads/2021/08/miniboxing_whitepaper.pdf";

bot.command("buy", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/buy.jpg" },
    {
      caption: `
  <i><b>✅Buy Poocoin and Pancakeswap✅</b></i>
  `,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Poocoin", url: poocoin },
            { text: "Pancakeswap", url: pancakeswap },
          ],
        ],
      },
    }
  );
});

bot.command("features", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/features.jpg" },
    {
      caption: `
🔥<i><b>MiniBoxing Features</b></i>🔥

🥊<b>Automatic Buy Back and Burn System</b> - Every time investors buy and sell the token, the contract executes an automatic command of 40%  buyback of units and burns it to the dead address these processes bring its overtime increased from zero value to all-time high value.

🥊<b>2% Reflections Rewards</b> - Holding MiniBoxing token gives everyone an opportunity to earn massive 2% Reflection Rewards. The more you hold the more rewards will be received.

🥊<b>8% Development Tax</b> - Allotted to fast pace Coingecko, Coinmarket Cap, Dex Listing, Top Influencers, and future development.

🥊<b>NFT Technology</b>  - MiniBoxing Token Is capable of creating NFT project that allows holders to express art creation and earn profit.
  
🥊<b>Peer to Peer  Exchange</b> - Allows peer-to-peer community exchange plus fiat currency global convertion.
    `,
      parse_mode: "HTML",
    }
  );
});

bot.command("tax", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/tax.jpg" },
    {
      caption: `
<i>🔴<b>50% Tax Reflections</b>🔴

👉40% - Automatic Buyback and Burn to Dead address
👉2% -  Redistribute Holders
👉8% -  Token Development</i>
    `,
      parse_mode: "HTML",
    }
  );
});

bot.command("website", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/website.jpg" },
    {
      caption: `
✅<i><b>OFFICIAL WEBSITE</b></i>✅

🌐 ${website}
✉️Email: ${email}
    `,
      parse_mode: "HTML",
    }
  );
});

bot.command("socialmedia", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/socialmedia.jpg" },
    {
      caption: `
<i><b>✨Social Media✨</b></i>
   `,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔗 Twitter", url: twitter }],
          [{ text: "🔗 Youtube", url: youtube }],
          [{ text: "🔗 Reddit", url: reddit }],
        ],
      },
    }
  );
});

bot.command("ca", (ctx) => {
  ctx.telegram.sendMessage(
    ctx.chat.id,
    `
<i><b>Contract address:</b></i>
<pre>${tokenCA}</pre>
    `,
    {
      parse_mode: "HTML",
    }
  );
});

bot.command("marketing", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/marketing.jpg" },
    {
      caption: `
<i>🔥<b>Our Simple Marketing Strategies</b>🔥

✅We will Tap World Wide Boxer to Promote MiniBoxing Token

✅The most prestige FACE Endorser MiniBoxingToken

✅Top Holders will get 
🎟Ticket to a Fight
🥊Gloves
👝Boxing Bag 
🩳Boxing Shorts
🌫Signed Frame
✍️Signed Exclusive by Top Boxing Promoter</i>
    `,
      parse_mode: "HTML",
    }
  );
});

bot.command("whitepaper", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/whitepaper.jpg" },
    {
      caption: `
<i><b>📍WHITEPAPER📍</b></i>
    `,
      reply_markup: {
        inline_keyboard: [[{ text: "View Now", url: whitepaper }]],
      },
      parse_mode: "HTML",
    }
  );
});

bot.command("usecase", (ctx) => {
  ctx.replyWithPhoto(
    { source: "./img/usecase.jpg" },
    {
      caption: `
<i>📌<b>The MiniBoxing Use-case</b>📌

🔴<b>40% Automatic Buy Back and Burn System </b>- Every time investors buy and sell the token, the contract executes an automatic command of 40%  buyback of units and burns it to the dead address these processes bring its overtime increased from zero value to all-time high value.

🔴<b>2% Reflections Rewards</b> - Holding MiniBoxing token gives everyone an opportunity to earn massive 2% Reflection Rewards. The more you hold the more rewards will be received.

🔴<b>8% Development Tax</b> - Alloted to fast pace Coingecko, Coinmarket Cap, Dex Listing, Top Influencers, and Future Development.</i>
    `,
      parse_mode: "HTML",
    }
  );
});

bot.command("price", async (ctx) => {
  try {
    const token = await axios(
      `https://api.pancakeswap.info/api/v2/tokens/${tokenCA}`
    );
    ctx.telegram.sendMessage(
      ctx.chat.id,
      `
Name: *${token.data.data.name}*
Symbol: *${token.data.data.symbol}*
Price: $*${(token.data.data.price * 1).toFixed(9)}*
BNB Price: *${(token.data.data.price_BNB * 1).toFixed(9)}*
    `,
      { parse_mode: "Markdown" }
    );
  } catch (err) {
    console.log(err);
  }
});

bot.start((ctx) => {
  ctx.reply(`
/buy
/ca
/features
/marketing
/socialmedia
/tax
/usecase
/website
/whitepaper
  `);
});

module.exports = bot;
