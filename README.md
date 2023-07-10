const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals


const bot = mineflayer.createBot({
  host: 'localhost', //Айпи сервер
  port: '', //Порт сервера
  username: '', //Никнаем бота
  verseon: //Версия бот
})


bot.loadPlugin(pathfinder) //Загрузка ходибы

bot.on('spawn', () => {
  const defaultMove = new Movements(bot)
  
  bot.on('chat', function(username, message) {
  
    if (username === bot.username) return

    const target = bot.players[username] ? bot.players[username].entity : null
    if (message === 'сюда!') {
      if (!target) {
        bot.chat('Вы где')
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

