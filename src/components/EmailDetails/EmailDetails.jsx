function EmailDetails(props) {
    return <main className="email-details">
    <h1>{props.selectedEmail.title}</h1>
    <h2>{props.selectedEmail.sender}</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid beatae tempora quas placeat culpa laborum tenetur, quia veritatis dolor est modi ab dolorum dolore illo saepe nemo adipisci expedita unde?</p>
    <button onClick={()=>props.setSelectedEmail(null)}>Back to inbox</button>
  </main>
}
export default EmailDetails
