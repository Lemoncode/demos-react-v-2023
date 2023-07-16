import React from "react";
import { MemberEntity } from "./model";
import { MemberGridRow } from "./member-grid-row";

export const MemberGrid = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <div className="user-list-container">
      <span className="header">Avatar</span>
      <span className="header">Id</span>
      <span className="header">Name</span>
      {members.map((member) => (
        <MemberGridRow key={member.id} member={member} />
      ))}
    </div>
  );
};
