import React from 'react'
import styles from './CliquesList.scss'

function CliquesList(props) {
  const { cliques, clickName, clickUser } = props;
  const { users } = props.filters;
  const filteredUserIds = users.map(e => e.id)
  const filteredCliqueIds = cliques.map(e => e.id)
  return (
    <div>
      {cliques.map(clique => {
        const users = clique.users.sort((a, b) => b.link_clique_assignments_count - a.link_clique_assignments_count)
        const isActive = cliques && filteredCliqueIds.includes(clique.id)
        return <div key={clique.id} className={[styles.wrapper, isActive ? styles.active : ''].join(' ')}>
          <div className={styles.cliqueName} onClick={() => clickName(clique)}>{clique.name}</div>
          <div className={styles.users}>
            {users.map(renderUser)}
          </div>
        </div>
      })}
    </div>
  )

  function renderUser(user){
    const isActive = users && filteredUserIds.includes(user.id)
    const hasLinks = user.link_clique_assignments_count > 0;
    return <div className={[
      styles.user, 
      isActive ? styles.active : '',
      hasLinks ? '': styles.noLinks
    ].join(' ')} key={user.id}
      onClick={() => hasLinks && clickUser(user)}>
      {user.name}
      <span class={styles.badge}>{user.link_clique_assignments_count}</span>
    </div>
  }
}

export default CliquesList
