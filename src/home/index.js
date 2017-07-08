import React from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowAdd, onShowSearch } = props
  return (
    <header>
      <div className="wrapper">
        <div className="menuIcon">M</div>
        <div className="title">ReNest</div>
        <div onClick={onShowAdd} className="addIcon">+</div>
      </div>
      <Search onShowSearch={onShowSearch} />
    </header>
  )
}

const Search = (props) => {
  const { onShowSearch } = props
  return (
    <div className="searchBox" onClick={onShowSearch}>
      <div className="icon">L</div>
      <div className="text">Search</div>
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
  const { label, items } = props
  if (!items.length) {
    return <div></div>
  }
  return (
    <div className="listWrapper">
      <div className="listLabel">{label}</div>
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

const Home = (props) => {
  const { items = [], view, onShowAdd, onShowSearch } = props
  return (
    <section className={classnames('home', { inactive: view === 'add' })}>
      <Header onShowAdd={onShowAdd} onShowSearch={onShowSearch} />
      <Lists items={items} />
    </section>
  )
}
  
export default Home
