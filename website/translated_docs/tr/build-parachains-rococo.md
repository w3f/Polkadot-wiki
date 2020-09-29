---
id: build-parachains-rococo
title: Building Parachains on Rococo
sidebar_label: Building Parachains on Rococo
---

[Rococo](https://github.com/paritytech/cumulus#rococo-crown) is a Polkadot testnet built for testing parachains. Rococo utilizes Cumulus and HRMP (Horizontal Relay-routed Message Passing) in order to send transfers and messages between parachains and the Relay Chain. Every message is sent to the Relay Chain, then from the Relay Chain to the desired parachain. Rococo currently runs three test parachains (Tick, Trick, and Track), as well as several externally developed parachains.

## Who is building Parachains?

As of now, the list of parachains are as follows:

- Rococo (Tick, Trick, and Track)
- Mandala
- Darwinia
- Plasm
- Robonomics
- Turbulence

## Parachain Workshop

If you are interested in running and launching your own parachain, Parity Technologies has created a [parachain workshop](https://substrate.dev/cumulus-workshop/#/1-prep/1-compiling). There is also a [Rococo Element chat channel](https://matrix.to/#/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation) as well as [Cumulus' GitHub repository](https://github.com/paritytech/cumulus#rococo) available.

### Obtaining ROC

There currently isn't a faucet available for ROC and disbursements are only limited to parachain builders for the time being. It's recommended at this point to run your own parachains testnet locally.

## How to connect to a Parachains

If you would like to connect to a parachain via [Polkadot-JS Apps](https://polkadot.js.org/apps/), you may do so by clicking on the network selection at the top left hand corner of the navigation and selecting any parachain of choice. For the purpose of these following examples, we will be using the Rococo testnet "Custom Node" underneath "Development", according to the [parachain workshop](https://substrate.dev/cumulus-workshop/#/1-prep/1-compiling).

![parachains on polkadotjs](assets/polkadotjs_network_parachains.png)

## How to make Cross Chain transfers

To send a transfer between parachains, navigate to "Accounts" > "Transfer". From here, you'll need to select the parachain node that you are running. Next, enter in the amount that you'd like to send to another parachain. Be sure to select the correct parachain you'd like to send an amount to. Once you've hit the "Submit" button, you should see a green notification, indicating a successful transfer.

### Downward Transfers

Downward transfers are when an account on the Relay Chain sends a transfer to their account on a different parachain. This type of transfer uses a depository and mint model, meaning that when the DOT leave the sender's account on the Relay Chain and are transferred into an account on a parachain, the parachain mints a corresponding amount of tokens on the parachain.

For example, we can send tokens from Alice's account on the Relay Chain to her account on parachain 200. To do so, we will need to head to the "Network" > "Parachains" tab and click on the "Transfer to chain" button.

![rococo downward transfer](assets/rococo/rococo-downward-transfer.png)

Notice here, that we can select which parachain to send the funds to, specify the amount to be sent, and add any comments or a memo for the transfer.

### Upward Transfers

Upward transfers occur _from_ a parachain _to_ an account on the Relay Chain. To proceed with this kind of transfer, we need to be connected to a parachain node on the network and be on the "Network" > "Parachains" tab. Click on the "Transfer to chain" button.

![rococo upward transfer](assets/rococo/rococo-upward-transfer.png)

Note that the toggle should be set to off, ensuring that the funds go to the Relay Chain and not another parachain.

### Lateral Transfers

This type of transfer is only possible with at least two different registered parachains. In true XCMP, lateral transfers would allow for messages to be sent directly from one parachain to another. However, this is not yet implemented, so the Relay Chain is helping us deliver messages for the time being. Lateral transfers work through the depository model, which means that in order to transfer tokens from chain 200 to chain 300, there must already be tokens owned by chain 200 deposited on chain 300. The reasoning behind this can be found on this [page here](https://substrate.dev/cumulus-workshop/#/4-cross-chain/3-lateral?id=depository-model). Lateral transfers are called HRMP, Horizontal Relay-Chain Message Passing.

Before we can actually send funds from one parachain to another, we must ensure that the chain's account on the recipient chain has some funds in it. In this example, Alice will be sending some funds from her account on parachain 200 to her account on parachain 300.

We can get that parachain account address, from our parachain 300's terminal:

```
2020-08-26 14:46:34 Parachain Account: 5Ec4AhNv5ArwGxtngtW8qcVgzpCAu8nokvnh6vhtvvFkJtpq
```

From Alice's account on the Relay Chain, she is able to send some amount to parachain 200's depository.

![rococo lateral transfer](assets/rococo/rococo-lateral-transfer.png)

Alice is now able to send from her account on parachain 200 to her account on parachain 300.

![rococo lateral transfer part 2](assets/rococo/rococo-lateral-transfer2.png)
