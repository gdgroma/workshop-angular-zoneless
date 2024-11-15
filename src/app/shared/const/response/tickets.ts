import { Ticket } from '../../models/ticket';

export const TICKETS: Ticket[] = [
  {
    id: 0,
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam porro suscipit cupiditate,
        quam commodi omnis fuga quo perspiciatis ducimus illo repudiandae voluptatibus ea incidunt.
        Fugiat voluptatum ratione voluptatem velit tenetur.`,
    date: new Date(),
    location: 'DevFest Catania',
    title: 'Angular Zoneless Workshop',
  },
  {
    id: 1,
    about: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam porro suscipit cupiditate,
        quam commodi omnis fuga quo perspiciatis ducimus illo repudiandae voluptatibus ea incidunt.
        Fugiat voluptatum ratione voluptatem velit tenetur.`,
    date: new Date(),
    location: 'DevFest Catania',
    title: 'NgRx',
  },
];
