import React, { Component } from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowHome } = props
  return (
    <header>
      <img src="img/shape.svg" className="back" onClick={onShowHome} />
      <div className="title">Add Task</div>
    </header>
  )
}

class Item extends Component{
 
  state = { status: false }

  render() {
    const { item, onAdd } = this.props
    const { label, id } = item
    const { status } = this.state
    // label
    const labelClass = classnames('label', { inactive: status })
    // icon
    const iconClass = classnames('icon', { close: status })
    // priority btns
    const btnHighhClass = classnames('priority', 'high', { in: status })
    const btnNormalClass = classnames('priority', 'normal', { in: status })
    const btnLowClass = classnames('priority', 'low', { in: status })
    return (
      <div className="wrapper"> 
        <div className={labelClass}>{label}</div>
        <div className="type">
          <div
            className={btnHighhClass}
            onClick={() => onAdd(id, 3)}>
            High<br />Priority
          </div>
          <div
            className={btnNormalClass}
            onClick={() => onAdd(id, 2)}>
            Normal<br />Priority
          </div>
          <div
            className={btnLowClass}
            onClick={() => onAdd(id, 1)}>
            Low<br />Priority
          </div>
          <div className="ghost"></div>
        </div>
        <div>
          <img
            src="img/add.svg"
            className={iconClass}
            onClick={() => this.setState({ status: !status })} />
        </div>
      </div>
    )
  }
}

const List = (props) => {
  const { items, onAdd } = props
  return (
    <ul>
    {items.sort((a, b) => a.id - b.id).map((item, index) => {
      const { label, id } = item
      return (
        <li key={id}>
          <Item item={item} onAdd={onAdd} />
        </li>
      )
    })}
    </ul>
  )
}

export default (props) => {
  const { items = [], onShowHome, onUpdate } = props
  const filtered = items.filter(x => x.priority === -1)
  return (
    <section className="add">
      <Header onShowHome={onShowHome} />
      <List items={filtered} onAdd={(id, newPriority) => {
        const item = items.find(x => x.id === id)
        const { priority, ...rest } = item
        const newItem = { priority: newPriority, ...rest }
        const newItems = items.filter(x => x.id !== id)
          .concat([newItem])
        onUpdate({ items: newItems })
      }} />
    </section>
  )
}
