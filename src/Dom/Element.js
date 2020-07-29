// 元素节点(真实)
export class ElementWrapper {
  constructor (type) {
    this.root = window.document.createElement(type)
    this.className = ''
  }

  // 初始化class
  _initClassName (oldClassString, newClassString) {
    const classArray = oldClassString ? oldClassString.replace(/\s+/g, ' ').split(' ') : []
    const newClassArray = newClassString.replace(/\s+/g, ' ').split(' ')

    newClassArray.reduce((prev, next) => {
      if (!prev.includes(next)) prev.push(next)
      return prev
    }, classArray)

    return classArray.join(' ')
  }

  setAttribute (name, value) {
    console.log('name', name, value)
    if (name.match(/^on([\s\S]+)$/)) {
      // 添加事件
      const eventName = RegExp.$1.replace(/^[\s\S]/, (s) => s.toLocaleLowerCase())

      this.root.addEventListener(eventName, value)
    } else {
      // 添加属性
      if (name === 'class') {
        this.className = this._initClassName(this.className, value)
        this.root.setAttribute(name, this.className)
      } else this.root.setAttribute(name, value)
    }
  }

  appendChild (vChild) {
    vChild.mountTo(this.root)
  }

  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

// 文本节点(真实)
export class TextWrapper {
  constructor (type) {
    this.root = window.document.createTextNode(type)
  }

  appendChild (vChild) {
    vChild.mountTo(this.root)
  }

  mountTo (parent) {
    parent.appendChild(this.root)
  }
}