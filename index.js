const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '2031969715:AAGNQQ2VXC0yLg17q3bBU1ETY4lnbAYyv0A'

const bot = new TelegramApi(token,{polling: true})

const chats = {}



const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а вы попробуйте отгадать:)`)
  const randomNumber = Math.floor(Math.random() * 10)
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Отгадывайте', gameOptions)
}

const start = () => {
  bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Получить информацию о пользователе'},
    {command: '/game', description: 'Игра угадай цифру'},

  ])

  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/b50/063/b5006369-8faa-44d7-9f02-1ca97d82cd49/1.webp')
      return  bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Full Stack разработчиков`)
    }
    if (text === '/info') {
      return bot.sendMessage(chatId, `Вас зовут ${msg.from.first_name} ${msg.from.last_name}`)
    }
    if (text === '/game'){
     return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'Я вас не понимаю, попробуйте еще раз.')

  })

  bot.on('callback_query', async msg => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again') {
      return startGame(chatId)
    }
    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, `Поздравляю, вы отгадали цифру ${chats[chatId]}!`, againOptions)
    } else {
      return await bot.sendMessage(chatId, `К сожалению вы не угадали цифру, бот загадал цифру ${chats[chatId]}`, againOptions)
    }
  })
}

start()