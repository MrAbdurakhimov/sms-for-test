require("dotenv").config();
const { Telegraf } = require("telegraf");
const token = process.env.BOT_TOKEN;
const express = require("express");
const app = express();
const bot = new Telegraf(token);
const $chatId = process.env.CHAT_ID;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

bot.start((ctx) => {
  console.log(ctx.chat);
  ctx.reply(
    "Hey this helps Bytech IT Solutions to implement SMS Auth things for testing purposes"
  );
});
app.get("/", (req, res) => {
  res.render("home");
});

app.post("/api", (req, res) => {
  bot.telegram.sendMessage(
    $chatId,
    `📞 Phone number is: ${req.body.phone}\n\n📬 Message: ${req.body.message}`
  );
  res.status(200).json(req.body);
});

app.listen(
  process.env.PORT || 3000,
  console.log("Server has been started: http://localhost:3000")
);
bot.launch();
