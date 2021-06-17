---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
description: An introductory guide to Polkadot Parachains.
---

> Note: For information on how to participate in the crowdloan and parachain auction testing on
> Rococo, please see the {{ polkadot: [Rococo page](build-parachains-rococo) :polkadot }} >
> {{ kusama: [Rococo page](mirror-build-parachains-rococo) :kusama }}.

![One parachain](assets/network/one_parachain.png)

A parachain is an application-specific data structure that is globally coherent and validatable by
the validators of the Relay Chain. Most commonly a parachain will take the form of a blockchain, but
there is no specific need for them to be actual blockchains. They take their name from the concept
of parallelized chains that run parallel to the Relay Chain. Due to their parallel nature, they are
able to parallelize transaction processing and achieve scalability of the
{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} system. They
[share in the security](https://wiki.polkadot.network/docs/en/learn-security) of the entire network
and can communicate with other parachains through
[XCMP](https://wiki.polkadot.network/docs/en/learn-crosschain).

Parachains are maintained by a network maintainer known as a
[collator](https://wiki.polkadot.network/docs/en/learn-collator). The role of the collator node is
to maintain a full-node of the parachain, retain all necessary information of the parachain, and
produce new block candidates to pass to the Relay Chain validators for verification and inclusion in
the shared state of Polkadot. The incentivization of a collator node is an implementation detail of
the parachain. They are not required to be staked on the Relay Chain or own DOT tokens unless
stipulated to do so by the parachain implementation.

The Polkadot Host (PH) requires that the state transitions performed on parachains to be specified
as a Wasm executable. Proofs of new state transitions that occur on a parachain must be validated
against the registered state transition function (STF) that is stored on the Relay Chain by the
validators before {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} acknowledges a
state transition has occurred on a parachain. The key constraint regarding the logic of a parachain
is that it must be verifiable by the Relay Chain validators. Verification most commonly takes the
form of a bundled proof of a state transition known as a Proof-of-Verification (PoV) block, which is
submitted to the validators from one or more of the parachain collators to be checked.

## Parachain Economies

Parachains may have their own economies with their own native tokens. Schemes such as Proof-of-Stake
are usually used to select the validator set in order to handle validation and finalization;
parachains will not be required to do either of those things. However, since
{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} is not overly particular about what
the parachain can implement, it may be the choice of the parachain to implement a staking token, but
it's not generally necessary.

Collators may be incentivized through inflation of a native parachain token. There may be other ways
to incentivize the collator nodes that do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains.
{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} makes no hard and fast rules for how
the parachains decide on original validity of transactions. For example, a parachain may be
implemented so that transactions must pay a minimum fee to collators to be valid. The Relay Chain
will enforce this validity. Similarly, a parachain could not include that in their implementation
and Polkadot would still enforce its validity.

Parachains are not required to have their own token. If they do, is up to the parachain to make the
economic case for their token, not {{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }}.

## Parachain Hubs

While Polkadot enables crosschain functionality amongst the parachains, it necessitates that there
is some latency between the dispatch of a message from one parachain until the destination parachain
receives the message. In the optimistic scenario, the latency for this message should be at least 2
blocks - one block for the message to be dispatched and one block for the receiving parachain to
process and produce a block that acts upon the message. However, in some cases we may see that the
latency for messages is higher if there are many messages that are in queue to be processed, or if
there exist no nodes that are running both of the parachain networks that can quickly gossip the
message across the networks.

Due to the neccesary latency involved in sending crosschain messages, some parachains are planning
to become _hubs_ for an entire industry. For example, a parachain project
[Acala](https://acala.network) is planning to become a hub for decentralized finance (DeFi)
applications. Many DeFi applications take advantage of a property known as _composability_ which
means that functions of one application can be composed with others in a synergistic way to create
new applications. One example of this include flash loans, which borrow funds to execute some
on-chain logic as long as the loan is repaid at the end of the transaction.

An issue with crosschain latency means that the property of composability is weakened among
parachains compared to a single blockchain. **This implication is common to all sharded blockchain
designs, including Polkadot, Eth2.0, and others.** The solution to this is the introduction of
parachain hubs which maintain the stronger property of single block composability.

## Parachain Slot Acquisition

{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} supports a limited number of
parachains, currently estimated to be about 100. As the number of slots is limited, there are
several ways to allocate them:

- Governance granted parachains, or "common good" parachains
- Auction granted parachains
- Parathreads

["Common Good" parachains](#common-good-parachains) are allocated by Polkadot's on-chain
{{ polkadot: [governance](learn-governance) :polkadot }}
{{ kusama: [governance](mirror-learn-governance) :kusama }} system, and are deemed as a "common
good" for the network, such as bridges to other networks or chains. They are usually considered
system level chains or public utility chains. These typically do not have an economic model of their
own and help remove transactions from the Relay Chain, allowing for more efficient parachain
processing.

{{ polkadot: [Auction granted parachains](learn-auction) :polkadot }}
{{ kusama: [Auction granted parachains](mirror-learn-auction) :kusama }} are granted in a
permissionless auction. Parachain teams can either bid with their own DOT tokens, or source them
from the community using the {{ polkadot: [crowdloan functionality](learn-crowdloans) :polkadot }}
{{ kusama: [crowdloan functionality](mirror-learn-crowdloans) :kusama }}.

{{ polkadot: [Parathreads](learn-parathreads) :polkadot }}
{{ kusama: [Parathreads](mirror-learn-parathreads) :kusama }} have the same API as parachains, but
are scheduled for execution on a pay-as-you-go basis with an auction for each block.

### Slot Expiration

When a parachain wins an auction, the tokens that it bid gets reserved until the end of the lease.
Reserved balances are non-transferrable and cannot be used for staking. At the end of the lease, the
tokens are unreserved. Parachains that have not secured a new lease to extend their slot will
automatically become parathreads.

## Common Good Parachains

"Common Good" parachains are parachain slots reserved for functionality that benefits the the
ecosystem as a whole. By allocating a subset of parachain slots to common good chains, the entire
network can realize the benefit of valuable parachains that would otherwise be underfunded due to
the free-rider problem. They are not allocated via the parachain auction process, but by the
on-chain {{ polkadot: [governance](learn-governance) :polkadot }}
{{ kusama: [governance](mirror-learn-governance) :kusama }} system.

The purpose of these parachains will probably fall into one of two categories: system level chains
or public utility chains.

### System Level Chains

System level chains move functionality from the Relay Chain into parachains, minimizing the
administrative use of the Relay Chain. For example, a governance parachain could move all the
governance processes from the Relay Chain into a parachain. Adding a system level chain is generally
uncontroversial, because they merely move functionality that the stakeholders already agreed was
useful from one place (the Relay Chain) to another (a parachain).

Moving the logic from the Relay Chain to a parachain is an optimization that makes the entire
network more efficient. All validators need to process all Relay Chain transactions, but split into
small groups to validate parachains in parallel. By moving system level logic to a parachain, and
allowing the processing to be done by a subgroup of validators instead of all, it frees capacity in
the Relay Chain for its primary function: validating parachains. Adding a system level chain could
make the network capable of processing several more parachains. Rather than taking a slice of a 100
parachain pie, a system level chain takes one slice and bakes a bigger pie.

Examples of potential system level chains include parachains for balances, elections (for both
staking and Council), governance, and identity. Eventually, the Relay Chain could become
transactionless, as in, it would only validate parachain state transitions and all of its current
transactional functionality would exist within parachains.

The vast majority of common good chains will likely be the unopinionated system level chains.

### Common Good Chains

Common good chains add functionality that doesn’t exist yet, but that the stakeholders believe
will add value to the entire network. Because public utility chains add new functionality, there is
a subjective component to their addition: the stakeholders of the network must believe that it is
worth allocating a slot that would otherwise go to the winners of an auction, and thus would have an
objective expression of conviction from its backers. Governance provides the means to internalize
the value of the parachain slot and distribute it across all members of the network.

Common goodchains will always be fully aligned with their Relay Chain stakeholder base. This
means that they will adopt the Relay Chain's native token (i.e. DOT or KSM) as their native token
and respect any messages incoming from the Relay Chain and system level parachains at face value.

Some examples of potential common good chains are bridges, DOT/KSM-denominated smart contract
platforms, and generic asset chains. All of these could operate without a new token:

- A bridge could add its own native token to charge as a toll, but in many cases that would be
  arbitrary value capture, when it could just as well use DOT/KSM and/or the bridged chain’s assets
  in its fee mechanism.
- A DOT/KSM-denominated smart contract layer-one blockchain would allow Wasm smart contract
  execution using DOT/KSM as the native asset with which to pay gas.
- A generic assets chain would allow anyone to place a deposit in DOT/KSM to deploy their asset
  on-chain. Assets on this chain could be backed by physical goods like artwork, real estate, or
  gold; or by paper goods like shares in a company or fiat currency held by a trusted party,
  providing a stable, permanent launchpad for stablecoins and Central Bank Digital Currencies.

Common good parachains would typically grant privileged business logic to Polkadot’s governance.
Just as the Polkadot Relay Chain has several privileged functions like setting the validator count
or allocating DOT from the Treasury, these parachains can have privileged functions like changing
system parameters or registering an asset.

Because common good chains add functionality beyond the scope of the Relay Chain, they will
likely be approved by the network stakeholders only in rare scenarios.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains**: These are possibly private chains that do not leak any
  information to the public, but still can be interacted with trustlessly due to the nature of the
  XCMP protocol.
- **High Frequency Chains**: These are chains that can compute many transactions in a short amount
  of time by taking certain trade-offs or making optimizations.
- **Privacy Chains**: These are chains that do not leak any information to the public through use of
  novel cryptography.
- **Smart Contract Chains**: These are chains that can have additional logic implemented on them
  through the deployment of code known as _smart contracts_.

## FAQ

### What is "parachain consensus"?

"Parachain consensus" is special in that it will follow the Polkadot Relay Chain. Parachains cannot
use other consensus algorithms that provide their own finality. Only sovereign chains (that must
bridge to the Relay Chain via a parachain) can control their own consensus. Parachains have control
over how blocks are authored and by whom.

### How will parachain slots be distributed?

Parachain slots will generally be acquirable through auction, please see the
{{ polkadot: [parachain slots](learn-auction) :polkadot }}
{{ kusama: [parachain slots](mirror-learn-auction) :kusama }} article. Additionally, some parachain
slots will be set aside to run {{ polkadot: [parathreads](learn-parathreads) :polkadot }}
{{ kusama: [parathreads](mirror-learn-parathreads) :kusama }} &mdash; chains that bid on a per-block
basis to be included in the Relay Chain. Common good and system parachains will also 
take up some slots.

### What happens to parachains when the number of validators drops below a certain threshold?

The minimal safe ratio of validators per parachain is 5:1. With a sufficiently large set of
validators, the randomness of their distribution along with
[availability and validity](https://wiki.polkadot.network/docs/en/learn-availability) will make sure
security is on-par. However, should there be a big outage of a popular cloud provider or another
network connectivity catastrophe, it is reasonable to expect that the number of validators per chain
will drop.

Depending on how many validators went offline, the outcome differs.

If a few validators went offline, the parachains whose validator groups will be too small to
validate a block will skip those blocks. Their block production speed will slow down to any
increment of 6 seconds, until the situation is resolved and the optimal number of validators is in
that parachain's validator group again.

If anywhere from 30% to 50% of the validators go offline, availability will suffer because we need
two thirds of the validator set to back the parachain candidates. In other words, all parachains
will stop until the situation is resolved. Finality will also stop, but low-value transactions on
the relay chain should be safe enough to execute, despite common forks. Once the required number of
validators is in the validator set again, parachains will resume block production.

Given that collators are full nodes of the relay chain and the parachain they are running, they will
be able to recognize a disruption as soon as it occurs and should stop producing block candidates.
Likewise, it should be easy for them to recongize when it's safe to restart block production -
perhaps based on finality delay, validator set size, or some other factor that is yet to be decided
within [Cumulus](https://github.com/paritytech/cumulus).

### What is a system parachain?

This is a parachain which is used directly for supporting the Relay Chain, generally by offloading 
functionality that was previously handled by the Relay Chain onto the parachain. For instance,
a parachain which handles governance or account balances for the Relay Chain would be a system 
parachain. These will generally be onboarded by act of governance as opposed to an auction.

System parachains can be recognized by their parachain ID, which will be less than 1_000.

### What is a common-good parachain?

This is a parachain allocated a slot not through the auction process, but because it will provide
a common good to the entire ecosystem. Examples of potential common-good parachains may be 
bridges or identity services, and will be onboarded by act of governance, not a parachain auction. 

Common-good parachains can be recognized by their parachain ID, which will be between 1_000 and 1_999.

For a good review of common good parachains, see the article [Common Good Parachains: An Introduction
to Governance Allocated Parachain Slots](https://medium.com/polkadot-network/common-good-parachains-an-introduction-to-governance-allocated-parachain-slots-88e01812160d).

## Parachain Development Kits (PDKs)

Parachain Development Kits are a set of tools that enable developers to create their own
applications as parachains. For more info see [here](build-pdk).

## Deploying parachains

Please see the [Cumulus repository](https://github.com/paritytech/cumulus#rococo) README for
information on compiling and deploying a parachain.

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) -
  Blog post by Polkadot co-founder Rob Habermeier that introduced parachains in 2017 as "a simpler
  form of blockchain, which attaches to the security provided by a Relay Chain rather than providing
  its own. The Relay Chain provides security to attached parachains, but also provides a guarantee
  of secure message-passing between them."
- [The Path of a Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) - A
  technical walkthrough of how parachains interact with the Relay Chain.
