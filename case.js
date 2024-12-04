require("./config")
const { WA_DEFAULT_EPHEMERAL, getAggregateVotesInPollMessage, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, downloadContentFromMessage, areJidsSameUser, getContentType, useMultiFileAuthState, makeWASocket, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, makeWaSocket } = require("@whiskeysockets/baileys")
const fs = require('fs')
const util = require('util')
const axios = require('axios')
const { exec } = require("child_process")
const chalk = require('chalk')
const cheerio = require('cheerio')
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const path = require("path");
const qs = require('qs');

module.exports = async (Rifky, m) => {
try {
const from = m.key.remoteJid
var body = (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ""

const { smsg, fetchJson, getBuffer, fetchBuffer, getGroupAdmins, TelegraPh, isUrl, hitungmundur, sleep, clockString, checkBandwidth, runtime, tanggal, getRandom } = require('./lib/myfunc')

const budy = (typeof m.text === 'string') ? m.text : '';
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const sender = m.key.fromMe ? (Rifky.user.id.split(':')[0]+'@s.whatsapp.net' || Rifky.user.id) : (m.key.participant || m.key.remoteJid)
const botNumber = await Rifky.decodeJid(Rifky.user.id)
const senderNumber = sender.split('@')[0]
const isCreator = (m && m.sender && [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)) || false;
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)


const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = m.isGroup ? await Rifky.groupMetadata(from).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
if (m.message) {
console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', from))
}

try {
ppuser = await Rifky.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const reSize = async(buffer, ukur1, ukur2) => {
 return new Promise(async(resolve, reject) => {
let jimp = require('jimp')
var baper = await jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
resolve(ab)
 })
}
const fkethmb = await reSize(ppuser, 300, 300)
let jimp = require("jimp")
const resize = async (image, width, height) => {
const read = await jimp.read(image);
const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
return data;
};

global.public = true
if (!global.public) {
if (!m.key.fromMe && !isCreator) return
}

const reply = (teks) => {
m.reply(teks)
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}

switch(command) {
case 'yousearch': {
let input = `Ex : ${prefix + command} Siapakah Presiden Indonesia Sekarang`

if (!text) return m.reply(input)
const website = axios.create({
baseURL: "https://app.yoursearch.ai",
headers: {
"Content-Type": "application/json",
},
});

const yousearch = async (searchTerm) => {
const requestData = {
searchTerm: searchTerm,
promptTemplate: `Search term: "${searchTerm}"

Make your language less formal and use emoticons.
I want you to always use Indonesian slang from Jakarta where the words "you" and "anda" are replaced with "lu" and the word I is replaced with "gw".
Create a summary of the search results in three paragraphs with reference numbers, which you then list numbered at the bottom.
Include emojis in the summary.
Be sure to include the reference numbers in the summary.
Both in the text of the summary and in the reference list, the reference numbers should look like this: "(1)".
Formulate simple sentences.
Include blank lines between the paragraphs.
Do not reply with an introduction, but start directly with the summary.
Include emojis in the summary.
At the end write a hint text where I can find search results as comparison with the above search term with a link to Google search in this format \`See Google results: \` and append the link.
Below write a tip how I can optimize the search results for my search query.
I show you in which format this should be structured:

\`\`\`
<Summary of search results with reference numbers>

Sources:
(1) <URL of the first reference>
(2) <URL of the second reference>

<Hint text for further search results with Google link>
<Tip>
\`\`\`

Here are the search results:
{searchResults}`,
searchParameters: "{}",
searchResultTemplate: `[{order}] "{snippet}"
URL: {link}`,
};

try {
const response = await website.post("/api", requestData);
return response.data.response;
} catch (error) {
console.error("Error:", error);
throw error;
}
};

let hanjing = await yousearch(text)
reply(`${hanjing}`)
}
break

case 'menu': {
let teko = `
ʟɪʏᴀᴀ - ᴍᴅ v1.0 Free Edition

▧ Owner Menu
.upch

▧ AI Menu
.gemini
.yousearch
.claude
.hercai
.remini
.txt2img

▧ Tools Menu
.get
.qc
.trackip
.faketweet

▧ Downloader Menu
.ttdown
.ttdown2
.gdrive

▧ Info Menu
.os

▧ Other Menu
.galau
.grupsearch
.pixiv
.gsmarena
.npms
.waifu
`
Rifky.sendMessage(
m.chat,
{
document: fs.readFileSync("./package.json"),
fileName: `Hi!! ${pushname}`,
fileLength: "99999999999999",
caption: teko,
mimetype: "image/png",
headerType: 9,
jpegThumbnail: fkethmb,
},
{ quoted: ftoko, ephemeralExpiration: 86400 },
);


}
break;

case 'npms':
case 'npmsearch': {
if (!text) return m.reply(`Contoh ${command} nama package`)
let res = await fetch(`http://registry.npmjs.com/-/v1/search?text=${text}`)
let { objects } = await res.json()
if (!objects.length) return m.reply('Tidak ditemukan')
let txt = objects.map(({ package: pkg }) => {
return `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
}).join`\n\n`
m.reply(txt)
}
break

case 'gsmarena': {
 if (args.length === 0) {
 m.reply('Silakan masukkan nama perangkat yang ingin dicari.');
 return;
 }

 async function gsmSearch(q) {
 try {
 const response = await axios({
 method: "get",
 url: `https://gsmarena.com/results.php3?sQuickSearch=yes&sName=${q}`
 });
 const $ = cheerio.load(response.data);
 const result = [];
 
 const device = $(".makers").find("li");
 device.each((i, e) => {
 const img = $(e).find("img");
 result.push({
 id: $(e).find("a").attr("href").replace(".php", ""),
 name: $(e).find("span").html().split("<br>").join(" "),
 description: img.attr("title")
 });
 });
 return result;
 } catch (error) {
 console.error(error);
 throw error;
 }
 }

 gsmSearch(q).then(results => {
 if (results.length === 0) {
 m.reply('Tidak ada hasil yang ditemukan.');
 return;
 }
 
 let replyText = `Hasil pencarian untuk "${q}":\n\n`;
 results.forEach((device, index) => {
 replyText += `${index + 1}. ${device.name}\nDeskripsi: ${device.description}\nLink: https://gsmarena.com/${device.id}.php\n\n`;
 });
 
 m.reply(replyText);
 }).catch(error => {
 m.reply('Terjadi kesalahan saat mencari perangkat.');
 console.error(error);
 });
}
break

case 'grupsearch': {
if (!text) return m.reply('Masukkan query pencarian, misalnya: grupsearch india');
const cheerio = require('cheerio');
const axios = require('axios');

async function skyZo(url) {
try {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
const links = [];

$('a.entry-image-link').each((index, element) => {
const href = $(element).attr('href');
if (href) {
links.push(href);
}
});

return links;
} catch (error) {
console.error('Error fetching the page:', error);
return [];
}
}

async function avoskyJ(url) {
try {
const { data } = await axios.get(url);
const $ = cheerio.load(data);
const links = [];
let counter = 1;

$('a[href*="chat.whatsapp.com"]').each((index, element) => {
const href = $(element).attr('href');
if (href) {
links.push(`${counter}). ${href}`);
counter++;
}
});

return links.length > 0 ? links.join('\n') : 'Tidak ada link WhatsApp.';
} catch (error) {
console.error('Error fetching the page:', error);
return 'Error.';
}
}

const query = text.trim();
const searchUrl = `https://whatsgrouplink.com/?s=${encodeURIComponent(query)}`;

skyZo(searchUrl).then(async links => {
if (links.length > 0) {

const randomLink = links[Math.floor(Math.random() * links.length)];

const result = await avoskyJ(randomLink);

m.reply(`Link Source Yang Dipilih: ${randomLink}\n\nLink grup WhatsApp yang ditemukan:\n${result}`);
} else {
m.reply('Tidak ada link yang.');
}
}).catch(error => {
console.error('Error:', error);
m.reply('Terjadi kesalahan 404 Errrrr Rrorr');
});
}
break

case 'trackip':
{
if (!text) return m.reply(`*Example:* ${prefix + command} 112.90.150.204`);
try {
let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());

const formatIPInfo = (info) => {
 return `
*IP Information*
• IP: ${info.ip || 'N/A'}
• Success: ${info.success || 'N/A'}
• Type: ${info.type || 'N/A'}
• Continent: ${info.continent || 'N/A'}
• Continent Code: ${info.continent_code || 'N/A'}
• Country: ${info.country || 'N/A'}
• Country Code: ${info.country_code || 'N/A'}
• Region: ${info.region || 'N/A'}
• Region Code: ${info.region_code || 'N/A'}
• City: ${info.city || 'N/A'}
• Latitude: ${info.latitude || 'N/A'}
• Longitude: ${info.longitude || 'N/A'}
• Is EU: ${info.is_eu ? 'Yes' : 'No'}
• Postal: ${info.postal || 'N/A'}
• Calling Code: ${info.calling_code || 'N/A'}
• Capital: ${info.capital || 'N/A'}
• Borders: ${info.borders || 'N/A'}
• Flag:
 - Image: ${info.flag?.img || 'N/A'}
 - Emoji: ${info.flag?.emoji || 'N/A'}
 - Emoji Unicode: ${info.flag?.emoji_unicode || 'N/A'}
• Connection:
 - ASN: ${info.connection?.asn || 'N/A'}
 - Organization: ${info.connection?.org || 'N/A'}
 - ISP: ${info.connection?.isp || 'N/A'}
 - Domain: ${info.connection?.domain || 'N/A'}
• Timezone:
 - ID: ${info.timezone?.id || 'N/A'}
 - Abbreviation: ${info.timezone?.abbr || 'N/A'}
 - Is DST: ${info.timezone?.is_dst ? 'Yes' : 'No'}
 - Offset: ${info.timezone?.offset || 'N/A'}
 - UTC: ${info.timezone?.utc || 'N/A'}
 - Current Time: ${info.timezone?.current_time || 'N/A'}
`;
};
 
if (!res.success) throw new Error(`IP ${text} not found!`);
await Rifky.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude } }, { ephemeralExpiration: 604800 });
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
await delay(2000);
m.reply(formatIPInfo(res)); 
} catch (e) { 
m.reply(`Error: Unable to retrieve data for IP ${text}`);
}
}
break

