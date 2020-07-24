import { ToyReact, Component } from './ToyReact'

class Game extends Component {
  constructor (props) {
    super(props)
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
      xIsNext: true
    }
  }

  // 点击格子
  handleClick (i) {
    console.log('i', i)
    const { xMap, oMap, xIsNext, map } = this.state

    if (map.includes(i)) return

    map[i] = xIsNext ? 'X' : 'O'
    const currentMap = xIsNext ? xMap : oMap
    ++currentMap.stepNumber
    currentMap.history.push(i)

    this.setState({
      map,
      xMap: xIsNext ? currentMap : xMap,
      oMap: !xIsNext ? currentMap : oMap,
      xIsNext: !xIsNext
    })
  }

  render () {
    const items = []
    this.state.map.forEach((element, i) => {
      console.log('element, i', element, i)
      items.push(<div class='game_item' onClick={() => this.handleClick(i)}>{element || ''}</div>)
    })
    console.log('hello', this.state.map)

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

const a = <Game />
ToyReact.render(a, window.document.body)
