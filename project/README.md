# CG 2022/2023

## Group T09G09

- Igor Liberato de Castro (up202000161)
- José Luis Barbosa Soares Silva (up201906576)

## Project Notes

### All required features have been implemented:

- There is a panorama and a terrain, which the panorama surrounds, with a significant plain area. A custom number of eggs (by default 4) are randomly scattered on the plain are of the terrain in random rotations. Trees are distributed along the terrain in pre-defined group- and row-patches. On the terrain is also a nest in a pre-defined location.

- There is a bird, whose speed, direction of movement and actions are controlled by the player (See controls section). The bird oscilates up and down, with each oscilation lasting 1 second. It also flaps its wings, with the duration of the flap decreasing with its speed.

- The bird is capable of picking up eggs, only one at a time, by descending and ascending to ground level. This movement lasts 2 seconds and is triggerd by the player. When the bird hits ground level, if there are any eggs within a custom distance (by default 10 units), the first one seen will be picked up.

- After picking up an egg, the player may try to drop the egg on the nest. If the nest is within a custom range and the drop action is triggered, the egg will fall, following a physically accurate half-parabola trajectory, and be placed on the nest with a random rotation on one of 5 pre-defined slots.

##### Choice of additional development: A - Parabola trajectory of the egg when it is dropped by the bird to be deposited in the nest.

### Controls:

W - Increase forward speed   
S - Decrease forward speed  
A - Rotate bird to its left  
D - Rotate bird to its right  
R - Reset bird position and speed  
P - Begin descent to try to pick up an egg  
O - Try to drop egg on the nest

## Screenshots

![Screenshot 1](project/screenshots/project-t09g09-1.png)  
1 - Panorama

![Screenshot 2](project/screenshots/project-t09g09-2.png)  
2 - Bird

![Screenshot 3](project/screenshots/project-t09g09-3.png)  
3 - Terrain

![Screenshot 4](project/screenshots/project-t09g09-4.png)  
4 - Nest and Eggs

![Screenshot 5](project/screenshots/project-t09g09-5.png)  
5 - Trees

![Screenshot 6](project/screenshots/project-t09g09-6.png)  
6 - Parabola trajectory

![](project/project-t09g09.mp4)  
Video