case 'waifu': {
const waifud = await fetchJson 
(`https://pic.re/image.json`)
const waifut = "https://" + waifud.file_url
Rifky.sendMessage(from, { image: { url: waifut }, caption: `Size: ${waifud.file_size}` }, { quoted: m })
}
break

case 'pixiv': {
if (!text) return reply(`Example: ${prefix + command} harimau`);
async function pixiv(word) {
var { get } = require("axios")
const url = 'https://www.pixiv.net/touch/ajax/tag_portal';
const params = { word, lang: 'en', version: 'b355e2bcced14892fe49d790ebb9ec73d2287393' };
const headers = {
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36',
'Referer': 'https://www.pixiv.net/',
'Accept-Encoding': 'gzip, deflate, br'
};
const { data } = await get(url, { params, headers });
const illusts = data.body.illusts;
const random = illusts[Math.floor(Math.random() * illusts.length)].url;
const image = await axios.get(random, { responseType: 'arraybuffer', headers });

return image.data;
}
let hannunibakwan = await pixiv(text)
await Rifky.sendMessage(m.chat, { image: hannunibakwan, caption: "Done" }, { quoted:m });
}
break

case 'txt2img': {
if (!text) return m.reply(`Example: ${prefix + command} cat`)
async function photoleap(prompt) {
try {
let result = []
for (let i = 0; i < 3; i++) {
let {
data
} = await axios.get('https://tti.photoleapapp.com/api/v1/generate?prompt=' + prompt);
result.push(data.result_url)
}
return result
} catch (e) {
return ({
msg: 404
})
}
}

let tahu = await photoleap(text)
for (const x of tahu) {
Rifky.sendMessage(m.chat, {image: {url: x}, caption: `Done`}, {quoted: m})
}
}
break

