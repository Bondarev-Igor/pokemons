export type PaginationType = {
  startPoint: number;
  count: number;
};
const initialState: PaginationType = {
  startPoint: 0,
  count: 12,
};

type ActionType = PaginationACType;

const paginationReducer = (state = initialState, action: ActionType): PaginationType => {
  switch (action.type) {
    case 'GET_POKEMONS':
      return {
        ...state,
        startPoint: action.startPoint,
        count: action.count,
      };
    default:
      return state;
  }
};

type PaginationACType = {
  type: 'GET_POKEMONS';
  startPoint: number;
  count: number;
};

export const paginationAC = (
  count: number,
  startPoint: number,
): PaginationACType => ({
  type: 'GET_POKEMONS', startPoint, count,
} as const);

export default paginationReducer;
