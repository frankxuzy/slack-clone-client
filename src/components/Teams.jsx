import React from 'react';
import styled from 'styled-components';

const TeamsWrapper = styled.div`
    color: #958993;
    text-align: left;
`;

const team = ({ id, letter }) => (
  <li key={`team-${id}`}>{letter}</li>
);

const Teams = ({ teams }) => (
  <TeamsWrapper className="teams box">
    <ul>{teams.map(team)}</ul>
  </TeamsWrapper>
);

export default Teams;