case 'faketweet':{
const canvafy = require('canvafy')
if (!text) return m.reply(`Exmaple : Name1 | Name2 | Text`)
 nama1 = text.split("|")[0]
 nama2 = text.split("|")[1]
 katakata = text.split("|")[2]
const tweet = await new canvafy.Tweet()
.setTheme("dim")
.setUser({displayName: nama1, username: nama2})
.setVerified(true)
.setComment(katakata)
.setAvatar(ppnyauser)
.build();
 let tanaka = tweet
Rifky.sendMessage(m.chat, { image: tanaka, caption: 'Done Desuu~' },{ quoted : m }) 
}
break

case 'gdrive': { 
if (!text) return reply(`Example ${prefix + command} url`)
async function GDriveDl(url) {
	let id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))?.[1]
	if (!id) return reply('ID Not Found')
	let res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
		method: 'post',
		headers: {
			'accept-encoding': 'gzip, deflate, br',
			'content-length': 0,
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'origin': 'https://drive.google.com',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
			'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
			'x-drive-first-party': 'DriveWebUi',
			'x-json-requested': 'true' 
		}
	})
	let { fileName, sizeBytes, downloadUrl } =JSON.parse((await res.text()).slice(4))
	if (!downloadUrl) return reply('Link Download Limit!')
	let data = await fetch(downloadUrl)
	if (data.status !== 200) throw data.statusText
	return {
		downloadUrl, fileName,
		fileSize: (sizeBytes / 1024 / 1024).toFixed(2),
		mimetype: data.headers.get('content-type')
	}
}
try {
let kanjuttgede = await GDriveDl(text)
let bjirrbang = `*Google Drive*\n\nNama: ${kanjuttgede.fileName}\nLink: ${kanjuttgede.downloadUrl}`
reply(bjirrbang)
await Rifky.sendMessage(m.chat, { document: { url: kanjuttgede.downloadUrl }, fileName: kanjuttgede.fileName, mimetype: kanjuttgede.mimetype }, { quoted: m })
} catch (error) {
m.reply(`${error.message}`)
}
}
break

