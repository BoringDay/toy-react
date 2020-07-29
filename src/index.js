import { ToyReact, Component } from './ToyReact'

function countResult (arr) {
  const str = arr.join('')
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  return winArr.some((item) => {
    return (str.indexOf(item[0]) >= 0) && (str.indexOf(item[1]) >= 0) && (str.indexOf(item[2]) >= 0)
  })
}

// 游戏
class Game extends Component {
  constructor (props) {
    super(props)
    this.isOver = false
    this.state = {
      map: new Array(9).fill(null),
      xMap: {
        stepNumber: 0,
        history: []
      },
      oMap: {
        stepNumber: 0,
        history: []
      },
      xIsNext: true,
      currentMsg: 'Next: X'
    }
  }

  // 点击格子
  handleClick (i) {
    const { xMap, oMap, xIsNext, map } = this.state
    let currentMsg = ''

    if (map[i]) return
    if (this.isOver) return

    map[i] = xIsNext ? 'X' : 'O'
    const currentMap = xIsNext ? xMap : oMap
    ++currentMap.stepNumber
    currentMap.history.push(i)

    if (countResult(currentMap.history)) {
      this.isOver = true
      currentMsg = `Winner: ${xIsNext ? 'X' : 'O'}`
    } else if (xMap.history.length + oMap.history.length >= 9) {
      currentMsg = 'Game Over'
    } else {
      currentMsg = `Next: ${!xIsNext ? 'X' : 'O'}`
    }

    this.setState({
      map,
      xMap: xIsNext ? currentMap : xMap,
      oMap: !xIsNext ? currentMap : oMap,
      xIsNext: !xIsNext,
      currentMsg
    })

    console.log(this.state)
  }

  render () {
    const items = []
    this.state.map.forEach((element, i) => {
      items.push(<div class='game_item' onClick={() => this.handleClick(i)}>{element || ''}</div>)
    })

    return <div class='wrap'>
      <div class='game'>
        {items}
      </div>
      <div class='option'>
        <p>{this.state.currentMsg}</p>
      </div>
  </div>
  }
}

ToyReact.render(<Game className='my-game' />, window.document.body)
