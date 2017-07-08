import React, { Component } from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowAdd } = props
  return (
    <header>
      <div className="menuIcon">M</div>
      <div className="title">ReNest</div>
      <div onClick={onShowAdd} className="addIcon">+</div>
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
  const { label } = props
  return (
    <div>
      <div>o</div>
      <div>{label}</div>
    </div>
  )
}

export const List = (props) => {
  const { label, items } = props
  if (!items.length) {
    return <div></div>
  }
  return (
    <div>
      <div>{label}</div>
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
      <List label="High priority" color="red" items={items.filter(x => x.priority === 3)} />
      <List label="Normal priority" color="green" items={items.filter(x => x.priority === 2)} />
      <List label="Low priority" color="blue" items={items.filter(x => x.priority === 1)} />
    </div>
  )
}

const Home = (props) => {
  const { items = [], view, onShowAdd, onShowSearch } = props
  return (
    <section className={classnames('home', { inactive: view === 'add' })}>
      <Header onShowAdd={onShowAdd} />
      <Search onShowSearch={onShowSearch} />
      <Lists items={items} />
    </section>
  )
}
  
export default Home
