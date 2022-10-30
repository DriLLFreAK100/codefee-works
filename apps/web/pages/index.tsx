import { Button } from "ui";
import { EventEmitter } from 'utils';

export default function Web() {
  const t = new EventEmitter();
  console.log(t)
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
