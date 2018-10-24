import React from 'react';
import styled from 'styled-components';

const TeamsWrapper = styled.div`
    color: #958993;
    text-align: left;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({ id, letter }) => (
  <TeamListItem key={`team-${id}`}>{letter}</TeamListItem>
);

const Teams = ({ teams }) => (
  <TeamsWrapper className="teams box">
    <TeamList>{teams.map(team)}</TeamList>
  </TeamsWrapper>
);

export default Teams;
