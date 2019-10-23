---
id: build-pdk
title: Parachain Development Kits (PDKs)
sidebar_label: Parachain Development Kits (PDKs)
---

平行链开发工具包(PDK)是一套便于开发者创建兼容[Polkadot](learn-parachains)的平行链的工具。

## 为什么要创建平行链？

在深入了解什么是PDK以及它如何使用之前，让我们回顾一下*为什么*开发者希望创建平行链并将其连接到Polkadot中。

平行链拥有两个关键的附加功能，是开发者创建独立链的不二选择：

- *共享安全性* - 去除了自举链的验证人集的必要性。
- *跨链通信* - 使得平行链之间通过ICMP协议交互操作。

平行链通过为其插槽绑定[DOT](learn-DOT)来[出租Polkadot网络的安全性](learn-security)，这意味着项目在构建社区和说服验证人参与网络安全性中的社会成本*将有所降低*。预计Polkadot的安全性会十分强大，届时想从一安全性中获益的去中心化应用程序将会希望成为平行链。有关通过蜡烛拍卖出租平行链插槽的更多信息，请[点击此处](learn-auction)。

所有去中心化的应用程序或链，若想要向其它已连接到Polkadot的平行链去信任地传递信息，都会希望成为平行链。主权链之间的互操作性需借助约束和复杂的协议才可广泛实现。在Polkadot中，一旦将应用程序构建为平行链，便会立即获得这一特性。[ICMP协议](learn-interchain)将传递平行链之间的信息，实现其互操作性。此外，连接其它链的桥接器（例如比特币或以太坊的桥接器）纷纷推出，平行链也可以与它们进行交互。

## 什么是PDK？

如上所述，PDK是一套便于开发者创建兼容Polkadot的平行链的工具。实际上，这意味着PDK将包含以下几个关键成分：

- *State transition function* - a way for your application to move from one state to another state.
- *Collator node* - a type of peer-to-peer node in the Polkadot network with certain responsibilities in regard to parachains.

状态转换函数(STF)是应用程序从某状态转换到另一状态的抽象方法。Polkadot对此STF的唯一限制要求是其必须易于验证——也就是通常我们所说的_见证_或_证明_。STF必须满足此要求，因为中继链验证器需要检查它从校验人节点接收的每个状态是否正确，但不必切实运行整个计算过程。这些证明可能包括有效性证明区块或zk-SNARK（验证所需的计算资源低于生成时的需求量）。STF证明生成的验证不对称是Polkadot能够在确保高安全性的同时进行扩展的重要原因之一。

校验人节点在Polkadot协议中扮演网络维护者，负责维持平行链状态和状态转换函数迭代返回的新状态的**有效性**。它们必须始终在线，以便跟踪状态和ICMP与其它平行链之间传递的信息。校验人节点将传递简洁证明至中继链验证人，并跟踪来自中继链的最新区块。同时，校验人节点本质上还是Polkadot中继链的轻客户端。有关校验人节点的更多信息，请参见[此处](maintain-collator)。

## 目前存在哪种PDK？

目前唯一存在的PDK是Parity [Substrate](https://github.com/paritytech/substrate) & [Cumulus](https://github.com/paritytech/cumulus)。Substrate作为区块链框架，提供了区块链的基本构建区块（例如网络层、共识和Wasm解释器），以及创建运行时的直观方法。Substrate旨在简化创建新链的过程，但它并不直接支持Polkadot兼容性。为此，Cumulus附加库将包含所有Polkadot兼容性粘合代码。Cumulus目前还在开发之中，计划做到只通过导入crate以及添加一行代码便可连接Substrate链并添加平行链代码。

Substrate和Cumulus通过区块链格式的抽象化中提供PDK，但平行链实际上甚至不必是区块链。例如，平行链只需满足上文列出的两个要求：_状态转换函数_和_校验人节点_。其它一切功能取决于PDK的实现者。

One interesting idea for a PDK that would be nice to see is to have a [roll_up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675) kit that allowed developers to create snark-based parachains. If we review the roll_up write-up we see that the system uses two roles: users that update **state** and an operator that **aggregates the state updates** into a single on-chain update. It should be straight forward to see how we can translate this to the parachain terms. The state transition function for a roll_up-like parachain would be updating the state (in practice, most likely a merkle tree which would be easily verifiable) from the user inputs. The operator would act as the collator node which would aggregate the state and create the zk-SNARK proof which it would hand to the relay chain validators for verification.

## 创建PDK

If you or your team are interested in developing a PDK feel free to open an issue on the [W3F collaboration repository](https://github.com/w3f/Web3-collaboration) for comment. There may be grants available for this type of work.
