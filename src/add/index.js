import React, { Component } from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowHome } = props
  return (
    <header>
      <div className="back" onClick={onShowHome}>{'<'}</div>
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
    // type
    const typeClass = classnames('type', { active: status })
    return (
      <div className="wrapper"> 
        <div className={labelClass}>{label}</div>
        <div className={typeClass}>
          <div className="high" onClick={() => onAdd(id, 3)}>High Priority</div>
          <div className="normal" onClick={() => onAdd(id, 2)}>Normal Priority</div>
          <div className="low" onClick={() => onAdd(id, 1)}>Low Priority</div>
        </div>
        <div className={iconClass} onClick={() => this.setState({ status: !status})}>+</div>
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
