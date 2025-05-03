// /lib/db.js

let accounts = [
  {
    accountId: "1111",
    pin: "1234",
    balance: 1733,
    withdrawnToday: 0,
    lastWithdrawDate: null,
  },
  {
    accountId: "2222",
    pin: "1234",
    balance: 2200,
    withdrawnToday: 0,
    lastWithdrawDate: null,
  },
  {
    accountId: "3333",
    pin: "1234",
    balance: 3333,
    withdrawnToday: 0,
    lastWithdrawDate: null,
  },
];

export function getAccounts() {
  return accounts;
}

export function saveAccounts(updated) {
  accounts = updated;
}
