## Description
This library allows you to create animations and transitions in react.

## Usage
useTransition(from, to, seconds, callback<optional>)

from   : int, float, string, color
to     : int, float, string, color
seconds: float
callback: () => function()

## Examples

//animatie from #dd66ff to #ffcc99 in 0.2 seconds.
const color = useTransition("#dd66ff", "#ffcc99", 0.2);

//animatie from #dd66ff to #ffcc99 in 0.2 seconds when finished log "done".
const colorWithCallback = useTransition("#dd66ff", "#ffcc99", 0.2, () => console.log("done));

//animate a number from 1 to 10 in 10 seconds
const number = useTransition(0, 10, 10);

//animatie text from "H" to "Hello World!" in 3 seconds
const color = useTransition("H", "Hello World!", 3);