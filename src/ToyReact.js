import { ElementWrapper, TextWrapper } from './Dom/Element'

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

    if(this.vdom) this.parent.removeChild(this.vdom);

    const vdom = this.render() // 继承该Component写的render返回vdom
    this.vdom = vdom.root

    // 设置实dom属性
    for (const i in this.props) {
      vdom.setAttribute(i, this.props[i])
    }

    vdom.mountTo(this.parent)
  }

  update () {
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

export const ToyReact = {
  createElement (type, attrs, ...children) {
    // console.log('ToyReact createElement', type, attrs, ...children)
    let ele

    if (typeof type === 'string') {
      // 普通的html标签
      ele = new ElementWrapper(type)
    } else {
      // 传入自定义的标签变量,type是个传入类
      ele = new type()
    }

    for (const i in attrs) {
      ele.setAttribute(i, attrs[i])
    }

    const insertChildren = (children) => {
      children.forEach(child => {
        if (typeof child === 'object' && child instanceof Array) {
          // 递归child里面的标签树
          insertChildren(child)
        } else {
          // 限定若child不属于节点/组件类，则当字符串处理
          if (!(child instanceof Component || child instanceof ElementWrapper || child instanceof TextWrapper)) {
            child = String(child)
          }
          // 元素节点里面有文本
          if (typeof child === 'string') {
            child = new TextWrapper(child)
          }
          ele.appendChild(child)
        }
      })
    }

    insertChildren(children)
    return ele
  },
  render (vdom, element) {
    vdom.mountTo(element)
  }
}
