const chats = [
  { initials: 'MG', name: 'María González', last: 'Perfecto, nos vemos mañana', time: '10:30 AM', active: true },
  { initials: 'CR', name: 'Carlos Ruiz', last: 'Gracias por la ayuda!', time: 'Ayer' },
  { initials: 'AM', name: 'Ana Martínez', last: '¿Tienes las notas?', time: 'Mar 28' },
];

function Messages() {
  return (
    <section className="messages-page">
      <div className="messages-list-panel">
        <h1 className="page-title">Mensajes</h1>
        <div className="search-input conversation-search">
          <span>⌕</span>
          <input placeholder="Buscar conversaciones..." />
        </div>
        <div className="conversation-list">
          {chats.map((chat) => (
            <div key={chat.name} className={`conversation-item ${chat.active ? 'active' : ''}`}>
              <div className="avatar orange">{chat.initials}</div>
              <div className="conversation-body">
                <div className="conversation-head">
                  <strong>{chat.name}</strong>
                  <span className="time">{chat.time}</span>
                </div>
                <p>{chat.last}</p>
              </div>
              <span className="presence-dot" />
            </div>
          ))}
        </div>
      </div>

      <div className="messages-chat-panel">
        <div className="chat-header">
          <div className="avatar orange">MG</div>
          <div>
            <h3>María González</h3>
            <p className="subtle">Ing. Industrial</p>
          </div>
        </div>
        <div className="chat-body">
          <div className="message-bubble left">Hola! ¿Cómo vas con el proyecto?</div>
          <span className="bubble-time">10:15 AM</span>
          <div className="message-bubble left second">Excelente! ¿Nos reunimos mañana para revisar todo?</div>
          <span className="bubble-time">10:20 AM</span>
        </div>
      </div>
    </section>
  );
}

export default Messages;
