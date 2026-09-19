import { useState } from 'react'
import pitchImage from './images/pitch.png'
import playerImage from './images/player.png'

type Player = {
  name: string
  number: number
}

const initialSubstitutes: Player[] = [
  { name: 'Zinedine Zidane', number: 1 },
  { name: 'Zinedine Zidane', number: 2 },
  { name: 'Zinedine Zidane', number: 3 },
]

const lineup: Player[] = [
  { name: 'Zinedine Zidane', number: 4 },
  { name: 'Zinedine Zidane', number: 5 },
  { name: 'Zinedine Zidane', number: 6 },
  { name: 'Zinedine Zidane', number: 7 },
  { name: 'Zinedine Zidane', number: 8 },
]

function PlayerCard({ player, onRemove }: { player: Player; onRemove?: () => void }) {
  return (
    <article className="player-card">
      {onRemove && (
        <button className="remove-card" type="button" onClick={onRemove} aria-label={`Remove ${player.name}`}>
          <span className="remove-symbol">×</span>
        </button>
      )}
      <span className="player-number">{player.number}</span>
      <img src={playerImage} alt={`${player.name} player card`} />
      <span className="player-name">{player.name}</span>
    </article>
  )
}

function EmptyPitchCard() {
  return (
    <div className="empty-pitch-card" aria-label="Empty player position">
      <span>+</span>
    </div>
  )
}

function App() {
  const [activeTeam, setActiveTeam] = useState('Team A')
  const [pitchPlayers, setPitchPlayers] = useState<(Player | null)[]>(lineup)
  const [substitutes, setSubstitutes] = useState(initialSubstitutes)
  const [isAdding, setIsAdding] = useState(false)
  const [newName, setNewName] = useState('')

  const addSubstitute = () => {
    const name = newName.trim()
    if (!name) return
    setSubstitutes((current) => [...current, { name, number: current.length + 1 }])
    setNewName('')
    setIsAdding(false)
  }

  return (
    <main className="app-shell">
      <section className="team-section" aria-label="Choose a team">
        <div className="team-tabs" role="tablist" aria-label="Teams">
          {['Team A', 'Team B', 'Team C'].map((team) => (
            <button
              className={`team-tab${activeTeam === team ? ' is-active' : ''}`}
              key={team}
              onClick={() => setActiveTeam(team)}
              role="tab"
              aria-selected={activeTeam === team}
            >
              <span>{team}</span>
              <span className="team-count">8</span>
            </button>
          ))}
          <button className="team-tab add-team" aria-label="Add team" onClick={() => setActiveTeam('New team')}>+</button>
        </div>
      </section>

      <section className="pitch-section" aria-label={`${activeTeam} football pitch`}>
        <div className="pitch">
          <img className="pitch-image" src={pitchImage} alt="Football pitch" />
          <div className="pitch-shade" />
          <div className="pitch-players">
            {lineup.map((player, index) => (
              <div className={`pitch-player pitch-player-${index + 1}`} key={player.number}>
                {pitchPlayers[index] ? (
                  <PlayerCard
                    player={pitchPlayers[index]}
                    onRemove={() => setPitchPlayers((current) => current.map((item, playerIndex) => playerIndex === index ? null : item))}
                  />
                ) : <EmptyPitchCard />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="substitute-section" aria-label="Substitutes">
        <div className="section-heading">
          <h1>Substitute <span>{substitutes.length}</span></h1>
          <div className="heading-line" />
        </div>
        <div className="substitute-grid">
          {substitutes.map((player) => (
            <PlayerCard
              player={player}
              key={player.number}
              onRemove={() => setSubstitutes((current) => current.filter((item) => item.number !== player.number))}
            />
          ))}
          {isAdding ? (
            <form className="add-card-form" onSubmit={(event) => { event.preventDefault(); addSubstitute() }}>
              <label htmlFor="player-name">Player name</label>
              <input id="player-name" value={newName} onChange={(event) => setNewName(event.target.value)} autoFocus placeholder="Enter name" />
              <div className="form-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <button className="empty-card" onClick={() => setIsAdding(true)} aria-label="Add substitute">
              <span>+</span>
              <small>Add substitute</small>
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
