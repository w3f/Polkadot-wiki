---
id: glossary
title: Glossary
sidebar_label: Glossary
---

## Alexander

The most up-to-date testnet for Polkadot.

## Block

A collection of data, such as transactions, that together indicate a state transition of the blockchain.

## Block explorer

An application which allows a user to explore the different blocks on a blockchain.

## BLS

Boneh-Lynn-Shacham (BLS) signatures have slow signing, very slow verification, require slow and much less secure pairing friendly curves, and tend towards dangerous malleability. Yet, BLS permits a diverse array of signature aggregation options far beyond any other known signature scheme, which makes BLS a preferred scheme for voting in consensus algorithms and for threshold signatures.

## Bonding

A process by which tokens can be "frozen" in exchange for attaching a parachain to a relay chain. This process ensures that only chains that are valid and running will be attached to the relay chain, as it would behoove DOT holders to stop bonding their tokens.

## Bridge

A node which acts as an intermediary between the Polkadot relay chain and an external chain, in such a way that it appears to the relay chain that the external chain is a parachain (i.e., meets the Polkadot Runtime Environment requirements). Bridges allow for interaction between other blockchains such as Ethereum and Bitcoin which are not natively compatible with Polkadot.

## Byzantine Fault Tolerance

The property of a system which is tolerant of Byzantine faults; that is, a system where not only may individual subsystems fail, but it may not be clear if a particular subsystem has failed or not. That is, different observers on the system may not agree on whether or not the system has failed. Ensuring Byzantine fault tolerance is an important part of developing any distributed system.

## Collator

A node which maintains a parachain by collecting parachain transactions and producing state transition proofs for the validators.

## Consensus

The process of a group of entities to agree on a particular data value (such as the ordering and makeup of blocks on a blockchain). There are a variety of algorithms used for determining consensus. The consensus algorithm used by Polkadot is GRANDPA.

## DOTs

The native token for Polkadot. DOTs serve three purposes: network governance (allowing them to vote on network upgrades and other exceptional events), general operation (rewarding good actors and punishing bad actors), and bonding (adding new parachains by "freezing" DOTs while they are connected the relay chain).

## Dapps

A generic term for a decentralized application, that is, one which runs as part of a distributed network as opposed to being run on a specific system or set of systems.

## Epoch