case 'os': {
const os = require('os')

function formatUptime(uptime) {
const detik = Math.floor(uptime % 60)
const menit = Math.floor((uptime / 60) % 60)
const jam = Math.floor((uptime / 3600) % 24)
return `${jam} jam, ${menit} menit, ${detik} detik`
}

function getVersions(callback) {
exec('node -v', (err, nodeVersion) => {
if (err) nodeVersion = '✖️'
exec('npm -v', (err, npmVersion) => {
if (err) npmVersion = '✖️'
exec('ffmpeg -version', (err, ffmpegVersion) => {
if (err) ffmpegVersion = '✖️'
exec('python --version || python3 --version || py --version', (err, pythonVersion) => {
if (err) pythonVersion = '✖️'
exec('pip --version || pip3 --version', (err, pipVersion) => {
if (err) pipVersion = '✖️'
exec('choco -v', (err, chocoVersion) => {
if (err) chocoVersion = '✖️'
callback({ nodeVersion, npmVersion, ffmpegVersion, pythonVersion, pipVersion, chocoVersion })
})
})
})
})
})
})
}

function getStorageInfo(callback) {
if (os.platform() === 'win32') {
exec('wmic logicaldisk get size,freespace,caption', (err, stdout) => {
if (err) return callback('✖️')
const lines = stdout.trim().split('\n').slice(1)
const infoPenyimpanan = lines.map(line => {
const [drive, free, total] = line.trim().split(/\s+/)
return `🖥️ ${drive}: ${(total / (1024 ** 3)).toFixed(2)} GB total, ${(free / (1024 ** 3)).toFixed(2)} GB bebas`
}).join('\n')
callback(infoPenyimpanan)
})
} else {
exec('df -h --output=source,size,avail,target', (err, stdout) => {
if (err) return callback('✖️')
const lines = stdout.trim().split('\n').slice(1)
const infoPenyimpanan = lines.map(line => {
const [device, total, free, mount] = line.trim().split(/\s+/)
return `🖥️ ${mount}: ${total} total, ${free} bebas di ${device}`
}).join('\n')
callback(infoPenyimpanan)
})
}
}

function getLinuxInfo(callback) {
exec('cat /etc/os-release', (err, osInfo) => {
if (err) osInfo = '✖️'
callback(osInfo.trim())
})
}

function getBatteryInfo(callback) {
if (os.platform() === 'linux' || os.platform() === 'darwin') {
exec('upower -i $(upower -e | grep BAT)', (err, batteryInfo) => {
if (err) return callback('✖️')
callback(batteryInfo)
})
} else if (os.platform() === 'win32') {
exec('WMIC Path Win32_Battery Get EstimatedChargeRemaining', (err, batteryInfo) => {
if (err) return callback('✖️')
callback(`🔋 ${batteryInfo.trim()}%`)
})
} else {
callback('✖️')
}
}

function getSystemInfo() {
return {
platform: os.platform(),
cpuArch: os.arch(),
cpus: os.cpus().length,
totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + ' GB',
freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + ' GB',
uptime: formatUptime(os.uptime()),
osVersion: os.release(),
loadAverage: os.loadavg().map(load => load.toFixed(2)).join(', ')
}
}

const sistemInfo = await getSystemInfo()
getVersions((versi) => {
getBatteryInfo((statusBaterai) => {
getStorageInfo((infoPenyimpanan) => {
getLinuxInfo((infoLinux) => {
let txt = `> *📊 Informasi Sistem*\n\n`
txt += `- 🌐 *Platform*: _${sistemInfo.platform}_\n`
txt += `- 💻 *Arsitektur CPU*: ${sistemInfo.cpuArch}\n`
txt += `- 🧠 *Jumlah CPU*: ${sistemInfo.cpus}\n`
txt += `- 🗄️ *Memori Total*: ${sistemInfo.totalMemory}\n`
txt += `- 🗃️ *Memori Bebas*: ${sistemInfo.freeMemory}\n`
txt += `- ⏱️ *Waktu Aktif*: ${sistemInfo.uptime}\n`
txt += `- 📀 *Versi OS*: ${sistemInfo.osVersion}\n`
txt += `- 📊 *Rata-rata Beban (1, 5, 15 menit)*: ${sistemInfo.loadAverage}\n`
txt += `- 🔋 *Energi*: ${statusBaterai}\n\n`

txt += `> *💾 Penyimpanan*\n`
txt += `${infoPenyimpanan}\n\n`

txt += `> *🛠️ Versi Alat*\n\n`
txt += `- ☕ *Node.js*: ${versi.nodeVersion.trim()}\n`
txt += `- 📦 *NPM*: ${versi.npmVersion.trim()}\n`
txt += `- 🎥 *FFmpeg*: ${versi.ffmpegVersion.split('\n')[0]}\n`
txt += `- 🐍 *Python*: ${versi.pythonVersion.trim()}\n`
txt += `- 📦 *PIP*: ${versi.pipVersion.trim()}\n`
txt += `- 🍫 *Chocolatey*: ${versi.chocoVersion.trim()}\n\n`

if (os.platform() === 'linux') {
txt += `> *🐧 Distribusi Linux*\n${infoLinux}\n`
}

m.reply(txt)
})
})
})
})
}
break

case 'qc': {
const quoteApi = require('@neoxr/quote-api')
const { Sticker } = require('wa-sticker-formatter')
if (!text) m.reply(`Example: ${prefix + command} halo`);
let avatar = await Rifky.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.ibb.co/2WzLyGk/profile.jpg')

const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#2E4053",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
"url": avatar
}
},
"text": text,
"replyMessage": {}
}
]
}

async function createSticker(req, url, packName, authorName, quality) {
let stickerMetadata = {
type: 'full',
pack: packName,
author: authorName,
quality
}
return (new Sticker(req ? req : url, stickerMetadata)).toBuffer()
}

const res = await quoteApi(json)
const buffer = Buffer.from(res.image, 'base64')
let stiker = await createSticker(buffer, false, "Hann Universe", "Liyaa - MD")
Rifky.sendFile(m.chat, stiker, 'sticker.webp', '', m)
}
break
case 'galau': {
const { createCanvas, loadImage } = require('canvas');
async function addTextToImage(topText, bottomText) {
const image = await loadImage(`https://minimalistic-wallpaper.demolab.com/?random`);
const canvas = createCanvas(image.width, image.height);
const ctx = canvas.getContext('2d');
ctx.drawImage(image, 0, 0, image.width, image.height);
ctx.font = '80px Arial';
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
const words = text.split(' ');
let line = '';
let lines = [];
for (let i = 0; i < words.length; i++) {
const testLine = line + words[i] + ' ';
const metrics = ctx.measureText(testLine);
const testWidth = metrics.width;
if (testWidth > maxWidth && i > 0) {
lines.push(line);
line = words[i] + ' ';
} else {
line = testLine;
}
}
lines.push(line);
for (let j = 0; j < lines.length; j++) {
ctx.fillText(lines[j], x, y + j * lineHeight);
ctx.strokeText(lines[j], x, y + j * lineHeight);
}
}
const maxWidth = canvas.width * 0.8;
const lineHeight = 90;
const topTextY = canvas.height / 3;
const bottomTextY = (canvas.height / 3) * 2;
wrapText(ctx, topText, canvas.width / 2, topTextY, maxWidth, lineHeight);
wrapText(ctx, bottomText, canvas.width / 2, bottomTextY, maxWidth, lineHeight);
 return canvas.toBuffer() 

}

