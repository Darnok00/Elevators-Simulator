# Elevator Simulator

## General information

This is a project that shows the simulation of elevators in a building with more than three floors and less than 31 floors, where the number of elevators does not exceed 16. The user can select the number of elevators and floors from a predetermined range on the input, as well as the simulation step time (from 1 to 10 seconds).
The assumption is made that the user selects the number of the target floor, and also selects the starting floor. Then the algorithm (described below) selects an elevator for him, which should take him to the destination as quickly as possible. 
On the screen (after selecting the starting parameters), the interface used to summon the elevators was displayed, as well as a table showing what state each elevator is in. 

 ## Alghoritm description

The elevator selection algorithm works in such a way that, for a user's route, it determines the elevator that would haul the user to his or her destination the fastest at that moment. It does this by calculating for each elevator the minimum time to reach the destination. It calculates it based on the trips scheduled for that elevator and the stops during them.This is done as follows: we check for each ride in turn, located in the queue of rides of a given elevator, whether our route non-invasively can be part of a given ride, if so, we calculate the route time under the assumption that then our starting and ending floors would be the stops of that ride. If there is no such route then we assume that we will add our ride to the end of the queue. 
This description also tells us how our elevators realistically behave when choosing the order of floors and stops visited. These approaches avoid "starving" a given ride, and also provide an easy way to "push" rides to the stops of other rides. The only downside of this algorithm is that when calculating the most optimal route, it does not take into account the fact that we can buy passengers along the way, who also waste time stopping the elevator (I assume that one unit of time is going between two floors or stopping in order to enter the indy and / or exit) which may cause that our elevator will no longer be the best one.

 ## Used technologies

 - React.js
 - Typescript
 - Vite

 ## How to run the code and tests

 You need to install dependencies via `yarn install` or `npm install`. There are several commands availiable:

 - `npm run dev`
 - `npm run test` {filename from `test` directory}
