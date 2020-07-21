import { ToyReact, Component } from './ToyReact';

class MyCompontent extends Component {
  render () {
    return (<div class='wraper' id='wraper'><span>哈哈哈</span><a href="https://www.baichun.com">百度一下</a></div>)
  }
}

const a = <MyCompontent class='wraper' id='wraper'></MyCompontent>

ToyReact.render(a, document.body)