global.galau = [
"Gak salah kalo aku lebih berharap sama orang yang lebih pasti tanpa khianati janji-janji",
"Rasanya baru kemarin kamu menawariku seblak. Lalu entah mengapa hari ini menanyakan kabar pun tidak.\n~vinaa",
"What's the point of us being close yesterday?\n~Vinaa",
"Kamu tidak bisa memaksa seseorang untuk menomor satukan dirimu, sebab prioritas dengan kebutuhan itu jelas beda.\n*BY PUTRI*",
"Hubungan kita hanya sampai dilisan, tidak sampai dipertemukan.\n*BY PUTRI*",
"Dia sesuka hati, kamu setulus hati.\n*BY PUTRI*",
"Mengakhiri bukan berarti tidak mau berjuang lagi...hanya saja aku tidak mau ada lgi,hati yg tersakiti.\n\nBy putri",
"Maaf. Tidak ada waktu untuk meladeni gabutmu. Karena aku sibuk dengan kesibukan ku.\n*BY PUTRI*",
"Pelangimu mungkin banyak warna. Tapi, tak ada warna yang membuat dia menaruh rasa.\n*BY PUTRI*",
"Bahagia terus ya,sampai saat ini lu masih jadi tokoh favorit dikisah hidup gue,luv u.\n\n*BY PUTRI*",
"Sorry,gue ga kuat buat semuanya ,mksi ya\n\n*BY PUTRI*",
"Kamu memang sosok yg tak terduga Mudah membuat ku bahagia,mudah membuatku hancur saat itu juga.\n\n*BY PUTRI*",
"Harusnya kalo udah ga sayang sama aku tu bilang aja gausa di tutup tutupin\n*BY INDI*",
"Kalau aku memang tidak sayang sama kamu ngapain aku mikirin kamu. Tapi semuanya kamu yang ngganggap aku gak sayang sama kamu",
"Jangan iri dan sedih jika kamu tidak memiliki kemampuan seperti yang orang miliki. Yakinlah orang lain juga tidak memiliki kemampuan sepertimu",
"Hanya kamu yang bisa membuat langkahku terhenti, sambil berkata dalam hati mana bisa aku meninggalkanmu",
"Tetap tersenyum walaluku masih dibuat menunggu dan rindu olehmu, tapi itu demi kamu",
"Tak semudah itu melupakanmu",
"Secuek-cueknya kamu ke aku, aku tetap sayang sama kamu karena kamu telah menerima aku apa adanya",
"Aku sangat bahagia jika kamu bahagia didekatku, bukan didekatnya",
"Jadilah diri sendiri, jangan mengikuti orang lain, tetapi tidak sanggup untuk menjalaninya",
"Cobalah terdiam sejenak untuk memikirkan bagaimana caranya agar kita dapat menyelesaikan masalah ini bersama-sama",
"Bisakah kita tidak bermusuhan setelah berpisah, aku mau kita seperti dulu sebelum kita jadian yang seru-seruan bareng, bercanda dan yang lainnya",
"Aku ingin kamu bisa langgeng sama aku dan yang aku harapkan kamu bisa jadi jodohku",
"Cinta tak bisa dijelaskan dengan kata-kata saja, karena cinta hanya mampu dirasakan oleh hati",
"Masalah terbesar dalam diri seseorang adalah tak sanggup melawan rasa takutnya",
"Selamat pagi buat orang yang aku sayang dan orang yang membenciku, semoga hari ini hari yang lebih baik daripada hari kemarin buat aku dan kamu",
"Jangan menyerah dengan keadaanmu sekarang, optimis karena optimislah yang bikin kita kuat",
"Kepada pria yang selalu ada di doaku aku mencintaimu dengan tulus apa adanya",
"Tolong jangan pergi saat aku sudah sangat sayang padamu",
"Coba kamu yang berada diposisiku, lalu kamu ditinggalin gitu aja sama orang yang lo sayang banget",
"Aku takut kamu kenapa-napa, aku panik jika kamu sakit, itu karena aku cinta dan sayang padamu",
"Sakit itu ketika cinta yang aku beri tidak kamu hargai",
"Kamu tiba-tiba berubah tanpa sebab tapi jika memang ada sebabnya kamu berubah tolong katakan biar saya perbaiki kesalahan itu",
"Karenamu aku jadi tau cinta yang sesungguhnya",
"Senyum manismu sangatlah indah, jadi janganlah sampai kamu bersedih",
"Berawal dari kenalan, bercanda bareng, ejek-ejekan kemudian berubah menjadi suka, nyaman dan akhirnya saling sayang dan mencintai",
"Tersenyumlah pada orang yang telah menyakitimu agar sia tau arti kesabaran yang luar biasa",
"Aku akan ingat kenangan pahit itu dan aku akan jadikan pelajaran untuk masa depan yang manis",
"Kalau memang tak sanggup menepati janjimu itu setidaknya kamu ingat dan usahakan jagan membiarkan janjimu itu sampai kau lupa",
"Hanya bisa diam dan berfikir Kenapa orang yang setia dan baik ditinggalin yang nakal dikejar-kejar giliran ditinggalin bilangnya laki-laki itu semuanya sama",
"Walaupun hanya sesaat saja kau membahagiakanku tapi rasa bahagia yang dia tidak cepat dilupakan",
"Aku tak menyangka kamu pergi dan melupakan ku begitu cepat",
"Jomblo gak usah diam rumah mumpung malam minggu ya keluar jalan lah kan jomblo bebas bisa dekat sama siapapun pacar orang mantan sahabat bahkan sendiri atau bareng setan pun bisa",
"Kamu adalah teman yang selalu di sampingku dalam keadaan senang maupun susah Terimakasih kamu selalu ada di sampingku",
"Aku tak tahu sebenarnya di dalam hatimu itu ada aku atau dia",
"Tak mudah melupakanmu karena aku sangat mencintaimu meskipun engkau telah menyakiti aku berkali-kali",
"Hidup ini hanya sebentar jadi lepaskan saja mereka yang menyakitimu Sayangi Mereka yang peduli padamu dan perjuangan mereka yang berarti bagimu",
"Tolong jangan pergi meninggalkanku aku masih sangat mencintai dan menyayangimu",
"Saya mencintaimu dan menyayangimu jadi tolong jangan engkau pergi dan meninggalkan ku sendiri",
"Saya sudah cukup tahu bagaimana sifatmu itu kamu hanya dapat memberikan harapan palsu kepadaku",
"Aku berusaha mendapatkan cinta darimu tetapi Kamunya nggak peka",
"Aku bangkit dari jatuh ku setelah kau jatuhkan aku dan aku akan memulainya lagi dari awal Tanpamu",
"Mungkin sekarang jodohku masih jauh dan belum bisa aku dapat tapi aku yakin jodoh itu Takkan kemana-mana dan akan ku dapatkan",
"Datang aja dulu baru menghina orang lain kalau memang dirimu dan lebih baik dari yang kau hina",
"Membelakanginya mungkin lebih baik daripada melihatnya selingkuh didepan mata sendiri",
"Bisakah hatimu seperti angsa yang hanya setia pada satu orang saja",
"Aku berdiri disini sendiri menunggu kehadiran dirimu",
"Aku hanya tersenyum padamu setelah kau menyakitiku agar kamu tahu arti kesabaran",
"Maaf aku lupa ternyata aku bukan siapa-siapa",
"Untuk memegang janjimu itu harus ada buktinya jangan sampai hanya janji palsu",
"Aku tidak bisa selamanya menunggu dan kini aku menjadi ragu Apakah kamu masih mencintaiku",
"Jangan buat aku terlalu berharap jika kamu tidak menginginkanku",
"Lebih baik sendiri daripada berdua tapi tanpa kepastian",
"Pergi bukan berarti berhenti mencintai tapi kecewa dan lelah karena harus berjuang sendiri",
"Bukannya aku tidak ingin menjadi pacarmu Aku hanya ingin dipersatukan dengan cara yang benar",
"Akan ada saatnya kok aku akan benar-benar lupa dan tidak memikirkan mu lagi",
"Kenapa harus jatuh cinta kepada orang yang tak bisa dimiliki",
"Jujur aku juga memiliki perasaan terhadapmu dan tidak bisa menolakmu tapi aku juga takut untuk mencintaimu",
"Maafkan aku sayang tidak bisa menjadi seperti yang kamu mau",
"Jangan memberi perhatian lebih seperti itu cukup biasa saja tanpa perlu menimbulkan rasa",
"Aku bukan mencari yang sempurna tapi yang terbaik untukku",
"Sendiri itu tenang tidak ada pertengkaran kebohongan dan banyak aturan",
"Cewek strong itu adalah yang sabar dan tetap tersenyum meskipun dalam keadaan terluka",
"Terima kasih karena kamu aku menjadi lupa tentang masa laluku",
"Cerita cinta indah tanpa masalah itu hanya di dunia dongeng saja",
"Kamu tidak akan menemukan apa-apa di masa lalu Yang ada hanyalah penyesalan dan sakit hati",
"Mikirin orang yang gak pernah mikirin kita itu emang bikin gila",
"Dari sekian lama menunggu apa yang sudah didapat",
"Perasaan Bodo gue adalah bisa jatuh cinta sama orang yang sama meski udah disakiti berkali-kali",
"Yang sendiri adalah yang bersabar menunggu pasangan sejatinya",
"Aku terlahir sederhana dan ditinggal sudah biasa",
"Aku sayang kamu tapi aku masih takut untuk mencintaimu",
"Bisa berbagi suka dan duka bersamamu itu sudah membuatku bahagia",
"Aku tidak pernah berpikir kamu akan menjadi yang sementara",
"Jodoh itu bukan seberapa dekat kamu dengannya tapi seberapa yakin kamu dengan Allah",
"Jangan paksa aku menjadi cewek seperti seleramu",
"Hanya yang sabar yang mampu melewati semua kekecewaan",
"Balikan sama kamu itu sama saja bunuh diri dan melukai perasaan ku sendiri",
"Tak perlu membalas dengan menyakiti biar Karma yang akan urus semua itu",
"Aku masih ingat kamu tapi perasaanku sudah tidak sakit seperti dulu",
];

