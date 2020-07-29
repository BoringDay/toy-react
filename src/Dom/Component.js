// 用于让自定义组件继承的Component
export class Component {
  constructor () {
    this.children = []
    this.state = {}
    this.props = Object.create(null) // 这样创建空对象没没有.toString==的方法
  }

  setAttribute (name, value) {
    this[name] = value

    if (name === 'className') name = 'class'

    // 自定义组件传进来的属性值存到props里面
    this.props[name] = value
  }

  appendChild (vChild) {
    this.children.push(vChild)
  }

  mountTo (parent) {
    if (parent) this.parent = parent

    const vdom = this.render() // 继承该Component写的render返回vdom
    this.vdom = vdom.root

    // 设置实dom属性
    for (const i in this.props) {
      vdom.setAttribute(i, this.props[i])
    }

    vdom.mountTo(this.parent)
  }

  update () {
    this.parent.removeChild(this.vdom)
    this.mountTo()
  }

  // 设置属性merge
  setState (state) {
    // 将state合并到this.state里面去
    const newState = Object.assign(this.state, state)
    this.state = newState
    this.update()
  }
}
