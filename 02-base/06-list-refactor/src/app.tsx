import React from "react";
import { MemberEntity } from "./model";
import { MemberGridRow } from "./member-grid-row";
import { MemberGrid } from "./member-grid";

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
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  return <MemberGrid />;
};
