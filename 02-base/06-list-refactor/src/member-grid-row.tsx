import React from "react";
import { MemberEntity } from "./model";

interface Props {
  member: MemberEntity;
}

export const MemberGridRow: React.FC<Props> = (props) => {
  const { member } = props;

  return (
    <React.Fragment>
      <img src={member.avatar_url} />
      <span>{member.id}</span>
      <span>{member.login}</span>
    </React.Fragment>
  );
};
