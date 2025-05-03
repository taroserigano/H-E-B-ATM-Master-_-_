// 🧹 REMOVE balance from context state entirely

export const initialState = {
  error: null,
  // Removed: balance, withdrawnToday, lastWithdrawDate, dailyLimit
  transactions: [],
};

export function accountReducer(state, action) {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };

    default:
      return state;
  }
}
