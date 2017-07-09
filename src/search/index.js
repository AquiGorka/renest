import React, { PureComponent } from 'react'
import classnames from 'classnames'
import './styles.css'

const Header = (props) => {
  const { onShowHome } = props
  return (
    <header>
      <div>Input</div>
      <div>L</div>
      <div onClick={onShowHome}>Cancel</div>
    </header>
  )
}

class Search extends PureComponent {
  
  state = { filter : '' }

  render() {
    const { filter } = this.state
    const { items = [], view, onShowHome } = this.props
    let remove = x => true
    if (filter !== '') {
      remove = x => x.label.includes(filter)
    }
    const filtered = items.filter(remove)
    return (
      <section className={classnames('search', { active: view === 'search' })}>
        <Header onShowHome={onShowHome} />
      </section>
    )
  }
}

export default Search
