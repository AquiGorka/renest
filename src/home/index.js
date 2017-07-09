import React, { PureComponent }  from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = props => {
  const { onQuery, query, onFilter, filter, onShowAdd, onShowSearch } = props
  const taskClass = classnames('item', { active: filter === 'tasks' })
  const completedClass = classnames('item', { active: filter === 'completed' })
  const sliderClass = classnames('sliderWrapper', { completed: filter === 'completed' })
  return (
    <header>
      <div className="wrapper">
        <img src="img/menu.svg" className="menuIcon" />
        <div className="title">ReNest</div>
        <img src="img/add.svg" className="addIcon" onClick={onShowAdd} />
      </div>
      <Search onShowSearch={onShowSearch} />
      <div className="filter">
        <div onClick={() => onFilter('tasks')} className={taskClass}>Tasks</div>
        <div onClick={() => onFilter('completed')} className={completedClass}>Completed</div>
        <div className={sliderClass}>
          <div className="slider"></div>
        </div>
      </div>
    </header>
  )
}

const Search = props => {
  //const { onShowSearch } = props
  const onShowSearch = () => {}
  return (
    <div className="searchBox" onClick={onShowSearch}>
      <div>
        <img src="img/search-icon.svg" className="icon" />
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search"
        onChange={e => {
          console.log(e.currentTarget.value)
        }} />
    </div>
  )
}

const Item = props => {
  const { item, onCompleted } = props
  const { id, label } = item
  return (
    <div className="itemWrapper">
      <div onClick={() => onCompleted(id)} className="status"></div>
      <div className="text">{label}</div>
    </div>
  )
}

const List = props => {
  const { label, items, color, onCompleted } = props
  if (!items.length) {
    return <div></div>
  }
  const myStyle = { color }
  return (
    <div className="listWrapper">
      <div className="listLabelBg"></div>
      <div className="listLabel" style={myStyle}>{label}</div>
      <ul>
        {items.sort((a, b) => a.id - b.id).map(item => {
          const { id } = item
          return (
            <li key={id}>
              <Item item={item} onCompleted={onCompleted} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const CompletedItem = props => {
  const { item, onCompleted } = props
  const { id, label } = item
  return (
    <div className="completedItemWrapper">
      <img src="img/group.svg" className="status" />
      <div className="text">{label}</div>
    </div>
  )
}
const Completed = props => {
  const { items } = props
  if (!items.length) {
    return <div></div>
  }
  return (
    <ul>
      {items.map(item => {
        const { id, label } = item
        return <li key={id}><CompletedItem item={item} /></li>
      })}
    </ul>
  )
}

const Lists = props => {
  const { items = [], onCompleted, filter } = props
  const listsClass = classnames('lists', { completed: filter === 'completed' })
  return (
    <div className={listsClass}>
      <div className="tasksList">
        <List
          label="High priority"
          color="#FF2765"
          onCompleted={onCompleted}
          items={items.filter(x => !x.status && x.priority === 3)} />
        <List
          label="Normal priority"
          color="#47CE00"
          onCompleted={onCompleted}
          items={items.filter(x => !x.status && x.priority === 2)} />
        <List
          label="Low priority"
          color="#4196EB"
          onCompleted={onCompleted}
          items={items.filter(x => !x.status && x.priority === 1)} />
      </div>
      <div className="completedList">
        <Completed items={items.filter(x => x.status)} />
      </div>
    </div>
  )
}

class Home extends PureComponent {

  state = { filter: 'tasks', query: '' }

  onFilter = filter => {
    this.setState({ filter })
  }

  onQuery = query => {
    this.setState({ query })
  }

  onCompleted = id => {
    const { items, onUpdate } = this.props
    const item = items.find(x => x.id === id)
    const { status, ...rest } = item
    const newItem = { status: true, ...rest }
    const newItems = items.filter(x => x.id !== id)
      .concat([newItem])
    onUpdate({ items: newItems })
  }

  render() {
    const { filter, query } = this.state
    const { items = [], view, onShowAdd, onShowSearch } = this.props
    return (
      <section className={classnames('home', { inactive: view === 'add' })}>
        <Header
          onShowAdd={onShowAdd}
          onShowSearch={onShowSearch}
          filter={filter}
          query={query}
          onFilter={this.onFilter}
          onQuery={this.onQuery} />
        <Lists
          onCompleted={this.onCompleted}
          items={items}
          filter={filter} />
      </section>
    )
  }
}
  
  
export default Home