let b = await pickRandom(global.galau)
let name = Rifky.getName(m.sender)
let anu = await addTextToImage(b, name) 
Rifky.sendMessage(m.chat, {image: anu}, {quoted: m});
}
break

case 'hd': case 'remini': {
const sharp = require('sharp');
async function upscaleImage(inputPath) {
try {
const tempFilePath = path.join(__dirname, `temp_image_${Date.now()}.jpg`);
fs.writeFileSync(tempFilePath, inputPath);
await sharp(inputPath)
.resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: false })
.sharpen()
.linear(1.2, -(128 * 1.2) + 128)
.modulate({ brightness: 0.98 })
.toFile(tempFilePath);
await Rifky.sendMessage(m.chat, {image: fs.readFileSync(tempFilePath)})
fs.unlinkSync(tempFilePath);
} catch (error) {
console.error('Error processing image:', error);
}
}

const bufferImage = await m.quoted.download()
return upscaleImage(bufferImage)
}
break

case 'ttdown2': {
let input = `Ex : ${prefix + command} https://vt.tiktok.com/ZSYgBPSLD/`

async function tiktok(url) {
try {
const data = new URLSearchParams({
'id': url,
'locale': 'id',
'tt': 'RFBiZ3Bi'
});

const headers = {
'HX-Request': true,
'HX-Trigger': '_gcaptcha_pt',
'HX-Target': 'target',
'HX-Current-URL': 'https://ssstik.io/id',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
'Referer': 'https://ssstik.io/id'
};

const response = await axios.post('https://ssstik.io/abc?url=dl', data, {
headers
});
const html = response.data;

const $ = cheerio.load(html);

const author = $('#avatarAndTextUsual h2').text().trim();
const title = $('#avatarAndTextUsual p').text().trim();
const video = $('.result_overlay_buttons a.download_link').attr('href');
const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
const imgLinks = [];
$('img[data-splide-lazy]').each((index, element) => {
const imgLink = $(element).attr('data-splide-lazy');
imgLinks.push(imgLink);
});

const result = {
isSlide: video ? false : true,
author,
title,
result: video || imgLinks,
audio
};
return result
} catch (error) {
console.error('Error:', error);
return null;
}
}

if (!text) return m.reply(input)

if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
try {
const {
isSlide,
result,
title,
author
} = await tiktok(text);
let no = 1

if (isSlide == true) {
await m.reply('Terdeteksi url tiktok slide\nFoto dikirim ke chat pribadi')
let cap = `乂 *TIK TOK SLIDE*\n\n`
for (let img of result) {


await Rifky.sendMessage(m.sender, {
image: await fetchBuffer(img)
})
}
} else if (isSlide == false) {
await m.reply('Terdeteksi url tiktok video')
let vd = `*${title}*

- Author: ${author}`

await Rifky.sendMessage(m.chat, {
video: await fetchBuffer(result),
caption: vd
}, {
quoted: m
})

}
} catch (e) {
return e
}
}
break

