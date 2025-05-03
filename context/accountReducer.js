// export const initialState = {
//   balance: 0,
//   dailyLimit: 500,
//   withdrawnToday: 0,
//   lastWithdrawDate: null,
//   error: null,
// };

// export function accountReducer(state, action) {
//   switch (action.type) {
//     case "SET_BALANCE":
//       return { ...state, balance: action.payload };
//     case "DEPOSIT":
//       return { ...state, balance: state.balance + action.payload, error: null };
//     case "WITHDRAW":
//       const today = new Date().toISOString().split("T")[0];
//       const isNewDay = state.lastWithdrawDate !== today;
//       const withdrawnToday = isNewDay ? 0 : state.withdrawnToday;
//       const newTotal = withdrawnToday + action.payload;

//       if (newTotal > state.dailyLimit) {
//         return {
//           ...state,
//           error: `Daily limit of $${state.dailyLimit} exceeded`,
//         };
//       }
//       if (action.payload > state.balance) {
//         return { ...state, error: "Insufficient funds" };
//       }
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//         withdrawnToday: newTotal,
//         lastWithdrawDate: today,
//         error: null,
//       };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     default:
//       return state;
//   }
// }
