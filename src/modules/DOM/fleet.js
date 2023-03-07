import carrierX from '../../assets/images/carrierX.svg'
import carrierY from '../../assets/images/carrierY.svg'
import battleshipX from '../../assets/images/battleshipX.svg'
import battleshipY from '../../assets/images/battleshipY.svg'
import cruiserX from '../../assets/images/cruiserX.svg'
import cruiserY from '../../assets/images/cruiserY.svg'
import submarineX from '../../assets/images/submarineX.svg'
import submarineY from '../../assets/images/submarineY.svg'
import destroyerX from '../../assets/images/destroyerX.svg'
import destroyerY from '../../assets/images/destroyerY.svg'

const fleet = (() => {
  function loadShipOnBoard(boardElement, info) {
    switch (boardElement) {
      case 'carrierX':
        if (info.found.carrier) return
        loadCarrierX(info)
        break
      case 'carrierY':
        if (info.found.carrier) return
        loadCarrierY(info)
        break
      case 'battleshipX':
        if (info.found.battleship) return
        loadBattleshipX(info)
        break
      case 'battleshipY':
        if (info.found.battleship) return
        loadBattleshipY(info)
        break
      case 'cruiserX':
        if (info.found.cruiser) return
        loadCruiserX(info)
        break
      case 'cruiserY':
        if (info.found.cruiser) return
        loadCruiserY(info)
        break
      case 'submarineX':
        if (info.found.submarine) return
        loadSubmarineX(info)
        break
      case 'submarineY':
        if (info.found.submarine) return
        loadSubmarineY(info)
        break
      case 'destroyerX':
        if (info.found.destroyer) return
        loadDestroyerX(info)
        break
      case 'destroyerY':
        if (info.found.destroyer) return
        loadDestroyerY(info)
        break
      default:
        break
    }
  }

  function loadCarrierX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${carrierX})`
        : `, url(${carrierX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '50% 10%' : ', 50% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 20}% ${info.i * 11 + info.i / 10}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.carrier = true
  }

  function loadCarrierY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${carrierY})`
        : `, url(${carrierY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 50%' : ', 10% 50%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${info.i * 20}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.carrier = true
  }

  function loadBattleshipX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${battleshipX})`
        : `, url(${battleshipX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '40% 9.5%' : ', 40% 9.5%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 17.5 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.battleship = true
  }

  function loadBattleshipY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${battleshipY})`
        : `, url(${battleshipY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '9.5% 40%' : ', 9.5% 40%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10 + 0.5}% ${
      info.i * 17.5 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.battleship = true
  }

  function loadCruiserX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${cruiserX})`
        : `, url(${cruiserX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '30% 10%' : ', 30% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.cruiser = true
  }

  function loadCruiserY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${cruiserY})`
        : `, url(${cruiserY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 30%' : ', 10% 30%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 15 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.cruiser = true
  }

  function loadSubmarineX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${submarineX})`
        : `, url(${submarineX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '30% 10%' : ', 30% 10%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 15 - (info.j / 2 + info.j / 5)}% ${
      info.i * 11 + info.i / 10 + 1
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.submarine = true
  }

  function loadSubmarineY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${submarineY})`
        : `, url(${submarineY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '10% 30%' : ', 10% 30%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 15 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.submarine = true
  }

  function loadDestroyerX(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${destroyerX})`
        : `, url(${destroyerX})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '20% 9%' : ', 20% 9%'

    // BACKGROUND POSITION
    const backgroundPosition = `${
      info.j * 13.25 - (info.j / 2 + info.j / 5)
    }% ${info.i * 11 + info.i / 10}%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.destroyer = true
  }

  function loadDestroyerY(info) {
    // BACKGROUND IMAGE
    info.board.style.backgroundImage +=
      info.board.style.backgroundImage === ''
        ? `url(${destroyerY})`
        : `, url(${destroyerY})`

    // BACKGROUND SIZE
    info.board.style.backgroundSize +=
      info.board.style.backgroundSize === '' ? '9% 20%' : ', 9% 20%'

    // BACKGROUND POSITION
    const backgroundPosition = `${info.j * 11 + info.j / 10}% ${
      info.i * 13.25 - (info.i / 2 + info.i / 5)
    }%`
    info.board.style.backgroundPosition +=
      info.board.style.backgroundPosition === ''
        ? `${backgroundPosition}`
        : `, ${backgroundPosition}`

    // SET CARRIER AS FOUND
    info.found.destroyer = true
  }

  return { loadShipOnBoard }
})()

export default fleet
