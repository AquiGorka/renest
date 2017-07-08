import React from 'react'
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

const List = () => {
  return (
    <div>List</div>
  )
}

export default (props) => {
  const { onShowHome } = props
  return (
    <section className="add">
      <Header onShowHome={onShowHome} />
      <List />
    </section>
  )
}
