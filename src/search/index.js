import React, { PureComponent } from 'react'
import { Lists, List, Item } from '../home'
import classnames from 'classnames'
import './styles.css'

const Header = () => {
  return (
    <div>Header</div>
  )
}

class Search extends PureComponent {
  
  state = { filter : '' }

  render() {
    const { filter } = this.state
    const { items = [], view } = this.props
    let remove = x => true
    if (filter !== '') {
      remove = x => x.label.includes(filter)
    }
    const filtered = items.filter(remove)
    return (
      <section className={classnames('search', { active: view === 'search' })}>
        <Header />
        <Lists items={filtered} />
      </section>
    )
  }
}

export default Search
