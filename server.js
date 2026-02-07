
const express = require('express');

const axios = require('axios');

const cors = require('cors');



const app = express();



app.use(cors());

app.use(express.json({ limit: '50mb' }));

app.use(express.static('public'));



// Rowan ရဲ့ Key အသစ်ကို ထည့်သွင်းထားသည်

const OPENROUTER_KEY = "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";



app.post('/api/baydin', async (req, res) => {

    try {

        const { name, age, gender, question } = req.body;

        console.log(`ဗေဒင်တွက်ချက်ရန် တောင်းဆိုမှု ရောက်ရှိလာပါပြီ - အမည်: ${name}`);



        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {

            // OpenRouter မှာ လက်ရှိ အလုပ်လုပ်နေတဲ့ Gemini 2.0 Flash Model နာမည်

            model: "google/gemini-2.0-flash-001", 

            messages: [

                {

                    role: "system",

                    content: "မင်းက မြန်မာ့ရိုးရာ ဗေဒင်ပညာရှင် ဆရာကြီးပါ။ ပေးထားတဲ့ အချက်အလက်တွေပေါ် မူတည်ပြီး မြန်မာလိုပဲ ယဉ်ကျေးစွာနဲ့ တိတိကျကျ ဟောပေးပါ။"

                },

                {

                    role: "user",

                    content: `အမည်: ${name}, အသက်: ${age}, ጾတာ: ${gender}, မေးခွန်း: ${question}။ ဤအချက်အလက်များကို ကြည့်၍ ဟောစာတမ်း တိုတိုနှင့် ထိထိမိမိ ထုတ်ပေးပါ။`

                }

            ]

        }, {

            headers: {

                "Authorization": `Bearer ${OPENROUTER_KEY}`,

                "Content-Type": "application/json",

                "HTTP-Referer": "http://localhost:3000", 

                "X-Title": "Lulu AI Baydin"

            }

        });



        if (response.data && response.data.choices && response.data.choices[0]) {

            const aiReply = response.data.choices[0].message.content;

            res.json({ result: aiReply });

        } else {

            res.status(500).json({ error: "API မှ အဖြေမရရှိနိုင်ပါ။" });

        }



    } catch (error) {

        console.error("OpenRouter Error Detail:", error.response ? error.response.data : error.message);

        res.status(500).json({ error: "ဗေဒင်ဆရာကြီး ခေတ္တအနားယူနေပါသည်။" });

    }

});



const PORT = 3000;

app.listen(PORT, () => {

    console.log(`=========================================`);

    console.log(`Lulu AI Server started on http://localhost:${PORT}`);

    console.log(`=========================================`);

});

