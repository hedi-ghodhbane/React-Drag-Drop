import { tickets } from "@/domain/tickets";
import { State, Ticket } from "@/domain/types";
import { useCallback, useReducer } from "react";

type Action =
  | { type: "move-ticket"; payload: { newState: State; ticket: Ticket } }
  | { type: "reset" };
const initialState = {
  tickets: {
    Backlog: [...tickets],
    Todo: [],
    "In Progress": [],
    Testing: [],
    Done: [],
  },
};
type TicketsState = {
  tickets: Record<State, Ticket[]>;
};
const reducer = (state: TicketsState, action: Action): TicketsState => {
  const { type } = action;
  switch (type) {
    case "move-ticket": {
      const { payload } = action;
      return payload.newState === payload.ticket.state
        ? state
        : {
            ...state,
            tickets: {
              ...state.tickets,
              [payload.ticket.state]: state.tickets[
                payload.ticket.state
              ].filter((ticket) => ticket.id !== payload.ticket.id),
              [payload.newState]: [
                ...state.tickets[payload.newState],
                { ...payload.ticket, state: payload.newState },
              ],
            },
          };
    }
    case "reset":
      return {
        ...initialState,
      };
  }
};
export const useHandleTicketsState = () => {
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  const moveTicket = useCallback(
    (ticket: Ticket, newState: State) =>
      dispatch({ type: "move-ticket", payload: { ticket, newState } }),
    []
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);
  return {
    state,
    reset,
    moveTicket,
  };
};
