---
id: learn-transaction-fees
title: 交易费用
sidebar_label: 交易费用
---

Several resources in a blockchain network are limited, for example, storage and computation. Transaction fees prevent individual users from consuming too many resources. Polkadot uses a weight-based fee model as opposed to a gas-metering model. As such, fees are charged prior to transaction execution; once the fee is paid, nodes will execute the transaction.

[Web3 Foundation Research](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html#relay-chain-transaction-fees-and-per-block-transaction-limits) designed the Polkadot fee system with the following objectives:

- 每个中继链的区块链应该有效地处理从而被免延迟生成区块链。
- 中继链的增长率应该有界限。
- 每个区块都应有空间给特殊高优先的交易，例如不当行为报告。
- 该系统应能够处理需求激增的问题。
- 费用应缓慢变化，以便用户可以准确预测既定交易的费用。

## 费用计算

Fees on the Polkadot Relay Chain are calculated based on three parameters:

- A per-byte fee (also known as the "length fee")
- A weight fee
- A tip (optional)

The length fee is the product of a constant per-byte fee and the size of the transaction in bytes.

Weights are a fixed number designed to manage the time is takes to validate a block. Each transaction has a base weight that accounts for the overhead of inclusion (e.g. signature verification) as well as a dispatch weight that accounts for the time to execute the transaction. The total weight is multiplied by a per-weight fee to calculate the transaction's weight fee.

小费是一种可选的交易费，用户可以添加来给予交易更优先的处理。

Together, these three fees constitute the inclusion fee. This fee is deducted from the sender's account prior to transaction execution. A portion of the fee will go to the block producer and the remainder will go to the [Treasury](learn-treasury). At Polkadot's genesis, this is set to 20% and 80%, respectively.

## 区块限制和交易优先

Blocks in Polkadot have both a maximum length (in bytes) and a maximum weight. Block producers will fill blocks with transactions up to these limits. A portion of each block - currently 25% - is reserved for critical transactions that are related to the chain's operation. Block producers will only fill up to 75% of a block with normal transactions. Some examples of operational transactions:

- 错误报告
- 议会操作
- 选举中的成员操作(例如放弃候选人)

Block producers prioritize transactions based on each transaction's total fee. Since a portion of the fee will go to the block producer, producers will include the transactions with the highest fees to maximize their reward.

## 费用调整

Transaction volume on blockchains is highly irregular, and therefore transaction fees need a mechanism to adjust. However, users should be able to predict transaction fees.

Polkadot uses a slow-adjusting fee mechanism with tips to balance these two considerations. In addition to block _limits,_ Polkadot also has a block fullness _target._ Fees increase or decrease for the next block based on the fullness of the current block relative to the target. The per-weight fee can change up to 30% in a 24 hour period. This rate captures long-term trends in demand, but not short-term spikes. To consider short term spikes, Polkadot uses tips on top of the length and weight fees. Users can optionally add a tip to the fee to give the transaction a higher priority.

## 分片交易

The transactions that take place within Polkadot's shards - parachains and parathreads - do not incur Relay Chain transaction fees. Users of shard applications do not even need to hold DOT tokens, as each shard has its own economic model and may or may not have a token. There are, however, situations where shards themselves make transactions on the Relay Chain.

[Parachains](learn-parachains) have a dedicated slot on the Relay Chain for execution, so their collators do not need to own DOTs in order to include blocks. The parachain will make some transactions itself, for example, opening or closing an [XCMP](learn-crosschain) channel, participating in an [auction](learn-auction) to renew its slot, or upgrading its runtime. Parachains have their own accounts on the Relay Chain and will need to use those funds to issue transactions on the parachain's behalf.

[Parathreads](learn-parathreads) will also make all the same transactions that a parachain might. In addition, the collators need to participate in an auction every block to progress their chain. The collators will need to have DOTs to participate in these auctions.

## 其他资源限制策略

Transaction weight must be computable prior to execution, and therefore can only represent fixed logic. Some transactions warrant limiting resources with other strategies. For example:

- Bonds: Some transactions, like voting, may require a bond that will be returned or slashed after an on-chain event. In the voting example, returned at the end of the election or slashed if the voter tried anything malicious.
- Deposits: Some transactions, like setting an [identity](learn-identity) or claiming an index, use storage space indefinitely. These require a deposit that will be returned if the user decides to free storage (e.g. clear their ide).
- Burns: A transaction may burn funds internally based on its logic. For example, a transaction may burn funds from the sender if it creates new storage entries, thus increasing the state size.
- Limits: Some limits are part of the protocol. For example, nominators can only nominate 16 validators. This limits the complexity of [Phragmen](learn-phragmen).

## 进阶

This page only covered transactions that come from normal users. If you look at blocks in a block explorer, though, you may see some "extrinsics" that look different from these transactions. In Polkadot (and any chain built on Substrate), an extrinsic is a piece of information that comes from outside the chain. Extrinsics fall into three categories:

- Signed transactions
- Unsigned transactions
- Inherents

This page only covered signed transactions, which is the way that most users will interact with Polkadot. Signed transactions come from an account that has funds, and therefore Polkadot can charge a transaction fee as a way to prevent spam.

Unsigned transactions are for special cases where a user needs to submit an extrinsic from a key pair that does not control funds. For example, when users [claim their DOT tokens](https://claims.polkadot.network) after genesis, their DOT address doesn't have any funds yet, so that uses an unsigned transaction. Validators also submit unsigned transactions in the form of "heartbeat" messages to indicate that they are online. These heartbeats must be signed by one of the validator's [session keys](learn-keys). Session keys never control funds. Unsigned transactions are only used in special cases because, since Polkadot cannot charge a fee for them, each one needs its own, custom validation logic.

Finally, inherents are pieces of information that are not signed or included in the transaction queue. As such, only the block author can add inherents to a block. Inherents are assumed to be "true" simply because a sufficiently large number of validators have agreed on them being reasonable. For example, Polkadot blocks include a timestamp inherent. There is no way to prove that a timestamp is true the way one proves the desire to send funds with a signature. Rather, validators accept or reject the block based on how reasonable they find the timestamp. In Polkadot, it must be within some acceptable range of their own system clocks.

## 了解更多

- [Web3 基金会研究](https://research.web3.foundation/en/latest/polkadot/Token%20Economics.html#relay-chain-transaction-fees-and-per-block-transaction-limits)
- [Substrate 权重](https://www.substrate.io/kb/learn-substrate/weight)
- [Substrate 费用](https://www.substrate.io/kb/runtime/fees)
- [交易 (Extrinsics)](https://www.substrate.io/kb/learn-substrate/extrinsics)
