const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals


const bot = mineflayer.createBot({
  host: 'contrf.aternos.me', //Айпи сервер
  port: '11544', //Порт сервера
  username: 'XA4BURIK', //Никнаем бота
  verseon: false //Версия бот
})


bot.loadPlugin(pathfinder) //Загрузка ходибы

bot.on('spawn', () => {
  const defaultMove = new Movements(bot)
  
  bot.on('chat', function(username, message) {
  
    if (username === bot.username) return

    const target = bot.players[username] ? bot.players[username].entity : null
    if (message === 'сюда!') {
      if (!target) {
        bot.chat('Ты где блять!')
        return
      }
      const p = target.position

      bot.pathfinder.setMovements(defaultMove)
      bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
    } 
    else
    if (message === 'стоять') {
        bot.pathfinder.setGoal(null)
      }
        
  })
})

