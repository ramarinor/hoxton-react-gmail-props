import { useState } from "react";

import initialEmails from "./data/emails";

import "./App.css";
import Header from "./components/header/Header";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import Emails from "./components/Emails/Emails";
import EmailDetails from "./components/EmailDetails/EmailDetails";

const getReadEmails = (emails) => emails.filter((email) => !email.read);

const getStarredEmails = (emails) => emails.filter((email) => email.starred);
const getSearchEmails = (emails, search) =>
  emails.filter(
    (email) =>
      email.title.toLowerCase().includes(search.toLowerCase()) ||
      email.sender.toLowerCase().includes(search.toLowerCase())
  );

function App() {
  const [emails, setEmails] = useState(initialEmails);
  const [hideRead, setHideRead] = useState(false);
  const [currentTab, setCurrentTab] = useState("inbox");
  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const unreadEmails = emails.filter((email) => !email.read);
  const starredEmails = emails.filter((email) => email.starred);

  const toggleStar = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      );
    setEmails(updatedEmails);
  };

  const toggleRead = (targetEmail) => {
    const updatedEmails = (emails) =>
      emails.map((email) =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      );
    setEmails(updatedEmails);
  };

  let filteredEmails = emails;

  if (hideRead) filteredEmails = getReadEmails(filteredEmails);

  if (currentTab === "starred")
    filteredEmails = getStarredEmails(filteredEmails);
  filteredEmails = getSearchEmails(filteredEmails, search);

  return (
    <div className="app">
      <Header setSearch={setSearch} />
      <LeftMenu
        currentTab={currentTab}
        unreadEmails={unreadEmails}
        starredEmails={starredEmails}
        hideRead={hideRead}
        setHideRead={setHideRead}
        setCurrentTab={setCurrentTab}
      />
      {selectedEmail === null ? (
        <Emails
          filteredEmails={filteredEmails}
          toggleRead={toggleRead}
          toggleStar={toggleStar}
          setSelectedEmail={setSelectedEmail}
        />
      ) : (
        <EmailDetails selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail}/>
      )}
    </div>
  );
}

export default App;
