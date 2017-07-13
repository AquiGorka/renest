import React, { PureComponent }  from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = props => {
  const {
    onShowAdd,
    onShowHome,
    onReset,
    view
  } = props
  const headerClass = classnames({ searchActive: view === 'search' })
  return (
    <header className={headerClass}>
      <div className="wrapper">
        <img src="img/menu.svg" className="menuIcon" onClick={onReset} />
        <div className="title">ReNest</div>
        <img src="img/add.svg" className="addIcon" onClick={onShowAdd} />
      </div>
    </header>
  )
}

class Search extends PureComponent {

  clear = () => {
    const { onQuery } = this.props
    this.refs.input.value = ''
    onQuery('')
  }

  render() {
    const { onQuery, onShowSearch, onShowHome, view } = this.props
    const searchClass = classnames('searchWrapper', { searchActive: view === 'search' })
    return (
      <div className={searchClass}>
        <div className="searchBox">
          <div>
            <img src="img/search-icon.svg" className="icon" />
          </div>
          <input
            ref="input"
            onFocus={onShowSearch}
            className="search"
            type="text"
            placeholder="Search"
            onChange={e => { onQuery(e.currentTarget.value) }} />
          <img
            src="img/clear.svg"
            className="clear"
            onClick={() => {
              this.clear()
              this.refs.input.focus()
            }} />
        </div>
        <div
          onClick={() => {
            this.clear()
            onShowHome()
          }}
          className="cancel">
          Cancel
        </div>
      </div>
    )
  }
}

class Item extends PureComponent {
  
  state = { completed: false }
  
  render() {
    const { completed } = this.state
    const { item, onCompleted } = this.props
    const { id, label } = item
    const itemClass = classnames('itemWrapper', { completed })
    return (
      <div className={itemClass}>
        <div
          onClick={() => {
            this.setState({ completed: true })
            setTimeout(() => {
              onCompleted(id)
            }, 750)
          }}
          className="status"></div>
        <div className="text">{label}</div>
        <div className="strikethrough"></div>
      </div>
    )
  }
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
  const { items = [], onCompleted, filter, view } = props
  const listsClass = classnames('lists', { completed: filter === 'completed' }, { searchActive: view === 'search'})
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
    const { items = [], view, onShowAdd, onShowSearch, onShowHome, onReset } = this.props
    let queried = x => true
    if (query.length) {
      queried = x => x.label.toLowerCase().includes(query.toLowerCase())
    }
    const filtered = items.filter(queried)
    const filterClass = classnames('filter', { searchActive: view === 'search' })
    const taskClass = classnames('item', { active: filter === 'tasks' })
    const completedClass = classnames('item', { active: filter === 'completed' })
    const sliderClass = classnames('sliderWrapper', { completed: filter === 'completed' })
    const innerWrapperClass = classnames('innerWrapper', { searchActive: view === 'search'})
    return (
      <section className={classnames('home', { inactive: view === 'add' })}>
        <Header
          view={view}
          onReset={onReset}
          onShowAdd={onShowAdd} />
        <div className={innerWrapperClass}>
        <Search
          onQuery={this.onQuery}
          onShowSearch={() => {
            this.setState({ filter: 'tasks' })
            onShowSearch()
          }}
          onShowHome={onShowHome}
          view={view} />
        <div className={filterClass}>
          <div onClick={() => this.onFilter('tasks')} className={taskClass}>Tasks</div>
          <div onClick={() => this.onFilter('completed')} className={completedClass}>Completed</div>
          <div className={sliderClass}>
            <div className="slider"></div>
          </div>
        </div>
        <Lists
          onCompleted={this.onCompleted}
          view={view}
          items={filtered}
          filter={filter} />
      </div>
      </section>
    )
  }
}
  
export default Home
