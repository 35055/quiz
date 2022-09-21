import React from "react";

export default function LeaderList({ board }) {
  return (
    <ol>
      {board.map((player) => (
        <li>
          {player.name} <span> Баллы: {player.score}</span>{" "}
          <span>Время: {player.timer} секунд</span>
        </li>
      ))}
    </ol>
  );
}
