import React from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowAdd, onShowSearch } = props
  return (
    <header>
      <div className="wrapper">
        <img src="img/menu.svg" className="menuIcon" />
        <div className="title">ReNest</div>
        <img src="img/add.svg" className="addIcon" onClick={onShowAdd} />
      </div>
      <Search onShowSearch={onShowSearch} />
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
