const Utils = (() => {
  const messages = {
    welcome: [
      'Welcome aboard Captain!',
      'Plan our formation by selecting the axis and dragging and dropping ships on the map.',
    ],
    battleStart: [
      "Captain, all systems are online and ready for action. The enemy won't know what hit them. Let's give 'em hell!",
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

    playerSunk: [
      "Looks like you'll be swimming home. Heheh.",
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
    noComment: ['...'],
  }

  function getWelcomeMessage() {
    return messages.welcome
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

  function randomZeroToNine() {
    return Math.floor(Math.random() * 10)
  }

  return {
    getWelcomeMessage,
    getNewEnemyHitMessage,
    getNewEnemySunkMessage,
    getNewPlayerMissMessage,
  }
})()

export default Utils
