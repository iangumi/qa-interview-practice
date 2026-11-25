# API lab · Catch an order that never saved

The fixture runs locally in memory and needs Node.js 20 or later. It accepts valid standard and express orders. Both POST responses say 201, but the buggy fixture drops express orders before saving. The contract requires a newly created order to be immediately available by ID.

Run these commands from the repository root:

```sh
node --test lab/api/starter.test.mjs
node --test lab/api/solution.test.mjs
FIXED_ORDERS=1 node --test lab/api/solution.test.mjs
```

1. The **starter** passes both cases because it checks only the create response.
2. The **solution** fails on the buggy fixture. The standard order is retrieved and the express lookup returns 404.
3. In **fixed mode** both solution cases pass. In PowerShell, use `$env:FIXED_ORDERS = "1"` before invoking the solution and remove it afterwards with `Remove-Item Env:FIXED_ORDERS`.

Before reading the solution, extend the starter to retrieve the order by the returned ID and verify its item, quantity, and delivery method. Capture the exact call that violates the contract and the response you observed.
