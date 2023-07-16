import React from "react";

const membersMock = [
  {
    id: 14540103,
    login: "antonio06",
    avatar_url: "https://avatars1.githubusercontent.com/u/14540103?v=4",
  },
  {
    id: 1457912,
    login: "brauliodiez",
    avatar_url: "https://avatars1.githubusercontent.com/u/1457912?v=4",
  },
];

export const App = () => {
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <>
      <div className="user-list-container">
        <span className="header">Avatar</span>
        <span className="header">Id</span>
        <span className="header">Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <span>{member.login}</span>
          </>
        ))}
      </div>
    </>
  );
};
