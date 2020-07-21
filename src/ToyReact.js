// 用于让自定义组件继承的Component
export class Component {
  constructor (type) {
    this.children = []
  }

  setAttribute (name, value) {
    this[name] = value
  }

  appendChild (vChild) {
    this.children.push(vChild)
  }

  mountTo (parent) {
    const vdom = this.render() // 继承该Component写的render返回vdom
    console.warn('Comp', vdom, parent)
    vdom.mountTo(parent)
  }
}

// 元素节点(真实)
class ElementWrapper {
  constructor (type) {
    this.root = document.createElement(type)
  }

  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild (vChild) {
    vChild.mountTo(this.root)
  }

  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

// 文本节点(真实)
class TextWrapper {
  constructor (type) {
    this.root = document.createTextNode(type);
  }

  appendChild (vChild) {
    vChild.mountTo(this.root);
  }

  mountTo (parent) {
    parent.appendChild(this.root);
  }
}

export const ToyReact = {
  createElement (type, attrs, ...children) {
    console.log('ToyReact createElement', type, attrs, ...children)
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

    console.log('children', children.length, Object.keys(children))
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

        if (typeof child === 'string') {
          child = new TextWrapper(child)
        }
        ele.appendChild(child)
      })
    }

    insertChildren(children)
    return ele
  },
  render (vdom, parent) {
    vdom.mountTo(parent)
  }
}
