import { INCREMENT, DECREMENT } from './constants';

export default function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload + 10;
    case DECREMENT:
      return state - action.payload;
    default:
      return state;
  }
}