case 'hercai': {
const { Hercai } = require('hercai');
const herc = new Hercai();
if (!text) return m.reply('Mau tanya apa??')
herc.question({ model:"v3", content: text }).then(response => {
m.reply(response.reply);
})
}
break

case 'claude': { 
const Anthropic = require("@anthropic-ai/sdk");
async function upload(buffer) {
let data = new FormData();
data.append("files[]", buffer, "upload.jpg"); 
let response = await fetch("https://uguu.se/upload.php", {
method: "POST",
body: data
});

let res = await response.json()
return res.files[0].url
}

async function apikey() {
const antro = ["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", "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", "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", "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", "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", "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", "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", "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"]
const apikeyRandom = pickRandom(antro)
return apikeyRandom
}

const apikeyy = await apikey

const anthropic = new Anthropic({
apiKey: apikeyy,
});


if (!m.quoted && !m.text) {
m.reply(
"Mohon reply pesan dengan gambar atau ketik teks untuk menghasilkan pesan.",
);
return;
}

let msg = "";

try {
if (m.quoted && m.quoted.mimetype.includes("image")) {
const mediaData = await m.quoted.download();
const up = await upload(mediaData);
const base64Data = Buffer.from(up, "binary").toString("base64"); // Konversi buffer ke base64
msg = await anthropic.messages.create({
model: "claude-3-opus-20240229",
max_tokens: 4000,
temperature: 1,
system: "gunakan hanya bahasa Indonesia",
messages: [
{
role: "user",
content: [
{
type: "text",
text: m.text || "",
},
{
type: "image",
source: {
type: "base64",
media_type: m.quoted.mimetype,
data: base64Data,
},
},
],
},
],
});
} else {
msg = await anthropic.messages.create({
model: "claude-3-opus-20240229",
max_tokens: 4000,
temperature: 1,
system: "gunakan hanya bahasa Indonesia",
messages: [
{
role: "user",
content: [
{
type: "text",
text: m.text || "",
},
],
},
],
});
}

m.reply(msg.content[0].text);
} catch (error) {
console.error(error);
m.reply(error.message);
}
}
break

case 'upsound':
case 'upch':
case 'upaudio':
case 'upmp3': {
if (!isCreator) return
if (!/video/.test(mime) && !/audio/.test(mime)) 
return reply(`Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`);
if (!quoted) 
return reply(`Reply Video/Vn Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`);
await Rifky.sendMessage(m.chat, { 
react: { text: "⏱️", key: m.key }
});
Rifky.sendMessage("", { 
audio: await quoted.download(), 
viewOnce: false, 
ptt: true, 
mimetype: "audio/mpeg", 
fileName: "bot.mp3", 
waveform: [0, 153, 0, 494, 976],
})
await Rifky.sendMessage(m.chat, { 
react: { text: "✅", key: m.key } 
});
}
break;

case 'gemini': {
let hann1 = args[0]
let hann2 = text
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const path = require("path");
const Used_Apikey = "AIzaSyB2mvsGVTZAU-h-GtCLzoLhjHEdvugx9uQ"
const genAI = new GoogleGenerativeAI(Used_Apikey);
const fileManager = new GoogleAIFileManager(Used_Apikey);
switch (hann1) {
case 'chat':
const safetySettings = [
{
category: HarmCategory.HARM_CATEGORY_HARASSMENT,
threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
},
{
category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
},
];

const modello = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });
const prompttt = hann2;
const resultt = await modello.generateContent(prompttt);
const responsek = await resultt.response;
const textt = responsek.text();
reply(textt);
break;
case 'chatprompt':
const modell = genAI.getGenerativeModel({
model: "gemini-1.5-flash",
systemInstruction: "Nama Kamu Adalah Liyaa, Sifat Kamu Adalah Baik, Imut, dan Tenang dalam dirinya. Kamu Dibuat oleh Hann Jika ada yang ditanyakan sama Hann kamu marah",
});
const promptt = hann2;
const resultp = await modell.generateContent(promptt);
const responseqo = await resultp.response;
const textl = responseqo.text();
reply(textl);
break;
case 'audio':
if (!hann2) return m.reply('Mana audio sama perintahnya?')
const modelll = genAI.getGenerativeModel({
model: "gemini-1.5-flash",
});
const fileBuffer = await m.quoted.download()
const base64AudioFile = fileBuffer.toString("base64"); // Convert file content to Base64
const tempFilePathAud = path.join(__dirname, `temp_audio_${Date.now()}.mp3`);
fs.writeFileSync(tempFilePathAud, fileBuffer);
if (/audio/.test(mime)) {
const audioFile = await fileManager.uploadFile(tempFilePathAud, {
mimeType: "audio/mp3",
});
console.log(`Uploaded file ${audioFile.file.uri}`);
fs.unlinkSync(tempFilePathAud);
const result = await modelll.generateContent([
{
inlineData: {
mimeType: "audio/mp3",
data: base64AudioFile
}
},
{ text: hann2 },
]);
reply(result.response.text())
} else reply(`Reply/kirim audionya!`)
break
case 'image':
  if (!hann2) return m.reply('Mana image sama perintahnya?')
