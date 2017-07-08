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

const Search = () => {
  return (
    <div className="searchBox">
      <div className="icon">L</div>
      <div className="text">Search</div>
    </div>
  )
}

const List = () => {
  return (
    <div className="list">List</div>
  )
}

const Home = (props) => {
  const { data, view, onShowAdd, onShowSearch } = props
  return (
    <section className={classnames('home', { inactive: view === 'add' })}>
      <Header onShowAdd={onShowAdd} />
      <Search onClick={onShowSearch} />
      <List />
    </section>
  )
}
  
export default Home
