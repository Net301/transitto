## Description
Transitto is a library that allows you to simply add animations and transitions to your react application.

## Install 

### npm
npm install transitto

### yarn 
yarn add transitto

## import (ES06)

import {useTransition} from 'transitto'

## Hello World

```
import React from 'react';
import { useTransition } from 'transitto'

// a functional component that will render the view
const AnimateFontSize = () => {
    //change the value of fontSize from 1 to 40 in 2.5 seconds
    const fontSize = useTransition(1, 40, 2.5);

    return (
        <div style={{ fontSize }}>Hello World</div>
    )
}

export default AnimateFontSize


```

![Animation in react](demo/HelloWorld.gif)

## Usage

### 3 Simple Steps
Using this library is very simple.

1. Install (see above).
2. Import it in the page you want to use it (see above)
3. use the useTransition hook

### The useTransition hook
The useTransition is a react hook that allows you to animate a variable from one value
 to another value in a specific period of time.
 You can also (optionally) add a custom callback that will be called when the animation is over.

useTransition(from, to, seconds, callback<optional>)

| Argument | Optional? | Description | Type | Example |
|---|---|---|---|---| 
| from   |  No | The initial value | int, float, string, color | 1/1.4/"hello"/"#ffcc99"
| to     | No | The target value | int, float, string, color | 10/15.2/"hello world"/"#ffffff"
| seconds | No | The duration of the animation in seconds | float | 14/15.2
| callback | A callback function to be called when the animation is finished | function | () => console.log("the animation is finished)


## Examples

### Animating a string

If transitto detects a string it will animate the string starting from its initial value to its final value. In order
 for strings animations to work the final value should include the initial value so the animation.

 | From | To | Correct/Wrong |
 |---|---|---|
 |""|"Hello"| Correct |
 | "FromValue" | "ToValueDoesntIncludeFrom" | Wrong |
 | "FullValue" | "Fu" | Wrong |

```
import React from 'react';
import { useTransition } from 'transitto'

const HelloString = () => {
    const HelloString = useTransition("", "Hello String", 1);

    return (
        <div style={{padding:"20px"}}>{HelloString}</div>
    )
}

export default HelloString
```

![Animating a string with react](demo/HelloString.gif)

### Animating a color

The transitto can detect whether a string is a color (HEX) such as #fff999 or #000 and then change 
 the value accordingly.

 ```
 import React, { useState } from 'react';
import { useTransition } from 'transitto'

const HelloColor = () => {
    const [done, setDone] = useState(false)
    
    // when done, call setDone(false)
    const HelloColor = useTransition("#ffcc99", "#cc99ff", 1, () => setDone(false));

    return (
        <div style={{ padding: "20px", fontSize: "40px", color: HelloColor }}>
            {done ? "Transition isFinished" : "Changing Color"}
        </div>
    )
}

export default HelloColor
```

![Animating colors with react](demo/HelloColor.gif)

## Advanced usage

You can use this library with infinite possibilities. Remember that the all the arguments are editable, thus, 
you can use the useState or other hooks to change them in order to control the change of the speed (or in other cases create acceleration).

```
import React, { useState, useEffect } from 'react';
import { useTransition } from 'transitto'

const AdvancedAcceleration = () => { 
    const duration = useTransition(1, 25, 3);
    const topValue = useTransition(1, 200, 1/15*Math.exp(duration));
    const leftValue = useTransition(1, 400, 1/15*Math.exp(duration));

    return (
        <div style={{width:"20px", 
        height:"20px", 
        borderRadius:"10px", 
        backgroundColor:"#ffcc99", 
        "position":"absolute",
        top:topValue,
        left:leftValue}}>
        </div>
    )
}

export default AdvancedAcceleration
```

![Advanced animation in react](demo/Advanced.gif)

