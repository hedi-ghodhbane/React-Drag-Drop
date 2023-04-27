export type State = 'Todo' | 'In Progress' | 'Testing' | 'Done' | 'Backlog';

export type Ticket = {
  title:string;
  state:State;
  id:string;
}