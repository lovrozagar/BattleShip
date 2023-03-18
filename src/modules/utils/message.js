import Game from '../factories/game'

const Message = (() => {
  const messages = {
    welcome: [
      'Welcome aboard',
      'Plan our formation by selecting the axis and dragging and dropping ships on the map.',
    ],
    battleStartPlayer: [
      "all systems are online and ready for action. Let's give 'em hell!",
    ],
    battleStartEnemy: [
      "I'll show you no mercy, just like your father showed none to mine.",
    ],
    enemyHit: [
      "They're getting schooner-ed, sir.",
      'This battle is a tidal wave of victory!',
      'The enemy ship is feeling the pressure, sir.',
      "We've got them on the ropes sir, I mean rigging!",
      "That was textbook, Captain. They're going down in no time.",
      'Target hit. Enemy vessel has sustained significant damage.',
      'Captain, we have successfully landed a blow on the enemy vessel.',
      "That hit was right on the money, Captain. We've got them reeling.",
      "BOOM! Enemy ship gets hit hard! That's what I call a depth charge!",
      "Direct hit achieved. Enemy ship's combat effectiveness is significantly reduced.",
    ],
    enemySunk: [
      'Captain, the enemy vessel is going down. That was one hell of a shot.',
      'Sir, that was a hit for the history books. The enemy ship has been sunk.',
      "We've just sunk the enemy ship, Captain. They won't be troubling us anymore.",
      "Captain, we've just delivered a knockout blow. The enemy ship has been sunk.",
      "We've just sent the enemy ship to Davy Jones' locker, Captain. Job well done.",
      "Captain, the enemy ship has been vanquished. They won't be bothering us again.",
      'That hit was a decisive blow, Captain. The enemy ship has met its watery grave.',
      'That was a direct hit, Captain. The enemy ship is now resting on the ocean floor.',
      "The enemy ship has been put out of commission. They won't be troubling us anymore.",
      "We've just given the enemy ship a one-way ticket to the bottom of the ocean, Captain.",
    ],
    playerMiss: [
      'Close, but no cigar.',
      'Our aim needs work, captain.',
      'Negative on that shot, captain.',
      'No hit, captain. Keep fighting.',
      'That was a swing and a miss, sir.',
      'No dice on that one. Keep trying!',
      'The enemy is proving to be elusive, sir.',
      'Looks like we need to adjust our aim, sir.',
      'Looks like we need to recalibrate our aim, sir.',
      "We're not making much headway, captain. What's the plan?",
    ],
    playerHit: [
      'Your time is up!',
      'Hehehe, your luck is running out,',
      'Brace yourself for the real pain!',
      "That was just a taste of what's to come.",
      "You'll be swimming with the fishes soon enough.",
      "My torpedoes have your number, it's over for you!",
      "So predictable, you're not even worth the ammunition",
      'How does it feel to be on the receiving end of my wrath?',
      "Your luck has run out, and there's nowhere left to hide!",
      'Looks like I hit a nerve. How about a little retaliation?',
    ],
    playerSunk: [
      "Looks like you'll be swimming home. Hehehe.",
      'You fought like a coward and died like a dog.',
      'Looks like your ship was no match for our firepower.',
      "Another one bites the dust. It's too easy to crush your kind.",
      'Your demise was inevitable. The sea always takes what it wants.',
      'Did you really think you stood a chance against us? How foolish.',
      "It's a shame your ship couldn't withstand the might of our fleet.",
      "The ocean belongs to the strong. Your ship didn't stand a chance.",
      'You made a grave mistake challenging me. Your defeat was certain.',
      'You should have surrendered while you had the chance. Now look at you.',
    ],
    enemyMiss: [
      "I'll get you next time.",
      'My turn to strike again.',
      'Missed, but not for long.',
      "You can run, but you can't hide.",
      "You can't escape my sight forever.",
      'Your luck is just prolonging the inevitable.',
      'My torpedoes will find you, no matter where you hide.',
      "You may have dodged one, but you can't dodge them all.",
      'That was just a warning shot, the real attack is coming.',
      "You're playing with fire, and I have a lot of ammunition.",
    ],
    noComment: ['...'],
    playerWin: [
      'Mission accomplished, Captain! You truly are the master of the seas.',
    ],
    enemyWin: [
      'You were no match for me scum. Consider it payback for what your father did to mine.',
    ],
  }

  function getWelcomeMessage() {
    messages.welcome[0] += ` ${Game.getState().getPlayer().getName()}!`
    return messages.welcome
  }

  function getBattleStartMessage() {
    return [
      `${Game.getState().getPlayer().getName()} ${
        messages.battleStartPlayer[0]
      }`,
    ]
  }

  function getNewEnemyBattleStartMessage() {
    return messages.battleStartEnemy
  }

  function getNewEnemyHitMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.enemyHit[randomZeroToNine()]

    return newMessage
  }

  function getNewEnemySunkMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.enemySunk[randomZeroToNine()]

    return newMessage
  }

  function getNewPlayerMissMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.playerMiss[randomZeroToNine()]

    return newMessage
  }

  function getNewPlayerHitMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.playerHit[randomZeroToNine()]

    return newMessage
  }

  function getNewPlayerSunkMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.playerSunk[randomZeroToNine()]

    return newMessage
  }

  function getNewEnemyMissMessage(previousMessage) {
    let newMessage = previousMessage

    while (newMessage === previousMessage)
      newMessage = messages.enemyMiss[randomZeroToNine()]

    return newMessage
  }

  function getNoCommentMessage() {
    return messages.noComment
  }

  function getPlayerWinMessage() {
    return messages.playerWin
  }

  function getEnemyWinMessage() {
    return messages.enemyWin
  }

  function randomZeroToNine() {
    return Math.floor(Math.random() * 10)
  }

  return {
    getWelcomeMessage,
    getBattleStartMessage,
    getNewEnemyBattleStartMessage,
    getNewEnemyHitMessage,
    getNewEnemySunkMessage,
    getNewPlayerMissMessage,
    getNewPlayerHitMessage,
    getNewPlayerSunkMessage,
    getNewEnemyMissMessage,
    getNoCommentMessage,
    getPlayerWinMessage,
    getEnemyWinMessage,
  }
})()

export default Message
