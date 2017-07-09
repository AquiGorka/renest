import React, { PureComponent }  from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
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

const Search = (props) => {
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

export const Item = (props) => {
  const { item } = props
  const { label } = item
  return (
    <div className="itemWrapper">
      <div className="status"></div>
      <div className="text">{label}</div>
    </div>
  )
}

export const List = (props) => {
  const { label, items, color } = props
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
              <Item item={item} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const Lists = (props) => {
  const { items = [] } = props
  return (
    <div className="lists">
      <List
        label="High priority"
        color="#FF2765"
        items={items.filter(x => x.priority === 3)} />
      <List
        label="Normal priority"
        color="#47CE00"
        items={items.filter(x => x.priority === 2)} />
      <List
        label="Low priority"
        color="#4196EB"
        items={items.filter(x => x.priority === 1)} />
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

  render() {
    const { filter, query } = this.state
    const { items = [], view, onShowAdd, onShowSearch } = this.props
    let remove = x => !x.status
    if (filter === 'completed') {
      remove = x => x.status
    }
    const filtered = items.filter(remove)
    return (
      <section className={classnames('home', { inactive: view === 'add' })}>
        <Header
          onShowAdd={onShowAdd}
          onShowSearch={onShowSearch}
          filter={filter}
          query={query}
          onFilter={this.onFilter}
          onQuery={this.onQuery} />
        <Lists items={filtered} />
      </section>
    )
  }
}
  
  
export default Home
