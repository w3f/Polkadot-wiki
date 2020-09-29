---
id: learn-balance-transfers
title: Balance Transfers
sidebar_label: How to transfer Balances
---

Balance transfers are used to send one balance from one account to another account. To start
transferring balances, we will begin by using [Polkadot-JS Apps][]. This guide assumes that you've
already [created an account](learn-account-generation) and have some funds that will be transferred.

## Polkadot-JS Apps

> NOTE: In this walkthrough we will be using the Polkadot network. If you would like to switch to
> Kusama or a different network, you can change it by clicking the top left navigation dropdown and
> selecting a different network.

Let's begin by opening up the [Polkadot-JS Apps][]. There are two ways to make a balance transfer:

1. By using the "Transfer" tab in the "Accounts" dropdown (located on the top navigational menu).
2. Clicking the "send" button while in the "Accounts" page.

### Using the Transfer Tab

Click on the "Transfer" tab in the "Accounts" dropdown.

![transfer](assets/transfer-1.png)

Now a modal window will appear on the page. The modal asks you to enter 3 inputs:

- "send from account": Your account with funds that you will send from.
- "send to address": The address of the account that will receive the funds.
- "amount": The amount of tokens you will transfer.

The "existential deposit" box shows you the minimum amount of funds you must keep in the account for
it to remain active. See the [existential deposit][] section for more information.

![transfer](assets/transfer-2.png)

After setting your inputs correctly, click the "Make Transfer" button and confirm. Once the transfer
is included in a block you will see a green notification in the top-right corner of your screen.

### From the Accounts Page

Navigate to the "Accounts" page by selecting the "Accounts" tab from the "Accounts" dropdown located
on the top navigational menu of Polkadot-JS Apps.

You will see a list of accounts you have loaded. Click the "Send" button in the row for the account
you will like to send funds from.

![transfer](assets/transfer-3.png)

Now you will see the same modal window as if using the "Transfer" tab. Fill in the inputs correctly
and hit "Make Transfer" then confirm the balance transfer. You will see a green notification in the
top-right corner of the screen when the transfer is included in a block.

[polkadot-js apps]: https://polkadot.js.org/apps
[existential deposit]: build-protocol-info#existential-deposit
