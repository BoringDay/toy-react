import { ToyReact, Component } from './ToyReact';

class MyCompontent extends Component {
  render () {
    return (<div class='wraper' id='wraper'>
        <span>哈哈哈<em>1</em><em>1</em></span>
        <a href="https://www.baidu.com/">百度一下<em>2</em></a>
      </div>)
  }
}

const a = <MyCompontent class='wraper' id='wraper'></MyCompontent>

ToyReact.render(a, document.body)