const modepl = genAI.getGenerativeModel({
model: "gemini-1.5-pro",
});
const fileBufferrrr = await m.quoted.download()
const tempFilePath = path.join(__dirname, `temp_image_${Date.now()}.jpg`);
fs.writeFileSync(tempFilePath, fileBufferrrr);
if (/image/.test(mime)) {
const uploadResponse = await fileManager.uploadFile(tempFilePath, {
mimeType: "image/jpeg",
displayName: `temp_image_${Date.now()}`,
});
fs.unlinkSync(tempFilePath);
console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
const result = await modepl.generateContent([
{
fileData: {
mimeType: uploadResponse.file.mimeType,
fileUri: uploadResponse.file.uri
}
},
{ text: 'gunakan bahasa indonesia' + hann2 },
]);
reply(result.response.text())
} else m.reply(`Reply to the image`)
break;
case 'video':
  if (!hann2) return m.reply('Mana video sama perintahnya?')
 const modelk = genAI.getGenerativeModel({
model: "gemini-1.5-pro",
}); 
const fileBufferrp = await m.quoted.download()
const tempFilePathp = path.join(__dirname, `temp_video_${Date.now()}.mp4`);
fs.writeFileSync(tempFilePathp, fileBufferrp);
if (/video/.test(mime)) {
const uploadResponseee = await fileManager.uploadFile(tempFilePathp, {
mimeType: "video/mp4",
displayName: `temp_video_${Date.now()}`,
});
fs.unlinkSync(tempFilePathp);
console.log(`Uploaded file ${uploadResponseee.file.displayName} as: ${uploadResponseee.file.uri}`);
const hasilnya = await modelk.generateContent([
{
fileData: {
mimeType: uploadResponseee.file.mimeType,
fileUri: uploadResponseee.file.uri
}
},
{ text: 'gunakan bahasa indonesia' + hann2 },
]);
m.reply(hasilnya.response.text())
} else m.reply(`Reply to the video`)
break;
case 'help':
reply(`
.gemini help - untuk melihat command
.gemini chatprompt - chat dengan gemini menggunakan prompt dari liyaa
.gemini chat - mengobrol sama gemini menggunakan keamanan
.gemini image - chat menggunakan foto dengan gemini
.gemini audio - chat menggunakan audio dengan gemini
.gemini video - chat menggunakan video dengan gemini
`)
break;
default:
Rifky.sendMessage(m.chat, { text: "Maaf kak, jika ada bantuan nya ketik .gemini help" });
}
}
break
case 'get': {
if (!text) return m.reply(`awali *URL* dengan http:// atau https://`)
try {
const gt = await axios.get(text, {
headers: {
"Access-Control-Allow-Origin": "*",
"Referer": "https://www.google.com/",
"Referrer-Policy": "strict-origin-when-cross-origin",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
},
responseType: 'arraybuffer' });
const contentType = gt.headers['content-type'];
console.log(`Content-Type: ${contentType}`);
if (/json/i.test(contentType)) {
const jsonData = JSON.parse(Buffer.from(gt.data, 'binary').toString('utf8'));
return m.reply(JSON.stringify(jsonData, null, 2));
} else if (/text/i.test(contentType)) {
const textData = Buffer.from(gt.data, 'binary').toString('utf8');
return m.reply(textData);
} else if (text.includes('webp')) {
return Rifky.imgToSticker(m.chat, text, m, { packname: "", author: "Hann Universe!!" })
} else if (/image/i.test(contentType)) { return Rifky.sendMessage(m.chat, { image: { url: text }}, { quoted: m });
} else if (/video/i.test(contentType)) { return Rifky.sendMessage(m.chat, { video: { url: text }}, { quoted: m });
} else if (/audio/i.test(contentType) || text.includes(".mp3")) {
return Rifky.sendMessage(m.chat, { audio: { url: text }}, { quoted: m });
} else if (/application\/zip/i.test(contentType) || /application\/x-zip-compressed/i.test(contentType)) {
return Rifky.sendFile(m.chat, text, '', text, m)			
} else if (/application\/pdf/i.test(contentType)) {
return Rifky.sendFile(m.chat, text, '', text, m)
} else {
return m.reply(`MIME : ${contentType}\n\n${gt.data}`);
}
} catch (error) {
console.error(`Terjadi kesalahan: ${error}`);
return m.reply(`Terjadi kesalahan saat mengakses URL: ${error.message}`);
}}
break
default:
if (budy.startsWith('=>')) {
if (!isCreator) return
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await reply(require('util').format(teks))
}
}

if (budy.startsWith('$')) {
if (!isCreator) return
exec(budy.slice(2), (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) return reply(stdout)
})
}
}

} catch (err) {
console.log(util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
