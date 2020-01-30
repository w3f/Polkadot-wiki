---
id: learn-faq
title: Frequently Asked Questions (FAQs)
sidebar_label: Frequently Asked Questions (FAQs)
---

_常见问题主要针对有兴趣为 Polkadot 开发应用程序的用户提出的技术问题，如果您有更深入的问题，你可以通过搜索[ Polkadot 网络常见问题](https://polkadot.network/faq)中找到答案。如果您还有未解决的问题，请随时在 Polkadot Watercooler [ Riot 频道上提问](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org)。 _

### How many validators will be validating at Mainnet launch?

Most likely somewhere between 50 - 100, increasing to 1000 or so later on. [Source](https://youtu.be/IRc5Jma_eH8?t=1630) The number of validators can be changed by governance, and so it is difficult to state precisely how many will be in the active validator set at any particular point in the future.

### 如何申请成为验证人？

See ("How To Validate on Kusama")[maintain-guides-how-to-validate-kusama.md].  Note that just because you run a validator does not mean you will necessarily be producing blocks; only a certain number of validators will be part of the active validator set, based on the amount of stake they can attract and the results of the (Phragmen election)[learn-phragmen].

### 中继链的共识是如何工作？

See the [consensus](learn-consensus) page.

### 中继链上的预期区块时间是多少？

The Kusama network is currently operating at a rate of one block approximately every six seconds.

The expected block time on the mainnet Polkadot chain is estimated to be limited by the theoretical limits of the peer-to-peer networks of the validators. Since there is no forced time between blocks due to Proof-of-Work and the only overhead on validators is to validate state transitions, the block times should be quite fast. Two or three seconds may not be unreasonable after optimizations. However, the specific block time will probably begin at a rate similar to Kusama. It also may potentially be longer (up to 10 - 15 seconds) due to the constraint of networking all parachain data.

### 代币通胀率是多少?

This is difficult to calculate precisely, since the [inflation rate will vary](learn-staking#inflation) based on what percentage of the DOTs are staked. For both Kusama and Polkadot, inflation is estimated to be around 10 - 20% for the first year.  Inflation on testnets and parachains will vary more dramatically.

### 验证人如何获取奖励?

Validators are rewarded from the block reward of the relay chain. Block rewards consist of transaction fees (and tips) and block production rewards. For more details, see the [validator payout page](maintain-guides-validator-payout).

### 平行链经济学是如何运作?

Parachains have the flexibility to implement their own monetary system or incentive structure for collators. However, this is not strictly necessary. Since the collator's job is to continue to give recent state transitions to the validators on the relay chain whom validate each transition, the security of the parachain and the Polkadot network is completely separate from parachain economics. Parachains need collators to continue to progress, so it wouldn't be unreasonable to see them incentivize collator nodes in some way but it is completely up to parachain implementers.

### What are the transfer fees for Kusama and Polkadot?

It is important to note that the cost of transferring KSM or DOT tokens is dynamic. Currently, the minimum cost of transferring KSM is 0.01 KSM (the base fee), although this can be changed via governance. However, actual transaction fees will vary based on a variety of factors. Specifically, fee calculation follows the following formula:

```
base_fee + (tx_length * length_fee) + WeightToFee(weight)
```

Please see the (Substrate page on fee calculation)[https://substrate.dev/docs/en/next/development/module/fees#fee-calculation] for more detailed information.

### What is the minimum amount of KSM I can have in my account?

It is recommended to always ensure that you keep at least 0.1 KSM in your account in order to avoid the reaping threshold of 0.01 KSM.  If you have less than 0.01 KSM in your account, that account will be "reaped" - it will be removed and no longer occupy space on the chain. In other words, no accounts are allowed on-chain with an account balance of less than 0.01 KSM.   This is a dust prevention measure, in order to ensure that the chain is not full of accounts with minuscule amounts of KSM taking up space. Since the blockchain is copied to every person running a full node, any savings of space provides dramatic benefits in terms of scalability.

### Can I buy or transfer DOT tokens?

Testnet DOT and KSM tokens are freely available from a variety of sources - see the [DOT page](learn-DOT) for details.

Kusama tokens are available via the [claims process](https://claim.kusama.network/) (if you have already purchased DOTs), the [frictional faucet](https://guide.kusama.network/en/latest/start/faucet/), or via [grant request](http://grants.web3.foundation) from the Web3 Foundation.  Upon obtaining Kusama tokens, they are freely transferable.

The Web3 Foundation will distribute up to 20% of mainnet DOTs prior to network launch (see [Light Paper](https://polkadot.network/Polkadot-lightpaper.pdf) or the [Polkadot Network FAQ](https://polkadot.network/faq/)). As Gavin Wood, one of the project's founders, said in his year-end recap, there may be a generally available public sale for some portion of that amount at some point this year. Subscribe to the Polkadot newsletter on [polkadot.network](https://polkadot.network/) for further updates.

Mainnet DOT tokens are not transferrable until mainnet launch, expected in early 2020. Any transfers before that time of mainnet DOTs are illegitimate and unauthorized. DOTs can not be moved from a current allocation address. Individuals with an allocation of DOTs who transfer their DOT address to someone else can always keep a copy of their private key, therefore there is extreme risk for individuals participating in transfers of DOTs before mainnet launch.

## Gav 回答的问题

The "Answered by Gav" series is a collection of posts uploaded to Reddit of questions that have been asked in the Polkadot Watercooler Riot channel and answered by Polkadot founder Gavin Wood.

- [Reason for using asynchronous rather than synchronous communication? Difference in terms of TPS?](https://www.reddit.com/r/dot/comments/b87d96/answered_by_gav_reason_for_using_asynchronous/)
- [How exactly do validators in an ETH parachain keep moving around and how is communication between zones trustless?](https://www.reddit.com/r/dot/comments/b87awr/answered_by_gav_how_exactly_do_validators_in_an/)
- [What are the main issues with Bitcoin integration and will it ever be possible? Same problem with other POW chains? Is Polkadot only going to work with POS chains? How is it trust-less in comparison to Cosmos though?](https://www.reddit.com/r/dot/comments/b87bua/answered_by_gav_what_are_the_main_issues_with/)
- [What are the current thoughts around governance especially since projects have to be voted in to receive the parachains security?](https://www.reddit.com/r/dot/comments/b87cjz/answered_by_gav_what_are_the_current_thoughts/)
- [Also is there any detailed overview of how exactly a token transfer from ETH could be exchanged with another chain's currency?](https://www.reddit.com/r/dot/comments/b87ds8/answered_by_gav_also_is_there_any_detailed/)
- [我可以使用相同的 Session 密钥运行多个验证人节点吗？](https://www.reddit.com/r/dot/comments/bcqrx9/answered_by_gav_can_i_run_multiple_validators/)
- [How to tackle the concentration risk of Validators in data centers?](https://www.reddit.com/r/dot/comments/bcqwit/answered_by_gav_how_to_tackle_the_concentration/)