An epoch is a time duration in the BABE protocol that assigns leadership positions to authorities for production in slots. In Kusama, it is the same duration as a [session](#session).

## Era

A (whole) number of sessions, which is the period that the validator set (and each validator's active nominator set) is recalculated and where rewards are paid out.
## Equivocation

Providing conflicting information to the network. BABE equivocation entails creating multiple blocks in the same slot. GRANDPA equivocation would consist of signing multiple conflicting chains.

## Extrinsic

Generically, some function declared by the programmer, i.e., one that is not built-in to the language or framework. Specifically for Polkadot, this refers to a binary blob which represents some state transition (such as a transaction) and is used for parachains to communicate via the relay chain.

## Finality

The property of a block which cannot be reverted. Generally, created blocks are not final until some point in the future - perhaps never, in the case of "probabilistic finality" such as in Bitcoin (although Bitcoin blocks are generally considered "final" after six confirmations due to the unlikelihood of reverting at that point). In the Polkadot relay chain, the goal is for blocks to be finalized 10-12 seconds after creation.

## Finality Gadget

A mechanism which determines finality.

## Fisherman

Nodes which monitor the network for validators or collators which are behaving badly. Fishermen must stake a small amount of DOTs but can be rewarded greatly if they find bad behavior.

## GRANDPA consensus algorithm

GHOST-based Recursive Ancestor Deriving Prefix Agreement. It is the finality gadget for Polkadot, which allows asynchronous, accountable, and safe finality to the blockchain. For an overview of GRANDPA, see this Medium post: [https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372](https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372)

## Governance

The process of determining what changes to the network are permissible, such as modifications to code or movement of funds. The governance system in Polkadot is on-chain and revolves around stakeholder voting, i.e. the majority of the stake (DOTs) determines the direction of the network.

## Governance Council

An on-chain entity which consists of several on-chain accounts (starting at 6, eventually moving to the final value of 24) which can act as a representative for "passive" (non-voting) stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder group to vote on and cancelling malicious referenda.

## Hard Fork

A permenant diversion of a blockchain that can occur quickly due to a high priority change in a consensus rule. Clients who follow a hard fork always need to upgrade their clients in order to continue following the hard-forked chain. Hard forks are considered permanent divergences of a chain for which non-upgraded clients are following consensus rules incompatible to the ones followed by upgraded clients.

## Hard Spoon

Defined by Jae Kwon of Cosmos as "a new chain that takes into account state from an existing chain; not to compete, but to provide broad access." A non-contentious blockchain that inherits the state of the underlying blockchain and creates a new branch of *the same blockchain*.

## KSM

The abbreviation for Kusama network tokens.

## Kusama

The "canary network" for Polkadot. It consists of an early-release, unaudited version of the Polkadot software. It is not a testnet - after the transition to NPoS, the network is entirely in the hands of the community (i.e., Kusama token holders).

## LIBP2P

An open-source library for encrypted peer-to-peer communications and other networking functionality. More information at: [https://libp2p.io/](https://libp2p.io/)

## Liveness

The property of a distributed system that it will eventually come to some sort of consensus. A system stuck in an infinite loop would not be considered live, even if computations are taking place; a system which eventually provides a result, even if incorrect or it takes a long time, is considered to have liveness.

## Node explorer

A tool which gives you information about a node, such as the latest blocks sealed, finalized, and the current chain state as known by that node.

## Nominated Proof of Stake (NPoS)

A proof of stake system whereby nominators "lend" their stake to validators, as a show of faith in the good behavior of the validator. Nominated proof-of-stake differs from the more generic concept delegated proof of stake in that nominators are subject to loss of stake if they nominate a bad validator; delegates are not subject to loss of stake based on the behavior of the validator. Note that some other blockchain technologies may use the term delegated proof of stake, even if delegates can be slashed.

## Nominator

Nodes which select a set of validators. A certain amount of DOTs must be staked in order to do so, which may be lost if the validator behaves badly. This forces nominators to carefully select validators.

## On-chain governance

Governance of a blockchain which is controlled by mechanisms controlled by the blockchain. On-chain governance allows for decisions can be made in a transparent manner. Note that there are a variety of different algorithms for making these decisions, such as simple majority voting or identity-based quadratic voting.

## Parachain

A blockchain which meets several characteristics which allow it work within the confines of the Polkadot Runtime Environment. Also known as "parallelized chain."

## Parachain Registry

A relatively simple database-like construct that holds both static and dynamic information on each chain.

## Parity Technologies

A company, founded by Dr. Gavin Wood, which is developing Substrate. It has also released several other projects including Parity Ethereum and Parity Wasm.

## Polkadot

A heterogeneous multi-chain technology allowing for various blockchains of different characteristics to perform interchain communication.

## Polkadot Runtime Environment

The runtime environment which a runtime module can be executed in. Parachains must support the Polkadot Runtime Environment - external chains which do not will have to use a bridge.

## Proof of Stake (PoS)

A method of achieving consensus in which the next block is determined by a node that is chosen by some characteristic (e.g., the amount of tokens that they stake).

## Proof of Work

A method of achieving consensus in which the next block is determined by the first to solve a difficult puzzle (e.g., in Bitcoin, solving a partial pre-image hash for a block candidate).

## Proposal

A potential function call to be voted on in a referendum. Proposals modify the behavior of the Polkadot network, from minor parameter tuning all the way up to replacing the runtime code.

## Protocol

A system of rules that allow two or more entities of a communications system to transmit information. The protocol defines the rules, syntax, semantics and synchronization of communication and possible recovery methods.

## Referendum

A vote on whether or not a proposal should be accepted by the network. These referenda may be initiated by the Governance Council, by a member of the public, or as the result of a previous proposal. Stakeholders vote on referenda, weighted by both the size of their stake (i.e. number of DOTs held) and the amount of time they are willing to lock their tokens.

## Relay chain

A chain which coordinates consensus and communication between parachains (and external chains, via bridges).

## Runtime

A state transition function which indicates a valid algorithm for determining the state of the next block given the previous block.

## Runtime Module

Wasm code which encodes a state transition function.

## Safety

The property of a distributed system indicating that the system will properly meet all invariants; that is, that nothing "bad" ever happens to the data (such as it being corrupted).

## Sealing

The process of adding a block to the relay chain. Note that finalization is a separate process - blocks are finalized some time after they are sealed (the goal is approximately 10 - 12 seconds).

## Session

A session is a Substrate implementation term for a period of time that has a constant set of validators. Validators can only join or exit the validator set at a session change.

## Session certificate

Another name for the session "key" which is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## Session key

A session "key" is a BLS key for GRANDPA, a sr25519 key for BABE, and eventually an Ed25519 key for libp2p.

## Slashing

The removal of a percentage of an account's DOTs as a punishment for a validator acting maliciously or incompetently (e.g., equivocating or remaining offline for an extended period of time).

## Soft Fork

A backwards compatible change to client code which causes upgraded clients to start mining a new chain. Requires a "vote-by-hashrate" of majority of miners in order to enact successfully. Soft forks are considered temporary divergences in a chain since non-upgraded clients do not follow the new consensus rules but upgraded clients are still compatible with old consensus rules.

## Staking

"Reserving" tokens (for Polkadot, DOTs) which are put up as "collateral" for a chance to produce a valid block (and thus obtain a block reward). Validators and nominators (who back validators through NPoS) together stake their DOTs in order to add blocks to the relay chain.

## State transition function

A function which describes how the state of a blockchain can be transformed. For example, it may describe how tokens can be transferred from one account to another.

## Substrate

An implementation of the Polkadot Runtime Environment which allows developers to generate parachains which are compatible with the Polkadot relay chain.

## Tabling

In Polkadot governance, bringing a proposal to a vote via referendum. Note that this is the British meaning of "tabling", which is different than the US version, which means "to postpone" a measure.

## Transaction

An individual element of the state transition function of a block, such as moving tokens from one account to another.

## Validator

A node which secures the relay chain by staking DOTs, validating proofs from collators on parachains, and determine a consensus along with other validators.

## Voting

The process of stakeholders determining whether or not a referendum to implement a specific proposal should pass. Votes are weighted both by the number of DOTs that the stakeholder account controls and the amount of time they are willing to lock their DOTs up. Voting may be overridden by the Governance Council if there is unanimous agreement that it not

## Wallet

A program which allows one to store, receive, and transmit DOTs or other blockchain-based tokens.

## Web3 Foundation

A Switzerland-based foundation which nurtures and stewards technologies and applications in the fields of decentralized web software protocols, particularly those which utilize modern cryptographic methods to safeguard decentralization, to the benefit and for the stability of the Web3 ecosystem.

## WebAssembly

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to WebAssembly. Also known as Wasm.

## Wasm

An instruction format for a virtual, stack-based machine. Polkadot Runtime Modules are compiled to Wasm.

## Witness

Cryptographic proof statements of data validity.
