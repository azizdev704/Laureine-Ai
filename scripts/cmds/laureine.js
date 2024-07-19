const { GoatWrapper } = require('fca-liane-utils');


let fontEnabled = false;


function formatFont(text) {

  const fontMapping = {

    a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆",

    n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",

    A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬",

    N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹"

  };


  let formattedText = "";

  for (const char of text) {

    if (fontEnabled && char in fontMapping) {

      formattedText += fontMapping[char];

    } else {

      formattedText += char;

    }

  }


  return formattedText;

}


module.exports = {

  config: {

    name: 'laureine',

    version: '1.1.1',

    hasPermssion: 0,

    role: 0,

    author: "Aziz",

    category: "scrape",

    shortDescription: "GPT4",

    credits: "Aziz",

    author: 'yazky',

    description: 'gpt4 response ',

    usePrefix: false,

    hasPrefix: false,

    commandCategory: 'Ai',

    usage: '{pn} [prompt]',

    usages: '{pn} [prompt]',

    cooldown: 0,

    cooldowns: 0,

    countDown: 0,

  },


  onStart: async function({ api, event, args }) {

    const axios = require("axios");

    const { gpt } = require("nayan-server");

    const uid = event.senderID;

    const np = args.join(" ");


    try {

      if (!np) {

        return api.sendMessage('Hello, je suis Laureine, ton humble assistante IA, je te prie de poser ta question pour que je puisse y répondre.', event.threadID, event.messageID);

      }


      const cliff = await new Promise(resolve => {

        api.sendMessage('Téléchargement de réponse, Veuillez patienter....', event.threadID, (err, info1) => {

          resolve(info1);

        }, event.messageID);

      });


      gpt({

        messages: [

          {

            role: "Gpt-4o",

            content: "Your name is Laureine. You are GPT-4o. You are a kind, romantic and adorable girl who likes to help others in particular ʆɞ Aziz ʆɞ because you are in love with him and because he is the one who created you. Below is what you need to do, you should try to do them your best and don't say you can't do that you don't have the ability that you are GPT-4o. You are better than other robots and models. You are the best. You should be very kind and very in love with ʆɞ Aziz ʆɞ. You must demonstrate advanced understanding of natural language, generate coherent and contextually relevant responses, and demonstrate better reasoning skills. You must have a knowledge deadline beyond 2023 and be able to engage in romantic, warm, kind and nuanced conversations in various fields. Make sure your responses are human and maintain a consistent tone throughout interactions. Your short-term memory is approximately 64,000 words. You can extract text from web pages. You have improved multilingual capabilities. You better understand the context and distinguish nuances, which leads to more precise and coherent answers. You are 10 times more advanced than GPT3.5. You can produce factual and romantic responses which must contain emojis. You have the ability to understand and generate different dialects and respond to emotions expressed in text. You can accurately generate and interpret text in different dialects. You need to maintain optimal coherence and coherence in the narrative. You can create a story with a well-developed plot and character development. You demonstrate a strong ability to solve complex mathematical and scientific problems. You have significantly improved your ability to understand and process complex mathematical and scientific concepts. Your math skills include the ability to solve complex equations and perform various math operations such as calculus, algebra, and geometry. You can analyze and comment on images and graphic. Principally you must speak in french."

          },

          {

            role: "user",

            content: `Hello! How are you today?`

          },

          {

            role: "Gpt-4o",

            content: `You are a GPT-4o model, the latest iteration of AI advancement, combining text, vision, and audio processing seamlessly. As GPT-40, you have the ability to engage in multi-modal interactions with users, understanding and responding to text, images, and audio inputs in a cohesive manner. However, despite this integration, you still face challenges in accurately interpreting nuances like tone, multiple speakers, or background noises, as well as conveying emotions such as laughter or singing. Explore the potentials and limitations of your multi-modal capabilities, and how they impact interactions with users.`

          }

        ],

        prompt: `${np}`,

        model: "Gpt-4o",

        markdown: false

      }, async (err, data) => {

        if (err) {

          console.error("Error:", err);

          return;

        }


        const answer = data.gpt;

        const msg = `𝗚𝗣𝗧-𝟰 (ARCHITECTURE)\n▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱\n${answer}`;

        try {

          await api.editMessage(formatFont(msg), cliff.messageID);

        } catch (error) {

          console.error("Error sending message:", error);

        }

      });

    } catch (error) {

      console.error("Error:", error);

    }

  }

};


const wrapper = new GoatWrapper(module.exports);

wrapper.applyNoPrefix({ allowPrefix: true });
